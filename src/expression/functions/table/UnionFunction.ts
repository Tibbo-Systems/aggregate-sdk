import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class UnionFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable first, DataTable second [, DataTable third, ...]', 'DataTable', Cres.get().getString('fDescUnion'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);
    //checkParameterType(1, parameters[1], DataTable.class);

    let union = null;

    for (let i = 0; i < parameters.length - 1; i++) {
      union = i == 0 ? parameters[i] : union;
      const table = parameters[i + 1];
      union = union(union, table);
    }

    return union;
  }
}
