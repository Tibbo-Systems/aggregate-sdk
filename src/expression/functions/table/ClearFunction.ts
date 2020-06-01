import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class ClearFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table', 'DataTable', Cres.get().getString('fDescClear'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0].cloneIfImmutable();

    while (table.getRecordCount() > table.getFormat().getMinRecords()) {
      table.removeRecord(table.getRecordCount() - 1);
    }

    return table;
  }
}
