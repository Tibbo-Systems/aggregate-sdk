import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class DescriptionFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table', 'String', Cres.get().getString('fDescDescription'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(1, false, parameters);

    const table = this.convertToDataTable(0, parameters[0]);

    const result = await table.getDescription();
    return result;
  }
  isAsync(): boolean {
    return true;
  }
}
