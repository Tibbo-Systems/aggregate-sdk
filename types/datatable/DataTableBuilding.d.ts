import TableFormat from './TableFormat';
import DataTable from './DataTable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
export default class DataTableBuilding {
    static SELECTION_VALUES_FORMAT: TableFormat;
    static readonly FIELD_SELECTION_VALUES_VALUE: string;
    static readonly FIELD_SELECTION_VALUES_DESCRIPTION: string;
    static createTableFormat(formatTable: DataTable, settings?: ClassicEncodingSettings | null, allowNull?: boolean): TableFormat | null;
    static createTableFormatWithRecordsCount(minRecords: number, maxRecords: number, reorderable: boolean, fields: DataTable, settings: ClassicEncodingSettings | null): TableFormat;
    static formatToFieldsTable(tf: TableFormat, readOnly: boolean, settings?: ClassicEncodingSettings | null, ignoreHiddenFields?: boolean): DataTable;
    static formatToTable(tf: TableFormat, settings?: ClassicEncodingSettings | null, ignoreHiddenFields?: boolean): DataTable;
    static __static_initializer_0(): void;
    static BINDINGS_FORMAT: TableFormat;
    static __static_initializer_1(): void;
    static VALIDATORS_FORMAT: TableFormat;
    static __static_initializer_2(): void;
    static EDITOR_OPTIONS_SIMPLE_FORMAT: TableFormat;
    static __static_initializer_3(): void;
    static FIELDS_FORMAT: TableFormat;
    static __static_initializer_4(): void;
    static TABLE_FORMAT: TableFormat;
    static __static_initializer_5(): void;
    private static _init;
    static initialize(): void;
}
