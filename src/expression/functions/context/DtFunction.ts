import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class DtFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, '', 'DataTable', Cres.get().getString('fDescDt'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    return evaluator.getDefaultResolver().getDefaultTable();
  }
}
