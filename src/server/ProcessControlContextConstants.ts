export default class ProcessControlContextConstants {
  STATUS_ENABLED = 1;
  STATUS_DISABLED = 2;

  V_RUNTIME_DATA = 'runtimeData';
  V_TEMPLATE = 'template';
  V_STANDARD_HINT = 'standardHint';
  V_CUSTOM_HINT = 'customHint';
  V_GENERATED_CODE = 'generatedCode';
  E_ERRORS_ANALYZE = 'errorAnalyze';

  F_VALUE = 'value';
  F_PROPERTY = 'property';
  F_ANALYZE = 'analyze';
  F_FIND_HINT = 'findHint';
  F_GET_GPIO_VARIABLES = 'getGpioVariables';
  F_GET_ANALOG_VARIABLES = 'getAnalogVariables';
  F_BREAKPOINT = 'breakPoint';
  F_DEBUG_PROGRAM = 'debugProgram';
  F_EXECUTE = 'execute';
  F_EXECUTE_FUNCTION = 'executeFunction';
  F_META_POU = 'metaPou';
  F_GET_TOKENS = 'getTokens';

  E_CHANGE_VARIABLES = 'changeVariables';
  E_CHANGE_PERIOD = 'changePeriod';
  E_CHANGE_POSITION = 'changePosition';
  E_DEBUG_FINISH = 'debugFinish';

  A_DEBUG = 'debug';
  A_EDIT_PROGRAM = 'editProgram';

  VF_POU_NAME = 'name';
  VF_POU_DESCRIPTION = 'description';
  VF_POU_TEMPLATE = 'template';
  VF_IMPLEMENT_LANGUAGE = 'implementLanguage';
  VF_POU_TYPE = 'pouType';
  VF_POU_IMPORTS = 'imports';
  VF_POU_DEVICE_CONTEXT = 'deviceContext';
  VF_POU_DEVICE_WATCHDOG = 'watchdog';
  VF_POU_DEVICE_WATCHDOG_TIME = 'watchdogTime';
  VF_POU_DEVICE_WATCHDOG_SENSITIVITY = 'watchdogSensitivity';
  VF_POU_TASK = 'task';
  VF_POU_INTERVAL = 'interval';
  VF_POU_EXECUTION_TYPE = 'executionType';
  VF_POU_AUTORUN = 'autorun';

  FIF_ANALYZE_TEMPLATE = 'widgetTemplate';
  FIF_ANALYZE_IMPORTS = 'imports';
  FOF_ANALYZE_PROBLEM_TEXT = 'problemText';
  FOF_ANALYZE_OBJECT = 'object';
  FOF_ANALYZE_POSITION = 'positionText';
  FOF_ANALYZE_PROBLEM_START_POSITION_COL = 'problemStartPositionColumn';
  FOF_ANALYZE_PROBLEM_START_POSITION_LINE = 'problemStartPositionLine';
  FOF_ANALYZE_PROBLEM_END_POSITION_COL = 'problemEndPositionColumn';
  FOF_ANALYZE_PROBLEM_END_POSITION_LINE = 'problemEndPositionLine';
  FOF_ANALYZE_NAME = 'name';
  FOF_ANALYZE_PROBLEMS = 'problems';

  FIF_GET_HINT_PARAM_TYPE = 'getHintInputObjType';
  FIF_GET_HINT_PARAM_NAME = 'getHintInputObjName';
  FOF_GET_HINT_NAME = 'hintName';
  FOF_GET_HINT_PASS = 'hintPass';
  FOF_GET_HINT_EXPRESSION = 'hintExpression';
  FOF_GET_HINT_TYPE = 'hintType';

  FOF_GENERATED_CODE = 'generatedCode';

  FOF_GET_GPIO_VARIABLES_NAME = 'gpioVariablesName';
  FOF_GET_ANALOG_VARIABLES_NAME = 'analogVariablesName';

  public static FIF_BREAKPOINT_POSITION = 'positionText';
  public static FIF_BREAKPOINT_POSITION_LINE = 'positionLine';

  public static FIF_DEBUG_PROGRAM_PARAMETERS = 'programParameters';

  FIF_META_POU_NAME = 'name';

  FOF_META_POU_TYPE = 'type';
  FOF_META_POU_IO = 'io';
  FOF_META_POU_IO_NAME = 'name';
  FOF_META_POU_IO_TYPE = 'type';

  FOF_GET_TOKENS_NAME = 'name';
  FOF_GET_TOKENS_TYPE = 'type';
  FOF_GET_TOKENS_EXPRESSION = 'expression';

  EF_CHANGE_POSITION_DEBUGGER_POSITION = 'positionText';
  EF_CHANGE_POSITION_DEBUGGER_POSITION_LINE = 'positionLine';

  EF_CHANGE_PERIOD_TIME = 'time';

  EF_CHANGE_VARIABLES_SCOPE = 'scope';
  EF_CHANGE_VARIABLES_NAME = 'name';
  EF_CHANGE_VARIABLES_TYPE = 'type';
  EF_CHANGE_VARIABLES_VALUE = 'value';

  DEBUGGER_RESUME = 0;
  DEBUGGER_TERMINATE = 1;
  DEBUGGER_STEP_OVER = 2;
  DEBUGGER_GET_VARS = 3;
  DEBUGGER_DEBUG_FINISH = 4;

  INPUT_SECTION = 0;
  IN_OUT_SECTION = 1;
  OUTPUT_SECTION = 2;

  POU_FUNCTION = 0;
  POU_FUNCTION_BLOCK = 1;
  POU_PROGRAM = 2;

  TOKEN_COLOR_BLUE = 6;

  ANALYZE_ENV_PROBLEMS = 'envProblems';
  ANALYZE_BODY_PROBLEMS = 'bodyProblems';

  BODY_CODE_EDITOR = 'bodyEditor';
  ACTION_CODE_EDITOR = 'actionEditor';
  VAR_CODE_EDITOR = 'variablesEditor';
  GENERATED_CODE_EDITOR = 'generatedCodeEditor';
  ENV_PROBLEMS = 0;
  BODY_PROBLEMS = 1;
}
