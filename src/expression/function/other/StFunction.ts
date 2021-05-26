import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class StFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'String variable, Object value', 'Object', Cres.get().getString('fDescSt'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, true, parameters);

    const variable = parameters[0].toString();

    const value = parameters[1];

    if (environment != null && environment.getEnvironment() != null) {
      environment.getEnvironment().set(variable, value);
    }

    return value;
  }
}
