import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class SortFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field, boolean ascending', 'DataTable', Cres.get().getString('fDescSort'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters);

    this.convertToDataTable(0, parameters[0]);

    const source = parameters[0];

    const field = parameters[1].toString();

    const ascending = Util.convertToBoolean(parameters[2], false, false);

    const result = source.clone();

    result.sortWithParams(field, ascending);

    return result;
  }
}
