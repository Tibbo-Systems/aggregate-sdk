import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class TimeFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Date date', 'Long', Cres.get().getString('fDescTime'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    return Util.convertToDate(parameters[0], true, false)?.getTime();
  }
}
