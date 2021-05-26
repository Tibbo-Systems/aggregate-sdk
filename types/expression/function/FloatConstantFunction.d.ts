import AbstractFunction from './AbstractFunction';
import Evaluator from '../Evaluator';
import EvaluationEnvironment from '../EvaluationEnvironment';
export default class FloatConstantFunction extends AbstractFunction {
    private constant;
    constructor(constant: number, description: string);
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): number;
}
