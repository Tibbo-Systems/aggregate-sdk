import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityFormatFunction from './EntityFormatFunction';
export default class VariableFormatFunction extends EntityFormatFunction {
    constructor();
    getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): string | null;
}
