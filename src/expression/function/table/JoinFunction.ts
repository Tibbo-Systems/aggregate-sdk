import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTableReplication from '../../../datatable/DataTableReplication';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import TableFormat from '../../../datatable/TableFormat';

export default class JoinFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable left, DataTable right', 'DataTable', Cres.get().getString('fDescJoin'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const leftTable = this.convertToDataTable(0, parameters[0]);
    const rightTable = this.convertToDataTable(1, parameters[1]);

    const newFormat = this.joinTableFormats(leftTable.getFormat(), rightTable.getFormat());
    const resultDataTable = new SimpleDataTable(newFormat);
    DataTableReplication.copy(rightTable, resultDataTable, true, true);
    DataTableReplication.copy(leftTable, resultDataTable, true, true);

    return resultDataTable;
  }

  private joinTableFormats(newFormat: TableFormat, tableFormat: TableFormat): TableFormat {
    const result = newFormat.clone();

    const min1 = newFormat.getMinRecords();
    const max1 = newFormat.getMaxRecords();
    const min2 = tableFormat.getMinRecords();
    const max2 = tableFormat.getMaxRecords();
    const min = Math.max(min1, min2);
    const max = Math.max(max1, max2);

    result.setMinRecords(min);
    result.setMaxRecords(max);

    for (const field of tableFormat.getFields()) {
      if (!newFormat.hasField(field.getName())) result.addField(field.clone());
    }
    return result;
  }
}
