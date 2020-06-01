import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Context from '../../../context/Context';

export default abstract class EntityGroupFunction extends AbstractFunction {
  protected constructor(group: string, parametersFootprint: string, description: string) {
    super(group, parametersFootprint, 'String', description);
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const resolver = parameters.length > 2 ? evaluator.getResolver(parameters[2].toString()) : evaluator.getDefaultResolver();

    if (resolver == null) {
      return null;
    }

    const cm = resolver.getContextManager();

    const con = cm != null ? cm.get(parameters[0].toString(), resolver.getCallerController()) : null;

    return con != null ? this.getGroup(evaluator, con, parameters) : null;
  }

  protected abstract getGroup(evaluator: Evaluator, con: Context<any, any>, ...parameters: Array<any>): string;
}
