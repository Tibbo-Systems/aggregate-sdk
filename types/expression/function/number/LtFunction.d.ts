import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default class LtFunction extends AbstractFunction {
    constructor();
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
}
