import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTable from '../../../datatable/DataTable';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableReplication from '../../../datatable/DataTableReplication';
import TableFormat from '../../../datatable/TableFormat';

export default class UnionFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable first, DataTable second [, DataTable third, ...]', 'DataTable', Cres.get().getString('fDescUnion'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);
    this.convertToDataTable(0, parameters[0]);
    this.convertToDataTable(1, parameters[1]);

    let union = null;

    for (let i = 0; i < parameters.length - 1; i++) {
      union = i == 0 ? parameters[i] : union;
      const table = parameters[i + 1];
      union = this.union(union, table);
    }

    return union;
  }

  private union(leftTable: DataTable, rightTable: DataTable): DataTable {
    const newFormat = this.joinTableFormats(leftTable.getFormat(), rightTable.getFormat());
    const resultDataTable = new SimpleDataTable(newFormat);
    DataTableReplication.copy(leftTable, resultDataTable, true, true);

    for (const rec of rightTable) {
      const newRec = resultDataTable.addRecord();
      DataTableReplication.copyRecord(rec, newRec, true, true);
    }
    return resultDataTable;
  }

  private joinTableFormats(newFormat: TableFormat, tableFormat: TableFormat) {
    const result = newFormat.clone();

    const min1 = newFormat.getMinRecords();
    const max1 = newFormat.getMaxRecords();
    const min2 = tableFormat.getMinRecords();
    const max2 = tableFormat.getMaxRecords();
    let min = min1 + min2;
    let max = max1 + max2;
    if (min > Number.MAX_VALUE) min = Number.MAX_VALUE;
    if (max > Number.MAX_VALUE) max = Number.MAX_VALUE;

    result.setMinRecords(min);
    result.setMaxRecords(max);

    for (const field of tableFormat.getFields()) {
      if (!newFormat.hasField(field.getName())) result.addField(field.clone());
    }

    for (const field of result) {
      field.setKeyField(false);
    }

    return result;
  }
}
