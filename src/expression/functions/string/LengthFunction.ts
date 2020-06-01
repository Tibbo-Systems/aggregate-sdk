import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class LengthFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string', 'Integer', Cres.get().getString('fDescLength'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    const string = parameters[0];

    return string.length;
  }
}
