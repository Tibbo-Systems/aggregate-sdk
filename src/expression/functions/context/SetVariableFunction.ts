import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTable from '../../../datatable/DataTable';
import DataTableConstruction from '../../../datatable/DataTableConstruction';
import DefaultRequestController from '../../../context/DefaultRequestController';

export default class SetVariableFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String variable, Object parameter1, Object parameter2, ...', 'Null', Cres.get().getString('fDescSetVariable'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(2, false, parameters);

    const cm = evaluator.getDefaultResolver().getContextManager();

    const con = cm != null ? cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    if (con == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    try {
      const name = parameters[1].toString();

      const vd = con.getVariableDefinition(parameters[1].toString());

      if (vd == null) {
        throw new Error(Cres.get().getString('conVarNotAvailExt') + name + con.getPath());
      }

      const paramsInput: Array<any> = parameters.splice(2, parameters.length);

      const valueTable = paramsInput.length == 1 && paramsInput[0] instanceof DataTable ? paramsInput[0] : DataTableConstruction.constructTable(paramsInput, vd.getFormat(), evaluator, environment);

      return con.setVariable(parameters[1].toString(), valueTable, evaluator.getDefaultResolver().getCallerController(), new DefaultRequestController(evaluator));
    } catch (ex) {
      throw new Error(ex);
    }
  }

  isAsync(): boolean {
    return super.isAsync();
  }
}
