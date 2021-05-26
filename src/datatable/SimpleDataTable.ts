import AbstractDataTable from './AbstractDataTable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import StringBuilder from '../util/java/StringBuilder';
import Element from '../util/Element';
import DataRecord from './DataRecord';
import JObject from '../util/java/JObject';
import TableFormat from './TableFormat';
import DataTable from './DataTable';
import Cres from '../Cres';
import Util from '../util/Util';
import DataTableSorter from './DataTableSorter';
import Comparable from '../util/java/Comparable';
import MessageFormat from '../util/java/MessageFormat';
import DataTableQuery from './DataTableQuery';
import FieldFormat from './FieldFormat';
import FieldConstants from './field/FieldConstants';
import CloneUtils from '../util/CloneUtils';

export default class SimpleDataTable extends AbstractDataTable implements Comparable<DataTable> {
  private records: Array<DataRecord> = new Array<DataRecord>();

  constructor(format?: TableFormat | null, emptyRecords?: number | boolean) {
    super();

    format && this.setFormat(format);

    let minimumRecords: number | null = null;
    if (Util.isNumber(emptyRecords)) {
      minimumRecords = emptyRecords as number;
    } else if (Util.isBoolean(emptyRecords) && emptyRecords) {
      minimumRecords = format ? format.getMinRecords() : 0;
    }

    if (minimumRecords != null) {
      for (let i = 0; i < minimumRecords; i++) {
        this.addEmptyRecord();
      }
    }
  }

  public static createSimpleDataTable(format: TableFormat, ...firstRowData: Array<any>): SimpleDataTable {
    const simpleDataTable = new SimpleDataTable(format);
    if (firstRowData.length > 0) {
      simpleDataTable.addRecordFromRecord(DataRecord.createAndFill(format, ...firstRowData));
    }

    return simpleDataTable;
  }

  /**
   * Sets new format for the table.
   *
   * Note, that resulting table is not checked for validity. Format of existing records may be incompatible with new format of table.
   */
  public setFormat(format: TableFormat | null): DataTable {
    if (format != null) {
      this.ensureMutable();

      format.makeImmutable(this);

      this.format = format;
    }

    return this;
  }

  public getRecordCount(): number {
    return this.records.length;
  }

  public getRecord(num: number): DataRecord {
    if (num < 0 || num >= this.records.length) throw new Error('index is out of range');
    return this.records[num];
  }

  public getRecords(): Array<DataRecord> {
    return this.records;
  }

  protected removeRecordImpl(index: number): DataRecord {
    this.ensureMutable();

    if (this.getRecordCount() <= this.format.getMinRecords()) {
      throw new Error('Cannot remove record: minimum number of records is reached: ' + this.format.getMinRecords());
    }

    const rec: DataRecord = this.records[index];
    this.records.splice(index, 1);
    return rec;
  }

  public removeRecords(rec: DataRecord): void {
    for (let i = this.records.length - 1; i >= 0; i--) {
      if (Util.equals(rec, this.records[i])) {
        this.removeRecordImpl(i);
      }
    }
  }

  public reorderRecord(record: DataRecord, index: number): void {
    this.ensureMutable();

    const oi: number = this.records.indexOf(record);

    if (oi === -1) {
      throw new Error('Record is not from this table');
    }

    const indexOf: number = this.records.findIndex((element) => element.equals(record));

    if (indexOf !== -1) {
      this.records.splice(indexOf, 1);
      const addedIndex = index - (oi < index ? 1 : 0);
      if (addedIndex < this.records.length) this.records[index - (oi < index ? 1 : 0)] = record;
      else this.records.push(record);
    }
  }

  public setId(id: number | null): void {
    this.ensureMutable();

    this.id = id;
  }

  public getEncodedRecordsOrTableID(finalSB: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): void {
    for (let i = 0; i < this.getRecordCount(); i++) {
      Element.createFromStringEncodable(SimpleDataTable.ELEMENT_RECORD, this.getRecord(i)).encode(finalSB, settings, isTransferEncode, encodeLevel);
    }
  }

  public get(): JObject {
    return this.getRecord(0).getValue(0);
  }

  private addEmptyRecord(): DataRecord {
    if (this.getFormat() == null) {
      throw new Error("Can't add empty record because format of data table was not set");
    }
    const record: DataRecord = new DataRecord(this.getFormat());
    this.addRecordImpl(null, record);
    return record;
  }

  public addRecord(): DataRecord {
    if (this.getFormat() == null) {
      throw new Error("Can't add empty record because format of data table was not set");
    }
    const record: DataRecord = new DataRecord(this.getFormat());
    this.addRecordImpl(null, record);
    return record;
  }

  public addRecordWith(...fieldValues: any[]): DataRecord {
    const rec: DataRecord = this.addRecord();
    for (const value of fieldValues) {
      rec.addValue(value);
    }
    return rec;
  }

  public addRecordFromRecord(record: DataRecord): DataTable {
    this.checkOrSetFormat(record);
    this.addRecordImpl(null, record);
    return this;
  }

  makeImmutable(): DataTable {
    if (this.immutable) {
      return this;
    }

    this.immutable = true;

    this.format.makeImmutable(this);

    this.makeSubtablesImmutable();

    return this;
  }

  private makeSubtablesImmutable() {
    if (this.getRecordCount() === 0) {
      return;
    }

    const dataTableFields: Array<number> = new Array<number>();

    for (let i = 0; i < this.format.getFieldCount(); i++) {
      const field: FieldFormat<any> = this.format.getField(i);

      if (field.getType() === FieldConstants.DATATABLE_FIELD) dataTableFields.push(i);
    }

    if (dataTableFields.length === 0) return;

    for (const record of this.records) {
      for (const index of dataTableFields) {
        const dataTable: DataTable = record.getDataTable(index);
        if (dataTable != null) {
          dataTable.makeImmutable();
        }
      }
    }
  }

