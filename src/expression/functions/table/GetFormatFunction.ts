import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';

export default class GetFormatFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table [, Boolean useVisibleSeparators]', 'String', Cres.get().getString('fDescGetFormat'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, true, parameters);

    if (parameters[0] == null) {
      return null;
    }

    //checkParameterType(0, parameters[0], DataTable.class);

    const table = parameters[0];

    const useVisibleSeparators = parameters.length > 1 ? Util.convertToBoolean(parameters[1], false, false) : false;

    return table.getFormat().encode(useVisibleSeparators);
  }
}
