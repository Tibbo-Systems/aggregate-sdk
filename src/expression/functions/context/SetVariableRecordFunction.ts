import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class SetVariableRecordFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String variable, Integer record, Object parameter1, Object parameter2, ...', 'Null', Cres.get().getString('fDescSetVariableRecord'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(4, true, parameters);

    const cm = evaluator.getDefaultResolver().getContextManager();

    const con = cm != null ? cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    if (con == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    try {
      const vd = con.getVariableDefinition(parameters[1].toString());

      if (vd == null) {
        throw new Error(Cres.get().getString('conVarNotAvailExt') + parameters[1].toString() + con.getPath());
      }

      const input = parameters.splice(3, parameters.length);

      const row = Util.convertToNumber(parameters[2], true, false);

      for (let i = 0; i < vd.getFormat().getFieldCount() && i < input.length; i++) {
        await con.setVariableField(parameters[1].toString(), vd.getFormat().getFieldName(i), row, input[i], evaluator.getDefaultResolver().getCallerController());
      }

      return null;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  isAsync(): boolean {
    return super.isAsync();
  }
}
