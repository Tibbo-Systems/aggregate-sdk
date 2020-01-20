import FieldFormat from '../FieldFormat';
import moment from 'moment';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import Util from '../../util/Util';
import FieldConstants from './FieldConstants';
import Data from '../../data/Data';

export default class DateFieldFormat extends FieldFormat<Date> {
  private static DEFAULT_DATE: Date = moment('2000-02-01T12:00:00').toDate();
  private static DATATABLE_DATE_PATTERN = 'YYYY-MM-DD HH:mm:ss.SSS'; // "yyyy-MM-dd HH:mm:ss.SSS"; Watch for the difference between ISO and JAVA
  private static UTC_TIME_ZONE = '+00:00';

  constructor(name: string) {
    super(name);
  }

  public valueToString(value: Date): string | null {
    try {
      if (value == null) {
        return null;
      }
      return DateFieldFormat.dateToString(value);
    } catch (ex) {
      throw new Error('Error converting date ' + value + ' to string: ' + ex.message);
    }
  }

  public getType(): string {
    return FieldConstants.DATE_FIELD;
  }

  public getNotNullDefault(): Date {
    return DateFieldFormat.DEFAULT_DATE;
  }

  public static dateToString(value: Date): string {
    return moment(value).format(DateFieldFormat.DATATABLE_DATE_PATTERN);
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): Date | null {
    try {
      if (value !== null) {
        return DateFieldFormat.dateFromString(value);
      } else {
        throw new Error();
      }
    } catch {
      try {
        return Util.convertToDate(value, true, true);
      } catch (ex) {
        throw new Error(`Error parsing date from string '${value}': ${ex.message}`);
      }
    }
  }

  public static dateFromString(value: string): Date {
    return moment(value as string, `${DateFieldFormat.DATATABLE_DATE_PATTERN}${DateFieldFormat.UTC_TIME_ZONE}`).toDate();
  }

  public getSuitableEditors(): Array<string> {
    return [FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_DATE, FieldConstants.EDITOR_TIME];
  }

  public isAssignableFrom(value: any): boolean {
    return value instanceof Date;
  }
}
