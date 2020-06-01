import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DefaultRequestController from '../../../context/DefaultRequestController';
import FunctionDefinition from '../../../context/FunctionDefinition';
import DataTableConstruction from '../../../datatable/DataTableConstruction';
import DataTable from '../../../datatable/DataTable';

export default class CallFunctionFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String function, Object parameter1, Object parameter2, ...', 'DataTable', Cres.get().getString('fDescCallFunction'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const cm = evaluator.getDefaultResolver().getContextManager();

    const con = cm != null ? cm.get(parameters[0].toString(), evaluator.getDefaultResolver().getCallerController()) : null;

    if (con == null) {
      throw new Error(Cres.get().getString('conNotAvail') + parameters[0].toString());
    }

    try {
      const fd = con.getFunctionDefinition(parameters[1].toString());

      const input = parameters.slice(2, parameters.length);

      const inputTable = this.constructInputTable(input, fd, evaluator, environment);

      return con.callFunction(parameters[1].toString(), inputTable, evaluator.getDefaultResolver().getCallerController(), new DefaultRequestController(evaluator));
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  private constructInputTable(input: Array<any>, fd: FunctionDefinition, evaluator: Evaluator, environment: EvaluationEnvironment) {
    if (input.length == 1 && input[0] instanceof DataTable) {
      const tmpTable = input[0];
      if (tmpTable.getFormat().equals(fd.getInputFormat())) {
        return tmpTable;
      }
    }
    return DataTableConstruction.constructTable(input, fd != null ? fd.getInputFormat() : null, evaluator, environment);
  }
}
