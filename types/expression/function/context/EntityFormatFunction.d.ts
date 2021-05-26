import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Context from '../../../context/Context';
export default abstract class EntityFormatFunction extends AbstractFunction {
    protected constructor(parametersFootprint: string, description: string);
    asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any>;
    isAsync(): boolean;
    protected abstract getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: any): string | null;
}
