import AbstractFieldValidator from './AbstractFieldValidator';
import FieldFormat from '../FieldFormat';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import JSBI from 'jsbi';
export default class LimitsValidator extends AbstractFieldValidator<any> {
    private static readonly MIN_MAX_SEPARATOR;
    private min;
    private max;
    constructor(min: JSBI | number | null, max: JSBI | number | null);
    protected setLimits(min: JSBI | number | null, max: JSBI | number | null): void;
    static createFromMinMax(min: JSBI | number, max: JSBI | number): LimitsValidator;
    static createFromFieldFormatAndSource(fieldFormat: FieldFormat<any>, source: string): LimitsValidator;
    getMin(): JSBI | number | null;
    getMax(): JSBI | number | null;
    encode(): string;
    getType(): string;
    validate(context: Context<any, any> | null, contextManager: ContextManager<Context<any, any>> | null, caller: CallerController | null, value: any): any;
    private compare;
    shouldEncode(): boolean;
    equals(obj: any): boolean;
}
