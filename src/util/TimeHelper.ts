import JObject from './java/JObject';

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
}
