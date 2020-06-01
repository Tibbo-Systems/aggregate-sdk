import EntityAvailableFunction from './EntityAvailableFunction';
import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
export default class VariableWritableFunction extends EntityAvailableFunction {
    constructor(group: string);
    hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any;
}
