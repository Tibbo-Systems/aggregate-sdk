import DataTable from './DataTable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import KnownFormatCollector from './encoding/KnownFormatCollector';
import StringBuilder from '../util/java/StringBuilder';
import Element from '../util/Element';
import DataRecord from './DataRecord';
import Log from '../Log';
import FormatCache from './encoding/FormatCache';
import FieldFormat from './FieldFormat';
import DataTableQuery from './DataTableQuery';
import JObject from '../util/java/JObject';
import TableFormat from './TableFormat';
import DateFieldFormat from './field/DateFieldFormat';
import QueryCondition from './QueryCondition';
import DataTableSorter from './DataTableSorter';
import SortOrder from './SortOrder';
import Util from '../util/Util';
import CallerController from '../context/CallerController';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';
import FieldValidator from './validator/FieldValidator';
import Expression from '../expression/Expression';
import Evaluator from '../expression/Evaluator';
import DefaultReferenceResolver from '../expression/DefaultReferenceResolver';
import Reference from '../expression/Reference';
import AbstractReferenceResolver from '../expression/AbstractReferenceResolver';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import DataTableUtils from './DataTableUtils';
import ElementList from '../util/ElementList';
import FieldConstants from './field/FieldConstants';

export default abstract class AbstractDataTable extends DataTable {
  private static readonly ELEMENT_FORMAT: string = 'F';
  private static readonly ELEMENT_FORMAT_ID: string = 'D';
  private static readonly ELEMENT_QUALITY: string = 'Q';
  private static readonly ELEMENT_TIMESTAMP: string = 'T';
  private static readonly ELEMENT_INVALIDATOR: string = 'I';

  public static readonly ELEMENT_ID: string = 'C';

  static readonly ELEMENT_RECORD: string = 'R';
  static readonly ELEMENT_FIELD_NAME: string = 'N';

  public static DEFAULT_FORMAT: TableFormat = new TableFormat();

  private quality: number | null = null;
  private timestamp: Date | null = null;
  private invalidationMessage: string | null = null;
  protected immutable = false;
  protected id: number | null = null;
  protected namingEvaluator: Evaluator | null = null;
  protected format: TableFormat = AbstractDataTable.DEFAULT_FORMAT;

  public isImmutable(): boolean {
    return this.immutable;
  }

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

  public getRecordById(id: string | null): DataRecord | null {
    if (id == null) {
      return null;
    }

    for (const rec of this) {
      if (rec != null) {
        if (rec.getId() != null && rec.getId() === id) {
          return rec;
        }
      }
    }

    return null;
  }

  removeRecord(index: number): DataRecord {
    return this.removeRecordImpl(index);
  }

  protected abstract removeRecordImpl(index: number): DataRecord;

  public abstract removeRecords(rec: DataRecord): void;

  public abstract reorderRecord(record: DataRecord, index: number): void;

  abstract getEncodedRecordsOrTableID(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): void;

  /**
   * Returns number of fields in the table.
   */
  public getFieldCount(): number {
    return this.format.getFieldCount();
  }

  /**
   * Returns format of the table.
   */
  public getFormat(): TableFormat {
    return this.format;
  }

  public getFieldFormat(name: number | string): FieldFormat<any> {
    return this.getFormat().getField(name);
  }

  abstract setFormat(format: TableFormat | null): DataTable;

  public substituteFormat(format: TableFormat): boolean {
    if (!Util.equals(format, this.format)) {
      return false;
    }

    format.makeImmutable(this);

    this.format = format;
    return true;
  }

  public getId(): number | null {
    return this.id;
  }

  abstract setId(id: number | null): void;

  public hasField(field: string): boolean {
    return this.format.hasField(field);
  }

  public encodeToString(): string {
    return this.encodeWithSettings(new ClassicEncodingSettings(false));
  }

