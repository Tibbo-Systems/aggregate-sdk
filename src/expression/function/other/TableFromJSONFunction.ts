import AbstractFunction from '../AbstractFunction';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import JsonEncodingHelper from '../../../datatable/encoding/JsonEncodingHelper';

export default class TableFromJSONFunction extends AbstractFunction {
  constructor(group: string) {
    super(group, 'String json [, Boolean convertUnequalFieldTypesToString]', 'DataTable', Cres.get().getString('fDescTableFromJSON'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    let convertUnequalFieldTypesToString = false;
    if (parameters.length > 1) {
      convertUnequalFieldTypesToString = this.convertToBoolean(1, parameters[1]);
    }

    try {
      return JsonEncodingHelper.tableFromJson(parameters[0].toString(), convertUnequalFieldTypesToString).get();
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
