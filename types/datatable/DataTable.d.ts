import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import TableFormat from './TableFormat';
import StringBuilder from '../util/java/StringBuilder';
import DataRecord from './DataRecord';
import StringEncodable from '../util/StringEncodable';
import DataTableQuery from './DataTableQuery';
import Context from '../context/Context';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import DataTableSorter from './DataTableSorter';
import AttributedObject from '../expression/AttributedObject';
import FieldFormat from './FieldFormat';
export default interface DataTable extends AttributedObject, StringEncodable, Iterable<DataRecord> {
    /**
     * Returns number of records in the table or null if the number of records is unknown.
     * @return {number}
     */
    getRecordCount(): number;
    /**
     * Returns number of fields in the table.
     * @return {number}
     */
    getFieldCount(): number;
    /**
     * Returns format of field with specified name.
     * @param {string} name
     * @return {FieldFormat}
     */
    getFormat(): TableFormat;
    /**
     * Returns format of field with specified index.
     */
    getFieldFormat(searchBy: number | string): FieldFormat<any>;
    /**
     * Sets new format for the table.
     *
     * Note, that resulting table is not checked for validity. Format of existing records may be incompatible with new format of table.
     * @param {TableFormat} format
     * @return {*}
     */
    setFormat(format: TableFormat | null): DataTable;
    /**
     * Substitutes table format instance to equal one (allowing to reduce memory consumption). Returns 'true' if substitution took place, 'false' - otherwise.
     * @param {TableFormat} format
     * @return {boolean}
     */
    substituteFormat(format: TableFormat): boolean;
    /**
     * Returns table ID.
     * @return {number}
     */
    getId(): number | null;
    /**
     * Sets table ID.
     * @param {number} id
     */
    setId(id: number | null): void;
    hasField(field: string): boolean;
    /**
     * Adds new record to the table.
     */
    addRecord(): DataRecord;
    addRecordFromRecord(record: DataRecord): DataTable;
    addRecordWith(...fieldValues: any[]): DataRecord;
    validate(context: Context<any, any> | null, contextManager: ContextManager<any> | null, caller: CallerController | null): void;
    validateRecord(record: DataRecord): void;
    /**
     * Replaces record at the specified index.
     * @param {number} index
     * @param {DataRecord} record
     * @return {DataTable}
     */
    setRecord(index: number, record: DataRecord): DataTable;
    /**
     * Swaps two records.
     *
     * Both records must belong to this table, otherwise method will throw an <code>IllegalStateException</code>
     * @param {number} index1
     * @param {number} index2
     */
    swapRecords(index1: number, index2: number): void;
    /**
     * Returns list of table records.
     * @return {DataRecord[]}
     */
    getRecords(): Array<DataRecord>;
    isInvalid(): boolean;
    setInvalidationMessage(invalidationMessage: string | null): void;
    getInvalidationMessage(): string;
    /**
     * Returns record with specified index.
     * @param {number} number
     * @return {DataRecord}
     */
    getRecord(record: number): DataRecord;
    getRecordById(id: string | null): DataRecord | null;
    /**
     * Removes record with specified index from the table.
     * @param {number} index
     * @return {DataRecord}
     */
    removeRecord(index: number): DataRecord;
    /**
     * Removes all records equal to the rec parameter from the table.
     * @param {DataRecord} rec
     */
    removeRecords(rec: DataRecord): void;
    /**
     * Moves specified record to position specified by <code>index</code> argument.
     *
     * <code>record<code> must belong to this table, otherwise method will throw an <code>IllegalStateException</code>
     * @param {DataRecord} record
     * @param {number} index
     */
    reorderRecord(record: DataRecord, index: number): void;
    getEncodedData(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder;
    encodeToString(): string;
    getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings): string;
    encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder | null;
    encodeDataTable(useVisibleSeparators?: boolean, settings?: ClassicEncodingSettings): string | null;
    /**
     * Returns human-readable description of the table.
     * @return {string}
     */
    getDescription(): string | null;
    toDefaultString(): string;
    fixRecords(): void;
    dataAsString(showFieldNames?: boolean, showHiddenFields?: boolean, showPasswords?: boolean): string;
    /**
     * Returns true if table has exactly one record and one field.
     * @return {boolean}
     */
    isOneCellTable(): boolean;
    conform(rf: TableFormat): boolean;
    conformMessage(rf: TableFormat): string | null;
    selectAll(query: DataTableQuery): Array<DataRecord>;
    selectByQuery(query: DataTableQuery): DataRecord | null;
    select(field: string, value: any): DataRecord | null;
    findIndexUsingQuery(query: DataTableQuery): number | null;
    findIndex(field: string, value: any): number | null;
    findIndexUsingRecord(rec: DataRecord): number | null;
    sortWithParams(field: string, ascending: boolean): void;
    sort(sorter: DataTableSorter): void;
    /**
     * Returns first record of the table.
     * @return {DataRecord}
     */
    rec(): DataRecord;
    /**
     * Returns value of first field in first record of the table.
     * @return {*}
     */
    get(): any;
    splitFormat(): void;
    joinFormats(): void;
    [Symbol.iterator](): any;
    clone(): DataTable;
    equals(obj: any): boolean;
    compareTo(other: DataTable): number;
    append(src: DataTable): void;
    makeImmutable(): DataTable;
    cloneIfImmutable(): DataTable;
    isImmutable(): boolean;
    isSimple(): boolean;
    close(): void;
}
