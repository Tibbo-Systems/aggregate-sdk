import StringEncodable from '../util/StringEncodable';
import StringBuilder from '../util/java/StringBuilder';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import JObject from '../util/java/JObject';
import FieldFormat from './FieldFormat';
import Element from '../util/Element';
import DataTable from './DataTable';
import MessageFormat from '../util/java/MessageFormat';
import StringUtils from '../util/StringUtils';
import QueryCondition from './QueryCondition';
import Data from '../data/Data';
import Log from '../Log';
import Cres from '../Cres';
import TableFormat from './TableFormat';
import Util from '../util/Util';
import ElementList from '../util/ElementList';
import CloneUtils from '../util/CloneUtils';
import FieldConstants from './field/FieldConstants';
import DataTableFactory from './DataTableFactory';

export default class DataRecord extends JObject implements StringEncodable {
  private static readonly ELEMENT_ID: string = 'I';

  private data: Map<string, JObject | null> = new Map();
  private format: TableFormat = new TableFormat();
  private table: DataTable | null = null;
  private id: string | null = null;

  constructor(tableFormat: TableFormat | null) {
    super();

    if (tableFormat !== null) {
      tableFormat.makeImmutable(null);
      this.format = tableFormat;
    }
  }

  /**
   * Constructs a <code>DataRecord</code> with specified <code>TableFormat</code> and fills it with data field-by-field.
   */
  public static createAndFill(tableFormat: TableFormat, ...data: Array<any>): DataRecord {
    const dataRecord = new DataRecord(tableFormat);
    data.forEach(param => dataRecord.addValue(param));

    return dataRecord;
  }

  public static createWithData(tableFormat: TableFormat, dataString: string, settings: ClassicEncodingSettings, validate: boolean, fieldNamesInData: Array<string> | null): DataRecord {
    const dataRecord = new DataRecord(tableFormat);
    dataRecord.setData(dataString, settings, validate, fieldNamesInData);

    return dataRecord;
  }

  private setData(dataString: string, settings: ClassicEncodingSettings, validate: boolean, fieldNamesInData: Array<string> | null): void {
    let recs: ElementList | null = null;
    try {
      recs = StringUtils.elements(dataString, settings.isUseVisibleSeparators());
    } catch (ex) {
      Log.DATATABLE.warn(ex.message);
    }

    if (recs == null) return;

    let i = 0;
    for (const el of recs) {
      const elementName = el.getName();
      if (elementName !== null) {
        if (Util.equals(elementName, DataRecord.ELEMENT_ID)) {
          this.setId(el.getValue());
        } else {
          // This code exists for compatibility reason only
          const ff: FieldFormat<any> = this.format.getField(elementName);
          if (ff != null) {
            this.setValue(elementName, ff.valueFromEncodedString(el.getValue(), settings, validate), validate);
          }
        }
      } else {
        if (fieldNamesInData != null && fieldNamesInData.length > i) {
          const fieldName: string = fieldNamesInData[i];
          if (this.getFormat().hasField(fieldName)) {
            const value: JObject = this.format.getField(fieldName).valueFromEncodedString(el.getValue(), settings, validate);
            this.setValue(fieldName, value, validate);
          }
        } else if (i < this.format.getFieldCount()) {
          const value: any = this.format.getField(i).valueFromEncodedString(el.getValue(), settings, validate);
          this.setValue(i, value, validate);
        }
        i++;
      }
    }
  }

  public setId(id: string | null): DataRecord {
    this.ensureMutable();

    this.id = id;

    return this;
  }

  /**
   * Adds new Boolean to the record.
   */
  public addBoolean(val: boolean | null): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new Color to the record.
   */
  // TODO not implemented yet
  // public addColor(val: Color): DataRecord {
  //     if (!this.checkNumberOfDataFieldsSet(val)) {
  //         return this;
  //     }
  //
  //     return this.setValue(this.data.size, val);
  // }

