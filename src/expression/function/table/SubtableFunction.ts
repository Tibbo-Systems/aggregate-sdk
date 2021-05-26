import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import TableFormat from '../../../datatable/TableFormat';
import DataTable from '../../../datatable/DataTable';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableReplication from '../../../datatable/DataTableReplication';
import CloneUtils from '../../../util/CloneUtils';
import Binding from '../../../binding/Binding';

export default class SubtableFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field1, String field2, ...', 'DataTable', Cres.get().getString('fDescSubtable'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const table = this.convertToDataTable(0, parameters[0]);

    const fields = [];
    for (let i = 1; i < parameters.length; i++) {
      fields.push(parameters[i].toString());
    }
    return this.makeSubtable(table, fields);
  }

  private makeSubtable(table: DataTable, fields: Array<string>) {
    const rf = new TableFormat(table.getFormat().getMinRecords(), table.getFormat().getMaxRecords());
    rf.setBindings(this.filterBindings(table.getFormat(), fields));
    for (const field of fields) {
      const ff = table.getFieldFormat(field).clone();
      if (ff != null) {
        rf.addField(ff);
      }
    }
    const result = new SimpleDataTable(rf);
    DataTableReplication.copyWithoutKeyFields(table, result, true, true, true, true, true, null);
    return result;
  }
  private filterBindings(tableFormat: TableFormat, fields: Array<string>) {
    const formats = tableFormat.getFields().filter((fieldFormat) => !fields.includes(fieldFormat.getName()));
    let result = CloneUtils.deepClone(tableFormat.getBindings());
    if (result == null) return new Array<Binding>();
    result = result.filter((binding) => {
      const res = formats.filter((fieldFormat) => this.bindingContainsField(binding, fieldFormat.getName()));
      return res != null;
    });

    return result;
  }
  private bindingContainsField(binding: Binding, field: string) {
    return binding.getTarget().getImage().includes(field) || binding.getExpression().getText().includes(field);
  }
}
