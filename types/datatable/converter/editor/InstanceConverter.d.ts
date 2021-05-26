import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
export default class InstanceConverter extends AbstractEditorOptionsConverter {
    static readonly FIELD_STORAGE_CONTEXT: string;
    static readonly FIELD_STORAGE_TABLE: string;
    static readonly FIELD_DASHBOARD: string;
    static readonly FIELD_ICON: string;
    private static readonly FORMAT;
    private static __static_initializer_0;
    static readonly TF_PARAMETERS: TableFormat;
    private static __static_initializer_1;
    private static _init;
    static initialize(): void;
    constructor();
    convertToString(options: DataTable): string;
    getFormat(): TableFormat;
}
