import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class IsWhitespaceFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String character', 'Boolean', Cres.get().getString('fDescIsWhitespace'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    const char = parameters[0];

    return char.match('/\\s/');
  }
}
