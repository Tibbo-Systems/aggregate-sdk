import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class FetchDataBlockFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'DataBlock data', 'DataBlock', Cres.get().getString('fDescFetchDataBlock'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    const data = parameters[0];

    try {
      data.fetchData(evaluator.getDefaultResolver().getContextManager(), evaluator.getDefaultResolver().getCallerController());
      return data;
    } catch (e) {
      throw new Error(e.getMessage());
    }
  }
}
