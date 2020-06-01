import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTableReplication from '../../../datatable/DataTableReplication';
import SimpleDataTable from '../../../datatable/SimpleDataTable';

export default class RemoveColumnsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String column1, String column2, ...', 'DataTable', Cres.get().getString('fDescRemoveColumns'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0].clone();

    const newFormat = table.getFormat().clone();

    for (let i = 1; i < parameters.length; i = i + 1) {
      const field = parameters[i].toString();
      newFormat.removeField(field);
    }

    const newTable = new SimpleDataTable(newFormat);

    DataTableReplication.copy(table, newTable, true, true, true);

    return newTable;
  }
}
