import Evaluator from '../../Evaluator';
import AbstractFunction from '../AbstractFunction';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default class GetVariableFunction extends AbstractFunction {
    constructor();
    asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any>;
    isAsync(): boolean;
}
