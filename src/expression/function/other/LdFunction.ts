import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class LdFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'String variable', 'Object', Cres.get().getString('fDescLd'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    const variable = parameters[0].toString();

    if (environment != null && environment.getEnvironment() != null && environment.getEnvironment().has(variable)) {
      return environment.getEnvironment().get(variable);
    }

    throw new Error(Cres.get().getString('exprEnvVarNotFound') + variable);
  }
}
