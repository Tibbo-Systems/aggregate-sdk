import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class EndsWithFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, String suffix', 'Boolean', Cres.get().getString('fDescEndsWith'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): boolean {
    this.checkParameters(2, false, parameters);
    const string = parameters[0];
    const suffix = parameters[1];

    return string.endsWith(suffix);
  }
}
