import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import Util from '../../../util/Util';

export default class RemoveRecordsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String fieldToCheck, Object value', 'DataTable', Cres.get().getString('fDescRemoveRecords'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);
    this.checkParameters(3, true, parameters);

    if (parameters[0] == null || parameters[1] == null) {
      throw new Error('Field parameter may not be NULL');
    }

    const sourceTable = this.convertToDataTable(0, parameters[0]);

    const fieldToCheck = parameters[1].toString();

    if (!sourceTable.getFormat().hasField(fieldToCheck)) {
      throw new Error(Cres.get().getString('exprTableHasNoField') + fieldToCheck);
    }

    const value = parameters[2];

    const resultTable = new SimpleDataTable(sourceTable.getFormat());

    for (const rec of sourceTable) {
      if (Util.equals(rec.getValue(fieldToCheck), value)) {
        continue;
      }
      resultTable.addRecordWith(rec.clone());
    }

    return resultTable;
  }
}
