import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import SimpleDataTable from '../../../datatable/SimpleDataTable';
import DataTableConstruction from '../../../datatable/DataTableConstruction';
import TableFormat from '../../../datatable/TableFormat';
import ExpressionUtils from '../../ExpressionUtils';
import ClassicEncodingSettings from '../../../datatable/encoding/ClassicEncodingSettings';

export default class TableFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, '[String format [, Object field1, Object field2, ...]]', 'DataTable', Cres.get().getString('fDescTable'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    try {
      if (parameters.length == 0) {
        return new SimpleDataTable();
      }

      this.checkParameters(1, false, parameters);

      const formatString = parameters[0].toString();

      const format = TableFormat.createWithFormatAndSettings(formatString, new ClassicEncodingSettings(ExpressionUtils.useVisibleSeparators(formatString)));

      const data = parameters.splice(1, parameters.length);

      return await DataTableConstruction.constructTable(data, format, evaluator, environment);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  isAsync(): boolean {
    return true;
  }
}
