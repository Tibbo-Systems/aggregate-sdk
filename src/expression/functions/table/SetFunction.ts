import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class SetFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String field, Integer row, Object value', 'Object', Cres.get().getString('fDescSet'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(4, true, parameters);
    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0].cloneIfImmutable();

    const field = parameters[1].toString();

    const row = Util.convertToNumber(parameters[2], true, false);

    table.getRecord(row).setValueSmart(field, parameters[3]);

    return table;
  }
}
