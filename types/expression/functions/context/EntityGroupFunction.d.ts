import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Context from '../../../context/Context';
export default abstract class EntityGroupFunction extends AbstractFunction {
    protected constructor(group: string, parametersFootprint: string, description: string);
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    protected abstract getGroup(evaluator: Evaluator, con: Context<any, any>, ...parameters: Array<any>): string;
}
