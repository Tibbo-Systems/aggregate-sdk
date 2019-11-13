import FieldValidator from './FieldValidator';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import JObject from '../../util/java/JObject';
import Context from '../../context/Context';
export default abstract class AbstractFieldValidator<T extends JObject> extends JObject implements FieldValidator<T> {
    clone(): JObject;
    equals(obj: JObject): boolean;
    encode(): string;
    getType(): string | null;
    shouldEncode(): boolean;
    validateValue(value: T): T;
    abstract validate(context?: Context<any, any> | null, contextManager?: ContextManager<Context<any, any>> | null, caller?: CallerController | null, value?: T): T;
}
