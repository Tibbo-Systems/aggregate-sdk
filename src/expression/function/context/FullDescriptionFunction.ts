import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import StringBuilder from '../../../util/java/StringBuilder';

export default class FullDescriptionFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String delimiter', 'String', Cres.get().getString('fDescFullDescription'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(1, false, parameters);

    const cm = evaluator.getDefaultResolver().getContextManager();

    let context = cm != null ? await cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    let delimiter = '-';
    if (parameters.length > 1) {
      delimiter = parameters[1].toString();
    }

    if (context == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    await context.init();

    try {
      const path = [];

      do {
        path.push(context);
        context = context.getParent();
      } while (context.getParent() != null);

      const sb = new StringBuilder();
      while (path.length != 0) {
        if (sb.length() != 0) {
          sb.append(delimiter);
        }
        context = path.pop();
        sb.append(context.getDescription());
      }

      return sb.toString();
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  isAsync(): boolean {
    return true;
  }
}