  public setRecord(index: number, record: DataRecord): DataTable {
    this.ensureMutable();

    this.checkOrSetFormat(record);
    this.records[index].setTable(null);
    this.records[index] = record;
    record.setTable(this);
    return this;
  }

  public toDefaultString(): string {
    if (this.getRecordCount() === 1) {
      return this.dataAsString();
    } else {
      return MessageFormat.format(Cres.get().getString('dtTable'), this.getRecordCount());
    }
  }

  protected dataAsStringWithParams(showFieldNames: boolean, showHiddenFields: boolean, showPasswords: boolean): string {
    const res: StringBuilder = new StringBuilder();

    const recordSeparator: string = this.getFieldCount() > 1 ? ' | ' : ', ';

    for (let i = 0; i < this.getRecordCount(); i++) {
      if (i > 0) {
        res.append(recordSeparator);
      }

      const rec: DataRecord = this.getRecord(i);

      res.append(rec.dataAsString(showFieldNames, showHiddenFields, showPasswords));
    }

    return res.toString();
  }

  public isOneCellTable(): boolean {
    return this.getFieldCount() === 1 && this.getRecordCount() === 1;
  }

  public conformMessage(rf: TableFormat): string | null {
    if (this.getRecordCount() < rf.getMinRecords()) {
      return 'Number of records too small: need ' + rf.getMinRecords() + ' or more, found ' + this.getRecordCount();
    }

    if (this.getRecordCount() > rf.getMaxRecords()) {
      return 'Number of records too big: need ' + rf.getMaxRecords() + ' or less, found ' + this.getRecordCount();
    }

    return this.getFormat().extendMessage(rf);
  }

  findIndexUsingQuery(query: DataTableQuery): number | null {
    for (let i = 0; i < this.getRecordCount(); i++) {
      let meet = true;

      const rec: DataRecord = this.getRecord(i);

      for (const cond of query.getConditions()) {
        if (rec != null) {
          if (!rec.meetToCondition(cond)) {
            meet = false;
          }
        }
      }

      if (meet) {
        return i;
      }
    }
    return null;
  }

  sort(sorter: DataTableSorter): void {
    this.ensureMutable();

    this.records.sort((r1, r2) => {
      for (const order of sorter) {
        const v1: any = r1.getValue(order.getField());
        const v2: any = r2.getValue(order.getField());

        if (v1 == null && v2 != null) {
          return order.isAscending() ? -1 : 1;
        }

        if (v2 == null && v1 != null) {
          return order.isAscending() ? 1 : -1;
        }

        if ((Util.isNumber(v1) || Util.isBoolean(v1)) && (Util.isNumber(v2) || Util.isBoolean(v2))) {
          if (order.isAscending()) return v1 > v2 ? 1 : -1;
          return v1 > v2 ? -1 : 1;
        }

        //TODO check for primitive types
        if (Util.isComparable(v1) && Util.isComparable(v2)) {
          const comparable1: Comparable<any> = v1 as Comparable<any>;
          const comparable2: Comparable<any> = v2 as Comparable<any>;
          const res: number = comparable1.compareTo(comparable2);
          if (res !== 0) {
            return order.isAscending() ? res : -res;
          }
        }
      }

      return 0;
    });
  }

  private checkOrSetFormat(record: DataRecord): void {
    if (this.format.getFieldCount() != 0) {
      if (this.format != record.getFormat()) {
        const message: string | null = record.getFormat().extendMessage(this.format);
        if (message != null) {
          throw new Error("Format of new record ('" + record.getFormat() + "') differs from format of data table ('" + this.getFormat() + "'): " + message);
        }
      }
    } else {
      this.ensureMutable();

      this.format = record.getFormat();
    }
  }

  private addRecordImpl(index: number | null, record: DataRecord): void {
    this.ensureMutable();

    if (this.getRecordCount() >= this.format.getMaxRecords()) {
      throw new Error(Cres.get().getString('dtCannotAddRecord') + 'maximum number of records is reached: ' + this.format.getMaxRecords());
    }

    try {
      this.validateRecord(record);
    } catch (ex) {
      throw new Error(ex.message);
    }

    if (index != null) {
      this.records.splice(index, 0, record);
    } else {
      this.records.push(record);
    }

    record.setTable(this);
  }

  isSimple(): boolean {
    return true;
  }

  clone(): DataTable {
    const cl: SimpleDataTable = super.clone() as SimpleDataTable;

    cl.records = CloneUtils.deepClone(this.records) as Array<DataRecord>;

    for (const rec of cl.records) {
      rec.setTable(cl);
    }

    cl.namingEvaluator = null;

    cl.immutable = false;

    return cl;
  }

  equals(obj: any | null): boolean {
    if (obj == null) {
      return false;
    }

    if (!(obj instanceof SimpleDataTable)) {
      return false;
    }

    const other: SimpleDataTable = obj as SimpleDataTable;

    if (!this.format.equals(other.format)) {
      return false;
    }

    if (this.getRecordCount() !== other.getRecordCount()) {
      return false;
    }

    if (this.getQuality() !== other.getQuality()) {
      return false;
    }

    for (let i = 0; i < this.getRecordCount(); i++) {
      if (!this.getRecord(i).equals(other.getRecord(i))) {
        return false;
      }
    }

    return true;
  }

  public compareTo(other: DataTable): number {
    return Util.compareTo(this.dataAsString(), other.dataAsString());
  }
}