  validate(context: Context<any, any>, contextManager: ContextManager<any> | null, caller?: CallerController): void {
    if (this.isInvalid()) {
      throw new Error(this.invalidationMessage || '');
    }

    for (const tv of this.getFormat().getTableValidators()) {
      tv.validate(this);
    }
    for (const rec of this) {
      for (const rv of this.getFormat().getRecordValidators()) {
        if (rec != null) rv.validate(this, rec);
      }
      for (const ff of this.getFormat()) {
        const fvs: Array<FieldValidator<any>> | null = ff.getValidators();
        if (fvs != null) {
          for (const fv of fvs) {
            try {
              if (rec != null) fv.validate(context, contextManager, caller, rec.getValue(ff.getName()));
            } catch (e) {
              throw new Error("Error validating value of field '" + ff.toString() + "': " + e);
            }
          }
        }
      }
    }
    for (const ff of this.getFormat()) {
      if (ff.getType() === FieldConstants.DATATABLE_FIELD) {
        for (const r of this) {
          if (r != null) {
            const rec: DataRecord = r as DataRecord;
            const nested: DataTable | null = rec.getDataTable(ff.getName());
            if (nested != null) {
              nested.validate(context, contextManager, caller);
            }
          }
        }
      }
    }
  }

  abstract setRecord(index: number, record: DataRecord): DataTable;

  swapRecords(index1: number, index2: number): void {
    this.ensureMutable();

    const r1: DataRecord = this.getRecord(index1);
    const r2: DataRecord = this.getRecord(index2);

    this.setRecord(index1, r2);
    this.setRecord(index2, r1);
  }

  public isInvalid(): boolean {
    return this.invalidationMessage != null;
  }

  public setInvalidationMessage(invalidationMessage: string | null) {
    this.ensureMutable();

    this.invalidationMessage = invalidationMessage;
  }

  public getInvalidationMessage(): string {
    return this.invalidationMessage || '';
  }

  encode(finalSB: StringBuilder = new StringBuilder(), settings: ClassicEncodingSettings, isTransferEncode = false, encodeLevel: number): StringBuilder {
    if (!settings) {
      settings = new ClassicEncodingSettings(isTransferEncode);
    }

    let formatId: number | null = null,
      isKnown = false,
      formatWasInserted = false,
      needToInsertFormat: boolean = settings != null && settings.isEncodeFormat();

    const collector: KnownFormatCollector | null = settings != null ? settings.getKnownFormatCollector() : null;

    if (needToInsertFormat) {
      if (this.getFormat().getFieldCount() > 0 && settings.getFormatCache() != null) {
        formatId = (settings.getFormatCache() as FormatCache).addIfNotExists(this.getFormat());

        if (collector != null) {
          needToInsertFormat = false;

          if (formatId != null && collector.isKnown(formatId) && collector.isMarked(formatId)) {
            // Format is known - inserting ID only
            new Element(AbstractDataTable.ELEMENT_FORMAT_ID, formatId.toString()).encode(finalSB, settings, isTransferEncode, encodeLevel);

            isKnown = true;
          } else {
            const oldEncodeFormat: boolean = settings.isEncodeFormat();
            try {
              settings.setEncodeFormat(true);

              // Format is not known - inserting both format and ID
              Element.createFromStringEncodable(AbstractDataTable.ELEMENT_FORMAT, this.getFormat()).encode(finalSB, settings, isTransferEncode, encodeLevel);
              new Element(AbstractDataTable.ELEMENT_FORMAT_ID, formatId != null ? formatId.toString() : null).encode(finalSB, settings, isTransferEncode, encodeLevel);

              formatWasInserted = true;
            } finally {
              settings.setEncodeFormat(oldEncodeFormat);
            }
          }
        }
      }

      if (needToInsertFormat) {
        const oldEncodeFormat: boolean = settings.isEncodeFormat();
        try {
          settings.setEncodeFormat(true);

          Element.createFromStringEncodable(AbstractDataTable.ELEMENT_FORMAT, this.getFormat()).encode(finalSB, settings, isTransferEncode, encodeLevel);

          formatWasInserted = true;
        } finally {
          settings.setEncodeFormat(oldEncodeFormat);
        }
      }
    }

    const oldEncodeFormat: boolean | null = settings != null ? settings.isEncodeFormat() : null;
    try {
      if (settings != null && formatWasInserted) {
        settings.setEncodeFormat(false);
      }

      this.getEncodedData(finalSB, settings, isTransferEncode, encodeLevel + 1);
    } finally {
      if (oldEncodeFormat != null) {
        settings.setEncodeFormat(oldEncodeFormat);
      }
    }

    if (this.isInvalid()) {
      new Element(AbstractDataTable.ELEMENT_FORMAT, this.invalidationMessage).encode(finalSB, settings, isTransferEncode, encodeLevel);
    }

    if (!isKnown && formatId != null && collector != null) {
      // Marking format as known
      collector.makeKnown(formatId, true);
    }

    return finalSB;
  }

