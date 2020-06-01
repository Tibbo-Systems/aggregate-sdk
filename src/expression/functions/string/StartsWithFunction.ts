import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class StartsWithFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, String prefix', 'Boolean', Cres.get().getString('fDescStartsWith'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    const string = parameters[0];
    const prefix = parameters[1];

    return string.startsWith(prefix);
  }
}
