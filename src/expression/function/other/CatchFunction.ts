import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Functions from '../Functions';
import Cres from '../../../Cres';

export default class CatchFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'Object normalResult [, Object errorResult]', 'Object', Cres.get().getString('fDescCatch'));
  }
  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    // Never called, that's a special function those body is actually in AbstractEvaluatingVisitor.visitFunctionExpression
    return null;
  }
}
