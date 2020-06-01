import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import AbstractEvaluatingVisitor from '../../AbstractEvaluatingVisitor';
import Util from '../../../util/Util';

export default class SelectFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String fieldToSelect, String fieldToCheck, Object value', 'Object', Cres.get().getString('fDescSelect'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters); // First three parameters cannot be null
    this.checkParameters(4, true, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0];

    if (parameters[1] == null || parameters[2] == null) {
      throw new Error('Field parameter may not be NULL');
    }

    const fieldToSelect = parameters[1].toString();

    if (!table.getFormat().hasField(fieldToSelect)) {
      throw new Error(Cres.get().getString('exprTableHasNoField') + fieldToSelect);
    }

    const fieldToCheck = parameters[2].toString();

    if (!table.getFormat().hasField(fieldToCheck)) {
      throw new Error(Cres.get().getString('exprTableHasNoField') + fieldToCheck);
    }

    const value = parameters[3];

    for (const rec of table) {
      if (Util.equals(rec.getValue(fieldToCheck), value)) {
        return rec.getValue(fieldToSelect);
      }
    }

    return null;
  }
}
