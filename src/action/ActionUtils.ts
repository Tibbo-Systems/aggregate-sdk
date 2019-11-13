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
import Class from '../util/java/Class';
import Cres from '../Cres';

export default abstract class ActionUtils {
  public static readonly CMD_SHOW_MESSAGE: string = 'showMessage';
  public static readonly CMD_CONFIRM: string = 'confirm';
  public static readonly CMD_EDIT_DATA: string = 'editData';
  public static readonly CMD_EDIT_PROPERTIES: string = 'editProperties';
  public static readonly CMD_EDIT_WIDGET: string = 'editWidget';
  public static readonly CMD_EDIT_PROCESS_CONTROL_PROGRAM: string = 'editProcessControlProgram';
  public static readonly CMD_EDIT_WORKFLOW: string = 'editWorkflow';
  public static readonly CMD_LAUNCH_WORKFLOW: string = 'launchWorkflow';
  public static readonly CMD_LAUNCH_WIDGET: string = 'launchWidget';
  public static readonly CMD_LAUNCH_PROCESS_CONTROL_PROGRAM: string = 'launchProcessControlProgram';
  public static readonly CMD_BROWSE: string = 'browse';
  public static readonly CMD_SHOW_EVENT_LOG: string = 'showEventLog';
  public static readonly CMD_SHOW_ERROR: string = 'showError';
  public static readonly CMD_EDIT_REPORT: string = 'editReport';
  public static readonly CMD_SHOW_REPORT: string = 'showReport';
  public static readonly CMD_SHOW_GUIDE: string = 'showGuide';
  public static readonly CMD_SELECT_ENTITIES: string = 'selectEntities';
  public static readonly CMD_EDIT_TEXT: string = 'editText';
  public static readonly CMD_EDIT_CODE: string = 'editCode';
  public static readonly CMD_SHOW_SYSTEM_TREE: string = 'showSystemTree';
  public static readonly CMD_SHOW_HTML_SNIPPET: string = 'showHtmlSnippet';
  public static readonly CMD_ACTIVATE_DASHBOARD: string = 'activateDashboard';
  public static readonly CMD_SHOW_DIFF: string = 'showDiff';
  public static readonly CMD_CLOSE_DASHBOARD: string = 'closeDashboard';
  public static readonly CMD_OPEN_GRID_DASHBOARD: string = 'openGridDashboard';
  public static readonly CMD_EDIT_GRID_DASHBOARD: string = 'editGridDashboard';

  public static readonly RESPONSE_OK: string = 'ok';
  public static readonly RESPONSE_SAVED: string = 'saved';
  public static readonly RESPONSE_CLOSED: string = 'closed';
  public static readonly RESPONSE_ERROR: string = 'error';

  public static readonly INDEX_NORMAL: number = 0;
  public static readonly INDEX_LOWER: number = -100;
  public static readonly INDEX_LOW: number = -200;
  public static readonly INDEX_VERY_LOW: number = -300;
  public static readonly INDEX_LOWEST: number = -400;

  public static readonly YES_OPTION: number = 0;
  public static readonly NO_OPTION: number = 1;
  public static readonly CANCEL_OPTION: number = 2;
  public static readonly OK_OPTION: number = 0;
  public static readonly CLOSED_OPTION: number = -1;

  public static readonly QUESTION_MESSAGE: number = 3;

  public static readonly YES_NO_OPTION: number = 0;
  public static readonly YES_NO_CANCEL_OPTION: number = 1;
  public static readonly OK_CANCEL_OPTION: number = 2;

  public static readonly FORMAT_DND_ACTION: TableFormat = new TableFormat(1, 1);
  public static readonly FORMAT_NORMAL_ACTION: TableFormat = new TableFormat(1, 1);

  private static ACTION_INITIALIZER: ActionInitializer = new DefaultActionInitializer();

  public static readonly COMMANDS: Map<string, Class> = new Map();

  public static readonly DESCRIPTIONS: Map<string, string> = new Map();

