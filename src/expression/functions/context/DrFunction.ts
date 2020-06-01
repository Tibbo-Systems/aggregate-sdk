import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class DrFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, '', 'Integer', Cres.get().getString('fDescDr'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    return evaluator.getDefaultResolver().getDefaultRow();
  }
}
