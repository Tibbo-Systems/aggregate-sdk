export default class DateUtils {
    static readonly DEFAULT_DATE_PATTERN: string;
    static readonly DEFAULT_TIME_PATTERN: string;
    static readonly DATATABLE_DATE_PATTERN: string;
    static getDateTimePattern(datePattern: string | null, timePattern: string | null): string;
}
