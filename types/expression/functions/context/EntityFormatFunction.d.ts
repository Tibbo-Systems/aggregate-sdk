import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Context from '../../../context/Context';
export default abstract class EntityFormatFunction extends AbstractFunction {
    protected constructor(parametersFootprint: string, description: string);
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    protected abstract getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: any): string;
}
