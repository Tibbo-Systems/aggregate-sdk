import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableConstruction from '../../../datatable/DataTableConstruction';
import TableFormat from '../../../datatable/TableFormat';

export default class TableFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field, boolean ascending', 'DataTable', Cres.get().getString('fDescSort'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    try {
      if (parameters.length == 0) {
        return new SimpleDataTable();
      }

      this.checkParameters(1, false, parameters);

      const formatString = parameters[0].toString();

      const format = new TableFormat(formatString);

      const data = parameters.splice(1, parameters.length);

      return DataTableConstruction.constructTable([data], format, evaluator, environment);
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
