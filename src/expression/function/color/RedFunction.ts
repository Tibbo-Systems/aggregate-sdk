import RgbFunction from './RgbFunction';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class RedFunction extends RgbFunction {
  constructor() {
    super(Cres.get().getString('fDescRed'));
  }

  public execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): number {
    return this.color(parameters).red();
  }
}
