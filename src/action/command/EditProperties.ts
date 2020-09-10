import GenericActionCommand from '../GenericActionCommand';
import Util from '../../util/Util';
import TableFormat from '../../datatable/TableFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import Cres from '../../Cres';
import DataTable from '../../datatable/DataTable';
import DataTableFactory from '../../datatable/DataTableFactory';
import DataRecord from '../../datatable/DataRecord';
import FieldConstants from '../../datatable/field/FieldConstants';
import FieldFormat from '../../datatable/FieldFormat';
import DataTableBindingProvider from '../../datatable/DataTableBindingProvider';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class EditProperties extends GenericActionCommand {
  public static initEditProperties = false;

  public static readonly CF_READ_ONLY: string = 'readOnly';
  public static readonly CF_DYNAMIC: string = 'dynamic';
  public static readonly CF_ASYNC: string = 'async';
  public static readonly CF_USE_DOCKABLE_FRAME: string = 'useDockableFrame';
  public static readonly CF_SINGLE_WINDOW_MODE: string = 'singleWindowMode';
  public static readonly CF_CONTEXT: string = 'context';
  public static readonly CF_SLAVES: string = 'slaves';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';
  public static readonly CF_PROPERTIES: string = 'properties';
  public static readonly CF_PROPERTIES_GROUP: string = 'propertiesGroup';
  public static readonly RF_EDIT_PROPERTIES_RESULT: string = 'result';
  public static readonly RF_EDIT_PROPERTIES_CHANGED_PROPERTIES: string = 'changedProperties';
  public static readonly FIELD_PROPERTIES_PROPERTY: string = 'property';
  public static readonly CF_SLAVES_CONTEXT: string = 'context';

  public static readonly CFT_SLAVES: TableFormat = FieldFormatFactory.create('<' + EditProperties.CF_SLAVES_CONTEXT + '><S>').wrap();

  public static readonly FT_PROPERTIES: TableFormat = FieldFormatFactory.create('<' + EditProperties.FIELD_PROPERTIES_PROPERTY + '><S><D=' + Cres.get().getString('property') + '>').wrap();

  public static readonly CFT_EDIT_PROPERTIES: TableFormat = new TableFormat(1, 1);

  private static initializeEditProperties0() {
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_CONTEXT + '><S><D=' + Cres.get().getString('context') + '><E=' + FieldConstants.EDITOR_CONTEXT + '>');

    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_PROPERTIES_GROUP + '><S><F=N><D=' + Cres.get().getString('group') + '>');

    const properties: FieldFormat<any> = FieldFormatFactory.create('<' + EditProperties.CF_PROPERTIES + '><T><D=' + Cres.get().getString('properties') + '>');
    properties.setDefault(DataTableFactory.of(EditProperties.FT_PROPERTIES, true));
    EditProperties.CFT_EDIT_PROPERTIES.addField(properties);

    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_SINGLE_WINDOW_MODE + '><B><D=' + Cres.get().getString('acSingleWindowMode') + '>');

    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_USE_DOCKABLE_FRAME + '><B>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_READ_ONLY + '><B><D=' + Cres.get().getString('acInitiallyReadOnly') + '>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_DYNAMIC + '><B>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_ASYNC + '><B>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_SLAVES + '><T><F=N>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_LOCATION + '><T><F=N>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_DASHBOARD + '><T><F=N>');

    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>');
    EditProperties.CFT_EDIT_PROPERTIES.addField('<' + EditProperties.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');

    const ref: string = EditProperties.CF_PROPERTIES + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    const exp: string = '{' + EditProperties.CF_PROPERTIES_GROUP + '} == null';
    EditProperties.CFT_EDIT_PROPERTIES.addBinding(ref, exp);
  }

  public static readonly RFT_EDIT_PROPERTIES: TableFormat = new TableFormat(1, 1);

  private static initializeEditProperties1() {
    EditProperties.RFT_EDIT_PROPERTIES.addField('<' + EditProperties.RF_EDIT_PROPERTIES_RESULT + '><S>');

    const changedProperties: FieldFormat<any> = FieldFormatFactory.create('<' + EditProperties.RF_EDIT_PROPERTIES_CHANGED_PROPERTIES + '><T>');
    changedProperties.setDefault(DataTableFactory.of(EditProperties.FT_PROPERTIES, true));
    EditProperties.RFT_EDIT_PROPERTIES.addField(changedProperties);
  }

  public static initializeEditProperties() {
    if (EditProperties.initEditProperties) {
      return;
    }

    EditProperties.initializeEditProperties0();
    EditProperties.initializeEditProperties1();

    EditProperties.initEditProperties = true;
  }

  private context: string | null = null;

  private propertiesGroup: string | null = null;

  private properties: Array<string> | null = null;

  private slaves: Array<string> | null = null;

  private readOnly = false;

  private dynamic = false;

  private useDockableFrame = false;

  private singleWindowMode = false;

  private async = false;

  private location: WindowLocation | null = null;

  private dashboard: DashboardProperties | null = null;

  private dhInfo: DashboardsHierarchyInfo | null = null;

  private key: string | null = null;

  constructor() {
    super(ActionUtilsConstants.CMD_EDIT_PROPERTIES);
  }

  public static createEditPropertiesWithDataTable(title: string, parameters: DataTable) {
    const editProperties = new EditProperties();
    editProperties.setTitle(title);
    editProperties.setParameters(parameters);
    return editProperties;
  }

  public static createDefault() {
    const editProps = new EditProperties();
    editProps.setParameters(new SimpleDataTable(EditProperties.CFT_EDIT_PROPERTIES));
    editProps.setResponseFormat(EditProperties.RFT_EDIT_PROPERTIES);
    return editProps;
  }

  public static createEditProperties(title: string, contextName: string, propertiesValue: string | Array<string>) {
    const editProps = new EditProperties();
    editProps.setTitle(title);
    editProps.context = contextName;
    if (Util.isString(propertiesValue)) {
      editProps.propertiesGroup = propertiesValue as string;
    } else if (Array.isArray(propertiesValue)) {
      editProps.properties = propertiesValue as Array<string>;
    }
    return editProps;
  }

  public getContext(): string | null {
    return this.context;
  }

  public setContext(contextName: string) {
    this.context = contextName;
  }

  public getPropertiesGroup(): string | null {
    return this.propertiesGroup;
  }

  public setPropertiesGroup(propertiesGroup: string) {
    this.propertiesGroup = propertiesGroup;
  }

  public getProperties(): Array<string> | null {
    return this.properties;
  }

  public setProperties(properties: Array<string>) {
    this.properties = properties;
  }

  public getSlaves(): Array<string> | null {
    return this.slaves;
  }

  public setSlaves(slaves: Array<string>) {
    this.slaves = slaves;
  }

  public isReadOnly(): boolean {
    return this.readOnly;
  }

  public setReadOnly(readOnly: boolean) {
    this.readOnly = readOnly;
  }

  public isDynamic(): boolean {
    return this.dynamic;
  }

  public setDynamic(dynamic: boolean) {
    this.dynamic = dynamic;
  }

  public isUseDockableFrame(): boolean {
    return this.useDockableFrame;
  }

  public setUseDockableFrame(useDockableFrame: boolean) {
    this.useDockableFrame = useDockableFrame;
  }

  public isSingleWindowMode(): boolean {
    return this.singleWindowMode;
  }

  public setSingleWindowMode(singleWindowMode: boolean) {
    this.singleWindowMode = singleWindowMode;
  }

  public isAsync(): boolean {
    return this.async;
  }

  public setAsync(async: boolean) {
    this.async = async;
  }

  public getLocation(): WindowLocation | null {
    return this.location;
  }

  public setLocation(location: WindowLocation) {
    this.location = location;
  }

  public getDashboard(): DashboardProperties | null {
    return this.dashboard;
  }

  public setDashboard(dashboard: DashboardProperties) {
    this.dashboard = dashboard;
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

  protected constructParameters(): DataTable {
    const slavesTable: DataTable | null = this.createSlavesTable(this.slaves);
    const table: DataTable = DataTableFactory.of(EditProperties.CFT_EDIT_PROPERTIES);
    const rec: DataRecord = table.addRecord();

    rec.addString(this.context);
    rec.addString(this.propertiesGroup);

    const propertiesTable: DataTable = DataTableFactory.of(EditProperties.FT_PROPERTIES);
    if (this.properties != null) {
      for (const property of this.properties) {
        propertiesTable.addRecord().addString(property);
      }
    }

    rec.addDataTable(propertiesTable);

    rec.addBoolean(this.singleWindowMode);
    rec.addBoolean(this.useDockableFrame);
    rec.addBoolean(this.readOnly);
    rec.addBoolean(this.dynamic);
    rec.addBoolean(this.async);
    rec.addDataTable(slavesTable);
    rec.addDataTable(this.location != null ? this.location.toDataTable() : null);
    rec.addDataTable(this.dashboard != null ? this.dashboard.toDataTable() : null);
    rec.addString(this.key);
    rec.addDataTable(this.dhInfo != null ? this.dhInfo.toDataTable() : null);

    return rec.wrap();
  }

  private createSlavesTable(slaves: Array<string> | null): DataTable | null {
    if (slaves == null) {
      return null;
    }

    const slavesTable: DataTable = DataTableFactory.of(EditProperties.CFT_SLAVES);
    for (const slave of slaves) {
      slavesTable.addRecord().addString(slave);
    }

    return slavesTable;
  }
}

EditProperties.initializeEditProperties();
