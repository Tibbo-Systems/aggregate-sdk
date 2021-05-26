import EntityFormatFunction from './EntityFormatFunction';
import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
export default class FunctionOutputFormatFunction extends EntityFormatFunction {
    constructor();
    getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): string | null;
}
