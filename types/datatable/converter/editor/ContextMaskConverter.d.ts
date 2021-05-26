import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import AggreGateBean from '../../AggreGateBean';
import DataRecord from '../../DataRecord';
export default class ContextMaskConverter extends AbstractEditorOptionsConverter {
    static readonly FIELD_ROOT_CONTEXT: string;
    static readonly FIELD_CONTEXT_TYPES: string;
    static readonly FIELD_CONTEXT_MASKS: string;
    static readonly FIELD_CONTEXT_TYPE: string;
    static readonly FIELD_CONTEXT_MASK: string;
    private static readonly TYPE_FORMAT;
    static __static_initializer_0(): void;
    private static readonly MASK_FORMAT;
    static __static_initializer_1(): void;
    private static readonly FORMAT;
    static __static_initializer_2(): void;
    private static _init;
    static initialize(): void;
    constructor();
    convertToString(options: DataTable): string;
    getFormat(): TableFormat;
    static prepareAndGetFormat(): TableFormat;
}
export declare class Options extends AggreGateBean {
    rootContext: string | null;
    contextTypes: Array<string>;
    contextMasks: Array<string>;
    constructor(data?: DataRecord);
    getRootContext(): string | null;
    setRootContext(rootContext: string): void;
    getContextTypes(): Array<string>;
    setContextTypes(contextTypes: Array<string>): void;
    getContextMasks(): Array<string>;
    setContextMasks(contextMasks: Array<string>): void;
}
