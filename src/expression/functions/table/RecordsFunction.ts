import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class RecordsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table', 'Integer', Cres.get().getString('fDescRecords'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0];

    return table.getRecordCount();
  }
}
