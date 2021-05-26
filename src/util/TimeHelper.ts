import JObject from './java/JObject';
import TimeUnit from './TimeUnit';
import Cres from '../Cres';
export default class TimeHelper extends JObject {
  public static readonly SECOND_IN_MS: number = 1000;
  public static readonly MINUTE_IN_MS: number = TimeHelper.SECOND_IN_MS * 60;
  public static readonly HOUR_IN_MS: number = TimeHelper.MINUTE_IN_MS * 60;
  public static readonly DAY_IN_MS: number = TimeHelper.HOUR_IN_MS * 24;
  public static readonly WEEK_IN_MS: number = TimeHelper.DAY_IN_MS * 7;
  public static readonly MONTH_IN_MS: number = TimeHelper.DAY_IN_MS * 30;
  public static readonly QUARTER_IN_MS: number = TimeHelper.DAY_IN_MS * 91;
  public static readonly YEAR_IN_MS: number = TimeHelper.DAY_IN_MS * 365;

  public static readonly MINUTE_IN_SECONDS: number = 60;
  public static readonly HOUR_IN_SECONDS: number = TimeHelper.MINUTE_IN_SECONDS * 60;
  public static readonly DAY_IN_SECONDS: number = TimeHelper.HOUR_IN_SECONDS * 24;
  public static readonly WEEK_IN_SECONDS: number = TimeHelper.DAY_IN_SECONDS * 7;
  public static readonly MONTH_IN_SECONDS: number = TimeHelper.DAY_IN_SECONDS * 30;
  public static readonly QUARTER_IN_SECONDS: number = TimeHelper.DAY_IN_SECONDS * 91;
  public static readonly YEAR_IN_SECONDS: number = TimeHelper.DAY_IN_SECONDS * 365;

  public static readonly MILLISECOND: number = 0;
  public static readonly SECOND: number = 1;
  public static readonly MINUTE: number = 2;
  public static readonly HOUR: number = 3;
  public static readonly DAY: number = 4;
  public static readonly WEEK: number = 5;
  public static readonly MONTH: number = 6;
  public static readonly QUARTER: number = 7;
  public static readonly YEAR: number = 8;

  public static readonly NAME_MILLISECOND: string = 'millisecond';
  public static readonly NAME_MS: string = 'ms';
  public static readonly NAME_SECOND: string = 'second';
  public static readonly NAME_SEC: string = 'sec';
  public static readonly NAME_S: string = 's';
  public static readonly NAME_MINUTE: string = 'minute';
  public static readonly NAME_MIN: string = 'min';
  public static readonly NAME_M: string = 'm';
  public static readonly NAME_HOUR: string = 'hour';
  public static readonly NAME_HR: string = 'hr';
  public static readonly NAME_H: string = 'h';
  public static readonly NAME_DAY: string = 'day';
  public static readonly NAME_D: string = 'd';
  public static readonly NAME_WEEK: string = 'week';
  public static readonly NAME_W: string = 'w';
  public static readonly NAME_MONTH: string = 'month';
  public static readonly NAME_YEAR: string = 'year';
  public static readonly NAME_Y: string = 'y';

  public static readonly CALENDAR_YEAR: number = 1;
  public static readonly CALENDAR_QUARTER: number = 37;
  public static readonly CALENDAR_MONTH: number = 2;
  public static readonly CALENDAR_WEEK_OF_YEAR: number = 3;
  public static readonly CALENDAR_DATE: number = 5;
  public static readonly CALENDAR_DAY_OF_YEAR: number = 6;
  public static readonly CALENDAR_DAY_OF_WEEK: number = 7;
  public static readonly CALENDAR_HOUR: number = 11;
  public static readonly CALENDAR_MINUTE: number = 12;
  public static readonly CALENDAR_SECOND: number = 13;
  public static readonly CALENDAR_MILLISECOND: number = 14;

