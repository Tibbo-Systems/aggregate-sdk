import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import DataTableReplication from '../../../datatable/DataTableReplication';

export default class CopyFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable source, DataTable target', 'DataTable', Cres.get().getString('fDescCopy'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    //checkParameterType(0, parameters[0], DataTable.class);
    //checkParameterType(1, parameters[1], DataTable.class);

    const source = parameters[0];
    const target = parameters[1].cloneIfImmutable();

    DataTableReplication.copy(source, target, true, true);

    return target;
  }
}
