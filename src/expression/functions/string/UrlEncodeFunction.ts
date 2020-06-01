import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Cres from '../../../Cres';

export default class UrlEncodeFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, String encoding', 'String', Cres.get().getString('fDescUrlEncode'));
  }

  execute(evaluator: Evaluator | null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const source = parameters[0].toString();
    const encoding = parameters[1].toString();

    try {
      return encodeURIComponent(source);
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}
