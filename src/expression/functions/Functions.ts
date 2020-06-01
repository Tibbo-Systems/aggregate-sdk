import Cres from '../../Cres';

export default class Functions {
  public static ABS = 'abs';

  public static ACOS = 'acos';

  public static ASIN = 'asin';

  public static ATAN = 'atan';

  public static CBRT = 'cbrt';

  public static CEIL = 'ceil';

  public static COS = 'cos';

  public static COSH = 'cosh';

  public static E = 'e';

  public static EXP = 'exp';

  public static EQ = 'eq';

  public static FLOOR = 'floor';

  public static GE = 'ge';

  public static GT = 'gt';

  public static LE = 'le';

  public static LOG = 'log';

  public static LOG10 = 'log10';

  public static LT = 'lt';

  public static MIN = 'min';

  public static MAX = 'max';

  public static NE = 'ne';

  public static PI = 'pi';

  public static POW = 'pow';

  public static RANDOM = 'random';

  public static ROUND = 'round';

  public static SIGNUM = 'signum';

  public static SIN = 'sin';

  public static SINH = 'sinh';

  public static SQRT = 'sqrt';

  public static TAN = 'tan';

  public static TANH = 'tanh';

  public static FORMAT_NUMBER = 'formatNumber';

  public static CONTAINS = 'contains';

  public static ENDS_WITH = 'endsWith';

  public static FORMAT = 'format';

  public static GROUPS = 'groups';

  public static INDEX = 'index';

  public static IS_DIGIT = 'isDigit';

  public static IS_LETTER = 'isLetter';

  public static IS_LOWER_CASE = 'isLowerCase';

  public static IS_UPPER_CASE = 'isUpperCase';

  public static IS_WHITESPACE = 'isWhitespace';

  public static LAST_INDEX = 'lastIndex';

  public static LENGTH = 'length';

  public static LOWER = 'lower';

  public static REPLACE = 'replace';

  public static SPLIT = 'split';

  public static STARTS_WITH = 'startsWith';

  public static SUBSTRING = 'substring';

  public static TRIM = 'trim';

  public static UPPER = 'upper';

  public static URL_DECODE = 'urlDecode';

  public static URL_ENCODE = 'urlEncode';

  public static DATA_BLOCK = 'dataBlock';

  public static DATE = 'date';

  public static DATE_ADD = 'dateAdd';

  public static DATE_DIFF = 'dateDiff';

  public static DAY = 'day';

  public static DAY_OF_WEEK = 'dayOfWeek';

  public static DAY_OF_YEAR = 'dayOfYear';

  public static FORMAT_DATE = 'formatDate';

  public static HOUR = 'hour';

  public static MILLISECOND = 'millisecond';

  public static MINUTE = 'minute';

  public static MONTH = 'month';

  public static NOW = 'now';

  public static SECOND = 'second';

  public static PARSE_DATE = 'parseDate';

  public static PRINT_PERIOD = 'printPeriod';

  public static TIME = 'time';

  public static YEAR = 'year';

  public static BLUE = 'blue';

  public static BRIGHTER = 'brighter';

  public static COLOR = 'color';

  public static DARKER = 'darker';

  public static GREEN = 'green';

  public static RED = 'red';

  public static ADD_COLUMNS = 'addColumns';

  public static ADD_RECORDS = 'addRecords';

  public static ADJUST_RECORD_LIMITS = 'adjustRecordLimits';

  public static AGGREGATE = 'aggregate';

  public static CELL = 'cell';

  public static CLEAR = 'clear';

  public static CONVERT = 'convert';

  public static COPY = 'copy';

  public static DECODE = 'decode';

  public static DESCRIBE = 'describe';

  public static DESCRIPTION = 'description';

  public static DISTINCT = 'distinct';

  public static ENCODE = 'encode';

  public static FILTER = 'filter';

  public static INTERSECT = 'intersect';

  public static FETCH_DATA_BLOCK = 'fetchDataBlock';

  public static GET_FORMAT = 'getFormat';