  public encodeWithSettings(settings: ClassicEncodingSettings): string {
    const encodeString = this.encode(new StringBuilder(), settings, false, 0);
    return encodeString.toString();
  }

  public encodeWithSeparators(useVisibleSeparators: boolean): string {
    return this.encodeWithSettings(new ClassicEncodingSettings(useVisibleSeparators));
  }

  public getEncodedData(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder {
    const encodeFieldNames: boolean = settings == null || settings.isEncodeFieldNames();

    if (encodeFieldNames) {
      for (let i = 0; i < this.format.getFieldCount(); i++) {
        const field: FieldFormat<any> | null = this.format.getField(i);
        new Element(AbstractDataTable.ELEMENT_FIELD_NAME, field === null ? null : field.getName()).encode(finalSB, settings, isTransferEncode, encodeLevel);
      }
    }

    this.getEncodedRecordsOrTableID(finalSB, settings, isTransferEncode, encodeLevel);

    if (this.quality != null) {
      new Element(AbstractDataTable.ELEMENT_QUALITY, this.quality.toString()).encode(finalSB, settings, isTransferEncode, encodeLevel);
    }

    if (this.timestamp != null) {
      new Element(AbstractDataTable.ELEMENT_TIMESTAMP, DateFieldFormat.dateToString(this.timestamp)).encode(finalSB, settings, isTransferEncode, encodeLevel);
    }

    return finalSB;
  }

  public getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings): string {
    return this.getEncodedData(new StringBuilder(), settings, false, 1).toString();
  }

  rec(): DataRecord {
    return this.getRecord(0);
  }

  getValue(): any {
    return this;
  }

  public async getDescription(): Promise<string | null> {
    const namingExpression: Expression | null = this.getNamingExpression();

    if (namingExpression == null || this.getRecordCount() == 0) {
      return this.toDefaultString();
    }

    const evaluator: Evaluator = this.ensureEvaluator();

    let name = null;

    try {
      name = await evaluator.evaluate(namingExpression);
    } catch (ex) {
      // Log.CORE.info("Error evaluating naming expression of table '" + this.toDefaultString() + "'", ex); //TODO: FIX AGG-9961
      return this.toDefaultString();
    }

    return name == null ? null : name.toString();
  }

  private getNamingExpression(): Expression | null {
    return this.format == null ? null : this.format.getNamingExpression();
  }

  private ensureEvaluator(): Evaluator {
    if (this.namingEvaluator == null) {
      const defaultResolver: DefaultReferenceResolver = new DefaultReferenceResolver();
      defaultResolver.setDefaultTable(this);

      this.namingEvaluator = new Evaluator(null, null, this);

      const dataAsStringFunction = this.dataAsString.bind(this);
      const referenceResolver = new (class DataTableReferenceResolver extends AbstractReferenceResolver {
        resolveReference(ref: Reference, environment: EvaluationEnvironment): any {
          if (DataTableUtils.NAMING_ENVIRONMENT_SHORT_DATA === ref.getField()) {
            return dataAsStringFunction(false, false);
          }

          if (DataTableUtils.NAMING_ENVIRONMENT_FULL_DATA === ref.getField()) {
            return dataAsStringFunction(true, false);
          }

          return null;
        }
      })();
      this.namingEvaluator.setResolver(Reference.SCHEMA_ENVIRONMENT, referenceResolver);
    }

    return this.namingEvaluator as Evaluator;
  }

  public dataAsString(showFieldNames = true, showHiddenFields = false, showPasswords = true): string {
    return this.dataAsStringWithParams(showFieldNames, showHiddenFields, showPasswords);
  }

  protected abstract dataAsStringWithParams(showFieldNames: boolean, showHiddenFields: boolean, showPasswords: boolean): string;

  public abstract toDefaultString(): string;

  public fixRecords(): void {
    this.getFormat().fixRecords(this);
  }

  public abstract isOneCellTable(): boolean;

  public conform(rf: TableFormat): boolean {
    return this.conformMessage(rf) == null;
  }

