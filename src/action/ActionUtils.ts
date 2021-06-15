import Util from '../util/Util';
import Context from '../context/Context';
import SimpleDataTable from '../datatable/SimpleDataTable';
import DataTable from '../datatable/DataTable';
import ServerActionInput from './ServerActionInput';
import TableFormat from '../datatable/TableFormat';
import ActionIdentifier from './ActionIdentifier';
import GenericActionCommand from './GenericActionCommand';
import GenericActionResponse from './GenericActionResponse';
import ActionExecutionMode from './ActionExecutionMode';
import ErrorCollector from '../util/ErrorCollector';
import CallerController from '../context/CallerController';
import ActionInitializer from './ActionInitializer';
import DefaultActionInitializer from './DefaultActionInitializer';
import ServerContextConstants from '../server/ServerContextConstants';
import ProtocolHandler from './ProtocolHandler';
import Log from '../Log';
import Cres from '../Cres';
import ActionUtilsConstants from './ActionUtilsConstants';

export default abstract class ActionUtils {
  public static readonly FORMAT_DND_ACTION: TableFormat = new TableFormat(1, 1);
  public static readonly FORMAT_NORMAL_ACTION: TableFormat = new TableFormat(1, 1);
  public static readonly FORMAT_PROPAGATED_ACTION: TableFormat = new TableFormat(1, 1);

  private static ACTION_INITIALIZER: ActionInitializer = new DefaultActionInitializer();

  public static readonly DESCRIPTIONS: Map<string, string> = new Map();

  static __static_initializer_0() {
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_MESSAGE, Cres.get().getString('acUiProcShowMessage'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_CONFIRM, Cres.get().getString('acUiProcConfirm'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_DATA, Cres.get().getString('acUiProcEditData'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_PROPERTIES, Cres.get().getString('acUiProcEditProperties'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_WIDGET, Cres.get().getString('acUiProcEditWidget'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_PROCESS_CONTROL_PROGRAM, Cres.get().getString('acUiProcEditProcessControlProgram'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_WORKFLOW, Cres.get().getString('acUiProcEditWorkflow'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_LAUNCH_WIDGET, Cres.get().getString('acUiProcLaunchWidget'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_LAUNCH_PROCESS_CONTROL_PROGRAM, Cres.get().getString('acUiProcLaunchProcessControlProgram'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_BROWSE, Cres.get().getString('acUiProcBrowse'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_EVENT_LOG, Cres.get().getString('acUiProcShowEventLog'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_ERROR, Cres.get().getString('acUiProcShowError'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_REPORT, Cres.get().getString('acUiProcEditReport'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_REPORT, Cres.get().getString('acUiProcShowReport'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_GUIDE, Cres.get().getString('acUiShowGuide'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SELECT_ENTITIES, Cres.get().getString('acUiProcSelectEntities'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_TEXT, Cres.get().getString('acUiProcEditText'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_CODE, Cres.get().getString('acUiProcEditCode'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_SYSTEM_TREE, Cres.get().getString('acUiProcShowSystemTree'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_ACTIVATE_DASHBOARD, Cres.get().getString('acUiProcActiveDashboard'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_CLOSE_DASHBOARD, Cres.get().getString('acUiProcCloseDashboard'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_OPEN_GRID_DASHBOARD, Cres.get().getString('acUiProcOpenGridDashboard'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_GRID_DASHBOARD, Cres.get().getString('acUiProcEditGridDashboard'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_HTML_SNIPPET, Cres.get().getString('acUiProcShowHtmlSnippet'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_SHOW_DIFF, Cres.get().getString('acUiProcShowDiff'));
    ActionUtils.DESCRIPTIONS.set(ActionUtilsConstants.CMD_EDIT_EXPRESSION, Cres.get().getString('acUiProcShowDiff'));
  }

  static __static_initializer_1() {
    ActionUtils.FORMAT_PROPAGATED_ACTION.addField('<' + ActionUtils.FIELD_ACTION_TARGET_CONTEXT + '><S>');
  }

  static __static_initializer_2() {
    ActionUtils.FORMAT_NORMAL_ACTION.addField('<' + ActionUtils.FIELD_ACTION_EXECUTION_PARAMETERS + '><T><F=N>');
  }

  private static _init = false;

  public static initialize() {
    if (ActionUtils._init) return;
    ActionUtils.__static_initializer_0();
    ActionUtils.__static_initializer_1();
    ActionUtils.__static_initializer_2();
    ActionUtils._init = true;
  }

  public static readonly FIELD_ACTION_EXECUTION_PARAMETERS: string = 'executionParameters';
  public static readonly FIELD_ACTION_FROM_CONTEXT: string = 'fromContext';
  public static readonly FIELD_ACTION_TARGET_CONTEXT: string = 'targetContext';

  public static checkResponseCode(result: string): void {
    if (!Util.equals(ActionUtilsConstants.RESPONSE_SAVED, result) && !Util.equals(ActionUtilsConstants.RESPONSE_CLOSED, result) && !Util.equals(ActionUtilsConstants.RESPONSE_ERROR, result)) {
      throw new Error('Illegal response result: ' + result);
    }
  }

  public static createDndActionParametersContext(acceptedContext: Context<any, any>): DataTable {
    return ActionUtils.createDndActionParameters(acceptedContext.getPath());
  }

  public static createDndActionParameters(accepterContextPath: string): DataTable {
    const paramsEntry: DataTable = new SimpleDataTable(ActionUtils.FORMAT_DND_ACTION);
    paramsEntry.addRecord().addString(accepterContextPath);
    return paramsEntry;
  }

  public static createActionInput(executionParameters: DataTable): ServerActionInput {
    return new ServerActionInput(SimpleDataTable.createSimpleDataTable(ActionUtils.FORMAT_NORMAL_ACTION, executionParameters));
  }

  public static initActionCreate(
    context: Context<any, any>,
    actionName: string,
    initialParameters: ServerActionInput,
    inputData: DataTable,
    mode: ActionExecutionMode,
    callerController: CallerController,
    actionId: string | null
  ): Promise<ActionIdentifier> {
    return ActionUtils.initAction(context, actionName, initialParameters, inputData, null, mode, callerController, actionId);
  }

  public static initAction(
    context: Context<any, any>,
    actionName: string,
    initialParameters: ServerActionInput,
    inputData: DataTable | null,
    environment: Map<string, any> | null,
    mode: ActionExecutionMode,
    callerController?: CallerController,
    actionId: string | null = null,
    collector?: ErrorCollector
  ): Promise<ActionIdentifier> {
    return ActionUtils.ACTION_INITIALIZER.initAction(context, actionName, initialParameters, inputData, environment, mode, callerController, actionId, collector);
  }

  public static async stepAction(context: Context<any, any>, actionId: ActionIdentifier, actionResponse: GenericActionResponse | null, callerController?: CallerController): Promise<GenericActionCommand | null> {
    const startTime: number = Date.now();

    const res: DataTable = await context.callFunction(ServerContextConstants.F_STEP_ACTION, [actionId.toString(), ProtocolHandler.actionResponseToDataTable(actionResponse)], callerController);
    const rc = ProtocolHandler.actionCommandFromDataTable(res.rec().getDataTable(ServerContextConstants.FOF_STEP_ACTION_ACTION_COMMAND));

    if (Log.CONTEXT_ACTIONS.isDebugEnabled()) {
      Log.CONTEXT_ACTIONS.debug("Action step that returned UI command '" + rc + "' completed in " + (Date.now() - startTime) + ' ms');
    }

    return rc;
  }
}

ActionUtils.initialize();
