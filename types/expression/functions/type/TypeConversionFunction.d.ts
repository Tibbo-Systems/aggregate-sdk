import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default abstract class TypeConversionFunction extends AbstractFunction {
    protected constructor(returnValue: string, description: string);
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    abstract convert(parameter: any): any;
}
