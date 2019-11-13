import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import StringBuilder from '../util/java/StringBuilder';
import DataTableUtils from './DataTableUtils';
import TransferEncodingHelper from './encoding/TransferEncodingHelper';
import Element from '../util/Element';
import ElementList from '../util/ElementList';
import StringUtils from '../util/StringUtils';
import JObject from '../util/java/JObject';
import MessageFormat from '../util/java/MessageFormat';
import Context from '../context/Context';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import FieldConstants from './field/FieldConstants';
import CloneUtils from '../util/CloneUtils';
import TableFormat from './TableFormat';
import Cres from '../Cres';
import FieldValidator from './validator/FieldValidator';
import LimitsValidator from './validator/LimitsValidator';
import RegexValidator from './validator/RegexValidator';
import NonNullValidator from './validator/NonNullValidator';
import IdValidator from './validator/IdValidator';
import ExpressionValidator from './validator/ExpressionValidator';
import ValidatorHelper from './validator/ValidatorHelper';
import Util from '../util/Util';
import DataTable from './DataTable';
import AbstractFieldValidator from './validator/AbstractFieldValidator';

export default abstract class FieldFormat<T> extends JObject {
  public static readonly NULLABLE_FLAG: string = 'N';
  public static readonly OPTIONAL_FLAG: string = 'O';
  public static readonly READ_ONLY_FLAG: string = 'R';
  public static readonly NOT_REPLICATED_FLAG: string = 'C';
  public static readonly EXTENDABLE_SELECTION_VALUES_FLAG: string = 'E';
  public static readonly HIDDEN_FLAG: string = 'H';
  public static readonly KEY_FIELD_FLAG: string = 'K';
  public static readonly INLINE_DATA_FLAG: string = 'I';
  public static readonly ADVANCED_FLAG: string = 'A';
  public static readonly DEFAULT_OVERRIDE: string = 'D';
  public static readonly SHALLOW_FLAG: string = 'S';

  public static readonly ELEMENT_DEFAULT_VALUE: string = 'A';
  public static readonly ELEMENT_FLAGS: string = 'F';
  public static readonly ELEMENT_DESCRIPTION: string = 'D';
  public static readonly ELEMENT_HELP: string = 'H';
  public static readonly ELEMENT_SELECTION_VALUES: string = 'S';
  public static readonly ELEMENT_VALIDATORS: string = 'V';
  public static readonly ELEMENT_EDITOR: string = 'E';
  public static readonly ELEMENT_EDITOR_OPTIONS: string = 'O';
  public static readonly ELEMENT_ICON: string = 'I';
  public static readonly ELEMENT_GROUP: string = 'G';

  private static readonly TYPE_SELECTION_VALUES: Map<string, string> = new Map<any, string>();

  private static readonly TYPE_VALIDATORS: Array<string> = new Array<string>();

  private static readonly CLASS_TO_TYPE: Map<string, string> = new Map();

  // private static readonly VALIDATOR_TO_TYPE: Map<string, Class> = new Map<string, Class>();
  public static __static_initializer_0() {
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.INTEGER_FIELD, FieldConstants.INTEGER_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.STRING_FIELD, FieldConstants.STRING_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.BOOLEAN_FIELD, FieldConstants.BOOLEAN_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.LONG_FIELD, FieldConstants.LONG_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.FLOAT_FIELD, FieldConstants.FLOAT_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.DOUBLE_FIELD, FieldConstants.DOUBLE_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.DATE_FIELD, FieldConstants.DATE_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.DATATABLE_FIELD, FieldConstants.DATATABLE_FIELD);
    // FieldFormat.CLASS_TO_TYPE.set(Color.class, FieldConstants.COLOR_FIELD);
    FieldFormat.CLASS_TO_TYPE.set(FieldConstants.DATA_FIELD, FieldConstants.DATA_FIELD);

