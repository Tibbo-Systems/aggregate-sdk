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

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    try {
      this.checkParameters(1, true, parameters);

      this.convertToDataTable(0, parameters[0]);

      const table = parameters[0].clone();

      const data = parameters.slice(1, parameters.length);

      const additionalRecordsTable = await DataTableConstruction.constructTable(data, table.getFormat(), evaluator, environment);

      if (additionalRecordsTable != null) {
        const additionalRecordsTableClone = additionalRecordsTable.clone();
        for (const rec of additionalRecordsTableClone) {
          table.addRecordFromRecord(rec);
        }
      }
      return table;
    } catch (ex) {
      throw new ex();
    }
  }

  isAsync(): boolean {
    return true;
  }
}
