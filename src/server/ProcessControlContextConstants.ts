export default class ProcessControlContextConstants {
  STATUS_ENABLED: number = 1;
  STATUS_DISABLED: number = 2;

  V_RUNTIME_DATA: string = 'runtimeData';
  V_TEMPLATE: string = 'template';
  V_STANDARD_HINT: string = 'standardHint';
  V_CUSTOM_HINT: string = 'customHint';
  V_GENERATED_CODE: string = 'generatedCode';
  E_ERRORS_ANALYZE: string = 'errorAnalyze';

  F_VALUE: string = 'value';
  F_PROPERTY: string = 'property';
  F_ANALYZE: string = 'analyze';
  F_FIND_HINT: string = 'findHint';
  F_GET_GPIO_VARIABLES: string = 'getGpioVariables';
  F_GET_ANALOG_VARIABLES: string = 'getAnalogVariables';
  F_BREAKPOINT: string = 'breakPoint';
  F_DEBUG_PROGRAM: string = 'debugProgram';
  F_EXECUTE: string = 'execute';
  F_EXECUTE_FUNCTION: string = 'executeFunction';
  F_META_POU: string = 'metaPou';
  F_GET_TOKENS: string = 'getTokens';

  E_CHANGE_VARIABLES: string = 'changeVariables';
  E_CHANGE_PERIOD: string = 'changePeriod';
  E_CHANGE_POSITION: string = 'changePosition';
  E_DEBUG_FINISH: string = 'debugFinish';

  A_DEBUG: string = 'debug';
  A_EDIT_PROGRAM: string = 'editProgram';

  VF_POU_NAME: string = 'name';
  VF_POU_DESCRIPTION: string = 'description';
  VF_POU_TEMPLATE: string = 'template';
  VF_IMPLEMENT_LANGUAGE: string = 'implementLanguage';
  VF_POU_TYPE: string = 'pouType';
  VF_POU_IMPORTS: string = 'imports';
  VF_POU_DEVICE_CONTEXT: string = 'deviceContext';
  VF_POU_DEVICE_WATCHDOG: string = 'watchdog';
  VF_POU_DEVICE_WATCHDOG_TIME: string = 'watchdogTime';
  VF_POU_DEVICE_WATCHDOG_SENSITIVITY: string = 'watchdogSensitivity';
  VF_POU_TASK: string = 'task';
  VF_POU_INTERVAL: string = 'interval';
  VF_POU_EXECUTION_TYPE: string = 'executionType';
  VF_POU_AUTORUN: string = 'autorun';

  FIF_ANALYZE_TEMPLATE: string = 'widgetTemplate';
  FIF_ANALYZE_IMPORTS: string = 'imports';
  FOF_ANALYZE_PROBLEM_TEXT: string = 'problemText';
  FOF_ANALYZE_OBJECT: string = 'object';
  FOF_ANALYZE_POSITION: string = 'positionText';
  FOF_ANALYZE_PROBLEM_START_POSITION_COL: string = 'problemStartPositionColumn';
  FOF_ANALYZE_PROBLEM_START_POSITION_LINE: string = 'problemStartPositionLine';
  FOF_ANALYZE_PROBLEM_END_POSITION_COL: string = 'problemEndPositionColumn';
  FOF_ANALYZE_PROBLEM_END_POSITION_LINE: string = 'problemEndPositionLine';
  FOF_ANALYZE_NAME: string = 'name';
  FOF_ANALYZE_PROBLEMS: string = 'problems';

  FIF_GET_HINT_PARAM_TYPE: string = 'getHintInputObjType';
  FIF_GET_HINT_PARAM_NAME: string = 'getHintInputObjName';
  FOF_GET_HINT_NAME: string = 'hintName';
  FOF_GET_HINT_PASS: string = 'hintPass';
  FOF_GET_HINT_EXPRESSION: string = 'hintExpression';
  FOF_GET_HINT_TYPE: string = 'hintType';

  FOF_GENERATED_CODE: string = 'generatedCode';

  FOF_GET_GPIO_VARIABLES_NAME: string = 'gpioVariablesName';
  FOF_GET_ANALOG_VARIABLES_NAME: string = 'analogVariablesName';

  public static FIF_BREAKPOINT_POSITION: string = 'positionText';
  public static FIF_BREAKPOINT_POSITION_LINE: string = 'positionLine';

  public static FIF_DEBUG_PROGRAM_PARAMETERS: string = 'programParameters';

  FIF_META_POU_NAME: string = 'name';

  FOF_META_POU_TYPE: string = 'type';
  FOF_META_POU_IO: string = 'io';
  FOF_META_POU_IO_NAME: string = 'name';
  FOF_META_POU_IO_TYPE: string = 'type';

  FOF_GET_TOKENS_NAME: string = 'name';
  FOF_GET_TOKENS_TYPE: string = 'type';
  FOF_GET_TOKENS_EXPRESSION: string = 'expression';

  EF_CHANGE_POSITION_DEBUGGER_POSITION: string = 'positionText';
  EF_CHANGE_POSITION_DEBUGGER_POSITION_LINE: string = 'positionLine';

  EF_CHANGE_PERIOD_TIME: string = 'time';

  EF_CHANGE_VARIABLES_SCOPE: string = 'scope';
  EF_CHANGE_VARIABLES_NAME: string = 'name';
  EF_CHANGE_VARIABLES_TYPE: string = 'type';
  EF_CHANGE_VARIABLES_VALUE: string = 'value';

  DEBUGGER_RESUME: number = 0;
  DEBUGGER_TERMINATE: number = 1;
  DEBUGGER_STEP_OVER: number = 2;
  DEBUGGER_GET_VARS: number = 3;
  DEBUGGER_DEBUG_FINISH: number = 4;

  INPUT_SECTION: number = 0;
  IN_OUT_SECTION: number = 1;
  OUTPUT_SECTION: number = 2;

  POU_FUNCTION: number = 0;
  POU_FUNCTION_BLOCK: number = 1;
  POU_PROGRAM: number = 2;

  TOKEN_COLOR_BLUE: number = 6;

  ANALYZE_ENV_PROBLEMS: string = 'envProblems';
  ANALYZE_BODY_PROBLEMS: string = 'bodyProblems';

  BODY_CODE_EDITOR: string = 'bodyEditor';
  ACTION_CODE_EDITOR: string = 'actionEditor';
  VAR_CODE_EDITOR: string = 'variablesEditor';
  GENERATED_CODE_EDITOR: string = 'generatedCodeEditor';
  ENV_PROBLEMS: number = 0;
  BODY_PROBLEMS: number = 1;
}
