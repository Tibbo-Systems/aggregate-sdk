import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class DescribeFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field1, String description1, String field2, String description2, ...', 'DataTable', Cres.get().getString('fDescDescribe'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0].clone();

    const clone = table.getFormat().clone();

    for (let i = 1; i < parameters.length - 1; i = i + 2) {
      const name = parameters[i].toString();
      const description = parameters[i + 1].toString();
      const ff = clone.getField(name);
      if (ff != null) {
        ff.setDescription(description);
      }
    }

    table.setFormat(clone);

    return table;
  }
}
