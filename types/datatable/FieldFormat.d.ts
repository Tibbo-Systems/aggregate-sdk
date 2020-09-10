import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import StringBuilder from '../util/java/StringBuilder';
import JObject from '../util/java/JObject';
import Context from '../context/Context';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import TableFormat from './TableFormat';
import FieldValidator from './validator/FieldValidator';
import AbstractFieldValidator from './validator/AbstractFieldValidator';
export default abstract class FieldFormat<T> extends JObject {
    static readonly NULLABLE_FLAG: string;
    static readonly OPTIONAL_FLAG: string;
    static readonly READ_ONLY_FLAG: string;
    static readonly NOT_REPLICATED_FLAG: string;
    static readonly EXTENDABLE_SELECTION_VALUES_FLAG: string;
    static readonly HIDDEN_FLAG: string;
    static readonly KEY_FIELD_FLAG: string;
    static readonly INLINE_DATA_FLAG: string;
    static readonly ADVANCED_FLAG: string;
    static readonly DEFAULT_OVERRIDE: string;
    static readonly SHALLOW_FLAG: string;
    static readonly ELEMENT_DEFAULT_VALUE: string;
    static readonly ELEMENT_FLAGS: string;
    static readonly ELEMENT_DESCRIPTION: string;
    static readonly ELEMENT_HELP: string;
    static readonly ELEMENT_SELECTION_VALUES: string;
    static readonly ELEMENT_VALIDATORS: string;
    static readonly ELEMENT_EDITOR: string;
    static readonly ELEMENT_EDITOR_OPTIONS: string;
    static readonly ELEMENT_ICON: string;
    static readonly ELEMENT_GROUP: string;
    private static readonly TYPE_SELECTION_VALUES;
    private static readonly TYPE_VALIDATORS;
    private static readonly CLASS_TO_TYPE;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    private name;
    private transferEncode;
    private nullable;
    private optional;
    private extendableSelectionValues;
    private readonly;
    private notReplicated;
    private hidden;
    private keyField;
    private inlineData;
    private advanced;
    private defaultOverride;
    private shallow;
    private defaultValue;
    private immutable;
    private description;
    private help;
    private editor;
    private editorOptions;
    private icon;
    private group;
    private cachedDefaultDescription;
    /**
     * T should be string
     */
    private selectionValues;
    private validators;
    abstract valueToString(value: T | string | number | null, settings?: ClassicEncodingSettings): string | null;
    abstract valueFromString(value: string | null, settings?: ClassicEncodingSettings | null, validate?: boolean): T | null;
    abstract getType(): string;
    abstract getNotNullDefault(): T;
    abstract isAssignableFrom(value: any): boolean;
    protected constructor(name: string);
    makeImmutable(): void;
    static createFieldValidatorByType(type: string, args?: any[]): AbstractFieldValidator<any>;
    static getFieldFormatType(value: any): string;
    protected setTransferEncode(transferEncode: boolean): FieldFormat<T>;
    static isFieldClass(valueClass: string): boolean;
    setValidators(validators: Array<FieldValidator<T>>): void;
    /**
     * Sets field name.
     */
    setName(name: string): FieldFormat<T>;
    /**
     * Adds new selection value to the field.
     */
    addSelectionValue(value: T, description: string): FieldFormat<T>;
    static getTypeSelectionValues(): Map<string, string>;
    /**
     * Returns human-readable name of field type.
     */
    getTypeName(): string;
    toString(): string;
    toDetailedString(): string;
    removeGroup(): void;
    validateName(): void;
    private getEncodedFlags;
    protected isTransferEncode(): boolean;
    createValidators(source: string | null, settings: ClassicEncodingSettings): void;
    protected convertValue(value: T | null): T | null;
    /**
     * Adds new field validator.
     */
    addValidator(validator: FieldValidator<T>): FieldFormat<T>;
    checkAndConvertValue(context: Context<any, any> | null, contextManager: ContextManager<Context<any, any>> | null, caller: CallerController | null, value: T | null, validate: boolean): T | null;
    valueFromEncodedString(source: string | null, settings?: ClassicEncodingSettings, validate?: boolean): T | null;
    /**
     * Sets default value of field.
     */
    setDefault(value: T | null): FieldFormat<T>;
    setDefaultFromString(value: string | null, settings?: ClassicEncodingSettings, validate?: boolean): void;
    /**
     * Sets field description.
     */
    setDescription(description: string | null): FieldFormat<T>;
    /**
     * Sets field help (detailed description).
     */
    setHelp(help: string): FieldFormat<T>;
    createSelectionValues(source: string | null, settings: ClassicEncodingSettings): void;
    convertKeyForSelectionValuesMap(value: any): any;
    /**
     * Sets field selection values.
     */
    setSelectionValues(selectionValues: Map<T | string | number | null, string | null> | null): FieldFormat<T>;
    /**
     * Sets field editor/renderer ID.
     */
    setEditor(editor: string): FieldFormat<T>;
    getSuitableEditors(): Array<string>;
    /**
     * Sets field editor/renderer options.
     */
    setEditorOptions(editorOptions: string): FieldFormat<T>;
    setIcon(icon: string): FieldFormat<T>;
    setGroup(group: string | null): FieldFormat<T>;
    /**
     * Sets shallow flag.
     */
    setShallow(shallow: boolean): FieldFormat<T>;
    setDefaultOverride(defaultOverride: boolean): FieldFormat<T>;
    setAdvanced(advanced: boolean): FieldFormat<T>;
    setInlineData(inlineData: boolean): FieldFormat<T>;
    /**
     * Sets key field flag.
     */
    setKeyField(keyField: boolean): FieldFormat<T>;
    /**
     * Sets hidden flag.
     */
    setHidden(hidden: boolean): FieldFormat<T>;
    /**
     * Sets not replicated flag.
     */
    setNotReplicated(notReplicated: boolean): FieldFormat<T>;
    /**
     * Sets read only flag.
     */
    setReadonly(readonly: boolean): FieldFormat<T>;
    /**
     * Sets extendable selection values flag.
     */
    setExtendableSelectionValues(extendableSelectionValues: boolean): FieldFormat<T>;
    /**
     * Sets nullable flag.
     */
    setNullable(nullable: boolean): FieldFormat<T>;
    setOptional(optional: boolean): FieldFormat<T>;
    /**
     * Returns field name.
     */
    getName(): string;
    isNullable(): boolean;
    isOptional(): boolean;
    isReadonly(): boolean;
    isNotReplicated(): boolean;
    isExtendableSelectionValues(): boolean;
    isHidden(): boolean;
    isKeyField(): boolean;
    isInlineData(): boolean;
    isAdvanced(): boolean;
    isDefaultOverride(): boolean;
    isShallow(): boolean;
    static encAppend(buffer: StringBuilder, name: string, value: string | null, settings: ClassicEncodingSettings, allowEmptyString?: boolean): void;
    getDefaultValueCopy(): T | null;
    /**
     * Returns default value of the field.
     */
    getDefaultValue(): T | null;
    encode(settingsBy?: boolean | ClassicEncodingSettings): string;
    getEncodedValidators(settings: ClassicEncodingSettings): string | null;
    private getEncodedSelectionValues;
    valueToEncodedString(value: T | string | number | null, settings: ClassicEncodingSettings, sb?: StringBuilder, encodeLevel?: number): StringBuilder | null;
    extend(other: FieldFormat<T>): boolean;
    hasDescription(): boolean;
    /**
     * Returns true if field has specified selection value.
     */
    hasSelectionValue(value: T | null): boolean;
    /**
     * Returns true if field has selection values.
     */
    hasSelectionValues(): boolean;
    /**
     * Returns description of the field.
     */
    getDescription(): string;
    /**
     * Returns help (detailed description) of the field.
     */
    getHelp(): string | null;
    /**
     * Returns map containing selection values and their textual descriptions.
     */
    getSelectionValues(): Map<T | string | number | null, string | null> | null;
    /**
     * Returns field editor/renderer ID.
     */
    getEditor(): string | null;
    /**
     * Returns field editor/renderer options in the encoded form.
     */
    getEditorOptions(): string | null;
    getIcon(): string | null;
    getGroup(): string | null;
    /**
     * Returns modifiable list of field validators.
     */
    getValidators(): Array<FieldValidator<T>>;
    extendMessage(other: FieldFormat<T>): string | null;
    clone(): FieldFormat<T>;
    wrap(): TableFormat;
    wrapSimple(): TableFormat;
    equals(obj: JObject): boolean;
}
