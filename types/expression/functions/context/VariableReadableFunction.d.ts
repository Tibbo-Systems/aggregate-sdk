import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityAvailableFunction from './EntityAvailableFunction';
export default class VariableReadableFunction extends EntityAvailableFunction {
    constructor(group: string);
    hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any;
}
