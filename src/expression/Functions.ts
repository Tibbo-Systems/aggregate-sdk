import Cres from '../Cres';

export default class Functions {
  public static ABS: string = 'abs';

  public static ACOS: string = 'acos';

  public static ASIN: string = 'asin';

  public static ATAN: string = 'atan';

  public static CBRT: string = 'cbrt';

  public static CEIL: string = 'ceil';

  public static COS: string = 'cos';

  public static COSH: string = 'cosh';

  public static E: string = 'e';

  public static EXP: string = 'exp';

  public static EQ: string = 'eq';

  public static FLOOR: string = 'floor';

  public static GE: string = 'ge';

  public static GT: string = 'gt';

  public static LE: string = 'le';

  public static LOG: string = 'log';

  public static LOG10: string = 'log10';

  public static LT: string = 'lt';

  public static MIN: string = 'min';

  public static MAX: string = 'max';

  public static NE: string = 'ne';

  public static PI: string = 'pi';

  public static POW: string = 'pow';

  public static RANDOM: string = 'random';

  public static ROUND: string = 'round';

  public static SIGNUM: string = 'signum';

  public static SIN: string = 'sin';

  public static SINH: string = 'sinh';

  public static SQRT: string = 'sqrt';

  public static TAN: string = 'tan';

  public static TANH: string = 'tanh';

  public static FORMAT_NUMBER: string = 'formatNumber';

  public static CONTAINS: string = 'contains';

  public static ENDS_WITH: string = 'endsWith';

  public static FORMAT: string = 'format';

  public static GROUPS: string = 'groups';

  public static INDEX: string = 'index';

  public static IS_DIGIT: string = 'isDigit';

  public static IS_LETTER: string = 'isLetter';

  public static IS_LOWER_CASE: string = 'isLowerCase';

  public static IS_UPPER_CASE: string = 'isUpperCase';

  public static IS_WHITESPACE: string = 'isWhitespace';

  public static LAST_INDEX: string = 'lastIndex';

  public static LENGTH: string = 'length';

  public static LOWER: string = 'lower';

  public static REPLACE: string = 'replace';

  public static SPLIT: string = 'split';

  public static STARTS_WITH: string = 'startsWith';

  public static SUBSTRING: string = 'substring';

  public static TRIM: string = 'trim';

  public static UPPER: string = 'upper';

  public static URL_DECODE: string = 'urlDecode';

  public static URL_ENCODE: string = 'urlEncode';

  public static DATA_BLOCK: string = 'dataBlock';

  public static DATE: string = 'date';

  public static DATE_ADD: string = 'dateAdd';

  public static DATE_DIFF: string = 'dateDiff';

  public static DAY: string = 'day';

  public static DAY_OF_WEEK: string = 'dayOfWeek';

  public static DAY_OF_YEAR: string = 'dayOfYear';

  public static FORMAT_DATE: string = 'formatDate';

  public static HOUR: string = 'hour';

  public static MILLISECOND: string = 'millisecond';

  public static MINUTE: string = 'minute';

  public static MONTH: string = 'month';

  public static NOW: string = 'now';

  public static SECOND: string = 'second';

  public static PARSE_DATE: string = 'parseDate';

  public static PRINT_PERIOD: string = 'printPeriod';

  public static TIME: string = 'time';

  public static YEAR: string = 'year';

  public static BLUE: string = 'blue';

  public static BRIGHTER: string = 'brighter';

  public static COLOR: string = 'color';

  public static DARKER: string = 'darker';

  public static GREEN: string = 'green';

  public static RED: string = 'red';

  public static ADD_COLUMNS: string = 'addColumns';

  public static ADD_RECORDS: string = 'addRecords';

  public static ADJUST_RECORD_LIMITS: string = 'adjustRecordLimits';

  public static AGGREGATE: string = 'aggregate';

  public static CELL: string = 'cell';

  public static CLEAR: string = 'clear';

  public static CONVERT: string = 'convert';

  public static COPY: string = 'copy';

  public static DECODE: string = 'decode';

  public static DESCRIBE: string = 'describe';

  public static DESCRIPTION: string = 'description';

  public static ENCODE: string = 'encode';

  public static FILTER: string = 'filter';

  public static FETCH_DATA_BLOCK: string = 'fetchDataBlock';

