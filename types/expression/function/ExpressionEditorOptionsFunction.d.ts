import AbstractFunction from './AbstractFunction';
import Evaluator from '../Evaluator';
import EvaluationEnvironment from '../EvaluationEnvironment';
export default class ExpressionEditorOptionsFunction extends AbstractFunction {
    constructor();
    isAsync(): boolean;
    asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<string>;
}