  static __static_initializer_0() {
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_MESSAGE, Cres.get().getString('acUiProcShowMessage'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_CONFIRM, Cres.get().getString('acUiProcConfirm'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_EDIT_DATA, Cres.get().getString('acUiProcEditData'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_EDIT_PROPERTIES, Cres.get().getString('acUiProcEditProperties'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_LAUNCH_WIDGET, Cres.get().getString('acUiProcLaunchWidget'));
    ActionUtils.DESCRIPTIONS.set(
      ActionUtils.CMD_OPEN_GRID_DASHBOARD,
      Cres.get().getString('acUiProcOpenGridDashboard')
    );
    ActionUtils.DESCRIPTIONS.set(
      ActionUtils.CMD_EDIT_GRID_DASHBOARD,
      Cres.get().getString('acUiProcEditGridDashboard')
    );
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_BROWSE, Cres.get().getString('acUiProcBrowse'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_EVENT_LOG, Cres.get().getString('acUiProcShowEventLog'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_ERROR, Cres.get().getString('acUiShowError'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_REPORT, Cres.get().getString('acUiProcShowReport'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_GUIDE, Cres.get().getString('acUiShowGuide'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SELECT_ENTITIES, Cres.get().getString('acUiProcSelectEntities'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_EDIT_TEXT, Cres.get().getString('acUiProcEditText'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_EDIT_CODE, Cres.get().getString('acUiProcEditCode'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_SYSTEM_TREE, Cres.get().getString('acUiProcShowSystemTree'));
    ActionUtils.DESCRIPTIONS.set(ActionUtils.CMD_SHOW_DIFF, Cres.get().getString('acUiProcShowDiff'));
  }

  private static _init = false;

  public static initialize() {
    if (ActionUtils._init) return;
    ActionUtils.__static_initializer_0();
    ActionUtils._init = true;
  }

  public static readonly FIELD_ACTION_EXECUTION_PARAMETERS: string = 'executionParameters';
  public static readonly FIELD_ACTION_FROM_CONTEXT: string = 'fromContext';
  public static readonly FIELD_ACTION_TARGET_CONTEXT: string = 'targetContext';

  public static checkResponseCode(result: string): void {
    if (
      !Util.equals(ActionUtils.RESPONSE_SAVED, result) &&
      !Util.equals(ActionUtils.RESPONSE_CLOSED, result) &&
      !Util.equals(ActionUtils.RESPONSE_ERROR, result)
    ) {
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
    return new ServerActionInput(
      SimpleDataTable.createSimpleDataTable(ActionUtils.FORMAT_NORMAL_ACTION, executionParameters)
    );
  }

  public static initActionCreate(
    context: Context<any, any>,
    actionName: string,
    initialParameters: ServerActionInput,
    inputData: DataTable,
    mode: ActionExecutionMode,
    callerController: CallerController
  ): Promise<ActionIdentifier> {
    return ActionUtils.initAction(
      context,
      actionName,
      initialParameters,
      inputData,
      null,
      mode,
      callerController,
      null
    );
  }

  public static initAction(
    context: Context<any, any>,
    actionName: string,
    initialParameters: ServerActionInput,
    inputData: DataTable,
    environment: Map<string, any> | null,
    mode: ActionExecutionMode,
    callerController: CallerController,
    collector: ErrorCollector | null
  ): Promise<ActionIdentifier> {
    return ActionUtils.ACTION_INITIALIZER.initAction(
      context,
      actionName,
      initialParameters,
      inputData,
      environment,
      mode,
      callerController,
      collector
    );
  }

  public static async stepAction(
    context: Context<any, any>,
    actionId: Promise<ActionIdentifier>,
    actionResponse: GenericActionResponse | null,
    callerController: CallerController
  ): Promise<GenericActionCommand | null> {
    const startTime: number = Date.now();

    const res: DataTable = await context.callFunction(
      ServerContextConstants.F_STEP_ACTION,
      [actionId.toString(), ProtocolHandler.actionResponseToDataTable(actionResponse)],
      callerController,
      null
    );
    const rc = ProtocolHandler.actionCommandFromDataTable(
      res.rec().getDataTable(ServerContextConstants.FOF_STEP_ACTION_ACTION_COMMAND)
    );

    if (Log.CONTEXT_ACTIONS.isDebugEnabled()) {
      Log.CONTEXT_ACTIONS.debug(
        "Action step that returned UI command '" + rc + "' completed in " + (Date.now() - startTime) + ' ms'
      );
    }

    return rc;
  }
}

ActionUtils.initialize();
