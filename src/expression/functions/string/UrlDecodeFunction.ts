import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class UrlDecodeFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, String encoding', 'String', Cres.get().getString('fDescUrlDecode'));
  }

  execute(evaluator: Evaluator | null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const source = parameters[0].toString();
    const encoding = parameters[1].toString();

    try {
      return decodeURIComponent(source);
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}
