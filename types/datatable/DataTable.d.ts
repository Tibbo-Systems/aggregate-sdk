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
export default abstract class DataTable extends AttributedObject implements StringEncodable, Iterable<DataRecord> {
    /**
     * Returns number of records in the table or null if the number of records is unknown.
     * @return {number}
     */
    abstract getRecordCount(): number;
    /**
     * Returns number of fields in the table.
     * @return {number}
     */
    abstract getFieldCount(): number;
    /**
     * Returns format of field with specified name.
     * @param {string} name
     * @return {FieldFormat}
     */
    abstract getFormat(): TableFormat;
    /**
     * Returns format of field with specified index.
     */
    abstract getFieldFormat(searchBy: number | string): FieldFormat<any>;
    /**
     * Sets new format for the table.
     *
     * Note, that resulting table is not checked for validity. Format of existing records may be incompatible with new format of table.
     * @param {TableFormat} format
     * @return {*}
     */
    abstract setFormat(format: TableFormat | null): DataTable;
    /**
     * Substitutes table format instance to equal one (allowing to reduce memory consumption). Returns 'true' if substitution took place, 'false' - otherwise.
     * @param {TableFormat} format
     * @return {boolean}
     */
    abstract substituteFormat(format: TableFormat): boolean;
    /**
     * Returns table ID.
     * @return {number}
     */
    abstract getId(): number | null;
    /**
     * Sets table ID.
     * @param {number} id
     */
    abstract setId(id: number | null): void;
    abstract hasField(field: string): boolean;
    /**
     * Adds new record to the table.
     */
    abstract addRecord(): DataRecord;
    abstract addRecordFromRecord(record: DataRecord): DataTable;
    abstract addRecordWith(...fieldValues: any[]): DataRecord;
    abstract validate(context: Context<any, any> | null, contextManager: ContextManager<any> | null, caller?: CallerController): void;
    abstract validateRecord(record: DataRecord): void;
    /**
     * Replaces record at the specified index.
     * @param {number} index
     * @param {DataRecord} record
     * @return {DataTable}
     */
    abstract setRecord(index: number, record: DataRecord): DataTable;
    /**
     * Swaps two records.
     *
     * Both records must belong to this table, otherwise method will throw an <code>IllegalStateException</code>
     * @param {number} index1
     * @param {number} index2
     */
    abstract swapRecords(index1: number, index2: number): void;
    /**
     * Returns list of table records.
     * @return {DataRecord[]}
     */
    abstract getRecords(): Array<DataRecord>;
    abstract isInvalid(): boolean;
    abstract setInvalidationMessage(invalidationMessage: string | null): void;
    abstract getInvalidationMessage(): string;
    /**
     * Returns record with specified index.
     * @param {number} number
     * @return {DataRecord}
     */
    abstract getRecord(record: number): DataRecord;
    abstract getRecordById(id: string | null): DataRecord | null;
    /**
     * Removes record with specified index from the table.
     * @param {number} index
     * @return {DataRecord}
     */
    abstract removeRecord(index: number): DataRecord;
    /**
     * Removes all records equal to the rec parameter from the table.
     * @param {DataRecord} rec
     */
    abstract removeRecords(rec: DataRecord): void;
    /**
     * Moves specified record to position specified by <code>index</code> argument.
     *
     * <code>record<code> must belong to this table, otherwise method will throw an <code>IllegalStateException</code>
     * @param {DataRecord} record
     * @param {number} index
     */
    abstract reorderRecord(record: DataRecord, index: number): void;
    abstract getEncodedData(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder;
    abstract encodeToString(): string;
    abstract getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings): string;
    abstract encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder;
    abstract encodeWithSettings(settings: ClassicEncodingSettings): string;
    abstract encodeWithSeparators(useVisibleSeparators: boolean): string;
    /**
     * Returns human-readable description of the table.
     * @return {string}
     */
    abstract getDescription(): string | null;
    abstract toDefaultString(): string;
    abstract fixRecords(): void;
    abstract dataAsString(showFieldNames?: boolean, showHiddenFields?: boolean, showPasswords?: boolean): string;
    /**
     * Returns true if table has exactly one record and one field.
     * @return {boolean}
     */
    abstract isOneCellTable(): boolean;
    abstract conform(rf: TableFormat): boolean;
    abstract conformMessage(rf: TableFormat): string | null;
    abstract selectAll(query: DataTableQuery): Array<DataRecord>;
    abstract selectByQuery(query: DataTableQuery): DataRecord | null;
    abstract select(field: string, value: any): DataRecord | null;
    abstract findIndexUsingQuery(query: DataTableQuery): number | null;
    abstract findIndex(field: string, value: any): number | null;
    abstract findIndexUsingRecord(rec: DataRecord): number | null;
    abstract sortWithParams(field: string, ascending: boolean): void;
    abstract sort(sorter: DataTableSorter): void;
    /**
     * Returns first record of the table.
     * @return {DataRecord}
     */
    abstract rec(): DataRecord;
    /**
     * Returns value of first field in first record of the table.
     * @return {*}
     */
    abstract get(): any;
    abstract splitFormat(): void;
    abstract joinFormats(): void;
    abstract [Symbol.iterator](): any;
    clone(): DataTable;
    abstract equals(obj: any): boolean;
    abstract compareTo(other: DataTable): number;
    abstract append(src: DataTable): void;
    abstract makeImmutable(): DataTable;
    abstract cloneIfImmutable(): DataTable;
    abstract isImmutable(): boolean;
    abstract isSimple(): boolean;
    abstract close(): void;
}
