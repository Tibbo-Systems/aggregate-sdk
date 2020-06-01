import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import DataTable from '../../datatable/DataTable';
import FieldFormat from '../../datatable/FieldFormat';
import DataTableBindingProvider from '../../datatable/DataTableBindingProvider';
import DataTableBuilding from '../../datatable/DataTableBuilding';
import Cres from '../../Cres';
import FieldConstants from '../../datatable/field/FieldConstants';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import StorageHelper from '../../view/StorageHelper';
import Functions from '../../expression/functions/Functions';
import Contexts from '../../context/Contexts';
import UtilitiesContextConstants from '../../server/UtilitiesContextConstants';
import StringFieldFormat from '../../datatable/field/StringFieldFormat';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import DataRecord from '../../datatable/DataRecord';
import EditDataMerger from '../EditDataMerger';
import GenericActionResponse from '../GenericActionResponse';
import ViewFilterElement from '../../view/ViewFilterElement';
import JObject from '../../util/java/JObject';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class EditData extends GenericActionCommand {
  public static readonly CF_DATA: string = 'data';
  public static readonly CF_USE_DOCKABLE_FRAME: string = 'useDockableFrame';
  public static readonly CF_READ_ONLY: string = 'readOnly';
  public static readonly CF_ENABLE_POPUP_MENU: string = 'enablePopupMenu';
  public static readonly CF_ICON_ID: string = 'iconId';
  public static readonly CF_HELP_ID: string = 'helpId';
  public static readonly CF_HELP: string = 'help';
  public static readonly CF_DEFAULT_CONTEXT: string = 'defaultContext';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';
  public static readonly CF_EXPRESSION: string = 'expression';
  public static readonly CF_PERIOD: string = 'period';

  public static readonly CF_STORAGE_VIEW: string = 'storageView';
  public static readonly CF_STORAGE_QUERY: string = 'storageQuery';
  public static readonly CF_STORAGE_TABLE: string = 'storageTable';
  public static readonly CF_STORAGE_COLUMNS: string = 'storageColumns';
  public static readonly CF_STORAGE_FILTER: string = 'storageFilter';
  public static readonly CF_STORAGE_SORTING: string = 'storageSorting';
  public static readonly CF_STORAGE_SESSION_ID: string = 'storageSessionId';
  public static readonly CF_STORAGE_INSTANCE: string = 'storageInstance';
  public static readonly CF_STORAGE_INSTANCE_ID: string = 'storageInstanceId';
  public static readonly CF_STORAGE_BINDINGS: string = 'storageBindings';

  public static readonly CF_SHOW_TOOLBAR: string = 'showToolbar';
  public static readonly CF_SHOW_HEADER: string = 'showHeader';
  public static readonly CF_SHOW_LINE_NUMBERS: string = 'showLineNumbers';
  public static readonly CF_HORIZONTAL_SCROLLING: string = 'horizontalScrolling';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';
  public static readonly CF_ADD_ROW_TABLE_ACTION: string = 'addRowTableAction';
  public static readonly CF_REMOVE_ROW_TABLE_ACTION: string = 'removeRowTableAction';
  public static readonly CF_UPDATE_ROW_TABLE_ACTION: string = 'updateRowTableAction';
  public static readonly CF_ADD_ROW_TABLE_ACTION_INPUT: string = 'addRowTableActionInput';
  public static readonly CF_REMOVE_ROW_TABLE_ACTION_INPUT: string = 'removeRowTableActionInput';
  public static readonly CF_UPDATE_ROW_TABLE_ACTION_INPUT: string = 'updateRowTableActionInput';
  public static readonly CF_ADD_ROW_TABLE_SHOW_RESULT: string = 'addRowTableShowResult';
  public static readonly CF_REMOVE_ROW_TABLE_SHOW_RESULT: string = 'removeRowTableShowResult';
  public static readonly CF_UPDATE_ROW_TABLE_SHOW_RESULT: string = 'updateRowTableShowResult';
  public static readonly CF_EDITING_IN_NEW_WINDOW: string = 'editingInNewWindow';

  public static readonly CFT_EDIT_DATA: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_DATA + '><T>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_EXPRESSION + '><S><F=N><D=' + Cres.get().getString('acDataExpression') + '><E=' + FieldConstants.EDITOR_EXPRESSION + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_PERIOD + '><L><F=N><D=' + Cres.get().getString('acRefreshPeriod') + '><E=' + FieldConstants.EDITOR_PERIOD + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_USE_DOCKABLE_FRAME + '><B><A=0>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_READ_ONLY + '><B><A=1><D=' + Cres.get().getString('readOnly') + '>');
    EditData.CFT_EDIT_DATA.addField(
      FieldFormatFactory.create('<' + EditData.CF_ENABLE_POPUP_MENU + '><B><A=1><D=' + Cres.get().getString('wEnablePopupMenu') + '>')
        .setNullable(true)
        .setAdvanced(true)
    );
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_DEFAULT_CONTEXT + '><S><F=N><D=' + Cres.get().getString('conDefaultContext') + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_LOCATION + '><T><F=N>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_DASHBOARD + '><T><F=N>');
    let ff: FieldFormat<any> = FieldFormatFactory.create('<' + EditData.CF_STORAGE_BINDINGS + '><T><D=' + Cres.get().getString('bindings') + '><G=' + Cres.get().getString('view') + '>');
    ff.setDefault(new SimpleDataTable(DataTableBuilding.BINDINGS_FORMAT));
    EditData.CFT_EDIT_DATA.addField(ff);
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>');
    EditData.CFT_EDIT_DATA.addField('<' + StorageHelper.CF_STORAGE_CONTEXT + '><S><F=N><D=' + Cres.get().getString('storageContext') + '><G=' + Cres.get().getString('view') + '><E=' + FieldConstants.EDITOR_CONTEXT + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_STORAGE_VIEW + '><S><F=N><D=' + Cres.get().getString('view') + '><G=' + Cres.get().getString('view') + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_STORAGE_QUERY + '><S><F=N><D=' + Cres.get().getString('viewQuery') + '><G=' + Cres.get().getString('view') + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_STORAGE_TABLE + '><S><F=N><D=' + Cres.get().getString('acClassTable') + '><G=' + Cres.get().getString('view') + '>');
    ff = FieldFormatFactory.create('<' + EditData.CF_STORAGE_COLUMNS + '><T><D=' + Cres.get().getString('columns') + '><G=' + Cres.get().getString('view') + '>');
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_STORAGE_FILTER + '><T><D=' + Cres.get().getString('filter') + '><G=' + Cres.get().getString('view') + '>');
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_STORAGE_SORTING + '><T><D=' + Cres.get().getString('sorting') + '><G=' + Cres.get().getString('view') + '>');
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_STORAGE_SESSION_ID + '><L><F=N>');
    ff.setHidden(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_STORAGE_INSTANCE_ID + '><S><F=N>');
    ff.setHidden(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_STORAGE_INSTANCE + '><T><F=N>');
    ff.setHidden(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + ActionUtilsConstants.CF_RELATION_FIELD + '><S><F=N><D=' + Cres.get().getString('relation') + '>');
    ff.setHidden(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_ICON_ID + '><S><F=AN><D=' + Cres.get().getString('conIconId') + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_HELP_ID + '><S><F=AN><D=' + Cres.get().getString('conHelpId') + '>');
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_HELP + '><S><F=AN><D=' + Cres.get().getString('help') + '>');
    EditData.CFT_EDIT_DATA.addField(FieldFormatFactory.createWith(EditData.CF_SHOW_TOOLBAR, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('showToolbar')).setDefault(true).setAdvanced(true));
    EditData.CFT_EDIT_DATA.addField(FieldFormatFactory.createWith(EditData.CF_SHOW_HEADER, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('showHeader')).setNullable(true).setAdvanced(true));
    EditData.CFT_EDIT_DATA.addField(FieldFormatFactory.createWith(EditData.CF_SHOW_LINE_NUMBERS, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('showLineNumbers')).setNullable(true).setAdvanced(true));
    EditData.CFT_EDIT_DATA.addField(FieldFormatFactory.createWith(EditData.CF_HORIZONTAL_SCROLLING, FieldConstants.BOOLEAN_FIELD, Cres.get().getString('horizontalScrolling')).setNullable(true).setAdvanced(true));
    EditData.CFT_EDIT_DATA.addField('<' + EditData.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');
    ff = FieldFormatFactory.create('<' + EditData.CF_ADD_ROW_TABLE_ACTION + '><S><F=N><D=' + Cres.get().getString('dtEditorAddRowTableAction') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setDefault(null)
      .setAdvanced(true)
      .setEditor(FieldConstants.EDITOR_TARGET)
      .setEditorOptions(FieldConstants.EDITOR_TARGET_MODE_ACTIONS_ONLY);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_ADD_ROW_TABLE_ACTION_INPUT + '><S><F=N><D=' + Cres.get().getString('dtEditorAddRowTableActionInput') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setDefault(null)
      .setAdvanced(true)
      .setEditor(FieldConstants.EDITOR_EXPRESSION);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_ADD_ROW_TABLE_SHOW_RESULT + '><B><A=1><D=' + Cres.get().getString('dtEditorAddRowTableShowResult') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setAdvanced(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_REMOVE_ROW_TABLE_ACTION + '><S><F=N><D=' + Cres.get().getString('dtEditorRemoveRowTableAction') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setDefault(null)
      .setAdvanced(true)
      .setEditor(FieldConstants.EDITOR_TARGET)
      .setEditorOptions(FieldConstants.EDITOR_TARGET_MODE_ACTIONS_ONLY);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_REMOVE_ROW_TABLE_ACTION_INPUT + '><S><F=N><D=' + Cres.get().getString('dtEditorRemoveRowTableActionInput') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setDefault(null)
      .setAdvanced(true)
      .setEditor(FieldConstants.EDITOR_EXPRESSION);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_REMOVE_ROW_TABLE_SHOW_RESULT + '><B><A=1><D=' + Cres.get().getString('dtEditorRemoveTableShowResult') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setAdvanced(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_EDITING_IN_NEW_WINDOW + '><B><A=' + false + '><D=' + Cres.get().getString('dteEditingInNewWindow') + '>');
    ff.setGroup(Cres.get().getString('actions'));
    ff.setAdvanced(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_UPDATE_ROW_TABLE_ACTION + '><S><F=N><D=' + Cres.get().getString('dtEditorUpdateRowTableAction') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setDefault(null)
      .setAdvanced(true)
      .setEditor(FieldConstants.EDITOR_TARGET)
      .setEditorOptions(FieldConstants.EDITOR_TARGET_MODE_ACTIONS_ONLY);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_UPDATE_ROW_TABLE_ACTION_INPUT + '><S><F=N><D=' + Cres.get().getString('dtEditorUpdateRowTableActionInput') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setDefault(null)
      .setAdvanced(true)
      .setEditor(FieldConstants.EDITOR_EXPRESSION);
    EditData.CFT_EDIT_DATA.addField(ff);
    ff = FieldFormatFactory.create('<' + EditData.CF_UPDATE_ROW_TABLE_SHOW_RESULT + '><B><A=1><D=' + Cres.get().getString('dtEditorUpdateRowTableShowResult') + '>')
      .setGroup(Cres.get().getString('actions'))
      .setAdvanced(true);
    EditData.CFT_EDIT_DATA.addField(ff);
    let ref: string = EditData.CF_PERIOD + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    let exp: string = '{' + EditData.CF_EXPRESSION + '} != null';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_ENABLE_POPUP_MENU + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + EditData.CF_EXPRESSION + '} != null';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = StorageHelper.CF_STORAGE_CONTEXT + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + EditData.CF_EXPRESSION + '} == null';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_QUERY + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + EditData.CF_EXPRESSION + '} == null && {' + StorageHelper.CF_STORAGE_CONTEXT + '} != null && ({' + EditData.CF_STORAGE_VIEW + '} == null || ' + Functions.LENGTH + '({' + EditData.CF_STORAGE_VIEW + '}) == 0)';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_TABLE + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      '{' +
      EditData.CF_EXPRESSION +
      '} == null && {' +
      EditData.CF_STORAGE_QUERY +
      '} == null && {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      EditData.CF_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      EditData.CF_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_TABLES +
      "')";
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_VIEW + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    let tableExp: string = Functions.CALL_FUNCTION + '(\'" + {' + StorageHelper.CF_STORAGE_CONTEXT + "} + \"', '" + StorageHelper.F_STORAGE_VIEWS + "')";
    let valueExp: string = '{' + DataTableBuilding.FIELD_SELECTION_VALUES_VALUE + '}';
    let descriptionExp: string = '{' + DataTableBuilding.FIELD_SELECTION_VALUES_DESCRIPTION + '}';
    exp =
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
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
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_TABLE + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    tableExp = Functions.CALL_FUNCTION + '(\'" + {' + StorageHelper.CF_STORAGE_CONTEXT + "} + \"', '" + StorageHelper.F_STORAGE_TABLES + "')";
    valueExp = '{' + DataTableBuilding.FIELD_SELECTION_VALUES_VALUE + '}';
    descriptionExp = '{' + DataTableBuilding.FIELD_SELECTION_VALUES_DESCRIPTION + '}';
    exp =
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
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
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_COLUMNS + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      '{' +
      EditData.CF_EXPRESSION +
      '} == null && {' +
      EditData.CF_STORAGE_QUERY +
      '} == null && {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      EditData.CF_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      EditData.CF_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_COLUMNS +
      "')";
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_COLUMNS;
    exp =
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && {' +
      EditData.CF_STORAGE_TABLE +
      '} != null) ? ' +
      Functions.CALL_FUNCTION +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_COLUMNS +
      "', {" +
      EditData.CF_STORAGE_TABLE +
      '}, {' +
      EditData.CF_STORAGE_COLUMNS +
      '}) : table()';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_FILTER + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      '{' +
      EditData.CF_EXPRESSION +
      '} == null && {' +
      EditData.CF_STORAGE_QUERY +
      '} == null && {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      EditData.CF_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      EditData.CF_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_FILTER +
      "')";
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_FILTER;
    exp =
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && {' +
      EditData.CF_STORAGE_TABLE +
      '} != null) ? ' +
      Functions.CALL_FUNCTION +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_FILTER +
      "', {" +
      EditData.CF_STORAGE_TABLE +
      '}, {' +
      EditData.CF_STORAGE_FILTER +
      '}) : table()';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_SORTING + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp =
      '{' +
      EditData.CF_EXPRESSION +
      '} == null && {' +
      EditData.CF_STORAGE_QUERY +
      '} == null && {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && ({' +
      EditData.CF_STORAGE_VIEW +
      '} == null || ' +
      Functions.LENGTH +
      '({' +
      EditData.CF_STORAGE_VIEW +
      '}) == 0) && ' +
      Functions.FUNCTION_AVAILABLE +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_COLUMNS +
      "')";
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_STORAGE_SORTING;
    exp =
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '} != null && length({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}) > 0 && {' +
      EditData.CF_STORAGE_TABLE +
      '} != null) ? ' +
      Functions.CALL_FUNCTION +
      '({' +
      StorageHelper.CF_STORAGE_CONTEXT +
      "}, '" +
      StorageHelper.F_STORAGE_SORTING +
      "', {" +
      EditData.CF_STORAGE_TABLE +
      '}, {' +
      EditData.CF_STORAGE_SORTING +
      '}) : table()';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_ADD_ROW_TABLE_ACTION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_ADD_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_ADD_ROW_TABLE_SHOW_RESULT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_REMOVE_ROW_TABLE_ACTION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_REMOVE_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_REMOVE_ROW_TABLE_SHOW_RESULT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_UPDATE_ROW_TABLE_ACTION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_UPDATE_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_UPDATE_ROW_TABLE_SHOW_RESULT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_EDITING_IN_NEW_WINDOW + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_UPDATE_ROW_TABLE_ACTION + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_EDITING_IN_NEW_WINDOW + '}');
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_UPDATE_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_EDITING_IN_NEW_WINDOW + '}');
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_ADD_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_ADD_ROW_TABLE_ACTION + '} != null ? true : false');
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_REMOVE_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_REMOVE_ROW_TABLE_ACTION + '} != null ? true : false');
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_ADD_ROW_TABLE_SHOW_RESULT + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_ADD_ROW_TABLE_ACTION + '} != null ? true : false');
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_REMOVE_ROW_TABLE_SHOW_RESULT + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_REMOVE_ROW_TABLE_ACTION + '} != null ? true : false');
    EditData.CFT_EDIT_DATA.addBinding(EditData.CF_UPDATE_ROW_TABLE_SHOW_RESULT + '#' + DataTableBindingProvider.PROPERTY_ENABLED, '{' + EditData.CF_UPDATE_ROW_TABLE_ACTION + '} != null ? true : false');
    ref = EditData.CF_ADD_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_OPTIONS;
    exp =
      Functions.TABLE +
      '("' +
      StringFieldFormat.EXPRESSION_BUILDER_OPTIONS_FORMAT.encodeUseSeparator(true) +
      '", {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}, ' +
      Functions.TABLE +
      '("' +
      StorageHelper.FOFT_ADD_ROW_ACTION.encodeUseSeparator(true) +
      '"))';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_REMOVE_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_OPTIONS;
    exp =
      Functions.TABLE +
      '("' +
      StringFieldFormat.EXPRESSION_BUILDER_OPTIONS_FORMAT.encodeUseSeparator(true) +
      '", {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}, ' +
      Functions.TABLE +
      '("' +
      StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.encodeUseSeparator(true) +
      '"))';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
    ref = EditData.CF_UPDATE_ROW_TABLE_ACTION_INPUT + '#' + DataTableBindingProvider.PROPERTY_OPTIONS;
    exp =
      Functions.TABLE +
      '("' +
      StringFieldFormat.EXPRESSION_BUILDER_OPTIONS_FORMAT.encodeUseSeparator(true) +
      '", {' +
      StorageHelper.CF_STORAGE_CONTEXT +
      '}, ' +
      Functions.TABLE +
      '("' +
      StorageHelper.FOFT_REMOVE_OR_UPDATE_ROW_ACTION.encodeUseSeparator(true) +
      '"))';
    EditData.CFT_EDIT_DATA.addBinding(ref, exp);
  }

  private merger: EditDataMerger | null = null;
  private data: DataTable | null = null;
  private useDockableFrame = false;
  private readOnly = false;
  private enablePopupMenu = false;
  private iconId: string | null = null;
  private helpId: string | null = null;
  private help: string | null = null;
  private defaultContext: string | null = null;
  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private storageBindings: DataTable | null = null;
  private key: string | null = null;

  private expression: string | null = null;
  private period: number | null = null;
  private storageContext: string | null = null;
  private storageView: string | null = null;
  private storageQuery: string | null = null;
  private storageTable: string | null = null;
  private storageColumns: DataTable | null = null;
  private storageFilter: DataTable | null = null;
  private storageSorting: DataTable | null = null;
  private storageSessionId: number | null = null;
  private storageInstanceId: JObject | null = null;
  private storageInstance: DataTable | null = null;
  private relationField: string | null = null;
  private showToolbar = false;
  private showHeader: boolean | null = false;
  private showLineNumbers: boolean | null = false;
  private horizontalScrolling: boolean | null = false;
  private dhInfo: DashboardsHierarchyInfo | null = null;
  private addRowTableAction: string | null = null;
  private addRowTableActionInput: string | null = null;
  private addRowTableActionShowResult = false;
  private removeRowTableAction: string | null = null;
  private removeRowTableActionInput: string | null = null;
  private removeRowTableActionShowResult = false;
  private updateRowTableAction: string | null = null;
  private updateRowTableActionInput: string | null = null;
  private updateRowTableActionShowResult = false;
  private editingInNewWindow = false;

  private static _init = false;

  public static initialize() {
    if (EditData._init) return;

    EditData.__static_initializer_0();
    EditData._init = true;
  }

  public constructor(titleOrFormat: string | TableFormat = EditData.CFT_EDIT_DATA, data?: DataTable, readonly?: boolean) {
    super(ActionUtilsConstants.CMD_EDIT_DATA, titleOrFormat, null);
    if (data && readonly) {
      this.data = data;
      this.readOnly = readonly;
    }
  }

  public static createEditDataWithDataTable(title: string, parameters: DataTable) {
    const editData = new EditData(title);
    editData.setParameters(parameters);
    return editData;
  }

  protected constructParameters(): DataTable {
    const rec: DataRecord = new DataRecord(EditData.CFT_EDIT_DATA);
    rec.addDataTable(this.data);
    rec.addString(this.expression);
    rec.addLong(this.period);
    rec.addBoolean(this.useDockableFrame);
    rec.addBoolean(this.readOnly);
    rec.addBoolean(this.enablePopupMenu);
    rec.addString(this.defaultContext);
    rec.addDataTable(this.location != null ? this.location.toDataTable() : null);
    rec.addDataTable(this.dashboard != null ? this.dashboard.toDataTable() : null);
    rec.addDataTable(this.storageBindings != null ? this.storageBindings : new SimpleDataTable(DataTableBuilding.BINDINGS_FORMAT));
    rec.addString(this.key);
    rec.addString(this.storageContext);
    rec.addString(this.storageView);
    rec.addString(this.storageQuery);
    rec.addString(this.storageTable);
    rec.addDataTable(this.storageColumns != null ? this.storageColumns : new SimpleDataTable(StorageHelper.FORMAT_COLUMNS));
    rec.addDataTable(this.storageFilter != null ? this.storageFilter : new SimpleDataTable(ViewFilterElement.FORMAT));
    rec.addDataTable(this.storageSorting != null ? this.storageSorting : new SimpleDataTable(StorageHelper.FORMAT_SORTING));
    rec.addLong(this.storageSessionId);
    rec.addValue(this.storageInstanceId);
    rec.addDataTable(this.storageInstance);
    rec.addString(this.relationField);

    rec.addString(this.iconId);
    rec.addString(this.helpId);
    rec.addString(this.help);
    rec.addBoolean(this.isShowToolbar());
    rec.addBoolean(this.isShowHeader());
    rec.addBoolean(this.isShowLineNumbers());
    rec.addBoolean(this.isHorizontalScrolling());

    rec.addDataTable(this.dhInfo != null ? this.dhInfo.toDataTable() : null);

    rec.addString(this.addRowTableAction);
    rec.addString(this.addRowTableActionInput);
    rec.addBoolean(this.addRowTableActionShowResult);
    rec.addString(this.removeRowTableAction);
    rec.addString(this.removeRowTableActionInput);
    rec.addBoolean(this.removeRowTableActionShowResult);

    rec.addBoolean(this.editingInNewWindow);
    rec.addString(this.updateRowTableAction);
    rec.addString(this.updateRowTableActionInput);
    rec.addBoolean(this.updateRowTableActionShowResult);

    return rec.wrap();
  }

  public createDefaultResponse(): GenericActionResponse {
    const parameters = this.getParameters();
    const table: DataTable | null = parameters != null ? parameters.rec().getDataTable(EditData.CF_DATA) : null;
    return new GenericActionResponse(table);
  }

  public getData(): DataTable | null {
    return this.data;
  }

  public setData(data: DataTable) {
    this.data = data;
  }

  public isUseDockableFrame(): boolean {
    return this.useDockableFrame;
  }

  public setUseDockableFrame(useDockableFrame: boolean) {
    this.useDockableFrame = useDockableFrame;
  }

  public isReadOnly(): boolean | null {
    return this.readOnly;
  }

  public setReadOnly(readonly: boolean) {
    this.readOnly = readonly;
  }

  public getIconId(): string | null {
    return this.iconId;
  }

  public setIconId(iconId: string | null) {
    this.iconId = iconId;
  }

  public getHelpId(): string | null {
    return this.helpId;
  }

  public setHelpId(helpId: string | null) {
    this.helpId = helpId;
  }

  public getHelp(): string | null {
    return this.help;
  }

  public setHelp(help: string | null) {
    this.help = help;
  }

  public getDefaultContext(): string | null {
    return this.defaultContext;
  }

  public setDefaultContext(defaultContext: string | null) {
    this.defaultContext = defaultContext;
  }

  public getLocation(): WindowLocation | null {
    return this.location;
  }

  public setLocation(location: WindowLocation | null) {
    this.location = location;
  }

  public getDashboard(): DashboardProperties | null {
    return this.dashboard;
  }

  public setDashboard(dashboard: DashboardProperties | null) {
    this.dashboard = dashboard;
  }

  public getStorageBindings(): DataTable | null {
    return this.storageBindings;
  }

  public setStorageBindings(storageBindings: DataTable) {
    this.storageBindings = storageBindings;
  }

  public getExpression(): string | null {
    return this.expression;
  }

  public setExpression(expression: string | null) {
    this.expression = expression;
  }

  public getPeriod(): number | null {
    return this.period;
  }

  public setPeriod(period: number | null) {
    this.period = period;
  }

  public getEnablePopupMenu(): boolean | null {
    return this.enablePopupMenu;
  }

  public setEnablePopupMenu(enablePopupMenu: boolean) {
    this.enablePopupMenu = enablePopupMenu;
  }

  public getStorageContext(): string | null {
    return this.storageContext;
  }

  public setStorageContext(storageContext: string) {
    this.storageContext = storageContext;
  }

  public getStorageView(): string | null {
    return this.storageView;
  }

  public setStorageView(storageView: string) {
    this.storageView = storageView;
  }

  public getStorageQuery(): string | null {
    return this.storageQuery;
  }

  public setStorageQuery(storageQuery: string) {
    this.storageQuery = storageQuery;
  }

  public getStorageTable(): string | null {
    return this.storageTable;
  }

  public setStorageTable(storageTable: string) {
    this.storageTable = storageTable;
  }

  public getStorageColumns(): DataTable | null {
    return this.storageColumns;
  }

  public setStorageColumns(storageColumns: DataTable) {
    this.storageColumns = storageColumns;
  }

  public getStorageFilter(): DataTable | null {
    return this.storageFilter;
  }

  public setStorageFilter(storageFilter: DataTable) {
    this.storageFilter = storageFilter;
  }

  public getStorageSorting(): DataTable | null {
    return this.storageSorting;
  }

  public setStorageSorting(storageSorting: DataTable) {
    this.storageSorting = storageSorting;
  }

  public getMerger(): EditDataMerger | null {
    return this.merger;
  }

  public setMerger(merger: EditDataMerger) {
    this.merger = merger;
  }

  public setStorageSessionId(storageSessionId: number) {
    this.storageSessionId = storageSessionId;
  }

  public getStorageSessionId(): number | null {
    return this.storageSessionId;
  }

  public setStorageInstanceId(storageInstanceId: any) {
    this.storageInstanceId = storageInstanceId;
  }

  public getInstanceID(): any {
    return this.storageInstanceId;
  }

  public setStorageInstance(storageInstance: DataTable) {
    this.storageInstance = storageInstance;
  }

  public getStorageInstance(): DataTable | null {
    return this.storageInstance;
  }

  public setRelationField(relationField: string) {
    this.relationField = relationField;
  }

  public getRelationField(): string | null {
    return this.relationField;
  }

  public isShowToolbar(): boolean {
    return this.showToolbar;
  }

  public setShowToolbar(showToolbar: boolean) {
    this.showToolbar = showToolbar;
  }

  public isShowHeader(): boolean | null {
    return this.showHeader;
  }

  public setShowHeader(showHeader: boolean | null) {
    this.showHeader = showHeader;
  }

  public isShowLineNumbers(): boolean | null {
    return this.showLineNumbers;
  }

  public setShowLineNumbers(showLineNumbers: boolean | null) {
    this.showLineNumbers = showLineNumbers;
  }

  public isHorizontalScrolling(): boolean | null {
    return this.horizontalScrolling;
  }

  public setHorizontalScrolling(horizontalScrolling: boolean | null) {
    this.horizontalScrolling = horizontalScrolling;
  }

  public getKey(): string | null {
    return this.key;
  }

  public setKey(key: string) {
    this.key = key;
  }

  public getDashboardsHierarchyInfo(): DashboardsHierarchyInfo | null {
    return this.dhInfo;
  }

  public setDashboardsHierarchyInfo(dhInfo: DashboardsHierarchyInfo) {
    this.dhInfo = dhInfo;
  }

  public getAddRowTableAction(): string | null {
    return this.addRowTableAction;
  }

  public setAddRowTableAction(addRowTableAction: string) {
    this.addRowTableAction = addRowTableAction;
  }

  public getRowTableAction(): string | null {
    return this.removeRowTableAction;
  }

  public setRemoveRowTableAction(removeRowTableAction: string) {
    this.removeRowTableAction = removeRowTableAction;
  }

  public getUpdateRowTableAction(): string | null {
    return this.updateRowTableAction;
  }

  public setUpdateRowTableAction(updateRowTableAction: string) {
    this.updateRowTableAction = updateRowTableAction;
  }

  public setEditingInNewWindow(editingInNewWindow: boolean) {
    this.editingInNewWindow = editingInNewWindow;
  }

  public isEditingInNewWindow(): boolean {
    return this.editingInNewWindow;
  }

  public getAddRowTableActionInput(): string | null {
    return this.addRowTableActionInput;
  }

  public setAddRowTableActionInput(addRowTableActionInput: string) {
    this.addRowTableActionInput = addRowTableActionInput;
  }

  public getRemoveRowTableActionInput(): string | null {
    return this.removeRowTableActionInput;
  }

  public setRemoveRowTableActionInput(removeRowTableActionInput: string) {
    this.removeRowTableActionInput = removeRowTableActionInput;
  }

  public getUpdateRowTableActionInput(): string | null {
    return this.updateRowTableActionInput;
  }

  public setUpdateRowTableActionInput(updateRowTableActionInput: string) {
    this.updateRowTableActionInput = updateRowTableActionInput;
  }

  public isAddRowTableActionShowResult(): boolean {
    return this.addRowTableActionShowResult;
  }

  public setAddRowTableActionShowResult(addRowTableActionShowResult: boolean) {
    this.addRowTableActionShowResult = addRowTableActionShowResult;
  }

  public isRemoveRowTableActionShowResult(): boolean {
    return this.removeRowTableActionShowResult;
  }

  public setRemoveRowTableActionShowResult(removeRowTableActionShowResult: boolean) {
    this.removeRowTableActionShowResult = removeRowTableActionShowResult;
  }

  public isUpdateRowTableActionShowResult(): boolean {
    return this.updateRowTableActionShowResult;
  }

  public setUpdateRowTableActionShowResult(updateRowTableActionShowResult: boolean) {
    this.updateRowTableActionShowResult = updateRowTableActionShowResult;
  }
}

EditData.initialize();
