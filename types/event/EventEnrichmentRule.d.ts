import TableFormat from '../datatable/TableFormat';
import Expression from '../expression/Expression';
import AggreGateBean from '../datatable/AggreGateBean';
export default class EventEnrichmentRule extends AggreGateBean {
    static FIELD_NAME: string;
    static FIELD_EXPRESSION: string;
    static FORMAT: TableFormat;
    static __static_initialized: boolean;
    static __static_initializer_0(): void;
    private name;
    private expression;
    private enrichmentExpression;
    getName(): string | null;
    setName(name: string): void;
    getExpression(): string | null;
    setExpression(expression: string): void;
    getEnrichmentExpression(): Expression | null;
}
