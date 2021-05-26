import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class LongFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_TYPE_CONVERSION, 'Object value [, Integer radix]', 'Long', Cres.get().getString('fDescLong'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, true, parameters);

    if (parameters.length >= 2) {
      const radix = Util.convertToNumber(parameters[1], true, false);
      const source = parameters[0].toString();
      return radix != null ? parseInt(source, radix) : source;
    } else {
      return Util.convertToNumber(parameters[0], true, false);
    }
  }
}
