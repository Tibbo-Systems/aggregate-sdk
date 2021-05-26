import JObject from '../util/java/JObject';
import JConstants from '../util/java/JConstants';
import StringEncodable from '../util/StringEncodable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import Element from '../util/Element';
import StringBuilder from '../util/java/StringBuilder';
import Binding from '../binding/Binding';
import Expression from '../expression/Expression';
import CloneUtils from '../util/CloneUtils';
import TableValidator from './validator/TableValidator';
import ElementList from '../util/ElementList';
import StringUtils from '../util/StringUtils';
import TableExpressionValidator from './validator/TableExpressionValidator';
import TableKeyFieldsValidator from './validator/TableKeyFieldsValidator';
import KeyFieldsValidator from './validator/KeyFieldsValidator';
import Reference from '../expression/Reference';
import DataTable from './DataTable';
import FieldFormat from './FieldFormat';
import Util from '../util/Util';
import FieldFormatFactory from './FieldFormatFactory';
import AbstractRecordValidator from './validator/AbstractRecordValidator';

export default class TableFormat extends JObject implements StringEncodable, Iterable<FieldFormat<any>> {
  public static readonly EMPTY_FORMAT: TableFormat = new TableFormat(0, 0);

  private fields: Array<FieldFormat<any>> = new Array<FieldFormat<any>>();
  private id: number | null = null;
  private immutable = false;
  private bindingsEditable = false;

  public static readonly DEFAULT_MIN_RECORDS: number = 0;
  public static readonly DEFAULT_MAX_RECORDS: number = JConstants.INTEGER_MAX_VALUE;

  private static readonly ELEMENT_FLAGS: string = 'F';
  private static readonly ELEMENT_TABLE_VALIDATORS: string = 'V';
  private static readonly ELEMENT_RECORD_VALIDATORS: string = 'R';
  private static readonly ELEMENT_BINDINGS: string = 'B';
  private static readonly ELEMENT_MIN_RECORDS: string = 'M';
  private static readonly ELEMENT_MAX_RECORDS: string = 'X';
  private static readonly ELEMENT_NAMING: string = 'N';

  public static readonly TABLE_VALIDATOR_KEY_FIELDS: string = 'K';
  public static readonly TABLE_VALIDATOR_EXPRESSION: string = 'E';

  public static readonly RECORD_VALIDATOR_KEY_FIELDS: string = 'K';

  private static readonly REORDERABLE_FLAG: string = 'R';
  private static readonly UNRESIZEBLE_FLAG: string = 'U';
  private static readonly BINDINGS_EDITABLE_FLAG: string = 'B';

  private reorderable = false;
  private unresizable = false;

  private minRecords = TableFormat.DEFAULT_MIN_RECORDS;
  private maxRecords = TableFormat.DEFAULT_MAX_RECORDS;

  private fieldLookup: Map<string, number | null> = new Map<string, number | null>();
  private recordValidators: Array<AbstractRecordValidator> = new Array<AbstractRecordValidator>();
  private tableValidators: Array<TableValidator> = new Array<TableValidator>();
  private bindings: Array<Binding> = new Array<Binding>();
  private namingExpression: Expression | null = null;

  // TODO not implemented yet
  // private immutabilizerIdentityHashCode: number; // The identity hash code of the Data Table that made this format immutable

  constructor(minRecords: number = TableFormat.DEFAULT_MIN_RECORDS, maxRecords: number = TableFormat.DEFAULT_MAX_RECORDS, fieldFormat?: string | FieldFormat<any>) {
    super();
    this.setMinRecords(minRecords);
    this.setMaxRecords(maxRecords);
    if (fieldFormat) this.addField(fieldFormat);
  }

  public static createWithFormat(fieldFormat?: FieldFormat<any>): TableFormat {
    const tableFormat = new TableFormat();

    if (fieldFormat) tableFormat.addField(fieldFormat);

    return tableFormat;
  }

  public static createWithReorderable(reorderable: boolean) {
    const tableFormat = new TableFormat();

    tableFormat.setReorderable(reorderable);

    return tableFormat;
  }