    // FieldFormat.VALIDATOR_TO_TYPE.set(FieldFormat.VALIDATOR_LIMITS, LimitsValidator.class);
    // FieldFormat.VALIDATOR_TO_TYPE.set(FieldFormat.VALIDATOR_REGEX, RegexValidator.class);
    // FieldFormat.VALIDATOR_TO_TYPE.set(FieldFormat.VALIDATOR_NON_NULL, NonNullValidator.class);
    // FieldFormat.VALIDATOR_TO_TYPE.set(FieldFormat.VALIDATOR_ID, IdValidator.class);
    // FieldFormat.VALIDATOR_TO_TYPE.set(FieldFormat.VALIDATOR_EXPRESSION, ExpressionValidator.class);

    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.INTEGER_FIELD, Cres.get().getString('dtInteger'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.STRING_FIELD, Cres.get().getString('dtString'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.BOOLEAN_FIELD, Cres.get().getString('dtBoolean'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.LONG_FIELD, Cres.get().getString('dtLong'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.FLOAT_FIELD, Cres.get().getString('dtFloat'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.DOUBLE_FIELD, Cres.get().getString('dtDouble'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.DATE_FIELD, Cres.get().getString('date'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.DATATABLE_FIELD, Cres.get().getString('dtDataTable'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.COLOR_FIELD, Cres.get().getString('color'));
    FieldFormat.TYPE_SELECTION_VALUES.set(FieldConstants.DATA_FIELD, Cres.get().getString('dtDataBlock'));

    FieldFormat.TYPE_VALIDATORS.push(FieldConstants.VALIDATOR_LIMITS);
    FieldFormat.TYPE_VALIDATORS.push(FieldConstants.VALIDATOR_REGEX);
    FieldFormat.TYPE_VALIDATORS.push(FieldConstants.VALIDATOR_NON_NULL);
    FieldFormat.TYPE_VALIDATORS.push(FieldConstants.VALIDATOR_ID);
    FieldFormat.TYPE_VALIDATORS.push(FieldConstants.VALIDATOR_EXPRESSION);
  }

  private static _init = false;

  public static initialize() {
    if (FieldFormat._init) return;

    FieldFormat.__static_initializer_0();

    FieldFormat._init = true;
  }

  private name: string;
  private transferEncode: boolean = false;
  private nullable: boolean = false;
  private optional: boolean = false;
  private extendableSelectionValues: boolean = false;
  private readonly: boolean = false;
  private notReplicated: boolean = false;
  private hidden: boolean = false;
  private keyField: boolean = false;
  private inlineData: boolean = false;
  private advanced: boolean = false;
  private defaultOverride: boolean = false;
  private shallow: boolean = false;
  private defaultValue: T | null = null;
  private immutable: boolean = false;
  private description: string | null = null;
  private help: string | null = null;
  private editor: string | null = null;
  private editorOptions: string | null = null;
  private icon: string | null = null;
  private group: string | null = null;
  private cachedDefaultDescription: string | null = null;
  /**
   * T should be string
   */
  private selectionValues: Map<T | string | number | null, string | null> | null = null;
  private validators: Array<FieldValidator<T>> = new Array<FieldValidator<T>>();

  public abstract valueToString(value: T | string | number | null, settings?: ClassicEncodingSettings): string | null;

  public abstract valueFromString(
    value: string | null,
    settings?: ClassicEncodingSettings | null,
    validate?: boolean
  ): T | null;

  public abstract getType(): string;

  public abstract getNotNullDefault(): T;

  public abstract isAssignableFrom(value: any): boolean;

  protected constructor(name: string) {
    super();
    FieldFormat.initialize();
    this.name = name;
  }

  makeImmutable(): void {
    this.immutable = true;
  }

  public static createFieldValidatorByType(type: string, args?: any[]): AbstractFieldValidator<any> {
    const indexOf = FieldFormat.TYPE_VALIDATORS.indexOf(type);
    if (indexOf === -1) throw new Error('Cannot create field validator with type: ' + type);

    switch (FieldFormat.TYPE_VALIDATORS[indexOf]) {
      case FieldConstants.VALIDATOR_LIMITS:
        if (args !== undefined && args.length === 2) {
          const fieldFormatIsFirst = args[0] instanceof FieldFormat;
          if (fieldFormatIsFirst) return LimitsValidator.createFromFieldFormatAndSource(args[0], args[1]);
        }
        return Reflect.construct(LimitsValidator, args === undefined ? [null, null] : args);
      case FieldConstants.VALIDATOR_REGEX:
        return Reflect.construct(RegexValidator, args !== undefined ? args : []);
      case FieldConstants.VALIDATOR_NON_NULL:
        return Reflect.construct(NonNullValidator, args !== undefined ? args : [null]);
      case FieldConstants.VALIDATOR_ID:
        return Reflect.construct(IdValidator, args !== undefined ? args : []);
      case FieldConstants.VALIDATOR_EXPRESSION:
        return Reflect.construct(ExpressionValidator, args !== undefined ? args : [null]);
      default:
        throw new Error('Cannot create field validator with type: ' + type);
    }
  }

  protected setTransferEncode(transferEncode: boolean): FieldFormat<T> {
    this.transferEncode = transferEncode;
    return this;
  }

  public static isFieldClass(valueClass: string): boolean {
    return FieldFormat.CLASS_TO_TYPE.has(valueClass);
  }

  public setValidators(validators: Array<FieldValidator<T>>): void {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.validators = [...validators];
  }

  /**
   * Sets field name.
   */
  public setName(name: string): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    this.name = name;
    return this;
  }

  /**
   * Adds new selection value to the field.
   */
  public addSelectionValue(value: T, description: string): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    if (StringUtils.isEmpty(description)) {
      throw new Error('Empty selection value description');
    }

    try {
      value = this.convertValue(value) as T;
    } catch (ex) {
      throw new Error(ex.message);
    }

    if (this.selectionValues == null) {
      this.selectionValues = new Map();
    }

    this.selectionValues.set(value, description);

    return this;
  }

  public static getTypeSelectionValues(): Map<string, string> {
    return FieldFormat.TYPE_SELECTION_VALUES;
  }

  /**
   * Returns human-readable name of field type.
   */
  public getTypeName(): string {
    return FieldFormat.TYPE_SELECTION_VALUES.get(this.getType().valueOf()) as string;
  }

  public toString(): string {
    return this.description != null ? this.description : this.name;
  }

  public toDetailedString(): string {
    return (
      (this.description != null ? this.description + ' (' + this.name + ')' : this.name) + ', ' + this.getTypeName()
    );
  }

  public removeGroup(): void {
    this.group = null;
  }

  public validateName(): void {
    try {
      ValidatorHelper.NAME_SYNTAX_VALIDATOR.validate(null, null, null, this.getName());
    } catch (ve) {
      throw new Error(
        MessageFormat.format(Cres.get().getString('dtIllegalFieldValue'), this.getName(), this.toDetailedString()) +
          ve.message
      );
    }
  }

  private getEncodedFlags(): string {
    const buf: StringBuilder = new StringBuilder();
    if (this.isNullable()) {
      buf.append(FieldFormat.NULLABLE_FLAG);
    }
    if (this.isOptional()) {
      buf.append(FieldFormat.OPTIONAL_FLAG);
    }
    if (this.isReadonly()) {
      buf.append(FieldFormat.READ_ONLY_FLAG);
    }
    if (this.isNotReplicated()) {
      buf.append(FieldFormat.NOT_REPLICATED_FLAG);
    }
    if (this.isExtendableSelectionValues()) {
      buf.append(FieldFormat.EXTENDABLE_SELECTION_VALUES_FLAG);
    }
    if (this.isHidden()) {
      buf.append(FieldFormat.HIDDEN_FLAG);
    }
    if (this.isKeyField()) {
      buf.append(FieldFormat.KEY_FIELD_FLAG);
    }
    if (this.isInlineData()) {
      buf.append(FieldFormat.INLINE_DATA_FLAG);
    }
    if (this.isAdvanced()) {
      buf.append(FieldFormat.ADVANCED_FLAG);
    }
    if (this.isDefaultOverride()) {
      buf.append(FieldFormat.DEFAULT_OVERRIDE);
    }
    if (this.isShallow()) {
      buf.append(FieldFormat.SHALLOW_FLAG);
    }
    return buf.toString();
  }

  protected isTransferEncode(): boolean {
    return this.transferEncode;
  }

  public createValidators(source: string | null, settings: ClassicEncodingSettings): void {
    if (source == null || source.length == 0) {
      return;
    }

    const validatorsData: ElementList = StringUtils.elements(source, settings.isUseVisibleSeparators());
    validatorsData.getElements().forEach(el => {
      const element: Element | null = el as Element;
      if (element !== null) {
        const name = element.getName();
        const validatorType: string | null = name !== null ? name.charAt(0) : null;
        const validatorParams: string = element.getValue() === null ? '' : (element.getValue() as string);

        switch (validatorType) {
          case FieldConstants.VALIDATOR_LIMITS:
            this.addValidator(LimitsValidator.createFromFieldFormatAndSource(this, validatorParams));
            break;

          case FieldConstants.VALIDATOR_REGEX:
            this.addValidator(new RegexValidator(validatorParams, null));
            break;

          case FieldConstants.VALIDATOR_NON_NULL:
            this.addValidator(new NonNullValidator(validatorParams));
            break;

          case FieldConstants.VALIDATOR_ID:
            this.addValidator(new IdValidator());
            break;

          case FieldConstants.VALIDATOR_EXPRESSION:
            this.addValidator(new ExpressionValidator(validatorParams));
            break;
        }
      }
    });
  }

  protected convertValue(value: T | null): T | null {
    if (value != null) {
      // TODO continue then type Class will be added
      return value;
      /* if (this.getFieldClass() == value.getClass() ||
                this.getFieldWrappedClass() == value.getClass() ||
                this.getFieldClass().isAssignableFrom(value.getClass()) ||
                this.getFieldWrappedClass().isAssignableFrom(value.getClass())
            ) {
                return value;
            } */

      // throw new Error("Invalid class, need '" + this.getFieldWrappedClass().getName() + "', found '" + value.getClass().getName() + "'");
    }

    return value;
  }

  /**
   * Adds new field validator.
   */
  public addValidator(validator: FieldValidator<T>): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.validators !== null ? this.validators.push(validator) : null;
    return this;
  }

  public checkAndConvertValue(
    context: Context<any, any> | null,
    contextManager: ContextManager<Context<any, any>> | null,
    caller: CallerController | null,
    value: T | null,
    validate: boolean
  ): T | null {
    if (!this.isNullable() && value == null) {
      throw new Error(MessageFormat.format(Cres.get().getString('dtNullsNotPermitted'), this.toString()));
    }

    // TODO continue then type Class will be added
    value = this.convertValue(value);

    if (
      value != null &&
      !this.isExtendableSelectionValues() &&
      this.selectionValues != null &&
      !this.selectionValues.has(value)
    ) {
      if (validate) {
        // TODO uncomment then type Class will be added
        // throw new Error(Cres.get().getString("dtValueNotInSelVals") + value + " (" + value.getClass().getName() + ")");
        throw new Error(Cres.get().getString('dtValueNotInSelVals') + value);
      } else {
        value = this.getDefaultValue();
      }
    }

    if (validate && this.validators !== null) {
      for (let fv of this.validators) {
        value = (fv as FieldValidator<T>).validate(context, contextManager, caller, value);
      }
    }

    return value;
  }

  public valueFromEncodedString(
    source: string | null,
    settings: ClassicEncodingSettings = new ClassicEncodingSettings(false),
    validate: boolean = true
  ): T | null {
    const nullElement: string = settings.isUseVisibleSeparators()
      ? DataTableUtils.DATA_TABLE_VISIBLE_NULL
      : DataTableUtils.DATA_TABLE_NULL;
    const sourceIsNull: boolean = source === nullElement;

    if (sourceIsNull) {
      return null;
    }

    return this.isTransferEncode()
      ? this.valueFromString(DataTableUtils.transferDecode(source), null, false)
      : this.valueFromString(source, settings, validate);
  }

  /**
   * Sets default value of field.
   */
  public setDefault(value: T | null): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    try {
      this.defaultValue = this.checkAndConvertValue(null, null, null, value, true);
    } catch (ex) {
      throw new Error(ex);
    }
    return this;
  }

  public setDefaultFromString(
    value: string | null,
    settings: ClassicEncodingSettings = new ClassicEncodingSettings(false),
    validate: boolean = true
  ): void {
    if (value === null || value.length === 0) {
      return;
    }
    // Overriding validate flag here, as default value may contain non-valid table
    this.setDefault(this.valueFromEncodedString(value, settings, false));
  }

  /**
   * Sets field description.
   */
  public setDescription(description: string | null): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.description = description;
    return this;
  }

  /**
   * Sets field help (detailed description).
   */
  public setHelp(help: string): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.help = help;
    return this;
  }

