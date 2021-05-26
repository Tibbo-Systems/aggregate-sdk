import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class LastIndexOfFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, String substring [, Integer fromIndex]', 'Integer', Cres.get().getString('fDescLastIndex'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): number {
    this.checkParameters(2, false, parameters);
    const string = parameters[0];
    const substring = parameters[1];
    const fromIndex = parameters[2];

    return string.lastIndexOf(substring, fromIndex);
  }
}