  public conformMessage(rf: TableFormat): string | null {
    if (this.getRecordCount() != null && this.getRecordCount() < rf.getMinRecords()) {
      return 'Number of records too small: need ' + rf.getMinRecords() + ' or more, found ' + this.getRecordCount();
    }

    if (this.getRecordCount() != null && this.getRecordCount() > rf.getMaxRecords()) {
      return 'Number of records too big: need ' + rf.getMaxRecords() + ' or less, found ' + this.getRecordCount();
    }

    return this.getFormat().extendMessage(rf);
  }

  public selectAll(query: DataTableQuery): Array<DataRecord> {
    const r: Array<DataRecord> = new Array<DataRecord>();

    for (const rec of this) {
      let meet = true;

      for (const cond of query.getConditions()) {
        if (rec != null) {
          if (!rec.meetToCondition(cond)) {
            meet = false;
          }
        }
      }

      if (meet && rec != null) {
        r.push(rec);
      }
    }

    return r;
  }

  public abstract findIndexUsingQuery(query: DataTableQuery): number | null;

  public findIndex(field: string, value: any): number | null {
    return this.findIndexUsingQuery(new DataTableQuery(new QueryCondition(field, value)));
  }

  public findIndexUsingRecord(record: DataRecord): number | null {
    let index = 0;
    for (const currentRecord of this) {
      if (currentRecord != null) {
        if (currentRecord.equals(record)) {
          return index;
        }
      }
      index++;
    }

    return null;
  }

  abstract sort(sorter: DataTableSorter): void;

  sortWithParams(field: string, ascending: boolean): void {
    this.sort(new DataTableSorter(new SortOrder(field, ascending)));
  }

  public selectByQuery(query: DataTableQuery): DataRecord | null {
    for (const rec of this) {
      let meet = true;

      for (const cond of query.getConditions()) {
        if (!(rec as DataRecord).meetToCondition(cond as QueryCondition)) {
          meet = false;
        }
      }

      if (meet) {
        return rec;
      }
    }

    return null;
  }

  public select(field: string, value: any): DataRecord | null {
    return this.selectByQuery(new DataTableQuery(new QueryCondition(field, value)));
  }

  getTimestamp(): Date | null {
    return this.timestamp;
  }

  setTimestamp(timestamp: Date): void {
    this.ensureMutable();

    this.timestamp = timestamp;
  }

  public setQuality(quality: number): void {
    this.ensureMutable();

    this.quality = quality;
  }

  public getQuality(): number | null {
    return this.quality;
  }

  public splitFormat(): void {
    for (const rec of this) {
      if (rec != null) {
        rec.cloneFormatFromTable();
      }
    }
  }

  public joinFormats(): void {
    for (const rec of this) {
      if (rec != null) rec.setFormat(this.getFormat());
    }
  }

  public compareTo(other: DataTable): number {
    const dt: AbstractDataTable = other as AbstractDataTable;
    return this.dataAsString().localeCompare(dt.dataAsString());
  }

  public append(src: DataTable): void {
    for (const rec of src) {
      if (rec != null) {
        this.addRecordFromRecord(rec);
      }
    }
  }

  abstract makeImmutable(): DataTable;

  ensureMutable(): void {
    if (this.immutable) {
      if (Log.DATATABLE.isDebugEnabled()) {
        Log.DATATABLE.warn('Attempt to change immutable table', new Error());
      } else {
        Log.DATATABLE.warn('Attempt to change immutable table');
      }
      throw new Error('Immutable');
    }
  }

  public validateRecord(record: DataRecord): void {
    const recordValidators = this.getFormat().getRecordValidators();
    recordValidators.forEach((rv) => {
      rv.validate(this, record);
    });
  }

  abstract equals(obj: JObject | null): boolean;

  cloneIfImmutable(): DataTable {
    if (this.isImmutable()) {
      return this.clone();
    }

    return this;
  }

  close(): void {}

  abstract isSimple(): boolean;

