import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import TimeHelper from '../../../util/TimeHelper';

export default class DateCreateFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Integer year, Integer month, Integer day, Integer hour, Integer minute, Integer second [, String timezone]', 'Date', Cres.get().getString('fDescDate'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(6, false, parameters);
    const year = Util.convertToNumber(parameters[0], true, false);
    const month = Util.convertToNumber(parameters[1], true, false);
    const day = Util.convertToNumber(parameters[2], true, false);
    const hour = Util.convertToNumber(parameters[3], true, false);
    const minute = Util.convertToNumber(parameters[4], true, false);
    const second = Util.convertToNumber(parameters[5], true, false);
    let millisecond = 0;
    if (parameters.length > 6) {
      const value = Util.convertToNumber(parameters[6], true, false);
      if (value !== null) millisecond = value;
    }

    if (year !== null && month !== null && day !== null && hour !== null && minute !== null && second !== null) {
      const date = new Date(year, month, day, hour, minute, second, millisecond);
      if (parameters.length > 7) {
        return TimeHelper.setTimeZone(date, parameters[7]).getTime();
      }
      return date.getTime();
    }
  }
}
