import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import TimeHelper from '../../../util/TimeHelper';
import Util from '../../../util/Util';

export default class DateDiffFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Date first, Date second, String unit', 'Long', Cres.get().getString('fDescDateDiff'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters);
    const unit = TimeHelper.getTimeUnitByName(parameters[2].toString())?.getLength();
    const first = Util.convertToDate(parameters[0], true, false);
    const second = Util.convertToDate(parameters[1], true, false);
    if (first && second && unit) {
      return Math.abs((first.getTime() - second.getTime()) / unit);
    }
  }
}
