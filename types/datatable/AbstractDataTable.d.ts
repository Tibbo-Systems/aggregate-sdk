import DataTable from './DataTable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import StringBuilder from '../util/java/StringBuilder';
import Element from '../util/Element';
import DataRecord from './DataRecord';
import FieldFormat from './FieldFormat';
import DataTableQuery from './DataTableQuery';
import JObject from '../util/java/JObject';
import TableFormat from './TableFormat';
export default abstract class AbstractDataTable extends JObject implements DataTable {
    private static readonly ELEMENT_FORMAT;
    private static readonly ELEMENT_FORMAT_ID;
    private static readonly ELEMENT_QUALITY;
    private static readonly ELEMENT_TIMESTAMP;
    private static readonly ELEMENT_INVALIDATOR;
    static readonly ELEMENT_ID: string;
    static readonly ELEMENT_RECORD: string;
    static readonly ELEMENT_FIELD_NAME: string;
    private static readonly DEFAULT_ESTIMATE_RECORD_COUNT;
    private quality;
    private timestamp;
    private invalidationMessage;
    protected immutable: boolean;
    protected id: number | null;
    protected namingEvaluator: Evaluator | null;
    static DEFAULT_FORMAT: TableFormat;
    format: TableFormat;
    isImmutable(): boolean;
    abstract getRecordCount(): number;
    abstract get(): JObject;
    abstract addRecord(): DataRecord;
    abstract addRecordFromRecord(record: DataRecord): DataTable;
    abstract addRecordWith(...fieldValues: any[]): DataRecord;
    abstract getRecords(): Array<DataRecord>;
    /**
     * Returns record with specified index.
     */
    abstract getRecord(num: number): DataRecord;
    getRecordById(id: string | null): DataRecord | null;
    removeRecord(index: number): DataRecord;
    protected abstract removeRecordImpl(index: number): DataRecord;
    abstract removeRecords(rec: DataRecord): void;
    abstract reorderRecord(record: DataRecord, index: number): void;
    abstract getEncodedRecordsOrTableID(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): void;
    /**
     * Returns number of fields in the table.
     */
    getFieldCount(): number;
    /**
     * Returns format of the table.
     */
    getFormat(): TableFormat;
    getFieldFormat(name: number | string): FieldFormat<any>;
    abstract setFormat(format: TableFormat | null): DataTable;
    substituteFormat(format: TableFormat): boolean;
    getId(): number | null;
    abstract setId(id: number | null): void;
    hasField(field: string): boolean;
    encodeToString(): string;
    validate(context: Context<any, any>, contextManager: ContextManager<any> | null, caller: CallerController | null): void;
    abstract setRecord(index: number, record: DataRecord): DataTable;
    swapRecords(index1: number, index2: number): void;
    isInvalid(): boolean;
    setInvalidationMessage(invalidationMessage: string | null): void;
    getInvalidationMessage(): string;
    encode(finalSB: StringBuilder | undefined, settings: ClassicEncodingSettings, isTransferEncode: boolean | undefined, encodeLevel: number): StringBuilder | null;
    encodeDataTable(useVisibleSeparators?: boolean, settings?: ClassicEncodingSettings): string | null;
    getEncodedData(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder;
    getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings): string;
    rec(): DataRecord;
    getValue(): any;
    getDescription(): string | null;
    private getNamingExpression;
    private ensureEvaluator;
    dataAsString(showFieldNames?: boolean, showHiddenFields?: boolean, showPasswords?: boolean): string;
    protected abstract dataAsStringWithParams(showFieldNames: boolean, showHiddenFields: boolean, showPasswords: boolean): string;
    abstract toDefaultString(): string;
    fixRecords(): void;
    abstract isOneCellTable(): boolean;
    conform(rf: TableFormat): boolean;
    conformMessage(rf: TableFormat): string | null;
    selectAll(query: DataTableQuery): Array<DataRecord>;
    abstract findIndexUsingQuery(query: DataTableQuery): number | null;
    findIndex(field: string, value: any): number | null;
    findIndexUsingRecord(record: DataRecord): number | null;
    abstract sort(sorter: DataTableSorter): void;
    sortWithParams(field: string, ascending: boolean): void;
    selectByQuery(query: DataTableQuery): DataRecord | null;
    select(field: string, value: any): DataRecord | null;
    getTimestamp(): Date | null;
    setTimestamp(timestamp: Date): void;
    setQuality(quality: number): void;
    getQuality(): number | null;
    splitFormat(): void;
    joinFormats(): void;
    compareTo(other: DataTable): number;
    append(src: DataTable): void;
    abstract makeImmutable(): DataTable;
    ensureMutable(): void;
    validateRecord(record: DataRecord): void;
    clone(): DataTable;
    abstract equals(obj: JObject | null): boolean;
    cloneIfImmutable(): DataTable;
    close(): void;
    abstract isSimple(): boolean;
    accomplishConstruction(elements: ElementList, settings: ClassicEncodingSettings, validate: boolean): void;
    decodeAdvancedElement(el: Element): void;
    [Symbol.iterator](): {
        next(): IteratorResult<DataRecord | null, any>;
    };
}
import DataTableSorter from './DataTableSorter';
import CallerController from '../context/CallerController';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';
import Evaluator from '../expression/Evaluator';
import ElementList from '../util/ElementList';
