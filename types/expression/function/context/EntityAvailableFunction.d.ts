import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Context from '../../../context/Context';
export default abstract class EntityAvailableFunction extends AbstractFunction {
    protected constructor(group: string, parametersFootprint: string, description: string);
    asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any>;
    isAsync(): boolean;
    protected abstract hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): boolean;
}
