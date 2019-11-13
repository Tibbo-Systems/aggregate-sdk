import AbstractFieldValidator from './AbstractFieldValidator';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
export default class IdValidator extends AbstractFieldValidator<any> {
    validate(context: Context<any, any>, contextManager: ContextManager<Context<any, any>>, caller: CallerController, value: any): any;
    shouldEncode(): boolean;
    encode(): string;
    getType(): string | null;
}
