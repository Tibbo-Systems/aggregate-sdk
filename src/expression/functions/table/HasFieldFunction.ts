import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class HasFieldFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field', 'Boolean', Cres.get().getString('fDescHasField'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0];

    const field = parameters[1].toString();

    return table.getFormat().hasField(field);
  }
}
