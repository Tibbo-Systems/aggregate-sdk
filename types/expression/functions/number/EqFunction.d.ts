import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default class EqFunction extends AbstractFunction {
    constructor();
    execute(evaluator: Evaluator | null, environment: EvaluationEnvironment, parameters: Array<any>): any;
}
