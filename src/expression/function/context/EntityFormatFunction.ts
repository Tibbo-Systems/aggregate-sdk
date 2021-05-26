import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Functions from '../Functions';
import Context from '../../../context/Context';

export default abstract class EntityFormatFunction extends AbstractFunction {
  protected constructor(parametersFootprint: string, description: string) {
    super(Functions.GROUP_CONTEXT_RELATED, parametersFootprint, 'String', description);
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(2, false, parameters);

    const resolver = parameters.length > 2 ? evaluator.getResolver(parameters[2].toString()) : evaluator.getDefaultResolver();

    if (resolver == null) {
      return null;
    }

    const cm = resolver.getContextManager();

    const con = cm != null ? await cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    await con?.init();

    return con != null ? this.getFormat(evaluator, con, parameters) : null;
  }

  isAsync(): boolean {
    return true;
  }

  protected abstract getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: any): string | null;
}
