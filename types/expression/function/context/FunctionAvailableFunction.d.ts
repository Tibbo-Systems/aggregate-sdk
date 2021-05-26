import Evaluator from '../../Evaluator';
import EntityAvailableFunction from './EntityAvailableFunction';
import Context from '../../../context/Context';
export default class FunctionAvailableFunction extends EntityAvailableFunction {
    constructor(group: string);
    hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): boolean;
}
