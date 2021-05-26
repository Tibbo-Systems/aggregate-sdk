import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import DataTableFactory from '../../../datatable/DataTableFactory';
import DataTableReplication from '../../../datatable/DataTableReplication';
export default class IntersectFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable sourceTable, String fieldInSourceTable,' + ' DataTable sampleTable, String fieldInSampleTable [, Boolean filterType]', 'DataTable', Cres.get().getString('fDescIntersect'));
  }

  execute(evaluator: Evaluator | null = null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(4, false, parameters);

    const sourceTable = this.convertToDataTable(0, parameters[0]);
    const fieldInSourceTable = this.convertToString(1, parameters[1]);
    const sampleTable = this.convertToDataTable(2, parameters[2]);
    const fieldInSampleTable = this.convertToString(3, parameters[3]);

    let filterType = false;
    if (parameters.length > 4) {
      filterType = this.convertToBoolean(4, parameters[4]);
    }
    const copyTable = DataTableFactory.of(sourceTable.getFormat());
    DataTableReplication.copy(sourceTable, copyTable);
    for (const rec of copyTable) {
      if ((!filterType && sampleTable.findIndex(fieldInSampleTable, rec.getValue(fieldInSourceTable)) == null) || (filterType && sampleTable.findIndex(fieldInSampleTable, rec.getValue(fieldInSourceTable)) != null)) {
        const idx = sourceTable.findIndexUsingRecord(rec);
        if (Util.isNumber(idx)) {
          sourceTable.getRecords().splice(idx, 1);
        }
      }
    }

    return sourceTable;
  }
}
