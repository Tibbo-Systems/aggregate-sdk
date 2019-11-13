export default class DateUtils {
  public static readonly DEFAULT_DATE_PATTERN: string = 'dd.MM.yyyy';
  public static readonly DEFAULT_TIME_PATTERN: string = 'HH:mm:ss';

  public static readonly DATATABLE_DATE_PATTERN: string = 'yyyy-MM-dd HH:mm:ss.SSS';

  public static getDateTimePattern(datePattern: string | null, timePattern: string | null): string {
    return (
      (datePattern != null ? datePattern : DateUtils.DEFAULT_DATE_PATTERN) +
      ' ' +
      (timePattern != null ? timePattern : DateUtils.DEFAULT_TIME_PATTERN)
    );
  }
}
