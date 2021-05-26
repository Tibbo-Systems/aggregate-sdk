import DateFunction from './DateFunction';
import TimeHelper from '../../../util/TimeHelper';

export default class DateFieldFunction extends DateFunction {
  private field: number;
  constructor(field: number, description: string | null = null) {
    super('Integer', description);
    this.field = field;
  }
  executeDate(calendar: Date, parameters: Array<any>): any {
    switch (this.field) {
      case TimeHelper.CALENDAR_YEAR:
        return calendar.getFullYear();
      case TimeHelper.CALENDAR_MONTH:
        return calendar.getMonth();
      case TimeHelper.CALENDAR_DATE:
        return calendar.getDate();
      case TimeHelper.CALENDAR_HOUR:
        return calendar.getHours();
      case TimeHelper.CALENDAR_MINUTE:
        return calendar.getMinutes();
      case TimeHelper.CALENDAR_SECOND:
        return calendar.getSeconds();
      case TimeHelper.CALENDAR_MILLISECOND:
        return calendar.getMilliseconds();
      default:
        return calendar;
    }
  }
}
