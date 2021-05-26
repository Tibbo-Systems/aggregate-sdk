import AbstractFunction from './AbstractFunction';
import Functions from './Functions';
import Evaluator from '../Evaluator';
import EvaluationEnvironment from '../EvaluationEnvironment';

export default class FloatConstantFunction extends AbstractFunction {
  private constant: number;
  constructor(constant: number, description: string) {
    super(Functions.GROUP_NUMBER_PROCESSING, '', 'Float', description);
    this.constant = constant;
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): number {
    return this.constant;
  }
}
