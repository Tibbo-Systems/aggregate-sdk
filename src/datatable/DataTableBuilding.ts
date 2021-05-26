import TableFormat from './TableFormat';
import DataTableUtils from './DataTableUtils';
import Cres from '../Cres';
import ValidatorHelper from './validator/ValidatorHelper';
import TableKeyFieldsValidator from './validator/TableKeyFieldsValidator';
import Contexts from '../context/Contexts';
import UtilitiesContextConstants from '../server/UtilitiesContextConstants';
import LimitsValidator from './validator/LimitsValidator';
import TableExpressionValidator from './validator/TableExpressionValidator';
import Functions from '../expression/function/Functions';
import DataTableFactory from './DataTableFactory';
import FieldConstants from './field/FieldConstants';
import DataTable from './DataTable';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import DataRecord from './DataRecord';
import EditorOptionsUtils from './converter/editor/EditorOptionsUtils';
import Log from '../Log';
import DataTableBuildingConstants from './DataTableBuildingConstants';
import Expression from '../expression/Expression';
import AbstractFieldValidator from './validator/AbstractFieldValidator';
import FieldFormatFactory from './FieldFormatFactory';
import DataTableBindingProvider from './DataTableBindingProvider';

export default class DataTableBuilding {
  public static SELECTION_VALUES_FORMAT: TableFormat = TableFormat.createWithReorderable(true);

  public static readonly FIELD_SELECTION_VALUES_VALUE: string = 'value';
  public static readonly FIELD_SELECTION_VALUES_DESCRIPTION: string = 'description';

  public static createTableFormat(formatTable: DataTable, settings: ClassicEncodingSettings | null = null, allowNull = false): TableFormat | null {
    const rec: DataRecord = formatTable.rec();

    const minRecords: number = rec.getInt(DataTableBuildingConstants.FIELD_TABLE_FORMAT_MIN_RECORDS);
    const maxRecords: number = rec.getInt(DataTableBuildingConstants.FIELD_TABLE_FORMAT_MAX_RECORDS);

    const fields: DataTable = rec.getDataTable(DataTableBuildingConstants.FIELD_TABLE_FORMAT_FIELDS);

    if (allowNull && fields.getRecordCount() === 0) {
      return null;
    }

    const reorderable: boolean = rec.getBoolean(DataTableBuildingConstants.FIELD_TABLE_FORMAT_REORDERABLE);
    const unresizable: boolean = rec.getBoolean(DataTableBuildingConstants.FIELD_TABLE_FORMAT_UNRESIZABLE);

    const bindings: DataTable = rec.getDataTable(DataTableBuildingConstants.FIELD_TABLE_FORMAT_BINDINGS);

    const format: TableFormat = this.createTableFormatWithRecordsCount(minRecords, maxRecords, reorderable, fields, settings);

    format.setUnresizable(unresizable);

    for (const binding of bindings) {
      format.addBinding(binding.getString(DataTableBuildingConstants.FIELD_BINDINGS_TARGET), binding.getString(DataTableBuildingConstants.FIELD_BINDINGS_EXPRESSION));
    }

    if (rec.getString(DataTableBuildingConstants.FIELD_TABLE_FORMAT_NAMING_EXPRESSION) != null) {
      format.setNamingExpression(rec.getString(DataTableBuildingConstants.FIELD_TABLE_FORMAT_NAMING_EXPRESSION));
    }

    return format;
  }

  public static createTableFormatWithRecordsCount(minRecords: number, maxRecords: number, reorderable: boolean, fields: DataTable, settings: ClassicEncodingSettings | null): TableFormat {
    const FieldFormat = require('./FieldFormat').default;
    const rf: TableFormat = TableFormat.createWithReorderable(reorderable);

    rf.setMinRecords(minRecords);
    rf.setMaxRecords(maxRecords);

    let hasKeys = false;

    for (const fdata of fields) {
      const ff = FieldFormatFactory.createType(fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NAME), fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE).charAt(0));

