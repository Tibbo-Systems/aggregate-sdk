import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableReplication from '../../../datatable/DataTableReplication';

export default class AdjustRecordLimitsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, Integer minRecords, Integer maxRecords', 'DataTable', Cres.get().getString('fDescAdjustRecordLimits'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, false, parameters);

    this.convertToDataTable(0, parameters[0]);

    const table = parameters[0];

    const minRecords = Util.convertToNumber(parameters[1], true, false);

    const maxRecords = Util.convertToNumber(parameters[2], true, false);

    const newFormat = table.getFormat().clone().setMinRecords(minRecords).setMaxRecords(maxRecords);

    const result = new SimpleDataTable(newFormat);

    DataTableReplication.copy(table, result, true, true, true, true, true);

    return result;
  }
}
