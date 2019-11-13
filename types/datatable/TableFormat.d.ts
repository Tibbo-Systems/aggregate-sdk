import JObject from '../util/java/JObject';
import StringEncodable from '../util/StringEncodable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import StringBuilder from '../util/java/StringBuilder';
import Binding from '../binding/Binding';
import Expression from '../expression/Expression';
import RecordValidator from './validator/RecordValidator';
import TableValidator from './validator/TableValidator';
import DataTable from './DataTable';
import FieldFormat from './FieldFormat';
export default class TableFormat extends JObject implements StringEncodable, Iterable<FieldFormat<any>> {
    static readonly EMPTY_FORMAT: TableFormat;
    private fields;
    private id;
    private immutable;
    private bindingsEditable;
    static readonly DEFAULT_MIN_RECORDS: number;
    static readonly DEFAULT_MAX_RECORDS: number;
    private static readonly ELEMENT_FLAGS;
    private static readonly ELEMENT_TABLE_VALIDATORS;
    private static readonly ELEMENT_RECORD_VALIDATORS;
    private static readonly ELEMENT_BINDINGS;
    private static readonly ELEMENT_MIN_RECORDS;
    private static readonly ELEMENT_MAX_RECORDS;
    private static readonly ELEMENT_NAMING;
    static readonly TABLE_VALIDATOR_KEY_FIELDS: string;
    static readonly TABLE_VALIDATOR_EXPRESSION: string;
    static readonly RECORD_VALIDATOR_KEY_FIELDS: string;
    private static readonly REORDERABLE_FLAG;
    private static readonly UNRESIZEBLE_FLAG;
    private static readonly BINDINGS_EDITABLE_FLAG;
    private reorderable;
    private unresizable;
    private minRecords;
    private maxRecords;
    private fieldLookup;
    private recordValidators;
    private tableValidators;
    private bindings;
    private namingExpression;
    constructor(minRecords?: number, maxRecords?: number, fieldFormat?: string | FieldFormat<any>);
    static createWithFormat(fieldFormat?: FieldFormat<any>): TableFormat;
    static createWithReorderable(reorderable: boolean): TableFormat;
    static createWithFormatAndSettings(format: string, settings: ClassicEncodingSettings, validate?: boolean): TableFormat;
    /**
     * Adds new binding.
     */
    addBinding(target: string | Binding, expression?: string): void;
    addFieldBy(type: string, name: string, description: string, defaultValue: JObject, nullable: boolean, group: string): TableFormat;
    addFieldWithTypeAndName(type: string, name: string, index?: number): TableFormat;
    /**
     * Adds new field to format at the specified index.
     *
     * Note, that modifying table format of an existing table by inserting fields anywhere except appending them to the end may cause <code>DataTable</code> to become invalid.
     */
    addField(ff: FieldFormat<any> | string, index?: number): TableFormat;
    /**
     * Adds new fields to format.
     */
    addFields(fieldFormats: Array<FieldFormat<any>>): TableFormat;
    /**
     * Returns modifiable list of record validators.
     */
    getRecordValidators(): Array<RecordValidator>;
    /**
     * Returns minimal number of records allowed by format.
     */
    getMinRecords(): number;
    /**
     * Removes the binding.
     */
    removeBinding(binding: Binding): void;
    /**
     * Removes field from format.
     */
    removeField(fieldName: string): TableFormat;
    /**
     * Renames a field.
     */
    renameField(oldName: string, newName: string): TableFormat;
    /**
     * Resets allowed number of records to defaults.
     */
    resetAllowedRecords(): TableFormat;
    makeImmutable(immutabilizer: DataTable | null): void;
    getField(searchBy: number | string): FieldFormat<any>;
    /**
     * Returns name of field at the specified index.
     */
    getFieldName(index: number): string;
    /**
     * Adds new table validator to the format.
     */
    addTableValidator(tv: TableValidator): void;
    /**
     * Adds new record validator to the format.
     */
    addRecordValidator(rv: RecordValidator): void;
    /**
     * Returns maximal number of records allowed by format.
     */
    getMaxRecords(): number;
    /**
     * Returns number of fields in table format.
     */
    getFieldCount(): number;
    encodeDataTable(useVisibleSeparators: boolean): string;
    getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings, isTransferEncode?: boolean, encodeLevel?: number): string;
    encodeToString(settings: ClassicEncodingSettings): string;
    encodeUseSeparator(useVisibleSeparators: boolean): string;
    encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder;
    private getEncodedFlags;
    isReplicated(): boolean;
    isSingleCell(): boolean;
    isSingleField(): boolean;
    isEmpty(): boolean;
    isGrouped(): boolean;
    isBindingsEditable(): boolean;
    private static encAppend;
    toString(): string;
    private getEncodedBindings;
    private getEncodedRecordValidators;
    getEncodedTableValidators(settings: ClassicEncodingSettings): string;
    getId(): number | null;
    getTableValidators(): Array<TableValidator>;
    isImmutable(): boolean;
    setId(id: number): void;
    /**
     * Returns index of field with the specified name or -1 if it does not exist.
     */
    getFieldIndex(name: string): number;
    /**
     * Returns true if table format contains field with specified name.
     */
    hasField(name: string): boolean;
    /**
     * Returns true if table format contains fields of the specified type.
     */
    hasFields(type: string): boolean;
    getFieldLookup(): Map<string, number | null>;
    /**
     * Returns type of field at the specified index.
     */
    getFieldType(index: number): string;
    /**
     * Returns list of key field names.
     */
    getKeyFields(): Array<string>;
    /**
     * Returns true if format allows record reordering.
     */
    isReorderable(): boolean;
    isUnresizable(): boolean;
    /**
     * Returns naming expression.
     */
    getNamingExpression(): Expression | null;
    /**
     * Returns modifiable list of table bindings.
     */
    getBindings(): Array<Binding>;
    getFields(): Array<FieldFormat<any>>;
    /**
     * Returns true if this format extends the <code>other</code> format.
     */
    extend(other: TableFormat): boolean;
    extendMessage(other: TableFormat): string | null;
    fixRecords(table: DataTable): void;
    setMinRecords(minRecords: number): TableFormat;
    setMaxRecords(maxRecords: number): TableFormat;
    setNamingExpressionFromExpr(namingExpression: Expression): TableFormat;
    setNamingExpression(namingExpression: string): TableFormat;
    setReorderable(reorderable: boolean): TableFormat;
    setUnresizable(unresizable: boolean): void;
    setBindingsEditable(bindingsEditable: boolean): void;
    /**
     * Set the bindings.
     */
    setBindings(in_bindings: Array<Binding>): void;
    createTableValidators(source: string | null, settings: ClassicEncodingSettings): void;
    private createRecordValidators;
    private createBindings;
    private createNaming;
    clone(): TableFormat;
    equals(obj: JObject | null): boolean;
    isAdvanced(): boolean;
    isSingleRecord(): boolean;
    hasReadOnlyFields(): boolean;
    iterator(): Iterator<FieldFormat<any>>;
    [Symbol.iterator](): IterableIterator<FieldFormat<any>>;
}
