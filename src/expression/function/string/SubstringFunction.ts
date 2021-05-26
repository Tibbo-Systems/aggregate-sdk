import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Functions from '../Functions';

export default class SubstringFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, Integer beginIndex [, Integer endIndex]', 'String');
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): string {
    this.checkParameters(2, false, parameters);

    const s = this.convertToString(0, parameters[0]);
    const begin = this.convertToInteger(1, parameters[1]);

    if (parameters.length > 2) {
      const end = this.convertToInteger(2, parameters[2]);
      return s.substring(begin, end);
    }

    return s.substring(begin);
  }
}
