import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Expression from '../../Expression';
import DataTable from '../../../datatable/DataTable';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableReplication from '../../../datatable/DataTableReplication';

export default class FilterFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String filterExpression', 'DataTable', Cres.get().getString('fDescFilter'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    //checkParameterType(0, parameters[0], DataTable.class);

    const source = parameters[0];

    const filter = new Expression(parameters[1].toString());

    return this.executeSimpleDataTableCase(source, filter, evaluator);
  }

  executeSimpleDataTableCase(source: DataTable, filter: Expression, evaluator: Evaluator) {
    const result = new SimpleDataTable(source.getFormat().clone().setMinRecords(0));

    const oldRow = evaluator.getDefaultResolver().getDefaultRow();

    const resolver = evaluator.getDefaultResolver();
    const localEvaluator = new Evaluator(resolver.getContextManager(), resolver.getDefaultContext(), resolver.getDefaultTable(), resolver.getCallerController());

    localEvaluator.getDefaultResolver().setDefaultTable(source);

    try {
      for (let i = 0; i < source.getRecordCount(); i++) {
        localEvaluator.getDefaultResolver().setDefaultRow(i);

        try {
          if (localEvaluator.evaluateToBoolean(filter)) {
            const rec = result.addRecord();
            DataTableReplication.copyRecord(source.getRecord(i), rec, true, true);
          }
        } catch (ex) {
          throw new Error(ex);
        }
      }
    } finally {
      if (oldRow != null) {
        evaluator.getDefaultResolver().setDefaultRow(oldRow);
      }
    }

    return result;
  }
}
