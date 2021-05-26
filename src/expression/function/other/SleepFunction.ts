import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class SleepFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'Integer milliseconds', 'Null', Cres.get().getString('fDescSleep'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(1, false, parameters);

    const ms = Util.convertToNumber(parameters[0], true, false) as number;

    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  isAsync(): boolean {
    return true;
  }
}
