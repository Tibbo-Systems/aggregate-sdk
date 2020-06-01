import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class GtFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_NUMBER_PROCESSING, 'Long number1, Long number2', 'Boolean', Cres.get().getString('fDescGt'));
  }

  execute(evaluator: Evaluator | null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    return Util.compareTo(parameters[0], parameters[1]) > 0;
  }
}
