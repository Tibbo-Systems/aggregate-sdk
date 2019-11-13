import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
export default class ForeignInstanceConverter extends AbstractEditorOptionsConverter {
    static readonly FIELD_DESCRIPTION: string;
    static readonly FIELD_REFERENCE: string;
    static readonly FIELD_ICON: string;
    static readonly FIELD_STORAGE_CONTEXT: string;
    static readonly FIELD_STORAGE_VIEW: string;
    static readonly FIELD_STORAGE_QUERY: string;
    static readonly FIELD_STORAGE_TABLE: string;
    static readonly FIELD_REFERENCE_FIELD: string;
    static readonly FIELD_STORAGE_COLUMNS: string;
    static readonly FIELD_STORAGE_FILTER: string;
    static readonly FIELD_STORAGE_SORTING: string;
    static readonly FIELD_DASHBOARD: string;
    static readonly FORMAT: TableFormat;
    private static __static_initializer_0;
    static readonly TF_PARAMETERS: TableFormat;
    private static __static_initializer_1;
    private static _init;
    static initialize(): void;
    constructor();
    convertToString(options: DataTable): string | null;
    getFormat(): TableFormat;
}
