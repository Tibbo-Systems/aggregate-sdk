import CallerController from '../../context/CallerController';
import ContextManager from '../../context/ContextManager';
import Context from '../../context/Context';
import AbstractFieldValidator from './AbstractFieldValidator';
export default class RegexValidator extends AbstractFieldValidator<any> {
    private static readonly SEPARATOR;
    private static readonly SEPARATOR_REGEX;
    private static readonly JAVA_TO_JS_REGEXP;
    private readonly regex;
    private readonly message;
    private readonly jsRegex;
    constructor(regex: string, message?: string | null);
    static convertJavaRegexpToJs(javaRegexp: string): string;
    shouldEncode(): boolean;
    encode(): string;
    getType(): string | null;
    validate(context?: Context<any, any> | null, contextManager?: ContextManager<Context<any, any>> | null, caller?: CallerController | null, value?: any): any;
    equals(obj: any): boolean;
}
