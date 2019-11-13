export default class QueryCondition {
    static readonly EQ: number;
    static readonly GT: number;
    static readonly LT: number;
    static readonly NE: number;
    static readonly GE: number;
    static readonly LE: number;
    private field;
    private value;
    private operator;
    constructor(field: string, value: any, operator?: number);
    getField(): string;
    getValue(): any;
    getOperator(): number;
}
