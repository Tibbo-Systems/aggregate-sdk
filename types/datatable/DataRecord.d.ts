import StringEncodable from '../util/StringEncodable';
import StringBuilder from '../util/java/StringBuilder';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import JObject from '../util/java/JObject';
import FieldFormat from './FieldFormat';
import DataTable from './DataTable';
import QueryCondition from './QueryCondition';
import Data from '../data/Data';
import TableFormat from './TableFormat';
export default class DataRecord extends JObject implements StringEncodable {
    private static readonly ELEMENT_ID;
    private data;
    private format;
    private table;
    private id;
    constructor(tableFormat: TableFormat | null);
    /**
     * Constructs a <code>DataRecord</code> with specified <code>TableFormat</code> and fills it with data field-by-field.
     */
    static createAndFill(tableFormat: TableFormat, ...data: Array<any>): DataRecord;
    static createWithData(tableFormat: TableFormat, dataString: string, settings: ClassicEncodingSettings, validate: boolean, fieldNamesInData: Array<string> | null): DataRecord;
    private setData;
    setId(id: string | null): DataRecord;
    /**
     * Adds new Boolean to the record.
     */
    addBoolean(val: boolean | null): DataRecord;
    /**
     * Adds new Color to the record.
     */
    /**
     * Adds new value to the record.
     */
    addValue(value: any): DataRecord;
    /**
     * Adds new Data to the record.
     */
    addData(val: Data): DataRecord;
    /**
     * Adds new DataTable to the record.
     */
    addDataTable(val: DataTable | null): DataRecord;
    /**
     * Adds new Date to the record.
     */
    addDate(val: Date): DataRecord;
    /**
     * Adds new Double to the record.
     */
    addDouble(val: number): DataRecord;
    /**
     * Adds new String to the record.
     */
    addString(val: string | null): DataRecord;
    /**
     * Adds new Float to the record.
     */
    addFloat(val: number): DataRecord;
    /**
     * Sets value of field with specified index to <code>value</code>.
     */
    setValueSmart(valueBy: number | string, value: JObject): DataRecord;
    toString(): string;
    /**
     * Sets value of field with specified index to <code>value</code>.
     */
    setValue(nameOrIndex: number | string, value: any, validate?: boolean): DataRecord;
    clone(): DataRecord;
    cloneFormatFromTable(): void;
    dataAsString(showFieldNames: boolean, showHiddenFields: boolean, showPasswords?: boolean): string;
    valueAsString(name: string, showFieldNames: boolean, showHiddenFields: boolean, showPasswords: boolean): string;
    getTable(): DataTable | null;
    setTable(table: DataTable | null): void;
    private ensureMutable;
    private checkNumberOfDataFieldsSet;
    /**
     * Returns value of String field with specified name or index.
     */
    getString(valueBy: number | string): string;
    /**
     * Adds new Integer to the record.
     */
    addInt(val: number): DataRecord;
    /**
     * Adds new Long to the record.
     */
    addLong(val: number | null): DataRecord;
    /**
     * Returns value of Integer field with specified name or index.
     */
    getInt(valueBy: number | string): number;
    /**
     * Returns value of Long field with specified index.
     */
    getLong(valueBy: number | string): number;
    /**
     * Returns value of Boolean field with specified name or index.
     */
    getBoolean(valueBy: number | string): boolean;
    getId(): string | null;
    getValue(searchBy: number | string): any;
    getValueAsString(searchBy: number | string): string | null;
    /**
     * Returns textual description of field value. The description is taken from selection values list specified in table format.
     */
    getValueDescription(name: string): string | null;
    private getValueByFieldFormat;
    private isTableImmutable;
    encodeDataTable(useVisibleSeparators: boolean): string;
    getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings): string;
    encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder;
    /**
     * Returns true if record has field with specified name.
     */
    hasField(name: string): boolean;
    /**
     * Returns true if record has field with specified name.
     */
    meetToCondition(condition: QueryCondition): boolean;
    /**
     * Constructs new <code>DataTable</code> and adds this record to it.
     */
    wrap(): DataTable;
    /**
     * Returns value of Data field with specified index or name.
     */
    getData(valueBy: number | string): Data;
    /**
     * Returns value of DataTable field with specified index.
     */
    getDataTable(searchBy: number | string): DataTable;
    /**
     * Returns value of Date field with specified name.
     */
    getDate(searchBy: number | string): Date;
    /**
     * Returns value of Double field with specified index.
     */
    getDouble(searchBy: number | string): number;
    /**
     * Returns value of Float field with specified index.
     */
    getFloat(searchBy: number | string): number;
    /**
     * Returns format of the record.
     */
    getFormat(): TableFormat;
    /**
     * Returns format of field with specified index.
     */
    getFieldFormat(searchBy: number | string): FieldFormat<any>;
    setFormat(format: TableFormat): void;
    /**
     * Returns index of field with specified name or throws an IllegalArgumentException if field is not found.
     */
    private findIndex;
    /**
     * Returns number of fields in the record.
     */
    getFieldCount(): number;
    equals(obj: any): boolean;
}
