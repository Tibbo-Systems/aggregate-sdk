import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTableConstruction from '../../../datatable/DataTableConstruction';

export default class AddRecordsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, Object field1, Object field2, ...', 'DataTable', Cres.get().getString('fDescAddRecords'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    try {
      this.checkParameters(1, true, parameters);

      const table = this.convertToDataTable(0, parameters[0]);

      const data = parameters.slice(1, parameters.length);

      const additionalRecordsTable = DataTableConstruction.constructTable(data, table.getFormat(), evaluator, environment);

      if (additionalRecordsTable != null) {
        for (const rec of additionalRecordsTable) {
          table.addRecordFromRecord(rec);
        }
      }
      return table;
    } catch (ex) {
      throw new ex();
    }
  }
}
