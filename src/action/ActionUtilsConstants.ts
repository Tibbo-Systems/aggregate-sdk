export default class ActionUtilsConstants {
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
  public static readonly CMD_EDIT_EXPRESSION: string = 'editExpression';

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

  public static readonly CF_RELATION_FIELD: string = 'relationField';
}
