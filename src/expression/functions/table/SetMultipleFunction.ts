import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Expression from '../../Expression';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import Reference from '../../Reference';
import DataTableReplication from '../../../datatable/DataTableReplication';

export default class SetMultipleFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field, Object value [, String condition]', 'Object', Cres.get().getString('fDescSetMultiple'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, true, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);

    const source = parameters[0];

    const field = parameters[1].toString();
    const newValue = parameters[2];
    let expression = null;
    if (parameters.length > 3) {
      expression = new Expression(parameters[3].toString());
    }
    const result = new SimpleDataTable(source.getFormat().clone().setMinRecords(0));
    const oldRow = evaluator.getDefaultResolver().getDefaultRow();

    const resolver = evaluator.getDefaultResolver();
    const localEvaluator = new Evaluator(resolver.getContextManager(), resolver.getDefaultContext(), resolver.getDefaultTable(), resolver.getCallerController());
    localEvaluator.getDefaultResolver().setDefaultTable(source);
    localEvaluator.setResolver(Reference.SCHEMA_ENVIRONMENT, evaluator.getEnvironmentResolver());

    try {
      for (let i = 0; i < source.getRecordCount(); i++) {
        localEvaluator.getDefaultResolver().setDefaultRow(i);

        try {
          const rec = result.addRecord();
          DataTableReplication.copyRecord(source.getRecord(i), rec, true, true);

          if (expression == null || localEvaluator.evaluateToBoolean(expression)) rec.setValueSmart(field, newValue);
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
