import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import FieldConstants from '../../field/FieldConstants';
import Cres from '../../../Cres';
import StringFieldFormat from '../../field/StringFieldFormat';
import Contexts from '../../../context/Contexts';
import DataTableBindingProvider from '../../DataTableBindingProvider';
import StorageHelper from '../../../view/StorageHelper';
import Functions from '../../../expression/functions/Functions';
import DataTableBuilding from '../../DataTableBuilding';
import UtilitiesContextConstants from '../../../server/UtilitiesContextConstants';

import FieldFormatFactory from '../../FieldFormatFactory';
import ActionUtilsConstants from '../../../action/ActionUtilsConstants';

export default class ForeignInstanceConverter extends AbstractEditorOptionsConverter {
  public static readonly FIELD_DESCRIPTION: string = 'description';
  public static readonly FIELD_REFERENCE: string = 'reference';

  public static readonly FIELD_ICON: string = 'icon';

  public static readonly FIELD_STORAGE_CONTEXT: string = 'storageContext';
  public static readonly FIELD_STORAGE_VIEW: string = 'storageView';
  public static readonly FIELD_STORAGE_QUERY: string = 'storageQuery';
  public static readonly FIELD_STORAGE_TABLE: string = 'storageTable';
  public static readonly FIELD_REFERENCE_FIELD: string = 'referenceField';
  public static readonly FIELD_STORAGE_COLUMNS: string = 'storageColumns';
  public static readonly FIELD_STORAGE_FILTER: string = 'storageFilter';
  public static readonly FIELD_STORAGE_SORTING: string = 'storageSorting';
  public static readonly FIELD_DASHBOARD: string = 'dashboard';