  public accomplishConstruction(elements: ElementList, settings: ClassicEncodingSettings, validate: boolean): void {
    if (elements == null) return;

    let found = false;
    let encodedFormat: string | null = null;
    let fieldNames: Array<string> | null = null;

    for (const el of elements) {
      const elementName = el.getName();
      const value = el.getValue();
      if (elementName !== null) {
        if (Util.equals(elementName, AbstractDataTable.ELEMENT_FORMAT_ID)) {
          const formatId = Number(value);
          if (formatId % 1 !== 0) {
            throw new Error('Error in AbstractDataTable, accomplishConstruction function. `formatId` should be an integer number(not floating)');
          }

          const formatCache = settings.getFormatCache();
          if (formatCache == null) {
            throw new Error("Can't use format ID - format cache not found");
          }

          if (encodedFormat != null) {
            // If format was already found in the encoded data
            const format: TableFormat = TableFormat.createWithFormatAndSettings(encodedFormat, settings, validate);
            formatCache && formatCache.put(formatId, format);
            continue;
          }

          const format = formatCache.get(formatId);

          if (format == null) {
            throw new (class ErrorFormatId extends Error {
              private readonly formatId: number;
              constructor(formatId: number, message: string) {
                super(message);
                this.formatId = formatId;
              }

              getFormatId() {
                return this.formatId;
              }
            })(formatId, 'Format with specified ID not found in the cache: ' + formatId);
          }

          this.setFormat(format);

          found = true;

          continue;
        } else if (Util.equals(elementName, AbstractDataTable.ELEMENT_FORMAT)) {
          encodedFormat = el.getValue();
          if (encodedFormat != null) {
            // If format was already found in the encoded data
            this.setFormat(TableFormat.createWithFormatAndSettings(encodedFormat, settings, validate));
            found = true;
            continue;
          } else {
            throw new Error('Error in AbstractDataTable, accomplishConstruction function. `encodedFormat` is null');
          }
        } else if (Util.equals(elementName, AbstractDataTable.ELEMENT_RECORD)) {
          // Using table's format if encodedFormat is not NULL (i.e. was found in the encoded data)
          const format: TableFormat | null = found ? this.getFormat() : settings != null ? settings.getFormat() : null;

          if (format === null) {
            throw new Error('Table format is neither found in encoded table nor provided by decoding environment');
          }

          if (value != null) {
            // If format was already found in the encoded data
            this.addRecordFromRecord(DataRecord.createWithData(format, value, settings, validate, fieldNames));
            continue;
          } else {
            throw new Error('Error in AbstractDataTable, accomplishConstruction function. `value` is null');
          }
        } else if (Util.equals(elementName, AbstractDataTable.ELEMENT_FIELD_NAME)) {
          if (fieldNames == null) {
            fieldNames = new Array<any>();
          }

          if (value != null) {
            // If format was already found in the encoded data
            fieldNames.push(value);
          } else {
            throw new Error('Error in AbstractDataTable, accomplishConstruction function. `encodedFormat` is null');
          }
        } else if (Util.equals(elementName, AbstractDataTable.ELEMENT_ID)) {
          this.id = Number(value);
        } else {
          this.decodeAdvancedElement(el);
        }
      }
    }
  }

  toString(): string {
    //TODO promise
    //if (this.getNamingExpression() != null && this.getNamingExpression()?.getText().length !== 0) {
    //return this.getDescription() ?? '';
    //} else {
    return this.toDefaultString();
    //}
  }

  decodeAdvancedElement(el: Element): void {
    const elementName = el.getName();
    const elementValue = el.getValue();
    if (elementName === null || elementValue === null) return;

    if (Util.equals(elementName, AbstractDataTable.ELEMENT_TIMESTAMP)) {
      if (elementValue.length > 4 && elementValue.charAt(4) == '-') {
        this.timestamp = DateFieldFormat.dateFromString(elementValue);
      } else {
        Util.convertToDate(el.getValue(), false, false);
      }
    } else if (Util.equals(elementName, AbstractDataTable.ELEMENT_QUALITY)) {
      this.quality = Util.convertToNumber(elementValue, false, false);
    } else if (Util.equals(elementName, AbstractDataTable.ELEMENT_INVALIDATOR)) {
      this.invalidationMessage = elementValue;
    }
  }

  [Symbol.iterator]() {
    let pointer = 0;
    const records = this.getRecords();

    return {
      next(): IteratorResult<DataRecord | null> {
        if (pointer < records.length) {
          return {
            done: false,
            value: records[pointer++],
          };
        } else {
          return {
            done: true,
            value: null,
          };
        }
      },
    };
  }
}
