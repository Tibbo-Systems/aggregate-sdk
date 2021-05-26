import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default class IntersectFunction extends AbstractFunction {
    constructor();
    execute(evaluator: Evaluator | null | undefined, environment: EvaluationEnvironment, parameters: Array<any>): any;
}
