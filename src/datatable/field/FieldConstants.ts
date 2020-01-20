export default class FieldConstants {
  public static readonly EDITOR_LIST: string = 'list';
  public static readonly EDITOR_DATE: string = 'date';
  public static readonly EDITOR_TIME: string = 'time';
  public static readonly EDITOR_BAR: string = 'bar';
  public static readonly EDITOR_BYTES: string = 'bytes';
  public static readonly EDITOR_INSTANCE: string = 'instance';
  public static readonly EDITOR_PERIOD: string = 'period';
  public static readonly EDITOR_FOREIGN_INSTANCE: string = 'foreignInstance';
  public static readonly EDITOR_EXPRESSION: string = 'expression';
  public static readonly EDITOR_FUNCTION_SELECTOR: string = 'functionselector';
  public static readonly EDITOR_PASSWORD: string = 'password';
  public static readonly EDITOR_TEXT: string = 'text';
  public static readonly D_EDITOR_TEXT: string = 'dtext';
  public static readonly EDITOR_HTML: string = 'html';
  public static readonly EDITOR_TEXT_AREA: string = 'textarea';
  public static readonly EDITOR_EMBEDDED_TEXT_AREA: string = 'etextarea';
  public static readonly EDITOR_CONTEXT: string = 'context';
  public static readonly EDITOR_CONTEXT_MASK: string = 'contextmask';
  public static readonly EDITOR_FONT: string = 'font';
  public static readonly EDITOR_IP: string = 'ip';
  public static readonly EDITOR_IMAGE: string = 'image';
  public static readonly EDITOR_SOUND: string = 'sound';
  public static readonly EDITOR_HEX: string = 'hex';
  public static readonly EDITOR_REFERENCE: string = 'reference';
  public static readonly EDITOR_ACTIVATOR: string = 'activator';
  public static readonly EDITOR_CODE: string = 'code';
  public static readonly EDITOR_SPINNER: string = 'spinner';
  public static readonly EDITOR_EVENT_LEVEL: string = 'eventLevel';
  public static readonly EDITOR_TARGET: string = 'target';
  public static readonly EDITOR_TARGET_MODE_ACTIONS_ONLY: string = 'targetActionsOnly';
  public static readonly EDITOR_TARGET_MODE_FUNCTIONS_ONLY: string = 'targetFunctionsOnly';

  public static readonly VALIDATOR_ID: string = 'I';
  public static readonly VALIDATOR_LIMITS: string = 'L';
  public static readonly VALIDATOR_NON_NULL: string = 'N';
  public static readonly VALIDATOR_REGEX: string = 'R';
  public static readonly VALIDATOR_EXPRESSION: string = 'E';

  public static readonly STRING_FIELD: string = 'S';
  public static readonly DATATABLE_FIELD: string = 'T';
  public static readonly INTEGER_FIELD: string = 'I';
  public static readonly BOOLEAN_FIELD: string = 'B';
  public static readonly LONG_FIELD: string = 'L';
  public static readonly FLOAT_FIELD: string = 'F';
  public static readonly DOUBLE_FIELD: string = 'E';
  public static readonly DATE_FIELD: string = 'D';
  public static readonly COLOR_FIELD: string = 'C';
  public static readonly DATA_FIELD: string = 'A';

  //    StringFieldFormat constants
  public static readonly FIELD_DEFAULT_TABLE: string = 'table';
  public static readonly FIELD_DEFAULT_CONTEXT: string = 'context';
  public static readonly FIELD_REFERENCES: string = 'references';
  public static readonly FIELD_EXPECTED_RESULT: string = 'expectedResult';
  public static readonly FIELD_DEFAULT_TABLE_DESCRIPTION: string = 'tableDescription';
  public static readonly FIELD_DEFAULT_CONTEXT_DESCRIPTION: string = 'contextDescription';
  public static readonly FIELD_ADDITIONAL_REFERENCES_REFERENCE: string = 'reference';
  public static readonly FIELD_ADDITIONAL_REFERENCES_DESCRIPTION: string = 'description';
  static CONTEXT_EDITOR_TYPES_SEPARATOR = ' ';

  public static readonly TEXT_EDITOR_MODE_AGGREGATE: string = 'aggregate';
  public static readonly TEXT_EDITOR_MODE_JAVA: string = 'java';
  public static readonly TEXT_EDITOR_MODE_XML: string = 'xml';
  public static readonly TEXT_EDITOR_MODE_SQL: string = 'sql';
  public static readonly TEXT_EDITOR_MODE_HTML: string = 'html';
  public static readonly TEXT_EDITOR_MODE_SHELLSCRIPT: string = 'shellscript';
  public static readonly TEXT_EDITOR_MODE_SMI_MIB: string = 'smi-mib';
}
