import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
export default interface FieldValidator<T> {
    shouldEncode(): boolean;
    getType(): string | null;
    encode(): string;
    validateValue(value: T): T;
    validate(context?: Context<any, any> | null, contextManager?: ContextManager<Context<any, any>> | null, caller?: CallerController | null, value?: T | null): T;
}
