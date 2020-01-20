import DataRecord from '../../DataRecord';
import DataTable from '../../DataTable';
export default class EditorOptionsUtils {
    private static CONVERTERS;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    private static getConverter;
    static convertToString(fdata: DataRecord): string | null;
    static createEditorOptionsTable(type: string, editor: string | null, editorOptions?: string | null): DataTable;
    static hasConverter(type: string, editor: string): boolean;
}
