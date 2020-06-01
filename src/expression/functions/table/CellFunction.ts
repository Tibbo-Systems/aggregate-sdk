import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class CellFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable|String source, String expression, Object initialValue', 'Object', Cres.get().getString('fDescAggregate'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);

    let svdesc = false;

    if (parameters.length >= 4) {
      const bool = Util.convertToBoolean(parameters[3], false, false);
      if (bool == null) {
        return null;
      }
      svdesc = bool;
    }

    const table = parameters[0];

    let field;

    if (parameters.length >= 2) {
      if (parameters[1] instanceof Number) {
        const fieldIndex = parameters[1];

        if (table.getFieldCount() < fieldIndex) {
          throw new Error(Cres.get().getString('exprTableHasNoFieldIndex') + fieldIndex);
        }

        field = table.getFormat(fieldIndex).getName();
      } else {
        field = parameters[1].toString();
      }
    } else {
      field = table.getFormat(0).getName();
    }

    if (!table.getFormat().hasField(field)) {
      throw new Error(Cres.get().getString('exprTableHasNoField') + field + ' (' + table.getFormat() + ')');
    }

    const number = Util.convertToNumber(parameters[2], false, false);
    const record = parameters.length > 2 && number != null ? number : 0;

    if (table.getRecordCount() <= record) {
      throw new Error(Cres.get().getString('exprTableHasNoRecordIndex') + record);
    }

    const rec = table.getRecord(record);

    const value = rec.getValue(field);

    if (svdesc) {
      const selvals = rec.getFormat(field).getSelectionValues();
      const desc = selvals.get(value);
      return desc != null ? desc : value;
    }

    return value;
  }
}