  public createSelectionValues(source: string | null, settings: ClassicEncodingSettings): void {
    if (source === null || source.length === 0) {
      return;
    }

    const values: Map<T | null, string | null> = new Map<T, string | null>();

    const els: ElementList = StringUtils.elements(source, settings.isUseVisibleSeparators());
    els.getElements().forEach(el => {
      const valueSource: string | null = (el as Element).getValue();

      const selectionValue: T | null = this.valueFromEncodedString(valueSource, settings, true);

      if (selectionValue == null) {
        // let selectionValue2: T | null = this.valueFromEncodedString(valueSource, settings, true);
        //throw new Error("Error in createSelectionValues function of FiledFormat class. Element ad selectionValue === null");
      }
      const name: string | null = (el as Element).getName();
      if (name != null) {
        values.set(selectionValue, name);
      } else {
        values.set(selectionValue, selectionValue instanceof JObject ? selectionValue.toString() : null);
      }
    });

    this.setSelectionValues(values.size > 0 ? values : null);
  }

  /**
   * Sets field selection values.
   */
  public setSelectionValues(selectionValues: Map<T | string | number | null, string | null> | null): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }

    if (selectionValues == null || selectionValues.size == 0) {
      selectionValues = null;
      return this;
    }

    this.selectionValues = new Map(selectionValues);

    // If current default value doesn't match to new selection values, we change it to the first selection value from the list

    if (!selectionValues.has(this.getDefaultValue()) && !this.extendableSelectionValues) {
      this.setDefault(selectionValues.keys().next().value);
    }

    return this;
  }

  /**
   * Sets field editor/renderer ID.
   */
  public setEditor(editor: string): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    if (editor != null && !this.getSuitableEditors().find(el => el === editor)) {
      throw new Error(MessageFormat.format(Cres.get().getString('dtEditorNotSuitable'), toString()) + editor);
    }

    this.editor = editor;
    return this;
  }

  public getSuitableEditors(): Array<string> {
    return [FieldConstants.EDITOR_LIST];
  }

  /**
   * Sets field editor/renderer options.
   */
  public setEditorOptions(editorOptions: string): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.editorOptions = editorOptions;
    return this;
  }

  public setIcon(icon: string): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.icon = icon;
    return this;
  }

  public setGroup(group: string | null): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.group = group;
    return this;
  }

  /**
   * Sets shallow flag.
   */
  public setShallow(shallow: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.shallow = shallow;
    return this;
  }

  public setDefaultOverride(defaultOverride: boolean): FieldFormat<T> {
    this.defaultOverride = defaultOverride;
    return this;
  }

  public setAdvanced(advanced: boolean): FieldFormat<T> {
    this.advanced = advanced;
    return this;
  }

  public setInlineData(inlineData: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.inlineData = inlineData;
    return this;
  }

  /**
   * Sets key field flag.
   */
  public setKeyField(keyField: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.keyField = keyField;
    return this;
  }

  /**
   * Sets hidden flag.
   */
  public setHidden(hidden: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.hidden = hidden;
    return this;
  }

  /**
   * Sets not replicated flag.
   */
  public setNotReplicated(notReplicated: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.notReplicated = notReplicated;
    return this;
  }

  /**
   * Sets read only flag.
   */
  public setReadonly(readonly: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.readonly = readonly;
    return this;
  }

  /**
   * Sets extendable selection values flag.
   */
  public setExtendableSelectionValues(extendableSelectionValues: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.extendableSelectionValues = extendableSelectionValues;
    return this;
  }

  /**
   * Sets nullable flag.
   */
  public setNullable(nullable: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.nullable = nullable;
    return this;
  }

  public setOptional(optional: boolean): FieldFormat<T> {
    if (this.immutable) {
      throw new Error('Immutable');
    }
    this.optional = optional;
    return this;
  }

  /**
   * Returns field name.
   */
  public getName(): string {
    return this.name;
  }

  public isNullable(): boolean {
    return this.nullable;
  }

  public isOptional(): boolean {
    return this.optional;
  }

  public isReadonly(): boolean {
    return this.readonly;
  }

  public isNotReplicated(): boolean {
    return this.notReplicated;
  }

  public isExtendableSelectionValues(): boolean {
    return this.extendableSelectionValues;
  }

  public isHidden(): boolean {
    return this.hidden;
  }

  public isKeyField(): boolean {
    return this.keyField;
  }

  public isInlineData(): boolean {
    return this.inlineData;
  }

  public isAdvanced(): boolean {
    return this.advanced;
  }

  public isDefaultOverride(): boolean {
    return this.defaultOverride;
  }

  public isShallow(): boolean {
    return this.shallow;
  }

  public static encAppend(
    buffer: StringBuilder,
    name: string,
    value: string | null,
    settings: ClassicEncodingSettings,
    allowEmptyString: boolean = false
  ) {
    if (value != null && (allowEmptyString || value.length !== 0)) {
      new Element(name, value).encode(buffer, settings);
    }
  }

  public getDefaultValueCopy(): T | null {
    const def: T | null = this.getDefaultValue();
    return def == null ? null : CloneUtils.deepClone(def);
  }

  /**
   * Returns default value of the field.
   */
  public getDefaultValue(): T | null {
    // Don't call this method before format construction is finished, otherwise setting format to nullable will not set default value to null
    if (this.defaultValue == null && !this.isNullable()) {
      this.defaultValue = this.getNotNullDefault();
    }

    return this.defaultValue;
  }

  public encode(settingsBy?: boolean | ClassicEncodingSettings): string {
    let settings: ClassicEncodingSettings;
    if (Util.isBoolean(settingsBy)) {
      settings = new ClassicEncodingSettings(settingsBy as boolean);
    } else if (settingsBy instanceof ClassicEncodingSettings) {
      settings = settingsBy as ClassicEncodingSettings;
    } else {
      settings = new ClassicEncodingSettings(true);
    }

    const data: StringBuilder = new StringBuilder();

    new Element(null, this.getName()).encode(data, settings);
    new Element(null, this.getType().valueOf()).encode(data, settings);

    FieldFormat.encAppend(data, FieldFormat.ELEMENT_FLAGS, this.getEncodedFlags(), settings);

    if (settings.isEncodeDefaultValues()) {
      const encodedBuilder = this.valueToEncodedString(this.getDefaultValue(), settings);
      const encodedString = encodedBuilder ? encodedBuilder.toString() : encodedBuilder;
      new Element(FieldFormat.ELEMENT_DEFAULT_VALUE, encodedString).encode(data, settings);
    }

    FieldFormat.encAppend(
      data,
      FieldFormat.ELEMENT_DESCRIPTION,
      DataTableUtils.transferEncode(this.description),
      settings
    );
    FieldFormat.encAppend(data, FieldFormat.ELEMENT_HELP, DataTableUtils.transferEncode(this.help), settings);
    FieldFormat.encAppend(
      data,
      FieldFormat.ELEMENT_SELECTION_VALUES,
      this.getEncodedSelectionValues(settings),
      settings
    );
    FieldFormat.encAppend(data, FieldFormat.ELEMENT_VALIDATORS, this.getEncodedValidators(settings), settings);
    FieldFormat.encAppend(data, FieldFormat.ELEMENT_EDITOR, DataTableUtils.transferEncode(this.editor), settings);
    FieldFormat.encAppend(
      data,
      FieldFormat.ELEMENT_EDITOR_OPTIONS,
      DataTableUtils.transferEncode(this.editorOptions),
      settings,
      true
    );
    FieldFormat.encAppend(data, FieldFormat.ELEMENT_ICON, DataTableUtils.transferEncode(this.icon), settings);
    FieldFormat.encAppend(data, FieldFormat.ELEMENT_GROUP, DataTableUtils.transferEncode(this.group), settings);

    return data.toString();
  }

  public getEncodedValidators(settings: ClassicEncodingSettings): string | null {
    if (this.validators === null || this.validators.length == 0) {
      return null;
    }

    const enc: StringBuilder = new StringBuilder();
    this.validators.forEach(value => {
      if (value.getType() != null) {
        const type: string = value.getType() === null ? 'null' : (value.getType() as string);
        enc.append(new Element(type, value.encode()).encode(null, settings).toString());
      }
    });

    return enc.length() != 0 ? enc.toString() : null;
  }

  private getEncodedSelectionValues(settings: ClassicEncodingSettings): string | null {
    if (this.selectionValues == null) {
      return null;
    }

    const enc: StringBuilder = new StringBuilder();
    this.selectionValues.forEach((value, key) => {
      const valueDesc: string | null =
        this.selectionValues !== null ? (this.selectionValues.get(key) as string | null) : null;

      const encodedBuilder = this.valueToEncodedString(key, settings);
      const encodedString = encodedBuilder ? encodedBuilder.toString() : encodedBuilder;
      enc.append(new Element(valueDesc, encodedString).encode(null, settings).toString());
    });

    return enc.toString();
  }

  public valueToEncodedString(
    value: T | string | number | null,
    settings: ClassicEncodingSettings,
    sb: StringBuilder = new StringBuilder(),
    encodeLevel: number = 1
  ): StringBuilder | null {
    const strVal: string | null = this.valueToString(value, settings);

    if (strVal == null)
      return settings == null || !settings.isUseVisibleSeparators()
        ? sb.append(DataTableUtils.DATA_TABLE_NULL)
        : sb.append(DataTableUtils.DATA_TABLE_VISIBLE_NULL);

    if (this.isTransferEncode()) TransferEncodingHelper.encode(strVal, sb, encodeLevel);
    else sb.append(strVal);

    return sb;
  }

  public extend(other: FieldFormat<T>): boolean {
    return this.extendMessage(other) == null;
  }

  public hasDescription(): boolean {
    return this.description != null;
  }

  /**
   * Returns true if field has specified selection value.
   */
  public hasSelectionValue(value: T): boolean {
    return this.selectionValues != null && this.selectionValues.has(value);
  }

  /**
   * Returns true if field has selection values.
   */
  public hasSelectionValues(): boolean {
    return this.selectionValues != null && this.selectionValues.size > 0;
  }

  /**
   * Returns description of the field.
   */
  public getDescription(): string {
    if (this.description == null) {
      if (this.cachedDefaultDescription == null) {
        this.cachedDefaultDescription = Util.nameToDescription(this.name);
      }

      return this.cachedDefaultDescription;
    }

    return this.description;
  }

  /**
   * Returns help (detailed description) of the field.
   */
  public getHelp(): string | null {
    return this.help;
  }

  /**
   * Returns map containing selection values and their textual descriptions.
   */
  public getSelectionValues(): Map<T | string | number | null, string | null> | null {
    return this.immutable
      ? this.selectionValues != null
        ? new Map(this.selectionValues)
        : null
      : this.selectionValues;
  }

  /**
   * Returns field editor/renderer ID.
   */
  public getEditor(): string | null {
    return this.editor;
  }

  /**
   * Returns field editor/renderer options in the encoded form.
   */
  public getEditorOptions(): string | null {
    return this.editorOptions;
  }

  public getIcon(): string | null {
    return this.icon;
  }

  public getGroup(): string | null {
    return this.group;
  }

  // TODO decide how to implement hashCode
  // public hashCode(): number | null
  // {
  //     const prime: number = 31;
  //     let result: number = 1;
  //     const def: T | null = this.getDefaultValue();
  //     if (def === null) return null;
  //
  //     result = prime * result + ((def == null) ? 0 : def.hashCode());
  //     result = prime * result + this.getType();
  //     result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
  //     result = prime * result + ((this.editor == null) ? 0 : this.editor.hashCode());
  //     result = prime * result + ((this.editorOptions == null) ? 0 : this.editorOptions.hashCode());
  //     result = prime * result + ((this.icon == null) ? 0 : this.icon.hashCode());
  //     result = prime * result + ((this.group == null) ? 0 : this.group.hashCode());
  //     result = prime * result + (this.extendableSelectionValues ? 1231 : 1237);
  //     result = prime * result + ((this.help == null) ? 0 : this.help.hashCode());
  //     result = prime * result + (this.hidden ? 1231 : 1237);
  //     result = prime * result + (this.inlineData ? 1231 : 1237);
  //     result = prime * result + (this.keyField ? 1231 : 1237);
  //     result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
  //     result = prime * result + (this.notReplicated ? 1231 : 1237);
  //     result = prime * result + (this.nullable ? 1231 : 1237);
  //     result = prime * result + (this.optional ? 1231 : 1237);
  //     result = prime * result + (this.readonly ? 1231 : 1237);
  //     result = prime * result + (this.advanced ? 1231 : 1237);
  //     result = prime * result + ((this.selectionValues == null) ? 0 : this.selectionValues.hashCode());
  //     result = prime * result + (this.transferEncode ? 1231 : 1237);
  //     result = prime * result + ((this.validators == null) ? 0 : this.validators.hashCode());
  //     return result;
  // }

  /**
   * Returns modifiable list of field validators.
   */
  public getValidators(): Array<FieldValidator<T>> {
    return this.immutable ? [...this.validators] : this.validators;
  }

  public extendMessage(other: FieldFormat<T>): string | null {
    if (this.getName() !== other.getName()) {
      return 'Wrong name: need ' + this.getName() + ', found ' + other.getName();
    }
    if (other.hasDescription() && !Util.equals(this.getDescription(), other.getDescription())) {
      return 'Wrong description: need ' + this.getDescription() + ', found ' + other.getDescription();
    }
    if (this.getHelp() !== other.getHelp()) {
      return 'Wrong help: need ' + this.getHelp() + ', found ' + other.getHelp();
    }
    if (this.getType() != other.getType()) {
      return 'Wrong type: need ' + this.getType() + ', found ' + other.getType();
    }
    if (!this.isNullable() && other.isNullable()) {
      return 'Different nullable flags: need ' + this.isNullable() + ', found ' + other.isNullable();
    }
    if (this.isReadonly() != other.isReadonly()) {
      return 'Different readonly flags: need ' + this.isReadonly() + ', found ' + other.isReadonly();
    }
    if (this.isHidden() != other.isHidden()) {
      return 'Different hidden flags: need ' + this.isHidden() + ', found ' + other.isHidden();
    }

    if (!this.isExtendableSelectionValues() || !other.isExtendableSelectionValues()) {
      let selectionValuesOk: boolean =
        other.getSelectionValues() == null || Util.equals(this.getSelectionValues(), other.getSelectionValues());
      if (!selectionValuesOk && this.getSelectionValues() != null) {
        let foundMissingValues: boolean = false,
          value: any;
        const selectionValues: Map<T | null, string> = this.getSelectionValues() as Map<T | null, string>;
        const otherSelectionValues: Map<T | null, string> = other.getSelectionValues() as Map<T | null, string>;
        for (value in selectionValues.keys()) {
          if (!otherSelectionValues.has(value)) {
            foundMissingValues = true;
          }
        }
        if (!foundMissingValues) {
          selectionValuesOk = true;
        }
      }

      if (!selectionValuesOk) {
        return (
          'Different selection values: need ' + other.getSelectionValues() + ', found ' + this.getSelectionValues()
        );
      }
    }

    if (!Util.equals(this.getEditor(), other.getEditor())) {
      return 'Different editor: need ' + this.getEditor() + ', found ' + other.getEditor();
    }
    if (!Util.equals(this.getEditorOptions(), other.getEditorOptions())) {
      return 'Different editor options: need ' + this.getEditorOptions() + ', found ' + other.getEditorOptions();
    }
    if (!Util.equals(this.getIcon(), other.getIcon())) {
      return 'Wrong icon: need ' + this.getIcon() + ', found ' + other.getIcon();
    }
    if (!Util.equals(this.getGroup(), other.getGroup())) {
      return 'Wrong group: need ' + this.getGroup() + ', found ' + other.getGroup();
    }

    const otherValidators: Array<FieldValidator<T>> | null = other.getValidators();
    let otherValidator: any;
    for (otherValidator in otherValidators) {
      const validators = this.getValidators();
      if ((validators !== null ? validators.find(el => el === (otherValidator as FieldValidator<T>)) : -1) === -1) {
        return 'Different validators: need ' + this.getValidators() + ', found ' + other.getValidators();
      }
    }

    const AbstractDataTable = require('./AbstractDataTable').default;
    if (
      this.getDefaultValue() !== null &&
      this.getDefaultValue() instanceof AbstractDataTable &&
      other.getDefaultValue() != null &&
      other.getDefaultValue() instanceof AbstractDataTable
    ) {
      const defaultValue: T | null = this.getDefaultValue();
      const my: DataTable | null = defaultValue instanceof JObject ? ((defaultValue as unknown) as DataTable) : null;
      const anotherDefaultValue = other.getDefaultValue();
      const another: DataTable | null =
        anotherDefaultValue instanceof JObject ? ((anotherDefaultValue as unknown) as DataTable) : null;
      if (my !== null && another !== null) {
        const msg: string | null = my.getFormat().extendMessage(another.getFormat());
        if (msg != null) {
          return "Field format doesn't match: " + msg;
        }
      } else {
        return `Default value is null. this.getDefaultValue() = ${defaultValue}, other.getDefaultValue() = ${anotherDefaultValue}`;
      }
    }
    return null;
  }

  public clone(): FieldFormat<T> {
    let cl: FieldFormat<T> | null = null;

    try {
      cl = super.clone() as FieldFormat<T>;
    } catch (e) {
      throw new Error(e);
    }

    cl.defaultValue = CloneUtils.genericClone(this.getDefaultValue());
    cl.selectionValues = CloneUtils.deepClone(this.selectionValues);
    if (this.validators != null)
      cl.validators = CloneUtils.deepClone(this.validators as Array<FieldValidator<T>>) as Array<FieldValidator<T>>;

    cl.immutable = false;

    return cl;
  }

  public wrap(): TableFormat {
    return TableFormat.createWithFormat(this);
  }

  public wrapSimple(): TableFormat {
    return TableFormat.createWithFormat(this)
      .setMinRecords(1)
      .setMaxRecords(1);
  }

  public equals(obj: JObject): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }

    const other: FieldFormat<T> = obj as FieldFormat<T>;
    if (this.name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (this.name !== other.name) {
      return false;
    }

    if (this.extendableSelectionValues != other.extendableSelectionValues) {
      return false;
    }
    if (this.hidden != other.hidden) {
      return false;
    }
    if (this.inlineData != other.inlineData) {
      return false;
    }
    if (this.keyField != other.keyField) {
      return false;
    }
    if (this.notReplicated != other.notReplicated) {
      return false;
    }
    if (this.nullable != other.nullable) {
      return false;
    }
    if (this.optional != other.optional) {
      return false;
    }
    if (this.readonly != other.readonly) {
      return false;
    }
    if (this.advanced != other.advanced) {
      return false;
    }

    if (this.description == null) {
      if (other.description != null) {
        return false;
      }
    } else if (this.description !== other.description) {
      return false;
    }

    const def: any = this.getDefaultValue();
    const odef: any = other.getDefaultValue();
    if (def == null) {
      if (odef != null) {
        return false;
      }
    } else if (!Util.equals(def, odef)) {
      return false;
    }

    if (this.help === null) {
      if (other.help != null) {
        return false;
      }
    } else if (this.help !== other.help) {
      return false;
    }

    if (this.editor === null) {
      if (other.editor != null) {
        return false;
      }
    } else if (this.editor !== other.editor) {
      return false;
    }

    if (this.editorOptions === null) {
      if (other.editorOptions != null) {
        return false;
      }
    } else if (this.editorOptions !== other.editorOptions) {
      return false;
    }

    if (this.icon == null) {
      if (other.icon != null) {
        return false;
      }
    } else if (this.icon !== other.icon) {
      return false;
    }

    if (this.group == null) {
      if (other.group != null) {
        return false;
      }
    } else if (this.group !== other.group) {
      return false;
    }

    if (this.selectionValues == null) {
      if (other.selectionValues != null) {
        return false;
      }
    } else if (!Util.equals(this.selectionValues, other.selectionValues)) {
      return false;
    }

    if (this.transferEncode != other.transferEncode) {
      return false;
    }

    if (this.validators == null) {
      if (other.validators != null) {
        return false;
      }
    } else if (!Util.equals(this.validators, other.validators)) {
      return false;
    }

    return true;
  }
}