      ff.setDescription(fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION));
      ff.setHelp(fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HELP));

      const def: string = fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DEFAULT_VALUE);
      if (def != null && def.length > 0) {
        ff.setDefault(ff.valueFromString(def, settings, true));
      }

      ff.setReadonly(fdata.getBoolean(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_READONLY));
      ff.setNullable(fdata.getBoolean(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NULLABLE));
      if (fdata.hasField(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HIDDEN)) {
        ff.setHidden(fdata.getBoolean(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HIDDEN));
      }

      if (fdata.hasField(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_INLINE)) {
        ff.setInlineData(fdata.getBoolean(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_INLINE));
      }

      if (fdata.hasField(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION)) {
        ff.setDescription(fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION));
      }

      if (fdata.hasField(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_GROUP)) {
        ff.setGroup(fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_GROUP));
      }

      const key: boolean = fdata.getFormat().hasField(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_KEY) ? fdata.getBoolean(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_KEY) : false;
      ff.setKeyField(key);
      if (key) {
        hasKeys = true;
      }

      const selVals: DataTable = fdata.getDataTable(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_SELVALS);

      ff.setExtendableSelectionValues(fdata.getBoolean(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EXTSELVALS));

      if (selVals.getRecordCount() > 0) {
        //    TODO object is not permitted as key
        const sv: Map<any, string> = new Map<any, string>();

        for (const rec of selVals) {
          const val: string = rec.getString(DataTableBuildingConstants.FIELD_SELECTION_VALUES_VALUE);
          sv.set(val != null ? ff.valueFromString(val) : null, rec.getString(DataTableBuildingConstants.FIELD_SELECTION_VALUES_DESCRIPTION));
        }

        if (!ff.isExtendableSelectionValues()) {
          if (!sv.has(ff.getDefaultValue())) {
            if (def != null || ff.isNullable()) {
              sv.set(def != null ? ff.valueFromString(def) : null, def != null ? def.toString() : Cres.get().getString('dtNullCell'));
            }
          }
        }

        ff.setSelectionValues(sv);
      }

      ff.setEditor(fdata.getString(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR));
      if (fdata.hasField(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS)) {
        const eo: string | null = EditorOptionsUtils.convertToString(fdata);
        ff.setEditorOptions(eo as string);
      }

      const validators: DataTable = fdata.getDataTable(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_VALIDATORS);
      if (validators != null) {
        for (const validator of validators) {
          try {
            const type: string | null = validator.getString(DataTableBuildingConstants.FIELD_VALIDATORS_VALIDATOR);
            const options: string | null = validator.getString(DataTableBuildingConstants.FIELD_VALIDATORS_OPTIONS);

            if (type == null) continue;

            if (options != null && options.length > 0) {
              if (type === FieldConstants.VALIDATOR_LIMITS) {
                ff.addValidator(FieldFormat.createFieldValidatorByType(type, [ff, options]));
              } else {
                ff.addValidator(FieldFormat.createFieldValidatorByType(type, [options]));
              }
            } else {
              ff.addValidator(FieldFormat.createFieldValidatorByType(type));
            }
          } catch (ex) {
            Log.DATATABLE.error('Error validating data table field', ex);
          }
        }
      }

      rf.addField(ff);
    }

    if (hasKeys) {
      rf.addTableValidator(new TableKeyFieldsValidator());
    }

    return rf;
  }

  public static formatToFieldsTable(tf: TableFormat, readOnly: boolean, settings: ClassicEncodingSettings | null = null, ignoreHiddenFields = true): DataTable {
    const res: DataTable = DataTableFactory.of(DataTableBuilding.FIELDS_FORMAT);

    for (const ff of tf) {
      if (ignoreHiddenFields && ff.isHidden()) {
        continue;
      }

      const selVals: DataTable = DataTableFactory.of(DataTableBuilding.SELECTION_VALUES_FORMAT);

      if (ff.getSelectionValues() != null) {
        const map: Map<any, string> = ff.getSelectionValues() as Map<any, string>;
        for (const value of map.keys()) {
          selVals.addRecordWith(ff.valueToString(value, settings != null ? settings : undefined), map.get(value));
        }
      }

      const validators: DataTable = DataTableFactory.of(DataTableBuilding.VALIDATORS_FORMAT);
      if (ff.getValidators() != null) {
        for (const validator of ff.getValidators()) {
          validators.addRecordWith((validator as AbstractFieldValidator<any>).getType(), (validator as AbstractFieldValidator<any>).encode());
        }
      }

      const rec: DataRecord = res.addRecord();
      const type: string = ff.getType();
      const help: string | null = ff.getHelp();
      const helpTxt: string | null = help;
      if (help != null) {
        //TODO may be broken
        //  const helpTxtPattern = new RegExp('[[\x00-\x1F\x7F][^\\p{Graph}]]', 'u');
        // helpTxt = (helpTxt as string).replace(helpTxtPattern, ' ');
      }

      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_OLDNAME, ff.getName());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NAME, ff.getName());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE, type);
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION, ff.getDescription());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DEFAULT_VALUE, ff.valueToString(ff.getDefaultValue(), settings == undefined ? undefined : settings));
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_READONLY, readOnly || ff.isReadonly());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NULLABLE, ff.isNullable());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_KEY, ff.isKeyField());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_SELVALS, selVals);
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EXTSELVALS, ff.isExtendableSelectionValues());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HIDDEN, ff.isHidden());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_INLINE, ff.isInlineData());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HELP, helpTxt);
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_GROUP, ff.getGroup());
      rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_VALIDATORS, validators);

      try {
        const editor: string | null = ff.getEditor();
        rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR, editor);

        const optionsTable: DataTable = EditorOptionsUtils.createEditorOptionsTable(type, editor, ff.getEditorOptions());
        rec.setValue(DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS, optionsTable);
      } catch (e) {
        // Not every editor is suitable here. Make sure all editors are listed in EDITOR_SELECTION_VALUES.
      }
    }

    return res;
  }

  public static formatToTable(tf: TableFormat, settings: ClassicEncodingSettings | null = null, ignoreHiddenFields = true): DataTable {
    const rec: DataRecord = new DataRecord(DataTableBuilding.TABLE_FORMAT);

    rec.addInt(tf.getMinRecords());
    rec.addInt(tf.getMaxRecords());
    rec.addDataTable(DataTableBuilding.formatToFieldsTable(tf, false, settings, ignoreHiddenFields));
    rec.addBoolean(tf.isReorderable());
    rec.addBoolean(tf.isUnresizable());

    const bindings: DataTable = DataTableFactory.of(DataTableBuilding.BINDINGS_FORMAT);
    for (const binding of tf.getBindings()) {
      try {
        bindings.addRecord().addString(binding.getTarget().getImage()).addString(binding.getExpression().getText());
      } catch (e) {
        Log.DATATABLE.warn(e);
      }
    }
    rec.addDataTable(bindings);

    rec.addString(tf.encodeToString(settings != null ? settings : new ClassicEncodingSettings(true)));

    if (tf.getNamingExpression() != null) {
      const exp: Expression = tf.getNamingExpression() as Expression;
      rec.addString(exp.getText());
    }

    return rec.wrap();
  }

  static __static_initializer_0() {
    DataTableBuilding.SELECTION_VALUES_FORMAT.addField('<' + DataTableBuildingConstants.FIELD_SELECTION_VALUES_VALUE + '><S><F=NK><D=' + Cres.get().getString('value') + '>');
    DataTableBuilding.SELECTION_VALUES_FORMAT.addField('<' + DataTableBuildingConstants.FIELD_SELECTION_VALUES_DESCRIPTION + '><S><D=' + Cres.get().getString('description') + '><V=<L=1 ' + 2147483647 + '>>');
    DataTableBuilding.SELECTION_VALUES_FORMAT.addTableValidator(new TableKeyFieldsValidator());
  }

  public static BINDINGS_FORMAT: TableFormat = TableFormat.createWithReorderable(true);

  static __static_initializer_1() {
    DataTableBuilding.BINDINGS_FORMAT.addField('<' + DataTableBuildingConstants.FIELD_BINDINGS_TARGET + '><S><D=' + Cres.get().getString('target') + '><V=<L=1 ' + 2147483647 + '>>');
    DataTableBuilding.BINDINGS_FORMAT.addField('<' + DataTableBuildingConstants.FIELD_BINDINGS_EXPRESSION + '><S><D=' + Cres.get().getString('expression') + '><E=' + FieldConstants.EDITOR_EXPRESSION + '><V=<L=1 ' + 2147483647 + '>>');
  }

  public static VALIDATORS_FORMAT: TableFormat = TableFormat.createWithReorderable(true);

  static __static_initializer_2() {
    const ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_VALIDATORS_VALIDATOR + '><S><F=N><D=' + Cres.get().getString('type') + '>');
    ff.setSelectionValues(DataTableUtils.getValidatorSelectionValues());
    DataTableBuilding.VALIDATORS_FORMAT.addField(ff);
    DataTableBuilding.VALIDATORS_FORMAT.addField('<' + DataTableBuildingConstants.FIELD_VALIDATORS_OPTIONS + '><S><D=' + Cres.get().getString('options') + '>');
  }

  public static EDITOR_OPTIONS_SIMPLE_FORMAT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_3() {
    DataTableBuilding.EDITOR_OPTIONS_SIMPLE_FORMAT.addField(FieldFormatFactory.createWith(DataTableBuildingConstants.FIELD_EDITOR_OPTIONS_SIMPLE_FORMAT_OPTIONS, FieldConstants.STRING_FIELD, Cres.get().getString('dtEditorOptions')));
  }

  public static FIELDS_FORMAT: TableFormat = TableFormat.createWithReorderable(true);

  static __static_initializer_4() {
    const FieldFormat = require('./FieldFormat').default;
    DataTableBuilding.FIELDS_FORMAT.addTableValidator(new TableKeyFieldsValidator());
    DataTableBuilding.FIELDS_FORMAT.addField(FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_OLDNAME + '><S><F=H>'));
    let ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NAME + '><S><F=K><D=' + Cres.get().getString('name') + '>');
    ff.getValidators().push(ValidatorHelper.NAME_SYNTAX_VALIDATOR);
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE + '><S><A=' + FieldConstants.INTEGER_FIELD + '><D=' + Cres.get().getString('type') + '>');
    ff.setSelectionValues(FieldFormat.getTypeSelectionValues());
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DESCRIPTION + '><S><F=N><D=' + Cres.get().getString('description') + '>');
    ff.getValidators().push(ValidatorHelper.DESCRIPTION_SYNTAX_VALIDATOR);
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    DataTableBuilding.FIELDS_FORMAT.addField(FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_DEFAULT_VALUE + '><S><F=N><A=><D=' + Cres.get().getString('default') + '>'));
    DataTableBuilding.FIELDS_FORMAT.addField(FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_READONLY + '><B><D=' + Cres.get().getString('dtReadOnly') + '>'));
    DataTableBuilding.FIELDS_FORMAT.addField(FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NULLABLE + '><B><D=' + Cres.get().getString('dtNullable') + '>'));
    DataTableBuilding.FIELDS_FORMAT.addField(FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_KEY + '><B><D=' + Cres.get().getString('dtKeyField') + '>'));
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_SELVALS + '><T><D=' + Cres.get().getString('dtSelectionValues') + '>');
    ff.setDefault(DataTableFactory.of(DataTableBuilding.SELECTION_VALUES_FORMAT));
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    DataTableBuilding.FIELDS_FORMAT.addField(FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EXTSELVALS + '><B><D=' + Cres.get().getString('dtExtendableSelVals') + '>'));
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HIDDEN + '><B><D=' + Cres.get().getString('hidden') + '>');
    ff.setAdvanced(true);
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_INLINE + '><B><D=' + Cres.get().getString('inline') + '>');
    ff.setAdvanced(true);
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_HELP + '><S><F=N><D=' + Cres.get().getString('help') + '>');
    ff.getValidators().push(ValidatorHelper.DESCRIPTION_SYNTAX_VALIDATOR);
    ff.setEditor(FieldConstants.EDITOR_TEXT_AREA);
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR + '><S><F=N><D=' + Cres.get().getString('dtEditorViewer') + '>');
    ff.setSelectionValues(DataTableUtils.getEditorSelectionValues());
    ff.setExtendableSelectionValues(true);
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS + '><T><F=N><D=' + Cres.get().getString('dtEditorOptions') + '>');
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    let ref: string = DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS;
    let exp: string =
      Functions.CALL_FUNCTION +
      '("' +
      Contexts.CTX_UTILITIES +
      '", "' +
      UtilitiesContextConstants.F_EDITOR_OPTIONS +
      '", {' +
      DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE +
      '}, {' +
      DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR +
      '}, {' +
      DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR_OPTIONS +
      '})';
    DataTableBuilding.FIELDS_FORMAT.addBinding(ref, exp);
    ref = DataTableBuildingConstants.FIELD_FIELDS_FORMAT_EDITOR + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    exp = '{' + Contexts.CTX_UTILITIES + ':' + UtilitiesContextConstants.F_EDITORS + "('{" + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_TYPE + "}')}";
    DataTableBuilding.FIELDS_FORMAT.addBinding(ref, exp);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_VALIDATORS + '><T><F=N><D=' + Cres.get().getString('dtValidators') + '>');
    ff.setDefault(DataTableFactory.of(DataTableBuilding.VALIDATORS_FORMAT));
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_GROUP + '><S><F=N><D=' + Cres.get().getString('group') + '>');
    DataTableBuilding.FIELDS_FORMAT.addField(ff);
  }

  public static TABLE_FORMAT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_5() {
    let ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_MIN_RECORDS + '><I><A=0><D=' + Cres.get().getString('dtMinRecords') + '>');
    ff.getValidators().push(new LimitsValidator(0, 2147483647));
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create(
      '<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_MAX_RECORDS + '><I><F=E><A=' + 2147483647 + '><D=' + Cres.get().getString('dtMaxRecords') + '><S=<' + Cres.get().getString('dtNotLimited') + '=' + 2147483647 + '>>'
    );
    ff.getValidators().push(new LimitsValidator(0, 2147483647));
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_FIELDS + '><T><D=' + Cres.get().getString('fields') + '>');
    ff.setDefault(DataTableFactory.of(DataTableBuilding.FIELDS_FORMAT));
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_REORDERABLE + '><B><D=' + Cres.get().getString('dtReorderable') + '>');
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_UNRESIZABLE + '><B><D=' + Cres.get().getString('dtUnresizable') + '>');
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_BINDINGS + '><T><D=' + Cres.get().getString('bindings') + '>');
    ff.setDefault(DataTableFactory.of(DataTableBuilding.BINDINGS_FORMAT));
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create(
      '<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_ENCODED + '><S><F=R><D=' + Cres.get().getString('dtEncodedFormat') + '><H=' + Cres.get().getString('dtEncodedFormatHelp') + '><E=' + FieldConstants.EDITOR_TEXT_AREA + '>'
    );
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    ff = FieldFormatFactory.create('<' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_NAMING_EXPRESSION + '><S><F=N><D=' + Cres.get().getString('namingExpression') + '><E=' + FieldConstants.EDITOR_EXPRESSION + '>');
    DataTableBuilding.TABLE_FORMAT.addField(ff);
    DataTableBuilding.TABLE_FORMAT.addTableValidator(
      new TableExpressionValidator('{' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_MIN_RECORDS + '} <= {' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_MAX_RECORDS + "} ? null : '" + Cres.get().getString('dtMaxRecsLessThenMin') + "'")
    );
    DataTableBuilding.TABLE_FORMAT.setNamingExpression(Functions.PRINT + '({' + DataTableBuildingConstants.FIELD_TABLE_FORMAT_FIELDS + "}, '{" + DataTableBuildingConstants.FIELD_FIELDS_FORMAT_NAME + "}', ', ')");
  }

  private static _init = false;

  public static initialize() {
    if (DataTableBuilding._init) return;

    DataTableBuilding.__static_initializer_0();
    DataTableBuilding.__static_initializer_1();
    DataTableBuilding.__static_initializer_2();
    DataTableBuilding.__static_initializer_3();
    DataTableBuilding.__static_initializer_4();
    DataTableBuilding.__static_initializer_5();

    DataTableBuilding._init = true;
  }
}

DataTableBuilding.initialize();