  public static MILLISECOND_UNIT = new TimeUnit(TimeHelper.MILLISECOND, 1, Cres.get().getString('tuMilliseconds'), TimeHelper.CALENDAR_MILLISECOND, false);
  public static SECOND_UNIT = new TimeUnit(TimeHelper.SECOND, TimeHelper.SECOND_IN_MS, Cres.get().getString('tuSeconds'), TimeHelper.CALENDAR_SECOND, false);
  public static MINUTE_UNIT = new TimeUnit(TimeHelper.MINUTE, TimeHelper.MINUTE_IN_MS, Cres.get().getString('tuMinutes'), TimeHelper.CALENDAR_MINUTE, false);
  public static HOUR_UNIT = new TimeUnit(TimeHelper.HOUR, TimeHelper.HOUR_IN_MS, Cres.get().getString('tuHours'), TimeHelper.CALENDAR_HOUR, false);
  public static DAY_UNIT = new TimeUnit(TimeHelper.DAY, TimeHelper.DAY_IN_MS, Cres.get().getString('tuDays'), TimeHelper.CALENDAR_DATE, false);
  public static WEEK_UNIT = new TimeUnit(TimeHelper.WEEK, TimeHelper.WEEK_IN_MS, Cres.get().getString('tuWeeks'), TimeHelper.CALENDAR_WEEK_OF_YEAR, true);
  public static MONTH_UNIT = new TimeUnit(TimeHelper.MONTH, TimeHelper.MONTH_IN_MS, Cres.get().getString('tuMonths'), TimeHelper.CALENDAR_MONTH, false);
  public static QUARTER_UNIT = new TimeUnit(TimeHelper.QUARTER, TimeHelper.QUARTER_IN_MS, Cres.get().getString('tuQuarters'), TimeHelper.CALENDAR_QUARTER, true);
  public static YEAR_UNIT = new TimeUnit(TimeHelper.YEAR, TimeHelper.YEAR_IN_MS, Cres.get().getString('tuYears'), TimeHelper.CALENDAR_YEAR, false);

  private static NAMED_UNITS = new Map<string, TimeUnit>();
  private static UNITS = new Array<TimeUnit>();
  private static REVERSED_UNITS: Array<TimeUnit>;

  public static getTimeUnitByName(name: string): TimeUnit {
    const unit = TimeHelper.NAMED_UNITS.get(name);
    if (unit) return unit;
    throw new Error(Cres.get().getString('clpUnknownOption') + name);
  }
  public static getUnits(): Array<TimeUnit> {
    return TimeHelper.UNITS;
  }

  public static getReversedUnits(): Array<TimeUnit> {
    return TimeHelper.REVERSED_UNITS;
  }

  public static initialize() {
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_MILLISECOND, TimeHelper.MILLISECOND_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_MS, TimeHelper.MILLISECOND_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_SECOND, TimeHelper.SECOND_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_SEC, TimeHelper.SECOND_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_S, TimeHelper.SECOND_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_MINUTE, TimeHelper.MINUTE_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_MIN, TimeHelper.MINUTE_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_M, TimeHelper.MINUTE_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_HOUR, TimeHelper.HOUR_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_HR, TimeHelper.HOUR_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_H, TimeHelper.HOUR_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_DAY, TimeHelper.DAY_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_D, TimeHelper.DAY_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_WEEK, TimeHelper.WEEK_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_MONTH, TimeHelper.MONTH_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_YEAR, TimeHelper.YEAR_UNIT);
    TimeHelper.NAMED_UNITS.set(TimeHelper.NAME_Y, TimeHelper.YEAR_UNIT);

    TimeHelper.UNITS.push(TimeHelper.MILLISECOND_UNIT);
    TimeHelper.UNITS.push(TimeHelper.SECOND_UNIT);
    TimeHelper.UNITS.push(TimeHelper.MINUTE_UNIT);
    TimeHelper.UNITS.push(TimeHelper.HOUR_UNIT);
    TimeHelper.UNITS.push(TimeHelper.DAY_UNIT);
    TimeHelper.UNITS.push(TimeHelper.WEEK_UNIT);
    TimeHelper.UNITS.push(TimeHelper.MONTH_UNIT);
    TimeHelper.UNITS.push(TimeHelper.QUARTER_UNIT);
    TimeHelper.UNITS.push(TimeHelper.YEAR_UNIT);

    TimeHelper.REVERSED_UNITS = TimeHelper.UNITS.reverse();
  }

  public static setTimeZone(date: Date, timeZone: string): Date {
    if (timeZone) return new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
    return date;
  }
}
TimeHelper.initialize();
