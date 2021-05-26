import Evaluator from '../../Evaluator';
import EntityGroupFunction from './EntityGroupFunction';
import Context from '../../../context/Context';
export default class FunctionGroupFunction extends EntityGroupFunction {
    constructor();
    getGroup(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any;
}
