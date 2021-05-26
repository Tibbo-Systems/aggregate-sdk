import Tracer from './Tracer';
import Context from '../../context/AbstractContext';
export default class ContextExpressionTracer implements Tracer {
    static E_TRACE: string;
    static EF_TRACE_VALUE: string;
    static EF_TRACE_MESSAGE: string;
    private static EFT_TRACE;
    static __static_initializer_0(): void;
    private readonly context;
    private readonly traceEventGroup;
    constructor(context: Context<any, any>, traceEventGroup: string);
    install(): void;
    trace(value: any, message: string): void;
    protected getContext(): Context<any, any>;
}
