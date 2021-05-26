import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import TimeUnitsManager from '../../../util/TimeUnitsManager';

export default class PrintPeriodFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Long period', 'String', Cres.get().getString('fDescPrintPeriod'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    const period = Util.convertToNumber(parameters[0], false, false);
    const tum = new TimeUnitsManager();
    if (parameters.length > 1) {
      const min = Util.convertToNumber(parameters[1], true, false);
      if (min !== null) tum.setMinUnit(min);
    }

    if (parameters.length > 2) {
      const max = Util.convertToNumber(parameters[1], true, false);
      if (max !== null) tum.setMaxUnit(max);
    }
    if (period !== null) return tum.createTimeString(period);
  }
}
