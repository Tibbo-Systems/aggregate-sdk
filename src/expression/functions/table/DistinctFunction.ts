import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTable from '../../../datatable/DataTable';
import DataTableFactory from '../../../datatable/DataTableFactory';
import DataTableReplication from '../../../datatable/DataTableReplication';
import DataRecord from '../../../datatable/DataRecord';
import Expression from '../../Expression';

export default class DistinctFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table', 'DataTable', Cres.get().getString('fDescDistinct'));
  }

  execute(evaluator: Evaluator | null = null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(0, false, parameters);

    const source = this.convertToDataTable(0, parameters[0]);
    const result: DataTable = DataTableFactory.of(source.getFormat());

    for (const rec of source) {
      if (result.findIndexUsingRecord(rec) == null) {
        DataTableReplication.copyRecord(rec, result.addRecord(), true, true, false, true, null);
      }
    }

    return result;
  }
}