  /**
   * Adds new value to the record.
   */
  public addValue(value: any): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(value)) {
      return this;
    }

    return this.setValue(this.data.size, value);
  }

  /**
   * Adds new Data to the record.
   */
  public addData(val: Data): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new DataTable to the record.
   */
  public addDataTable(val: DataTable | null): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new Date to the record.
   */
  public addDate(val: Date): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new Double to the record.
   */
  public addDouble(val: number): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new String to the record.
   */
  public addString(val: string | null): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new Float to the record.
   */
  public addFloat(val: number): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Sets value of field with specified index to <code>value</code>.
   */
  public setValueSmart(valueBy: number | string, value: JObject): DataRecord {
    let ff: FieldFormat<any>;
    if (Util.isNumber(valueBy)) {
      ff = this.getFieldFormat(valueBy);
    } else if (Util.isString(valueBy)) {
      ff = this.getFormat().getField(valueBy);
    } else {
      throw new Error('Error in DataRecord, setValueSmart function. Incorrect type of search value.');
    }

    if (ff == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('dtFieldNotFound'), name) + ': ' + this.dataAsString(true, true));
    }

    if (value == null || ff.isAssignableFrom(value)) {
      return this.setValue(ff.getName(), value);
    } else {
      const stringValue: string = value.toString();
      try {
        return this.setValue(ff.getName(), ff.valueFromString(stringValue));
      } catch (ex) {
        const selectionValues = ff.getSelectionValues();
        if (selectionValues !== null) {
          for (const sv of selectionValues.keys()) {
            const selectionVal = selectionValues.get(sv);
            const svdesc: string | null = selectionVal ? selectionVal.toString() : null;
            if (stringValue === svdesc) {
              return this.setValue(ff.getName(), sv);
            }
          }
        }
        throw new Error(MessageFormat.format(Cres.get().getString('dtIllegalFieldValue'), Util.getObjectDescription(value), ff.toDetailedString()) + ex.message);
      }
    }
  }

  public toString(): string {
    return this.dataAsString(true, true);
  }

  /**
   * Sets value of field with specified index to <code>value</code>.
   */
  public setValue(nameOrIndex: number | string, value: any, validate = true): DataRecord {
    this.ensureMutable();

    const recordTable: DataTable | null = this.getTable();
    const isRecursive: boolean = value != null && value == recordTable;
    if (isRecursive) {
      value = recordTable !== null ? recordTable.clone() : null;
    }

    const index: number = Util.isNumber(nameOrIndex) ? (nameOrIndex as number) : this.findIndex(nameOrIndex as string);

    const ff: FieldFormat<any> = this.getFormat().getField(index);

    try {
      value = ff.checkAndConvertValue(null, null, null, value, validate);
    } catch (ex) {
      throw new Error(MessageFormat.format(Cres.get().getString('dtIllegalFieldValue'), value, ff.toDetailedString()) + ex.message);
    }

    const oldValue: JObject | null = this.data.get(ff.getName()) ? (this.data.get(ff.getName()) as JObject) : null;

    try {
      this.data.set(ff.getName(), value);
      if (this.table != null) {
        this.table.validateRecord(this);
      }
    } catch (ex1) {
      this.data.set(ff.getName(), oldValue);
      throw new Error(ex1.getMessage());
    }

    return this;
  }

  public clone(): DataRecord {
    let cl: DataRecord;

    try {
      cl = super.clone() as DataRecord;
    } catch (ex) {
      throw new Error(ex.message);
    }

    const data = CloneUtils.deepClone(this.data);
    cl.data = data !== null ? data : new Map<string, JObject | null>();

    return cl;
  }

  public cloneFormatFromTable(): void {
    if (this.table != null) {
      this.format = this.table.getFormat().clone();
    } else {
      this.format = this.format.clone();
    }
  }

  public dataAsString(showFieldNames: boolean, showHiddenFields: boolean, showPasswords = true): string {
    const res: StringBuilder = new StringBuilder();

    let needSeparator = false;

    for (const ff of this.getFormat()) {
      if (ff.isHidden() && !showHiddenFields) {
        continue;
      }

      if (needSeparator) {
        res.append(', ');
      } else {
        needSeparator = true;
      }

      let value: string = this.valueAsString(ff.getName(), showFieldNames, showHiddenFields, showPasswords);

      if (Util.equals(FieldConstants.EDITOR_PASSWORD, ff.getEditor()) && !showPasswords) {
        value = StringUtils.createMaskedPasswordString(value.length);
      }
      res.append((showFieldNames ? ff.toString() + '=' : '') + value);
    }

    return res.toString();
  }

  public valueAsString(name: string, showFieldNames: boolean, showHiddenFields: boolean, showPasswords: boolean): string {
    const ff: FieldFormat<any> = this.getFieldFormat(name);

    const val = this.getValue(name);

    let value = val != null ? (FieldConstants.DATATABLE_FIELD == ff.getType() && !(val as DataTable).isSimple() ? (val as DataTable).dataAsString(showFieldNames, showHiddenFields, showPasswords) : val.toString()) : 'NULL';

    if (ff.hasSelectionValues()) {
      const selectionValues = ff.getSelectionValues();
      const sv = selectionValues ? selectionValues.get(val) : null;
      value = sv != null ? sv.toString() : value;
    }

    return value;
  }

  public getTable(): DataTable | null {
    return this.table;
  }

  public setTable(table: DataTable | null): void {
    this.table = table;
  }

  private ensureMutable(): void {
    if (this.isTableImmutable()) {
      if (Log.DATATABLE.isDebugEnabled()) {
        Log.DATATABLE.warn('Attempt to change immutable record', new Error());
      } else {
        Log.DATATABLE.warn('Attempt to change immutable record');
      }
      throw new Error('Immutable');
    }
  }

  private checkNumberOfDataFieldsSet(value: any): boolean {
    if (this.data.size >= this.format.getFieldCount()) {
      Log.DATATABLE.warn("Can't add data to data record since all data fields defined by format are already set: " + value);

      return false;
    }

    return true;
  }

  /**
   * Returns value of String field with specified name or index.
   */
  public getString(valueBy: number | string): string {
    if (Util.isNumber(valueBy)) {
      const index = valueBy as number;
      return this.getValue(index) as string;
    } else {
      const recordName: string = valueBy as string;
      return this.getValue(this.findIndex(recordName)) as string;
    }
    throw new Error('Error in DataRecord, getString function. Incorrect type of search value.');
  }

  /**
   * Adds new Integer to the record.
   */
  public addInt(val: number): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Adds new Long to the record.
   */
  public addLong(val: number | null): DataRecord {
    if (!this.checkNumberOfDataFieldsSet(val)) {
      return this;
    }

    return this.setValue(this.data.size, val);
  }

  /**
   * Returns value of Integer field with specified name or index.
   */
  public getInt(valueBy: number | string): number {
    if (Util.isNumber(valueBy)) {
      const index = valueBy as number;
      return this.getValue(index) as number;
    } else {
      const recordName: string = valueBy as string;
      return this.getValue(this.findIndex(recordName)) as number;
    }
    throw new Error('Error in DataRecord, getInt function. Incorrect type of search value.');
  }

  /**
   * Returns value of Long field with specified index.
   */
  public getLong(valueBy: number | string): number {
    if (Util.isNumber(valueBy)) {
      const index = valueBy as number;
      return this.getValue(index) as number;
    } else {
      const recordName: string = valueBy as string;
      return this.getValue(this.findIndex(recordName)) as number;
    }
    throw new Error('Error in DataRecord, getLong function. Incorrect type of search value.');
  }

  /**
   * Returns value of Boolean field with specified name or index.
   */
  public getBoolean(valueBy: number | string): boolean {
    if (Util.isNumber(valueBy)) {
      const index = valueBy as number;
      return this.getValue(index) as boolean;
    } else {
      const recordName: string = valueBy as string;
      return this.getValue(this.findIndex(recordName)) as boolean;
    }
  }

  public getId(): string | null {
    return this.id;
  }

  public getValue(searchBy: number | string): any {
    if (Util.isNumber(searchBy)) {
      const index = searchBy as number;
      const ff: FieldFormat<any> = this.format.getField(index);
      return this.getValueByFieldFormat(ff);
    } else if (Util.isString(searchBy)) {
      const searchName: string = searchBy as string;
      return this.getValue(this.findIndex(searchName));
    }

    return null;
  }

  public getValueAsString(searchBy: number | string): string | null {
    if (Util.isNumber(searchBy)) {
      const index = searchBy as number;
      return this.format.getField(index).valueToString(this.getValue(index));
    } else if (Util.isString(searchBy)) {
      const searchName: string = searchBy as string;
      return this.getValueAsString(this.findIndex(searchName));
    }

    return null;
  }

  /**
   * Returns textual description of field value. The description is taken from selection values list specified in table format.
   */
  public getValueDescription(name: string): string | null {
    const value: JObject = this.getValue(name);

    const ff: FieldFormat<any> = this.getFieldFormat(name);

    const sv = ff.getSelectionValues();

    const description: string | null = sv != null ? (sv.get(value) ? (sv.get(value) as string) : null) : null;

    return description !== null ? description : ff.valueToString(value);
  }

  private getValueByFieldFormat(ff: FieldFormat<any>): any {
    if (this.data.has(ff.getName())) {
      return this.data.get(ff.getName());
    }

    if (ff.isDefaultOverride()) {
      return null;
    }

    return this.isTableImmutable() ? ff.getDefaultValue() : ff.getDefaultValueCopy();
  }

  private isTableImmutable(): boolean {
    return this.table != null && this.table.isImmutable();
  }

  public encodeDataTable(useVisibleSeparators: boolean): string {
    return this.getEncodedDataFromEncodingSettings(new ClassicEncodingSettings(useVisibleSeparators));
  }

  public getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings): string {
    return this.encode(new StringBuilder(), settings, false, 0).toString();
  }

  public encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder {
    if (this.getId() != null) {
      new Element(DataRecord.ELEMENT_ID, this.getId()).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    for (let i = 0; i < this.format.getFieldCount(); i++) {
      const ff: FieldFormat<DataRecord> = this.format.getField(i) as FieldFormat<DataRecord>;
      const value: any = this.getValueByFieldFormat(ff);

      Element.createFromFieldFormat(null, ff, value).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    return sb;
  }

  /**
   * Returns true if record has field with specified name.
   */
  public hasField(name: string): boolean {
    return this.getFormat().hasField(name);
  }

  /**
   * Returns true if record has field with specified name.
   */
  public meetToCondition(condition: QueryCondition): boolean {
    if (this.hasField(condition.getField())) {
      const recValue: any = this.getValue(condition.getField());
      const condValue: any = condition.getValue();
      const operator: number = condition.getOperator();

      if (recValue === null || condValue === null) {
        if (operator === QueryCondition.EQ) {
          return condValue === recValue;
        }
        if (operator === QueryCondition.NE) {
          return condValue !== recValue;
        }

        throw new Error("Can't compare value to NULL");
      }

      if (operator === QueryCondition.NE) {
        return !recValue === condValue;
      }

      if ((operator & QueryCondition.EQ) > 0) {
        if (recValue === condValue) {
          return true;
        }

        if (operator === QueryCondition.EQ) {
          return false;
        }
      }

      if ((operator & QueryCondition.GT) > 0) {
        return Util.compareTo(recValue, condValue) > 0;
      }

      if ((operator & QueryCondition.LT) > 0) {
        return Util.compareTo(recValue, condValue) < 0;
      }

      throw new Error('Illegal operator: ' + operator);
    }

    return false;
  }

  /**
   * Constructs new <code>DataTable</code> and adds this record to it.
   */
  public wrap(): DataTable {
    return DataTableFactory.createFromDataRecord(this);
  }

  /**
   * Returns value of Data field with specified index or name.
   */
  public getData(valueBy: number | string): Data {
    if (Util.isNumber(valueBy)) {
      const index = valueBy as number;
      return this.getValue(index) as Data;
    } else {
      const recordName: string = valueBy as string;
      return this.getData(this.findIndex(recordName)) as Data;
    }
    throw new Error('Error in DataRecord, getData function. Incorrect type of search value.');
  }

  /**
   * Returns value of DataTable field with specified index.
   */
  public getDataTable(searchBy: number | string): DataTable {
    if (Util.isNumber(searchBy)) {
      return this.getValue(searchBy);
    } else if (Util.isString(searchBy)) {
      return this.getValue(this.findIndex(searchBy as string));
    }
    throw new Error('Error in DataRecord, getDataTable function. Incorrect type of search value.');
  }

  /**
   * Returns value of Date field with specified name.
   */
  public getDate(searchBy: number | string): Date {
    if (Util.isNumber(searchBy)) {
      return this.getValue(searchBy);
    } else if (Util.isString(searchBy)) {
      return this.getValue(this.findIndex(searchBy as string));
    }
    throw new Error('Error in DataRecord, getDate function. Incorrect type of search value.');
  }

  /**
   * Returns value of Double field with specified index.
   */
  public getDouble(searchBy: number | string): number {
    if (Util.isNumber(searchBy)) {
      return this.getValue(searchBy);
    } else if (Util.isString(searchBy)) {
      return this.getValue(this.findIndex(searchBy as string));
    }
    throw new Error('Error in DataRecord, getDouble function. Incorrect type of search value.');
  }

  /**
   * Returns value of Float field with specified index.
   */
  public getFloat(searchBy: number | string): number {
    if (Util.isNumber(searchBy)) {
      return this.getValue(searchBy);
    } else if (Util.isString(searchBy)) {
      return this.getValue(this.findIndex(searchBy as string));
    }
    throw new Error('Error in DataRecord, getFloat function. Incorrect type of search value.');
  }

  /**
   * Returns format of the record.
   */
  public getFormat(): TableFormat {
    return this.format;
  }

  /**
   * Returns format of field with specified index.
   */
  public getFieldFormat(searchBy: number | string): FieldFormat<any> {
    return this.format.getField(searchBy);
  }

  public setFormat(format: TableFormat) {
    format.makeImmutable(null);
    this.format = format;
  }

  /**
   * Returns index of field with specified name or throws an IllegalArgumentException if field is not found.
   */
  private findIndex(name: string): number {
    const index: number = this.format.getFieldIndex(name);

    if (index == -1) {
      const fields: Array<string> = [];

      let ff: any;
      for (ff of this.getFormat()) {
        fields.push((ff as FieldFormat<JObject>).getName());
      }

      throw new Error(MessageFormat.format(Cres.get().getString('dtFieldNotFound'), name) + ': ' + StringUtils.print(fields));
    }

    return index;
  }

  /**
   * Returns number of fields in the record.
   */
  public getFieldCount(): number {
    if (this.format == null) {
      return 0;
    } else {
      return this.format.getFieldCount();
    }
  }

  public equals(obj: any): boolean {
    if (obj == this) {
      return true;
    }

    if (!(obj instanceof DataRecord)) {
      return false;
    }

    const rec: DataRecord = obj as DataRecord;

    if (!Util.equals(this.getId(), rec.getId())) {
      return false;
    }

    // Formats are compared only if record does not belong to a table
    if (this.table == null) {
      if (!Util.equals(this.format, rec.getFormat())) {
        return false;
      }
    }

    for (let i = 0; i < this.getFieldCount(); i++) {
      const field = this.getValue(i);
      const value = rec.getValue(i);
      if (field != null ? !Util.equals(field, value) : value != null) {
        return false;
      }
    }

    return true;
  }
}
