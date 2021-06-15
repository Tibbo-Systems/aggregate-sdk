import TableFormat from '../datatable/TableFormat';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import FieldConstants from '../datatable/field/FieldConstants';
import Cres from '../Cres';
import CallerController from '../context/CallerController';
import DataTable from '../datatable/DataTable';
import Context from '../context/Context';
import ActionDefinition from './ActionDefinition';
import ActionIdentifier from './ActionIdentifier';
import ServerActionInput from './ServerActionInput';
import DataRecord from '../datatable/DataRecord';
import ActionContext from './ActionContext';
import ContextManager from '../context/ContextManager';
import ErrorCollector from '../util/ErrorCollector';
import RequestIdentifier from './RequestIdentifier';
import GenericActionResponse from './GenericActionResponse';
import Evaluator from '../expression/Evaluator';
import DataTableUtils from '../datatable/DataTableUtils';
import ActionHistoryItem from './ActionHistoryItem';
import BatchEntry from './BatchEntry';
import ActionManager from './ActionManager';
import GroupIdentifier from './GroupIdentifier';
import ServerContext from '../server/ServerContext';
import ActionHolder from './ActionHolder';
import ServerActionContext from './ServerActionContext';
import ServerActionDefinition from './ServerActionDefinition';
import RequestCache from './RequestCache';
import Action from './Action';
import ActionExecutionMode from './ActionExecutionMode';
import MessageFormat from '../util/java/MessageFormat';
import ActionUtils from './ActionUtils';
import Log from '../Log';
import ShowError from './command/ShowError';
import Util from '../util/Util';
import ActionUtilsConstants from './ActionUtilsConstants';

class StubActionDefinition extends ServerActionDefinition {
  getExecutionGroup(): GroupIdentifier | null {
    return null;
  }
}

export default class ServerActionHelper {
  public static readonly ENV_VARIABLE_PARAMETERS: string = 'parameters';

  private static readonly FIELD_CONTEXT: string = 'context';
  private static readonly FIELD_SELECT: string = 'select';

  private static readonly CONTEXTS_FORMAT: TableFormat = new TableFormat();

  static __static_initializer_0() {
    ServerActionHelper.CONTEXTS_FORMAT.setUnresizable(true);
    ServerActionHelper.CONTEXTS_FORMAT.addField(FieldFormatFactory.createWith(ServerActionHelper.FIELD_CONTEXT, FieldConstants.STRING_FIELD, Cres.get().getString('context')).setEditor(FieldConstants.EDITOR_CONTEXT).setReadonly(true));
    ServerActionHelper.CONTEXTS_FORMAT.addField(FieldFormatFactory.createWith(ServerActionHelper.FIELD_SELECT, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('select'), true));
  }

  private static _init = false;

  public static initialize() {
    if (ServerActionHelper._init) return;
    ServerActionHelper.__static_initializer_0();
    ServerActionHelper._init = true;
  }

  public static fillRequestCache(
    actionContext: ActionContext,
    initialParameters: DataTable | null,
    inputData: DataTable | null,
    environment: Map<string, any> | null,
    caller: CallerController,
    cm: ContextManager<any> | null,
    con: Context<any, any>,
    collector?: ErrorCollector
  ): void {
    if (inputData == null) {
      return;
    }

    let requestCache: RequestCache | null = actionContext.getRequestCache();

    if (requestCache == null) {
      requestCache = new RequestCache();

      actionContext.setRequestCache(requestCache);
    }

    if (inputData.getRecordCount() > 0) {
      const rec: DataRecord = inputData.rec();

      for (const ff of rec.getFormat()) {
        const requestId: string = ff.getName();

        const req: GenericActionResponse = ServerActionHelper.buildResponse(requestId, initialParameters, rec.getDataTable(requestId), environment, caller, cm, con, collector);

        requestCache.getRequests().set(new RequestIdentifier(requestId), req);
      }
    }
  }

