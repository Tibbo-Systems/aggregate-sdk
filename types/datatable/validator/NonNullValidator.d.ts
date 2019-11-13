import AbstractFieldValidator from './AbstractFieldValidator';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
export default class NonNullValidator extends AbstractFieldValidator<any> {
    private message;
    constructor(message?: string | null);
    getType(): string | null;
    validate(context: Context<any, any>, contextManager: ContextManager<Context<any, any>>, caller: CallerController, value: any): any;
    shouldEncode(): boolean;
    encode(): string;
    equals(obj: any): boolean;
}
