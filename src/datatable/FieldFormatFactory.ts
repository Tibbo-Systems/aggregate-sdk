import FieldFormat from './FieldFormat';
import FieldConstants from './field/FieldConstants';
import JObject from '../util/java/JObject';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import ElementList from '../util/ElementList';
import StringUtils from '../util/StringUtils';
import Element from '../util/Element';
import DataTableUtils from './DataTableUtils';
import ColorFieldFormat from './field/ColorFieldFormat';

export default class FieldFormatFactory {
  public static createType(name: string | null, type: string | null): FieldFormat<any> {
    if (name === null || type === null)
      throw new Error("Error in createType function of FieldFormat class. Type or name can't be null");

    const IntFieldFormat = require('./field/IntFieldFormat').default;
    const StringFieldFormat = require('./field/StringFieldFormat').default;
    const BooleanFieldFormat = require('./field/BooleanFieldFormat').default;
    const LongFieldFormat = require('./field/LongFieldFormat').default;
    const FloatFieldFormat = require('./field/FloatFieldFormat').default;
    const DoubleFieldFormat = require('./field/DoubleFieldFormat').default;
    const DateFieldFormat = require('./field/DateFieldFormat').default;
    const DataTableFieldFormat = require('./field/DataTableFieldFormat').default;
    const DataFieldFormat = require('./field/DataFieldFormat').default;
    switch (type) {
      case FieldConstants.INTEGER_FIELD:
        return new IntFieldFormat(name);

      case FieldConstants.STRING_FIELD:
        return new StringFieldFormat(name);

      case FieldConstants.BOOLEAN_FIELD:
        return new BooleanFieldFormat(name);

      case FieldConstants.LONG_FIELD:
        return new LongFieldFormat(name);

      case FieldConstants.FLOAT_FIELD:
        return new FloatFieldFormat(name);

      case FieldConstants.DOUBLE_FIELD:
        return new DoubleFieldFormat(name);

      case FieldConstants.DATE_FIELD:
        return new DateFieldFormat(name);

      case FieldConstants.DATATABLE_FIELD:
        return new DataTableFieldFormat(name);

      case FieldConstants.COLOR_FIELD:
        return new ColorFieldFormat(name);

      case FieldConstants.DATA_FIELD:
        return new DataFieldFormat(name);

      default:
        throw new Error('Unknown field type: ' + type);
    }
  }

  public static createWith<S extends any>(
    name: string,
    type: string,
    description: string | null,
    defaultValue: any | null = null,
    nullable: boolean = false,
    group: string | null = null
  ): FieldFormat<S> {
    const ff = FieldFormatFactory.createType(name, type);
    ff.setDescription(description);
    ff.setNullable(nullable);
    if (nullable || defaultValue != null) ff.setDefault(defaultValue);
    ff.setGroup(group);
    return ff;
  }

  public static create<S extends JObject>(
    format: string,
    settings: ClassicEncodingSettings = new ClassicEncodingSettings(true),
    validate: boolean = true
  ): FieldFormat<S> {
    const els: ElementList = StringUtils.elements(format, settings.isUseVisibleSeparators());

    let name: string | null = null;
    let type: string | null;

    try {
      name = els.get(0).getValue();
      const res: string | null = els.get(1).getValue();
      type = res !== null ? res.charAt(0) : null;
    } catch (ex1) {
      throw new Error(ex1.getMessage());
    }

    const ff: FieldFormat<S> = FieldFormatFactory.createType(name, type);

    if (validate) {
      ff.validateName();
    }

    let el: Element | null = els.getElement(FieldFormat.ELEMENT_FLAGS);

    if (el != null) {
      const flags: string = el.getValue() as string;
      ff.setNullable(flags.indexOf(FieldFormat.NULLABLE_FLAG) != -1);
      ff.setOptional(flags.indexOf(FieldFormat.OPTIONAL_FLAG) != -1);
      ff.setExtendableSelectionValues(flags.indexOf(FieldFormat.EXTENDABLE_SELECTION_VALUES_FLAG) != -1);
      ff.setReadonly(flags.indexOf(FieldFormat.READ_ONLY_FLAG) != -1);
      ff.setNotReplicated(flags.indexOf(FieldFormat.NOT_REPLICATED_FLAG) != -1);
      ff.setHidden(flags.indexOf(FieldFormat.HIDDEN_FLAG) != -1);
      ff.setKeyField(flags.indexOf(FieldFormat.KEY_FIELD_FLAG) != -1);
      ff.setInlineData(flags.indexOf(FieldFormat.INLINE_DATA_FLAG) != -1);
      ff.setAdvanced(flags.indexOf(FieldFormat.ADVANCED_FLAG) != -1);
      ff.setDefaultOverride(flags.indexOf(FieldFormat.DEFAULT_OVERRIDE) != -1);
      ff.setShallow(flags.indexOf(FieldFormat.SHALLOW_FLAG) != -1);
    }

    el = els.getElement(FieldFormat.ELEMENT_DEFAULT_VALUE);

    if (el != null) {
      ff.setDefaultFromString(el.getValue(), settings, validate);
    }

    el = els.getElement(FieldFormat.ELEMENT_DESCRIPTION);

    if (el != null) {
      ff.setDescription(DataTableUtils.transferDecode(el.getValue()));
    }

    el = els.getElement(FieldFormat.ELEMENT_HELP);

    if (el != null) {
      ff.setHelp(DataTableUtils.transferDecode(el.getValue()));
    }

    el = els.getElement(FieldFormat.ELEMENT_SELECTION_VALUES);

    if (el != null) {
      ff.createSelectionValues(el.getValue(), settings);
    }

    el = els.getElement(FieldFormat.ELEMENT_VALIDATORS);

    if (el != null) {
      ff.createValidators(el.getValue(), settings);
    }

    el = els.getElement(FieldFormat.ELEMENT_EDITOR);

    if (el != null) {
      ff.setEditor(DataTableUtils.transferDecode(el.getValue()));
    }

    el = els.getElement(FieldFormat.ELEMENT_EDITOR_OPTIONS);

    if (el != null) {
      ff.setEditorOptions(DataTableUtils.transferDecode(el.getValue()));
    }

    el = els.getElement(FieldFormat.ELEMENT_ICON);

    if (el != null) {
      ff.setIcon(DataTableUtils.transferDecode(el.getValue()));
    }

    el = els.getElement(FieldFormat.ELEMENT_GROUP);

    if (el != null) {
      ff.setGroup(DataTableUtils.transferDecode(el.getValue()));
    }

    return ff;
  }
}
