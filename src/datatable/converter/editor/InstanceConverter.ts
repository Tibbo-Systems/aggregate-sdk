import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import FieldConstants from '../../field/FieldConstants';
import Cres from '../../../Cres';
import StringFieldFormat from '../../field/StringFieldFormat';
import Contexts from '../../../context/Contexts';
import DataTableBindingProvider from '../../DataTableBindingProvider';
import Functions from '../../../expression/functions/Functions';
import DataTableBuildingConstants from '../../DataTableBuildingConstants';
import UtilitiesContextConstants from '../../../server/UtilitiesContextConstants';
import StorageHelper from '../../../view/StorageHelper';
import FieldFormatFactory from '../../FieldFormatFactory';

export default class InstanceConverter extends AbstractEditorOptionsConverter {
  public static readonly FIELD_STORAGE_CONTEXT: string = 'storageContext';
  public static readonly FIELD_STORAGE_TABLE: string = 'storageTable';
  public static readonly FIELD_DASHBOARD: string = 'dashboard';
  public static readonly FIELD_ICON: string = 'icon';

  private static readonly FORMAT: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_0() {
    InstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + InstanceConverter.FIELD_STORAGE_CONTEXT + '><S><F=N><D=' + Cres.get().getString('storageContext') + '>').setEditor(FieldConstants.EDITOR_CONTEXT));
    InstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + InstanceConverter.FIELD_STORAGE_TABLE + '><S><F=N><D=' + Cres.get().getString('acClassTable') + '>'));

    InstanceConverter.FORMAT.addField(
      FieldFormatFactory.create('<' + InstanceConverter.FIELD_DASHBOARD + '><S><F=N><D=' + Cres.get().getString('dashboard') + '>')
        .setEditor(FieldConstants.EDITOR_CONTEXT)
        .setEditorOptions(StringFieldFormat.encodeMaskEditorOptionsFromStrings(Contexts.TYPE_DASHBOARD, Contexts.CTX_DASHBOARDS))
    );

    InstanceConverter.FORMAT.addField(FieldFormatFactory.create('<' + InstanceConverter.FIELD_ICON + '><S><F=N><D=' + Cres.get().getString('icon') + '>'));
    const ref = InstanceConverter.FIELD_STORAGE_TABLE + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    const tableExp = Functions.CALL_FUNCTION + '(\'" + {' + InstanceConverter.FIELD_STORAGE_CONTEXT + "} + \"', '" + StorageHelper.F_STORAGE_TABLES + "')";
    const valueExp = '{' + DataTableBuildingConstants.FIELD_SELECTION_VALUES_VALUE + '}';
    const descriptionExp = '{' + DataTableBuildingConstants.FIELD_SELECTION_VALUES_DESCRIPTION + '}';
    const exp =
      '({' +
      InstanceConverter.FIELD_STORAGE_CONTEXT +
      '} != null && length({' +
      InstanceConverter.FIELD_STORAGE_CONTEXT +
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
    InstanceConverter.FORMAT.addBinding(ref, exp);
  }

  public static readonly TF_PARAMETERS: TableFormat = new TableFormat(1, 1);

  private static __static_initializer_1() {
    InstanceConverter.TF_PARAMETERS.addField(FieldFormatFactory.create('<' + StorageHelper.CLASS_FIELD_INSTANCE_ID + '><S><F=N>'));
  }

  private static _init = false;

  public static initialize() {
    if (InstanceConverter._init) return;

    InstanceConverter.__static_initializer_0();
    InstanceConverter.__static_initializer_1();

    InstanceConverter._init = true;
  }

  constructor() {
    super();
    InstanceConverter.initialize();
    this.editors.push(FieldConstants.EDITOR_INSTANCE);
    this.types.push(FieldConstants.INTEGER_FIELD);
    this.types.push(FieldConstants.FLOAT_FIELD);
    this.types.push(FieldConstants.DOUBLE_FIELD);
    this.types.push(FieldConstants.LONG_FIELD);
    this.types.push(FieldConstants.STRING_FIELD);
  }

  convertToString(options: DataTable): string | null {
    return options.encodeToString();
  }

  getFormat(): TableFormat {
    return InstanceConverter.FORMAT;
  }
}
