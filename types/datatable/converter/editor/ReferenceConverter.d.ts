import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
export default class ReferenceConverter extends AbstractEditorOptionsConverter {
    static readonly FIELD_ENTITY_PARAMETERS_VALUE: string;
    static readonly FIELD_APPEARANCE: string;
    static readonly FIELD_CONTEXT_TYPE: string;
    static readonly FIELD_REFERENCE_TYPE: string;
    static readonly FIELD_CONTEXT: string;
    static readonly FIELD_CONTEXT_EXPRESSION: string;
    static readonly FIELD_ENTITY: string;
    static readonly FIELD_ENTITY_EXPRESSION: string;
    static readonly FIELD_ENTITY_TYPE: string;
    static readonly FIELD_ENTITY_PARAMETERS: string;
    static readonly FIELD_ICON: string;
    static readonly STATIC: string;
    static readonly DYNAMIC: string;
    static readonly FORMAT: TableFormat;
    static readonly VFT_ENTITY_PARAMETERS: TableFormat;
    private static __static_initializer_0;
    private static __static_initializer_1;
    private static _init;
    static initialize(): void;
    constructor();
    convertToString(options: DataTable): string | null;
    getFormat(): TableFormat;
}