  public static createWithFormatAndSettings(format: string, settings: ClassicEncodingSettings, validate = true): TableFormat {
    const tableFormat = new TableFormat();
    const els: ElementList = StringUtils.elements(format, settings.isUseVisibleSeparators());

    for (const element of els.getElements()) {
      const el: Element = element as Element;

      if (el.getValue() != null) {
        if (!el.getName()) {
          const index: number = tableFormat.fields.length;
          const ff: FieldFormat<any> = FieldFormatFactory.create(el.getValue() as string, settings, validate);
          if (!ff.isNullable() && ff.getValidators().length === 0) {
            ff.setDefault(ff.getDefaultValue());
          }
          tableFormat.fields.push(ff);
          tableFormat.getFieldLookup().set(ff.getName(), index);
          continue;
        }

        if (el.getName() === TableFormat.ELEMENT_FLAGS) {
          const flags: string = el.getValue() as string;
          if (flags) {
            tableFormat.setReorderable(flags.indexOf(TableFormat.REORDERABLE_FLAG) !== -1);
            tableFormat.setUnresizable(flags.indexOf(TableFormat.UNRESIZEBLE_FLAG) !== -1);
            tableFormat.setBindingsEditable(flags.indexOf(TableFormat.BINDINGS_EDITABLE_FLAG) !== -1);
            continue;
          }
        }

        if (el.getName() === TableFormat.ELEMENT_MIN_RECORDS) {
          tableFormat.minRecords = parseInt(el.getValue() as string);
          continue;
        }
        if (el.getName() === TableFormat.ELEMENT_MAX_RECORDS) {
          tableFormat.maxRecords = parseInt(el.getValue() as string);
          continue;
        }

        if (el.getName() === TableFormat.ELEMENT_TABLE_VALIDATORS) {
          tableFormat.createTableValidators(el.getValue() as string, settings);
          continue;
        }

        if (el.getName() === TableFormat.ELEMENT_RECORD_VALIDATORS) {
          tableFormat.createRecordValidators(el.getValue() as string, settings);
          continue;
        }

        if (el.getName() === TableFormat.ELEMENT_BINDINGS) {
          tableFormat.createBindings(el.getValue() as string, settings);
          continue;
        }

        if (el.getName() === TableFormat.ELEMENT_NAMING) {
          tableFormat.createNaming(el.getValue() as string, settings);
        }
      }
    }

    return tableFormat;
  }

  /**
   * Adds new binding.
   */
  public addBinding(target: string | Binding, expression?: string): void {
    if (target instanceof Binding) {
      if (this.immutable) {
        throw new Error('Immutable');
      }
      this.bindings.push(target);
    } else if (Util.isString(target) && expression) {
      this.addBinding(new Binding(new Reference(target), new Expression(expression)));
    }
  }

  public addFieldBy(type: string, name: string, description: string, defaultValue: JObject, nullable: boolean, group: string): TableFormat {
    this.addField(FieldFormatFactory.createWith(name, type, description, defaultValue, nullable, group));
    return this;
  }

  public addFieldWithTypeAndName(type: string, name: string, index: number = this.fields.length) {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    return this.addField(FieldFormatFactory.createType(name, type), index);
  }

  /**
   * Adds new field to format at the specified index.
   *
   * Note, that modifying table format of an existing table by inserting fields anywhere except appending them to the end may cause <code>DataTable</code> to become invalid.
   */
  public addField(ff: FieldFormat<any> | string, index: number = this.fields.length): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    let fieldFormat: FieldFormat<any>;
    if (Util.isString(ff)) {
      fieldFormat = FieldFormatFactory.create(ff as string);
    } else {
      fieldFormat = ff as FieldFormat<any>;
    }

    const existing: FieldFormat<any> = this.getField(fieldFormat.getName());

    if (existing != null) {
      if (!fieldFormat.extend(existing)) {
        throw new Error("Field '" + fieldFormat.getName() + "' already exists in format");
      } else {
        return this;
      }
    }