  public static GET_FORMAT: string = 'getFormat';

  public static HAS_FIELD: string = 'hasField';

  public static JOIN: string = 'join';

  public static PRINT: string = 'print';

  public static RECORDS: string = 'records';

  public static REMOVE_COLUMNS: string = 'removeColumns';

  public static REMOVE_RECORDS: string = 'removeRecords';

  public static SELECT: string = 'select';

  public static SET: string = 'set';

  public static SET_MULTIPLE: string = 'setMultiple';

  public static SORT: string = 'sort';

  public static SUBTABLE: string = 'subtable';

  public static TABLE: string = 'table';

  public static UNION: string = 'union';

  public static BOOLEAN: string = 'boolean';

  public static DOUBLE: string = 'double';

  public static INTEGER: string = 'integer';

  public static FLOAT: string = 'float';

  public static LONG: string = 'long';

  public static STRING: string = 'string';

  public static TIMESTAMP: string = 'timestamp';

  public static AVAILABLE: string = 'available';

  public static CALL_FUNCTION: string = 'callFunction';

  public static FULL_DESCRIPTION: string = 'fullDescription';

  public static DC: string = 'dc';

  public static DR: string = 'dr';

  public static DT: string = 'dt';

  public static EVENT_AVAILABLE: string = 'eventAvailable';

  public static EVENT_FORMAT: string = 'eventFormat';

  public static EVENT_GROUP: string = 'eventGroup';

  public static FIRE_EVENT: string = 'fireEvent';

  public static FUNCTION_AVAILABLE: string = 'functionAvailable';

  public static FUNCTION_GROUP: string = 'functionGroup';

  public static FUNCTION_INPUT_FORMAT: string = 'functionInputFormat';

  public static FUNCTION_OUTPUT_FORMAT: string = 'functionOutputFormat';

  public static GET_VARIABLE: string = 'getVariable';

  public static SET_VARIABLE: string = 'setVariable';

  public static SET_VARIABLE_FIELD: string = 'setVariableField';

  public static SET_VARIABLE_RECORD: string = 'setVariableRecord';

  public static VARIABLE_AVAILABLE: string = 'variableAvailable';

  public static VARIABLE_FORMAT: string = 'variableFormat';

  public static VARIABLE_GROUP: string = 'variableGroup';

  public static VARIABLE_READABLE: string = 'variableReadable';

  public static VARIABLE_WRITABLE: string = 'variableWritable';

  public static CATCH: string = 'catch';

  public static EVALUATE: string = 'evaluate';

  public static LD: string = 'ld';

  public static LOGIN: string = 'login';

  public static SLEEP: string = 'sleep';

  public static ST: string = 'st';

  public static TABLE_FROM_CSV: string = 'tableFromCSV';

  public static TABLE_FROM_JSON: string = 'tableFromJSON';

  public static TABLE_TO_JSON: string = 'tableToJSON';

  public static TRACE: string = 'trace';

  public static USER: string = 'user';

  public static XPATH: string = 'xpath';

  public static ABSOLUTE: string = 'absolute';

  public static EXPRESSION_EDITOR_OPTIONS: string = 'expressionEditorOptions';

  public static HAS_RESOLVER: string = 'hasResolver';

  public static GROUP_CONTEXT_RELATED: string = Cres.get().getString('fContextOperations');
  public static GROUP_DATA_TABLE_PROCESSING: string = Cres.get().getString('fDataTableProcessing');
  public static GROUP_NUMBER_PROCESSING: string = Cres.get().getString('fNumberProcessing');
  public static GROUP_TYPE_CONVERSION: string = Cres.get().getString('fTypeConversion');
  public static GROUP_DATE_TIME_PROCESSING: string = Cres.get().getString('fDateTimeProcessing');
  public static GROUP_COLOR_PROCESSING: string = Cres.get().getString('fColorProcessing');
  public static GROUP_SYSTEM: string = Cres.get().getString('fSystem');
  public static GROUP_STRING_PROCESSING: string = Cres.get().getString('fOther');
  public static GROUP_OTHER: string;

  public static HAS_VARIABLE: string = 'hasVariable';

  public static HAS_FUNCTION: string = 'hasFunction';

  public static HAS_EVENT: string = 'hasEvent';

  public static JSON: string = 'json';
}
