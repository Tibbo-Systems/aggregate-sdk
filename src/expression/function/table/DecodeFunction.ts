import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import ExpressionUtils from '../../ExpressionUtils';
import ClassicEncodingSettings from '../../../datatable/encoding/ClassicEncodingSettings';
import DataTableFactory from '../../../datatable/DataTableFactory';

export default class DecodeFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'String stringToDecode', 'DataTable', Cres.get().getString('fDescDecode'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    // this.convertToDataTable(0, parameters[0]);

    const stringToDecode = parameters[0].toString();

    try {
      const settings = new ClassicEncodingSettings(ExpressionUtils.useVisibleSeparators(stringToDecode));
      return DataTableFactory.createAndDecode(stringToDecode, settings);
    } catch (exc) {
      throw new Error(exc);
    }
  }
}
