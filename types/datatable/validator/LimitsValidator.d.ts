import AbstractFieldValidator from './AbstractFieldValidator';
import FieldFormat from '../FieldFormat';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
export default class LimitsValidator extends AbstractFieldValidator<any> {
    private static readonly MIN_MAX_SEPARATOR;
    private min;
    private max;
    constructor(min: number | null, max: number | null);
    protected setLimits(min: number | null, max: number | null): void;
    static createFromMinMax(min: number, max: number): LimitsValidator;
    static createFromFieldFormatAndSource(fieldFormat: FieldFormat<any>, source: string): LimitsValidator;
    getMin(): number | null;
    getMax(): number | null;
    encode(): string;
    getType(): string;
    validate(context: Context<any, any>, contextManager: ContextManager<Context<any, any>>, caller: CallerController, value: any): any;
    private compare;
    shouldEncode(): boolean;
    equals(obj: any): boolean;
}
