import AbstractFieldValidator from './AbstractFieldValidator';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
export default class ExpressionValidator extends AbstractFieldValidator<any> {
    private static readonly SEPARATOR_REGEX;
    private static readonly SEPARATOR;
    private expression;
    private message;
    constructor(source: string);
    validate(context: Context<any, any>, contextManager: ContextManager<Context<any, any>>, caller: CallerController, value: any): any;
    encode(): string;
    evaluateExpression(context: Context<any, any>, contextManager: ContextManager<Context<any, any>>, caller: CallerController, value: any): boolean;
    shouldEncode(): boolean;
    getType(): string | null;
    equals(obj: any): boolean;
}
