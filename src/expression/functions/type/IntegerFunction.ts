import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class IntegerFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_TYPE_CONVERSION, 'Object value [, Integer radix]', 'Integer');
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, true, parameters);

    if (parameters.length >= 2) {
      const radix = Util.convertToNumber(parameters[1], true, false);
      const source = parameters[0].toString();
      return Number.parseInt(source, radix as number);
    } else {
      const n = Util.convertToNumber(parameters[0], true, false);
      return Math.trunc(n as number);
    }
  }
}