  public static async executeNonInteractively(
    context: Context<any, any>,
    action: string,
    initialParameters: DataTable,
    inputData: DataTable,
    environment: Map<string, any>,
    mode: ActionExecutionMode,
    caller: CallerController,
    customActionId: string
  ): Promise<Map<string, string | null>> {
    const messages: Map<string, string | null> = new Map();

    const def: ActionDefinition | null = context.getActionDefinition(action, caller);
    if (def == null) {
      const message: string = MessageFormat.format(Cres.get().getString('conActNotAvailExt'), action, context.toString());
      messages.set(message, null);
      return messages;
    }

    Log.CONTEXT_ACTIONS.debug("Executing action '" + action + "' from context '" + context + "' non-interactively");

    const collector: ErrorCollector = new ErrorCollector();

    const actionId = await ActionUtils.initAction(context, action, new ServerActionInput(initialParameters), inputData, environment, mode, caller, customActionId, collector);

    for (const error of collector.getErrors()) {
      messages.set(error.message, error.toString());
    }

    if (collector.getErrors().length > 0) {
      return messages; // Interrupting execution if input parameter binding evaluation has failed
    }

    while (true) {
      const cmd = await ActionUtils.stepAction(context, actionId, null, caller);

      if (cmd == null || cmd.isLast()) {
        break;
      }

      Log.CONTEXT_ACTIONS.debug('Action returned command: actionId=' + actionId + ', type=' + cmd.getType() + ', title=' + cmd.getTitle());
      if (Util.equals(ActionUtilsConstants.CMD_SHOW_ERROR, cmd.getType())) {
        const rec: DataRecord | null = cmd?.getParameters()?.rec() || null;
        const message: string = rec?.getString(ShowError.CF_MESSAGE) as string;
        const exception: string | null = rec?.getString(ShowError.CF_EXCEPTION) || null;
        messages.set(message, exception);
        Log.CONTEXT_ACTIONS.debug('Action returned error response: ' + message + ' (' + exception + ')');
      }
    }

    return messages;
  }

  private static buildResponse(
    requestId: string,
    initialParameters: DataTable | null,
    responseData: DataTable,
    environment: Map<string, any> | null,
    caller: CallerController,
    cm: ContextManager<any> | null,
    con: Context<any, any>,
    collector?: ErrorCollector
  ): GenericActionResponse {
    const req: GenericActionResponse = new GenericActionResponse(responseData, false, new RequestIdentifier(requestId));

    if (responseData.getFormat().getBindings().length > 0) {
      const evaluator: Evaluator = new Evaluator(cm, con, responseData, caller);

      if (environment != null) {
        for (const [key, value] of environment.entries()) {
          evaluator.getEnvironmentResolver().set(key, value);
        }
      }

      evaluator.getEnvironmentResolver().set(ServerActionHelper.ENV_VARIABLE_PARAMETERS, initialParameters);

      //TODO promise
      DataTableUtils.processBindings(responseData, evaluator, collector);
    }

    return req;
  }
  public static initActions(caller: CallerController, actions: Array<ActionHolder>, con: ServerContext): ActionIdentifier | null {
    const actionManager: ActionManager | null = caller?.getCallerData()?.getActionManager() || null;

    const entries: Array<BatchEntry> = [];

    for (const holder of actions) {
      const context: ServerContext | null = holder.getContext();

      const actionName: string | null = holder.getActionName();

      if (actionName == null) {
        throw new Error('Action name is null');
      }

      const actionDef: ActionDefinition = context?.getActionDefinition(actionName) as ActionDefinition;

      if (actionDef == null && context) {
        throw new Error("Unsupported action '" + actionName + "' for context '" + context.getPath() + "'");
      }

      const actionContext: ServerActionContext | null = (context && new ServerActionContext(actionDef, context, caller)) || null;
      const hld = holder.getInitialParameters();
      const initialParameters: ServerActionInput | null = hld && new ServerActionInput(hld);

      if (actionContext) ServerActionHelper.fillRequestCache(actionContext, holder.getInitialParameters(), holder.getInputData(), null, caller, con.getContextManager(), con);

      if (caller.getCallerData()) caller?.getCallerData()?.addToActionHistory(ActionHistoryItem.create(new Date(), context && context.getPath(), actionName, holder.getInitialParameters()));

      entries.push(new BatchEntry(actionContext, initialParameters));
    }
    const bean = Reflect.construct(Action, []);
    const stub: ActionDefinition = new StubActionDefinition('', bean);

    if (!actionManager) return null;

    return actionManager.initActions(entries, new ServerActionContext(stub, con, caller));
  }
}

ServerActionHelper.initialize();
