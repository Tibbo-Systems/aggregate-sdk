import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default abstract class DateFunction extends AbstractFunction {
    constructor(returnValue: string, description: string | null);
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    abstract executeDate(calendar: Date, parameters: Array<any>): any;
}