  public static readonly FORMAT: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_0() {
    let exp: string, ref: string, tableExp: string;

    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_STORAGE_CONTEXT + '><S><F=N><D=' + Cres.get().getString('storageContext') + '>').setEditor(FieldConstants.EDITOR_CONTEXT));
    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_STORAGE_VIEW + '><S><D=' + Cres.get().getString('view') + '>'));
    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_STORAGE_TABLE + '><S><F=N><D=' + Cres.get().getString('acClassTable') + '>'));
    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_REFERENCE_FIELD + '><S><F=AN><D=' + Cres.get().getString('acReferenceField') + '>'));

    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_STORAGE_COLUMNS + '><T><D=' + Cres.get().getString('columns') + '>'));
    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_STORAGE_FILTER + '><T><D=' + Cres.get().getString('filter') + '>'));
    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_STORAGE_SORTING + '><T><D=' + Cres.get().getString('sorting') + '>'));
    ForeignInstanceConverter.FORMAT.addField(
      FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_DASHBOARD + '><S><F=N><D=' + Cres.get().getString('dashboard') + '>')
        .setEditor(FieldConstants.EDITOR_CONTEXT)
        .setEditorOptions(StringFieldFormat.encodeMaskEditorOptionsFromStrings(Contexts.TYPE_DASHBOARD, Contexts.CTX_DASHBOARDS))
    );

    ForeignInstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ForeignInstanceConverter.FIELD_ICON + '><S><F=N><D=' + Cres.get().getString('icon') + '>'));

    const valueExp = '{' + DataTableBuilding.FIELD_SELECTION_VALUES_VALUE + '}';
    const descriptionExp = '{' + DataTableBuilding.FIELD_SELECTION_VALUES_DESCRIPTION + '}';

    ref = ForeignInstanceConverter.FIELD_STORAGE_VIEW + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    tableExp = Functions.CALL_FUNCTION + '(\'" + {' + ForeignInstanceConverter.FIELD_STORAGE_CONTEXT + "} + \"', '" + StorageHelper.F_STORAGE_VIEWS + "')";
    exp =
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0) ? ' +
      Functions.CALL_FUNCTION +
      '("' +
      Contexts.CTX_UTILITIES +
      '", "' +
      UtilitiesContextConstants.F_SELECTION_VALUES +
      '", "' +
      tableExp +
      '",  "' +
      valueExp +
      '",  "' +
      descriptionExp +
      '") : null';
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_TABLE + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    tableExp = Functions.CALL_FUNCTION + '(\'" + {' + ForeignInstanceConverter.FIELD_STORAGE_CONTEXT + "} + \"', '" + StorageHelper.F_STORAGE_TABLES + "')";
    exp =
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0) ? ' +
      Functions.CALL_FUNCTION +
      '("' +
      Contexts.CTX_UTILITIES +
      '", "' +
      UtilitiesContextConstants.F_SELECTION_VALUES +
      '", "' +
      tableExp +
      '",  "' +
      valueExp +
      '",  "' +
      descriptionExp +
      '") : null';
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_COLUMNS + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      ' {' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      ForeignInstanceConverter.FIELD_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_COLUMNS +
      "')";
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_COLUMNS;
    exp =
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0 && {' +
      ForeignInstanceConverter.FIELD_STORAGE_TABLE +
      '} != null) ? ' +
      Functions.CALL_FUNCTION +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_COLUMNS +
      "', {" +
      ForeignInstanceConverter.FIELD_STORAGE_TABLE +
      '}, {' +
      ForeignInstanceConverter.FIELD_STORAGE_COLUMNS +
      '}) : table()';
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_FILTER + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      '{' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      ForeignInstanceConverter.FIELD_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_FILTER +
      "')";
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_FILTER;
    exp =
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0 && {' +
      ForeignInstanceConverter.FIELD_STORAGE_TABLE +
      '} != null) ? ' +
      Functions.CALL_FUNCTION +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_FILTER +
      "', {" +
      ForeignInstanceConverter.FIELD_STORAGE_TABLE +
      '}, {' +
      ForeignInstanceConverter.FIELD_STORAGE_FILTER +
      '}) : table()';
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_SORTING + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      '{' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      ForeignInstanceConverter.FIELD_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_COLUMNS +
      "')";
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);

    ref = ForeignInstanceConverter.FIELD_STORAGE_SORTING;
    exp =
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      '}) > 0 && {' +
      ForeignInstanceConverter.FIELD_STORAGE_TABLE +
      '} != null) ? ' +
      Functions.CALL_FUNCTION +
      '({' +
      ForeignInstanceConverter.FIELD_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_SORTING +
      "', {" +
      ForeignInstanceConverter.FIELD_STORAGE_TABLE +
      '}, {' +
      ForeignInstanceConverter.FIELD_STORAGE_SORTING +
      '}) : table()';
    ForeignInstanceConverter.FORMAT.addBinding(ref, exp);
  }

  public static readonly TF_PARAMETERS: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_1() {
    ForeignInstanceConverter.TF_PARAMETERS.addField(FieldFormatFactory.create('<' + StorageHelper.CLASS_FIELD_INSTANCE_ID + '><S><F=N>'));
    ForeignInstanceConverter.TF_PARAMETERS.addField(FieldFormatFactory.create('<' + ActionUtilsConstants.CF_RELATION_FIELD + '><S><F=N>'));
  }

  private static _init = false;

  public static initialize() {
    if (ForeignInstanceConverter._init) return;

    ForeignInstanceConverter.__static_initializer_0();
    ForeignInstanceConverter.__static_initializer_1();

    ForeignInstanceConverter._init = true;
  }

  constructor() {
    super();
    ForeignInstanceConverter.initialize();
    this.editors.push(FieldConstants.EDITOR_FOREIGN_INSTANCE);
    this.types.push(FieldConstants.LONG_FIELD);
    this.types.push(FieldConstants.STRING_FIELD);
  }

  convertToString(options: DataTable): string | null {
    return options.encodeToString();
  }

  getFormat(): TableFormat {
    return ForeignInstanceConverter.FORMAT;
  }
}
