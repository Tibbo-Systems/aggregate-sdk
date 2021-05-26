import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import TimeHelper from '../../../util/TimeHelper';

export default class DateAddFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Date date, Integer count, String unit [, String timezone]', 'Date', Cres.get().getString('fDescDateAdd'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters);

    const date = Util.convertToDate(parameters[0], true, false);
    if (date !== null) {
      const count = Util.convertToNumber(parameters[1], false, false);
      const unit = TimeHelper.getTimeUnitByName(parameters[2].toString())?.getLength();
      if (count != null && unit != null) {
        const result = new Date(date.getTime());
        result.setMilliseconds(result.getMilliseconds() + count * unit);
        if (parameters.length > 3) {
          return TimeHelper.setTimeZone(result, parameters[3].toString());
        }
        return result;
      }
      return date;
    }
  }
}