    for (let i = index; i < this.fields.length; i++) {
      const fn: string = this.fields[i].getName();

      const fieldLookup = this.getFieldLookup().get(fn);
      const previousIndex: number | null = fieldLookup ? fieldLookup : null;

      if (previousIndex === null) {
        throw new Error('Null lookup index for field ' + i + ' (' + fn + ')');
      }

      this.getFieldLookup().set(fn, previousIndex + 1);
    }
    this.fields.splice(index, 0, fieldFormat);
    if (!fieldFormat.isNullable() && fieldFormat.getValidators().length === 0) fieldFormat.setDefault(fieldFormat.getDefaultValue());
    this.getFieldLookup().set(fieldFormat.getName(), index);

    return this;
  }

  /**
   * Adds new fields to format.
   */
  public addFields(fieldFormats: Array<FieldFormat<any>>): TableFormat {
    for (const each of fieldFormats) {
      this.addField(each);
    }
    return this;
  }

  /**
   * Returns modifiable list of record validators.
   */
  public getRecordValidators(): Array<AbstractRecordValidator> {
    return this.immutable ? [...this.recordValidators] : this.recordValidators;
  }

  /**
   * Returns minimal number of records allowed by format.
   */
  public getMinRecords(): number {
    return this.minRecords;
  }

  /**
   * Removes the binding.
   */
  public removeBinding(binding: Binding): void {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    const index = this.bindings.indexOf(binding);
    if (index !== -1) this.bindings.splice(index, 1);
  }

  /**
   * Removes field from format.
   */

  public removeField(fieldName: string): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    const index: number | null = this.getFieldLookup().get(fieldName) !== undefined ? (this.getFieldLookup().get(fieldName) as number) : null;

    this.getFieldLookup().delete(fieldName);

    if (index != null) {
      this.fields.splice(index, 1);

      for (let i = index; i < this.fields.length; i++) {
        const fn: string = this.fields[i].getName();

        this.getFieldLookup().set(fn, this.getFieldLookup().get(fn) ? (this.getFieldLookup().get(fn) as number) - 1 : null);
      }
    }

    return this;
  }

  /**
   * Renames a field.
   */
  public renameField(oldName: string, newName: string): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    const ff: FieldFormat<any> = this.getField(oldName);

    if (ff == null) {
      return this;
    }

    ff.setName(newName);

    const index: number | null = this.getFieldLookup().get(oldName) ? (this.getFieldLookup().get(oldName) as number) : null;
    this.getFieldLookup().delete(oldName);

    if (index != null) {
      this.getFieldLookup().set(newName, index);
    }

    return this;
  }

  /**
   * Resets allowed number of records to defaults.
   */

  public resetAllowedRecords(): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.minRecords = TableFormat.DEFAULT_MIN_RECORDS;
    this.maxRecords = TableFormat.DEFAULT_MAX_RECORDS;

    return this;
  }

  public makeImmutable(immutabilizer: DataTable | null): void {
    if (this.immutable) {
      return;
    }

    this.immutable = true;

    // TODO not implemented yet
    // this.immutabilizerIdentityHashCode = System.identityHashCode(immutabilizer);

    this.fields.forEach((ff) => {
      const fieldFormat = ff as FieldFormat<any>;
      fieldFormat.makeImmutable();
    });
  }

  public getField(searchBy: number | string): FieldFormat<any> {
    if (Util.isNumber(searchBy)) {
      const index = searchBy as number;
      return this.fields[index];
    } else if (Util.isString(searchBy)) {
      const fieldName: string = searchBy as string;
      return this.fields[this.getFieldIndex(fieldName)];
    }
    throw new Error('SearchBy must be string or number');
  }

  /**
   * Returns name of field at the specified index.
   */
  public getFieldName(index: number): string {
    if (index < 0 || index >= this.fields.length) throw new Error('index is out of range');
    return this.fields[index].getName();
  }

  /**
   * Adds new table validator to the format.
   */
  public addTableValidator(tv: TableValidator) {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.tableValidators.push(tv);
  }

  /**
   * Adds new record validator to the format.
   */
  public addRecordValidator(rv: AbstractRecordValidator) {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.recordValidators.push(rv);
  }

  /**
   * Returns maximal number of records allowed by format.
   */
  public getMaxRecords(): number {
    return this.maxRecords;
  }

  /**
   * Returns number of fields in table format.
   */
  public getFieldCount(): number {
    return this.fields.length;
  }

  public encodeDataTable(useVisibleSeparators: boolean): string {
    return this.getEncodedDataFromEncodingSettings(new ClassicEncodingSettings(useVisibleSeparators));
  }

  public getEncodedDataFromEncodingSettings(settings: ClassicEncodingSettings, isTransferEncode = false, encodeLevel = 0): string {
    const formatString: StringBuilder = new StringBuilder();

    this.encode(formatString, settings, isTransferEncode, encodeLevel);

    return formatString.toString();
  }

  public encodeToString(settings: ClassicEncodingSettings): string {
    return this.encode(new StringBuilder(), settings, false, 0).toString();
  }

  public encodeUseSeparator(useVisibleSeparators: boolean): string {
    return this.encodeToString(new ClassicEncodingSettings(useVisibleSeparators)).toString();
  }

  public encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder {
    for (let i = 0; i < this.fields.length; i++) {
      new Element(null, (this.getField(i) as FieldFormat<any>).encode(settings)).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    if (this.minRecords !== TableFormat.DEFAULT_MIN_RECORDS) {
      new Element(TableFormat.ELEMENT_MIN_RECORDS, this.minRecords.toString()).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    if (this.maxRecords !== TableFormat.DEFAULT_MAX_RECORDS) {
      new Element(TableFormat.ELEMENT_MAX_RECORDS, this.maxRecords.toString()).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    if (this.tableValidators.length > 0) {
      new Element(TableFormat.ELEMENT_TABLE_VALIDATORS, this.getEncodedTableValidators(settings)).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    if (this.recordValidators.length > 0) {
      new Element(TableFormat.ELEMENT_RECORD_VALIDATORS, this.getEncodedRecordValidators(settings)).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    if (this.bindings.length > 0) {
      new Element(TableFormat.ELEMENT_BINDINGS, this.getEncodedBindings(settings)).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    if (this.namingExpression != null) {
      new Element(TableFormat.ELEMENT_NAMING, this.namingExpression == null ? '' : this.namingExpression.getText()).encode(sb, settings, isTransferEncode, encodeLevel);
    }

    TableFormat.encAppend(sb, TableFormat.ELEMENT_FLAGS, this.getEncodedFlags(), settings);

    return sb;
  }

  private getEncodedFlags(): string {
    const buf: StringBuilder = new StringBuilder();
    if (this.isReorderable()) {
      buf.append(TableFormat.REORDERABLE_FLAG);
    }
    if (this.isUnresizable()) {
      buf.append(TableFormat.UNRESIZEBLE_FLAG);
    }
    if (this.isBindingsEditable()) {
      buf.append(TableFormat.BINDINGS_EDITABLE_FLAG);
    }
    return buf.toString();
  }

  public isReplicated(): boolean {
    for (const ff of this) {
      if (!ff.isNotReplicated()) {
        return true;
      }
    }

    return false;
  }

  public isSingleCell(): boolean {
    return this.isSingleRecord() && this.isSingleField();
  }

  public isSingleField(): boolean {
    return this.getFieldCount() == 1;
  }

  public isEmpty() {
    return this.minRecords == 0 && this.maxRecords == 0 && this.getFieldCount() == 0;
  }

  public isGrouped(): boolean {
    for (const ff of this) {
      if (ff.getGroup() != null) {
        return true;
      }
    }

    return false;
  }

  public isBindingsEditable(): boolean {
    return this.bindingsEditable;
  }

  private static encAppend(buffer: StringBuilder, name: string, value: string, settings: ClassicEncodingSettings): void {
    if (value != null && value.length > 0) {
      buffer.append(new Element(name, value).encode(null, settings).toString());
    }
  }

  public toString(): string {
    return this.encodeToString(new ClassicEncodingSettings(true));
  }

  private getEncodedBindings(settings: ClassicEncodingSettings): string {
    const enc: StringBuilder = new StringBuilder();

    for (const bin of this.bindings) {
      const encodeElement = new Element(bin.getTarget().getImage(), bin.getExpression().getText()).encode(null, settings);
      enc.append(encodeElement.toString());
    }

    return enc.toString();
  }

  private getEncodedRecordValidators(settings: ClassicEncodingSettings): string {
    const enc: StringBuilder = new StringBuilder();

    for (const rv of this.recordValidators) {
      if (rv.getType() != null) {
        const encodeElement = new Element(rv.getType(), rv.encode()).encode(null, settings);
        enc.append(encodeElement.toString());
      }
    }

    return enc.toString();
  }

  public getEncodedTableValidators(settings: ClassicEncodingSettings): string {
    const enc: StringBuilder = new StringBuilder();

    for (const tv of this.tableValidators) {
      if ((tv as TableValidator).getType() != null) {
        const encodeElement = new Element((tv as TableValidator).getType(), (tv as TableValidator).encode()).encode(null, settings);
        enc.append(encodeElement.toString());
      }
    }

    return enc.toString();
  }

  public getId(): number | null {
    return this.id;
  }

  public getTableValidators(): Array<TableValidator> {
    return this.immutable ? [...this.tableValidators] : this.tableValidators;
  }

  public isImmutable(): boolean {
    return this.immutable;
  }

  public setId(id: number): void {
    if (!this.immutable) {
      throw new Error('Cannot set ID of non-immutable format');
    }

    if (this.id != null && this.id !== id) {
      throw new Error('Format already has ID ' + this.id + ', new ID ' + id);
    }

    this.id = id;
  }

  /**
   * Returns index of field with the specified name or -1 if it does not exist.
   */
  public getFieldIndex(name: string): number {
    const field = this.getFieldLookup().get(name);
    const index: number | null = !(field === undefined || field === null) ? field : null;

    return index != null ? index : -1;
  }

  /**
   * Returns true if table format contains field with specified name.
   */
  public hasField(name: string): boolean {
    return this.getFieldIndex(name) !== -1;
  }

  /**
   * Returns true if table format contains fields of the specified type.
   */
  public hasFields(type: string): boolean {
    for (const ff of this) {
      if (ff.getType() == type) {
        return true;
      }
    }

    return false;
  }

  public getFieldLookup(): Map<string, number | null> {
    if (this.fieldLookup == null) {
      this.fieldLookup = new Map<string, number>();
      for (let i = 0; i < this.fields.length; i++) {
        const field: FieldFormat<JObject> = this.fields[i];
        this.fieldLookup.set(field.getName(), i);
      }
    }
    return this.fieldLookup;
  }

  /**
   * Returns type of field at the specified index.
   */
  public getFieldType(index: number): string {
    return this.fields[index].getType();
  }

  /**
   * Returns list of key field names.
   */
  public getKeyFields(): Array<string> {
    const keyFields: Array<string> = new Array<string>();

    this.fields.forEach((ff) => {
      if (ff.isKeyField()) {
        keyFields.push(ff.getName());
      }
    });

    return keyFields;
  }

  /**
   * Returns true if format allows record reordering.
   */
  public isReorderable(): boolean {
    return this.reorderable;
  }

  public isUnresizable(): boolean {
    return this.unresizable;
  }

  /**
   * Returns naming expression.
   */
  public getNamingExpression(): Expression | null {
    return this.namingExpression;
  }

  /**
   * Returns modifiable list of table bindings.
   */
  public getBindings(): Array<Binding> {
    return this.immutable ? [...this.bindings] : this.bindings;
  }

  public getFields(): Array<FieldFormat<any>> {
    return this.immutable ? [...this.fields] : this.fields;
  }

  /**
   * Returns true if this format extends the <code>other</code> format.
   */
  public extend(other: TableFormat): boolean {
    return this.extendMessage(other) == null;
  }

  public extendMessage(other: TableFormat): string | null {
    if (this == other) {
      return null;
    }

    if (this.equals(other)) {
      return null;
    }

    if (!this.isReorderable() && other.isReorderable()) {
      return 'Different reorderable flags: need ' + this.isReorderable() + ', found ' + other.isReorderable();
    }

    if (!this.isUnresizable() && other.isUnresizable()) {
      return 'Different unresizable flags: need ' + this.isUnresizable() + ', found ' + other.isUnresizable();
    }

    if (!Util.equals(this.getNamingExpression(), other.getNamingExpression())) {
      return 'Different naming expressions: need ' + this.getNamingExpression() + ', found ' + other.getNamingExpression();
    }

    let otherBinding: any;
    for (otherBinding in other.getBindings()) {
      if (this.getBindings().indexOf(otherBinding as Binding) === -1) {
        return 'Different bindings: need ' + this.getBindings() + ', found ' + other.getBindings();
      }
    }

    let otherFormat: any;
    for (otherFormat of other.getFields()) {
      const ownFormat: FieldFormat<any> | null = this.getField(otherFormat.getName());

      if (ownFormat == null) {
        if ((otherFormat as FieldFormat<any>).isOptional()) {
          continue;
        } else {
          return "Required field doesn't exist: " + (otherFormat as FieldFormat<any>).getName();
        }
      }

      const fieldExtendMessage: string = ownFormat.extendMessage(otherFormat as FieldFormat<any>) as string;

      if (fieldExtendMessage != null) {
        return "Incorrect format of field '" + (otherFormat as FieldFormat<any>).getName() + "': " + fieldExtendMessage;
      }
    }

    return null;
  }

  fixRecords(table: DataTable): void {
    // TODO need Hach Code implementation
    // if (this.immutable && !Util.equals(this.immutabilizerIdentityHashCode, System.identityHashCode(table)))
    if (this.immutable) {
      throw new Error('Format was not made immutable by this table');
    }

    this.minRecords = table.getRecordCount();
    this.maxRecords = table.getRecordCount();
  }

  setMinRecords(minRecords: number): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.minRecords = minRecords;
    return this;
  }

  setMaxRecords(maxRecords: number): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.maxRecords = maxRecords;
    return this;
  }

  public setNamingExpressionFromExpr(namingExpression: Expression): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.namingExpression = namingExpression;
    return this;
  }

  public setNamingExpression(namingExpression: string): TableFormat {
    this.setNamingExpressionFromExpr(new Expression(namingExpression));
    return this;
  }

  public setReorderable(reorderable: boolean): TableFormat {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.reorderable = reorderable;
    return this;
  }

  public setUnresizable(unresizable: boolean) {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.unresizable = unresizable;
  }

  public setBindingsEditable(bindingsEditable: boolean) {
    // Bindings Editable flag only affects visual editing of the table, so there's no need to condider immutability here

    this.bindingsEditable = bindingsEditable;
  }

  /**
   * Set the bindings.
   */
  public setBindings(bindings: Array<Binding>): void {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.bindings = bindings;
  }

  public createTableValidators(source: string | null, settings: ClassicEncodingSettings) {
    if (source == null || source.length == 0) {
      return;
    }

    const validatorsData: ElementList = StringUtils.elements(source, settings.isUseVisibleSeparators());
    validatorsData.getElements().forEach((el) => {
      if (Util.isString(el.getName()) && Util.isString(el.getValue())) {
        const elementName: string = el.getName() as string;
        const elementValue: string = el.getValue() as string;
        const validatorType: string = elementName.charAt(0);
        const validatorParams = elementValue;
        switch (validatorType) {
          case TableFormat.TABLE_VALIDATOR_KEY_FIELDS:
            this.addTableValidator(new TableKeyFieldsValidator(validatorParams));
            break;
          case TableFormat.TABLE_VALIDATOR_EXPRESSION:
            this.addTableValidator(TableExpressionValidator.valueOf(validatorParams));
            break;
        }
      }
    });
  }

  private createRecordValidators(source: string | null, settings: ClassicEncodingSettings) {
    if (source == null || source.length == 0) {
      return;
    }

    const validatorsData: ElementList = StringUtils.elements(source, settings.isUseVisibleSeparators());
    validatorsData.getElements().forEach((el) => {
      if (Util.isString(el.getName()) && Util.isString(el.getValue())) {
        const elementName: string = el.getName() as string;
        const elementValue: string = el.getValue() as string;
        const validatorType: string = elementName.charAt(0);
        const validatorParams = elementValue;
        switch (validatorType) {
          case TableFormat.RECORD_VALIDATOR_KEY_FIELDS:
            this.addRecordValidator(new KeyFieldsValidator(validatorParams));
            break;
        }
      }
    });
  }

  private createBindings(source: string, settings: ClassicEncodingSettings) {
    if (source == null || source.length === 0) {
      return;
    }

    const bindingsData: ElementList = StringUtils.elements(source, settings.isUseVisibleSeparators());
    bindingsData.getElements().forEach((el) => {
      const elementName: string | null = el.getName();
      const elementValue: string | null = el.getValue();
      if (Util.isString(elementName) && Util.isString(elementValue)) {
        this.bindings.push(new Binding(new Reference(elementName as string), new Expression(elementValue as string)));
      }
    });
  }

  private createNaming(source: string, settings: ClassicEncodingSettings) {
    if (source == null || source.length === 0) {
      return;
    }

    this.namingExpression = new Expression(source);
  }

  public clone(): TableFormat {
    const cl = super.clone() as TableFormat;

    cl.fields = this.fields.map((f) => f.clone());
    cl.fieldLookup = new Map<string, number | null>(this.fieldLookup);
    cl.recordValidators = this.recordValidators.map((f) => f.clone());
    cl.tableValidators = CloneUtils.deepClone<TableValidator[]>(this.tableValidators) as TableValidator[];
    cl.bindings = this.bindings.map((f) => f.clone());
    cl.id = null; // Need to clear ID to avoid conflicts in format cache
    cl.immutable = false;
    return cl;
  }

  public equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }

    if (obj == null) {
      return false;
    }

    if (!(obj instanceof TableFormat)) {
      return false;
    }

    const other: TableFormat = obj as TableFormat;
    if (this.maxRecords !== other.maxRecords) {
      return false;
    }

    if (this.minRecords !== other.minRecords) {
      return false;
    }

    if (this.fields == null) {
      if (other.fields !== null) {
        return false;
      }
    } else if (this.fields.length !== other.fields.length) {
      return false;
    } else if (!Util.arrayEquals(this.fields, other.fields)) {
      return false;
    }

    if (this.namingExpression === null) {
      if (other.namingExpression != null) {
        return false;
      }
    } else if (!this.namingExpression.equals(other.namingExpression)) {
      return false;
    }

    if (this.recordValidators === null) {
      if (other.recordValidators != null) {
        return false;
      }
    } else if (!Util.arrayEquals(this.recordValidators, other.recordValidators)) {
      return false;
    }

    if (this.tableValidators === null) {
      if (other.tableValidators != null) {
        return false;
      }
    } else if (!Util.arrayEquals(this.tableValidators, other.tableValidators)) {
      return false;
    }

    if (this.reorderable !== other.reorderable) {
      return false;
    }
    if (this.unresizable !== other.unresizable) {
      return false;
    }
    if (this.bindingsEditable !== other.bindingsEditable) {
      return false;
    }

    if (this.bindings == null) {
      if (other.bindings != null) {
        return false;
      }
    } else if (!Util.arrayEquals(this.bindings, other.bindings)) {
      return false;
    }

    return true;
  }

  public isAdvanced(): boolean {
    for (const ff of this) {
      if (ff.isAdvanced()) {
        return true;
      }
    }

    return false;
  }

  isSingleRecord(): boolean {
    return this.minRecords == 1 && this.maxRecords == 1;
  }

  hasReadOnlyFields(): boolean {
    for (const ff of this) {
      if (ff.isReadonly()) {
        return true;
      }
    }

    return false;
  }

  public iterator(): Iterator<FieldFormat<any>> {
    return this.fields.values();
  }

  [Symbol.iterator]() {
    return this.fields[Symbol.iterator]();
  }
}
