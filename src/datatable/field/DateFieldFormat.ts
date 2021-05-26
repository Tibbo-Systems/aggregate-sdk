import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import Util from '../../util/Util';
import FieldConstants from './FieldConstants';

export default class DateFieldFormat extends FieldFormat<Date> {
  constructor(name: string) {
    super(name);
  }

  public getType(): string {
    return FieldConstants.DATE_FIELD;
  }

  public getNotNullDefault(): Date {
    return new Date(2000, 1, 1, 12, 0, 0, 0);
  }

  valueFromString(value: string, settings: ClassicEncodingSettings, validate: boolean): Date | null {
    try {
      return DateFieldFormat.dateFromString(value);
    } catch {
      try {
        return Util.convertToDate(value, true, true);
      } catch (ex) {
        throw new Error(`Error parsing date from string '${value}': ${ex.message}`);
      }
    }
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

  public static dateFromString(value: string): Date {
    return new Date(
      Number(value.substring(0, 4)),
      Number(value.substring(5, 7)) - 1,
      Number(value.substring(8, 10)),
      Number(value.substring(11, 13)),
      Number(value.substring(14, 16)),
      Number(value.substring(17, 19)),
      Number(value.substring(20, 23))
    );
  }

  public static dateToString(value: Date): string {
    const gc = new Date(value);

    const year = gc.getFullYear();
    let sb = '';
    if (year < 1000) {
      sb += '0';
    }
    if (year < 100) {
      sb += '0';
    }
    if (year < 10) {
      sb += '0';
    }

    sb += year;

    sb += '-';

    const month = gc.getMonth() + 1;

    if (month < 10) {
      sb += '0';
    }
    sb += month;

    sb += '-';

    const day = gc.getDate();

    if (day < 10) {
      sb += '0';
    }
    sb += day;

    sb += ' ';

    const hour = gc.getHours();

    if (hour < 10) {
      sb += '0';
    }
    sb += hour;

    sb += ':';

    const minute = gc.getMinutes();

    if (minute < 10) {
      sb += '0';
    }
    sb += minute;

    sb += ':';

    const second = gc.getSeconds();

    if (second < 10) {
      sb += '0';
    }
    sb += second;

    sb += '.';

    const millisecond = gc.getMilliseconds();

    if (millisecond < 100) {
      sb += '0';
    }
    if (millisecond < 10) {
      sb += '0';
    }
    sb += millisecond;

    return sb;
  }

  public getSuitableEditors(): Array<string> {
    return [FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_DATE, FieldConstants.EDITOR_TIME];
  }

  public isAssignableFrom(value: Date): boolean {
    return value instanceof Date;
  }
}
