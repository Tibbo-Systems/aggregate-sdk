import JObject from '../util/java/JObject';
import Expression from '../expression/Expression';
import Reference from '../expression/Reference';
export default class EvaluationOptions extends JObject {
    static readonly STARTUP = 1;
    static readonly EVENT = 2;
    static readonly PERIODIC = 4;
    private pattern;
    private period;
    private activator;
    private condition;
    constructor(pattern: number);
    static of(startup: boolean, event: boolean, period?: number): EvaluationOptions;
    setPeriod(period: number): void;
    getPattern(): number;
    getPeriod(): number;
    getActivator(): Reference | null;
    getCondition(): Expression | null;
    setPattern(pattern: number): void;
    setActivator(activator: Reference): void;
    setCondition(condition: Expression): void;
    isProcessOnStartup(): boolean;
    isProcessOnEvent(): boolean;
    isProcessPeriodically(): boolean;
    clone(): EvaluationOptions;
    toString(): string;
}
