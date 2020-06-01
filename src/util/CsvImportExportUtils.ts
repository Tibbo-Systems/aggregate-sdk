class CsvImportExportUtils {
  private static NULL = 'NULL';

  public static CSV_IMPORT_FIELD_DELIMITER = 'delimiter';
  public static CSV_IMPORT_FIELD_USE_QUALIFIER = 'useQualifier';
  public static CSV_IMPORT_FIELD_QUALIFIER = 'qualifier';
  public static CSV_IMPORT_FIELD_COMMENT = 'comment';
  public static CSV_IMPORT_FIELD_ESCAPE_MODE = 'escapeMode';
  public static CSV_IMPORT_FIELD_HEADER = 'header';

  public static CSV_EXPORT_FIELD_DELIMITER = 'delimiter';
  public static CSV_EXPORT_FIELD_USE_QUALIFIER = 'useQualifier';
  public static CSV_EXPORT_FIELD_QUALIFIER = 'qualifier';
  public static CSV_EXPORT_FIELD_ESCAPE_MODE = 'escapeMode';
  public static CSV_EXPORT_FIELD_HEADER = 'header';
  public static CSV_EXPORT_FIELD_USE_DESCRIPTIONS = 'useDescriptions';

  public static QUALIFIER_NONE = 0;
  public static QUALIFIER_NORMAL = 1;
  public static QUALIFIER_FORCE = 2;

  public static HEADER_NONE = 0;
  public static HEADER_NAMES = 1;
  public static HEADER_DESCRIPTIONS = 2;
  public static HEADER_SKIP = 3;
}
