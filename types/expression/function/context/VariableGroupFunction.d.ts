import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityGroupFunction from './EntityGroupFunction';
export default class VariableGroupFunction extends EntityGroupFunction {
    constructor();
    getGroup(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any;
}
