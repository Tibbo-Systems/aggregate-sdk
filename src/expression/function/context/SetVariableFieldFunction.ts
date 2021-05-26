import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class SetVariableFieldFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String variable, String field, Integer record, Object value', 'Null', Cres.get().getString('fDescSetVariableField'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(5, true, parameters);

    const cm = evaluator.getDefaultResolver().getContextManager();

    const con = cm != null ? await cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    if (con == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    await con.init();

    try {
      const row = Util.convertToNumber(parameters[3], true, false);

      return con.setVariableField(parameters[1].toString(), parameters[2].toString(), row, parameters[4], evaluator.getDefaultResolver().getCallerController());
    } catch (ex) {
      throw new Error(ex);
    }
  }

  isAsync(): boolean {
    return true;
  }
}
