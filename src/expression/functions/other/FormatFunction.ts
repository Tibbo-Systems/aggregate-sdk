import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class FormatFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String pattern, Object parameter1, ...', 'String', Cres.get().getString('fDescFormat'));
  }
  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, true, parameters);

    const pattern = parameters[0].toString();
    const data = parameters.slice(1, parameters.length);

    return pattern.format(data).toString();
  }
}
