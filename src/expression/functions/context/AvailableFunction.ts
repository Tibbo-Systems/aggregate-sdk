import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class AvailableFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context [, String schema]', 'Boolean', Cres.get().getString('fDescAvailable'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    const resolver = parameters.length > 1 ? evaluator.getResolver(parameters[1].toString()) : evaluator.getDefaultResolver();

    if (resolver != null) {
      const cm = resolver.getContextManager();
      const con = cm != null ? cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;
      return con != null;
    } else {
      return null;
    }
  }
}