  public static HAS_FIELD = 'hasField';

  public static JOIN = 'join';

  public static PRINT = 'print';

  public static RECORDS = 'records';

  public static REMOVE_COLUMNS = 'removeColumns';

  public static REMOVE_RECORDS = 'removeRecords';

  public static SELECT = 'select';

  public static SET = 'set';

  public static SET_MULTIPLE = 'setMultiple';

  public static SORT = 'sort';

  public static SUBTABLE = 'subtable';

  public static TABLE = 'table';

  public static UNION = 'union';

  public static BOOLEAN = 'boolean';

  public static DOUBLE = 'double';

  public static INTEGER = 'integer';

  public static FLOAT = 'float';

  public static LONG = 'long';

  public static STRING = 'string';

  public static TIMESTAMP = 'timestamp';

  public static AVAILABLE = 'available';

  public static CALL_FUNCTION = 'callFunction';

  public static FULL_DESCRIPTION = 'fullDescription';

  public static DC = 'dc';

  public static DR = 'dr';

  public static DT = 'dt';

  public static EVENT_AVAILABLE = 'eventAvailable';

  public static EVENT_FORMAT = 'eventFormat';

  public static EVENT_GROUP = 'eventGroup';

  public static FIRE_EVENT = 'fireEvent';

  public static FUNCTION_AVAILABLE = 'functionAvailable';

  public static FUNCTION_GROUP = 'functionGroup';

  public static FUNCTION_INPUT_FORMAT = 'functionInputFormat';

  public static FUNCTION_OUTPUT_FORMAT = 'functionOutputFormat';

  public static GET_VARIABLE = 'getVariable';

  public static SET_VARIABLE = 'setVariable';

  public static SET_VARIABLE_FIELD = 'setVariableField';

  public static SET_VARIABLE_RECORD = 'setVariableRecord';

  public static VARIABLE_AVAILABLE = 'variableAvailable';

  public static VARIABLE_FORMAT = 'variableFormat';

  public static VARIABLE_GROUP = 'variableGroup';

  public static VARIABLE_READABLE = 'variableReadable';

  public static VARIABLE_WRITABLE = 'variableWritable';

  public static CATCH = 'catch';

  public static EVALUATE = 'evaluate';

  public static LD = 'ld';

  public static LOGIN = 'login';

  public static SLEEP = 'sleep';

  public static ST = 'st';

  public static TABLE_FROM_CSV = 'tableFromCSV';

  public static TABLE_FROM_JSON = 'tableFromJSON';

  public static TABLE_TO_JSON = 'tableToJSON';

  public static TRACE = 'trace';

  public static USER = 'user';

  public static XPATH = 'xpath';

  public static ABSOLUTE = 'absolute';

  public static EXPRESSION_EDITOR_OPTIONS = 'expressionEditorOptions';

  public static HAS_RESOLVER = 'hasResolver';

  public static GROUP_CONTEXT_RELATED: string = Cres.get().getString('fContextOperations');
  public static GROUP_DATA_TABLE_PROCESSING: string = Cres.get().getString('fDataTableProcessing');
  public static GROUP_NUMBER_PROCESSING: string = Cres.get().getString('fNumberProcessing');
  public static GROUP_TYPE_CONVERSION: string = Cres.get().getString('fTypeConversion');
  public static GROUP_DATE_TIME_PROCESSING: string = Cres.get().getString('fDateTimeProcessing');
  public static GROUP_COLOR_PROCESSING: string = Cres.get().getString('fColorProcessing');
  public static GROUP_SYSTEM: string = Cres.get().getString('fSystem');
  public static GROUP_STRING_PROCESSING: string = Cres.get().getString('fStringProcessing');
  public static GROUP_OTHER: string = Cres.get().getString('fOther');

  public static HAS_VARIABLE = 'hasVariable';

  public static HAS_FUNCTION = 'hasFunction';

  public static HAS_EVENT = 'hasEvent';

  public static JSON = 'json';
}
