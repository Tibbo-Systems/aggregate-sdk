import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class IsLetterFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String character', 'Boolean', Cres.get().getString('fDescIsLetter'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): boolean {
    this.checkParameters(1, false, parameters);
    const char = parameters[0][0];

    return char ? !!char.match('[a-zA-Z]') : false;
  }
}
