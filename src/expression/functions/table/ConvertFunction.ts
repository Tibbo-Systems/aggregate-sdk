import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import TableFormat from '../../../datatable/TableFormat';
import ClassicEncodingSettings from '../../../datatable/encoding/ClassicEncodingSettings';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableReplication from '../../../datatable/DataTableReplication';

export default class ConvertFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String format', 'DataTable', Cres.get().getString('fDescConvert'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    //checkParameterType(0, parameters[0], DataTable.class);

    const source = parameters[0];

    const formatSource = parameters[1].toString();

    if (formatSource == null) {
      return source;
    }

    let useVisibleSeparators = true;

    if (parameters.length > 2) {
      const bool = Util.convertToBoolean(parameters[2], false, false);
      if (bool == null) {
        return null;
      }
      useVisibleSeparators = bool;
    }

    const format = TableFormat.createWithFormatAndSettings(formatSource, new ClassicEncodingSettings(useVisibleSeparators, formatSource), true);

    const target = new SimpleDataTable(format, true);

    if (source != null) {
      DataTableReplication.copy(source, target, true, true, true);
    }

    return target;
  }
}
