import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class DcFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, '[String schema]', 'String', Cres.get().getString('fDescDc'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    const resolver = parameters.length > 0 ? evaluator.getResolver(parameters[0].toString()) : evaluator.getDefaultResolver();

    if (resolver != null) {
      const dc = resolver.getDefaultContext();
      return dc != null ? dc.getPath() : null;
    } else {
      return null;
    }
  }
}
