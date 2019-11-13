import AbstractDataTable from './AbstractDataTable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import StringBuilder from '../util/java/StringBuilder';
import DataRecord from './DataRecord';
import JObject from '../util/java/JObject';
import TableFormat from './TableFormat';
import DataTable from './DataTable';
import DataTableSorter from './DataTableSorter';
import Comparable from '../util/java/Comparable';
import DataTableQuery from './DataTableQuery';
export default class SimpleDataTable extends AbstractDataTable implements Comparable<DataTable> {
    private records;
    constructor(format?: TableFormat | null, emptyRecords?: number | boolean);
    static createSimpleDataTable(format: TableFormat, ...firstRowData: Array<any>): SimpleDataTable;
    /**
     * Sets new format for the table.
     *
     * Note, that resulting table is not checked for validity. Format of existing records may be incompatible with new format of table.
     */
    setFormat(format: TableFormat | null): DataTable;
    getRecordCount(): number;
    getRecord(num: number): DataRecord;
    getRecords(): Array<DataRecord>;
    protected removeRecordImpl(index: number): DataRecord;
    removeRecords(rec: DataRecord): void;
    reorderRecord(record: DataRecord, index: number): void;
    setId(id: number | null): void;
    getEncodedRecordsOrTableID(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): void;
    get(): JObject;
    private addEmptyRecord;
    addRecord(): DataRecord;
    addRecordWith(...fieldValues: any[]): DataRecord;
    addRecordFromRecord(record: DataRecord): DataTable;
    makeImmutable(): DataTable;
    private makeSubtablesImmutable;
    setRecord(index: number, record: DataRecord): DataTable;
    toDefaultString(): string;
    protected dataAsStringWithParams(showFieldNames: boolean, showHiddenFields: boolean, showPasswords: boolean): string;
    isOneCellTable(): boolean;
    conformMessage(rf: TableFormat): string | null;
    findIndexUsingQuery(query: DataTableQuery): number | null;
    sort(sorter: DataTableSorter): void;
    private checkOrSetFormat;
    private addRecordImpl;
    isSimple(): boolean;
    clone(): DataTable;
    equals(obj: any | null): boolean;
    compareTo(other: DataTable): number;
}
