import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class IsDigitFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String character', 'Boolean', Cres.get().getString('fDescIsDigit'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, ...parameters: Array<any>): boolean {
    this.checkParameters(1, false, parameters);
    const character = parameters[0];

    return character.match('^[0-9]');
  }
}
