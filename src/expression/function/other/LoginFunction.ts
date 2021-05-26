import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class LoginFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, '', 'String', Cres.get().getString('fDescLogin'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    const cc = evaluator.getDefaultResolver().getCallerController();
    return cc != null ? cc.getEffectiveUsername() : null;
  }
}
