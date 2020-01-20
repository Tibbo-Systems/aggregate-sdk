import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import FieldFormat from '../../datatable/FieldFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import FieldConstants from '../../datatable/field/FieldConstants';
import Cres from '../../Cres';
import StringFieldFormat from '../../datatable/field/StringFieldFormat';
import Contexts from '../../context/Contexts';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class ActivateDashboard extends GenericActionCommand {
  public static readonly CF_NAME: string = 'name';
  public static readonly CF_PATH: string = 'path';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';
  public static readonly CF_ACTION_PARAMETERS: string = 'actionParameters';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';
  public static readonly CF_DEFAULT_CONTEXT: string = 'defaultContext';

  public static readonly CFT_ACTIVATE_DASHBOARD: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField('<' + ActivateDashboard.CF_NAME + '><S>');
    let ff: FieldFormat<any> = FieldFormatFactory.createWith(ActivateDashboard.CF_PATH, FieldConstants.STRING_FIELD, Cres.get().getString('dashboard'));
    ff.setNullable(true);
    ff.setEditor(FieldConstants.EDITOR_CONTEXT);
    ff.setEditorOptions(StringFieldFormat.encodeMaskEditorOptionsFromStrings(Contexts.TYPE_DASHBOARD, Contexts.CTX_DASHBOARDS));
    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField(ff);

    ff = FieldFormatFactory.create('<' + ActivateDashboard.CF_LOCATION + '><T><F=N>');
    ff.setDefault(new WindowLocation().toDataTable());
    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField(ff);

    ff = FieldFormatFactory.create('<' + ActivateDashboard.CF_DASHBOARD + '><T><F=N>');
    ff.setDefault(new DashboardProperties().toDataTable());
    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField(ff);

    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField('<' + ActivateDashboard.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>');

    ff = FieldFormatFactory.createType(ActivateDashboard.CF_ACTION_PARAMETERS, FieldConstants.DATATABLE_FIELD)
      .setNullable(true)
      .setHidden(true);
    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField(ff);

    ff = FieldFormatFactory.create('<' + ActivateDashboard.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');
    ff.setDefault(new DashboardsHierarchyInfo().toDataTable());
    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField(ff);

    ActivateDashboard.CFT_ACTIVATE_DASHBOARD.addField('<' + ActivateDashboard.CF_DEFAULT_CONTEXT + '><S><F=N><D=' + '>');
  }

  private static _init = false;

  public static initialize() {
    if (ActivateDashboard._init) return;

    ActivateDashboard.__static_initializer_0();
    ActivateDashboard._init = true;
  }

  private name: string | null = null;
  private path: string | null = null;
  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private key: string | null = null;
  private actionParameters: DataTable | null = null;
  private dhInfo: DashboardsHierarchyInfo | null = null;
  private defaultContext: string | null = null;

  public constructor() {
    super(ActionUtilsConstants.CMD_ACTIVATE_DASHBOARD, ActivateDashboard.CFT_ACTIVATE_DASHBOARD, null);
    ActivateDashboard.initialize();
  }

  public static createActivateDashboardWithDataTable(title: string, parameters: DataTable) {
    const activateDashboard = new ActivateDashboard();
    activateDashboard.setTitle(title);
    activateDashboard.setParameters(parameters);
    return activateDashboard;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(
      ActivateDashboard.CFT_ACTIVATE_DASHBOARD,
      name,
      this.path,
      this.location != null ? this.location.toDataTable() : null,
      this.dashboard != null ? this.dashboard.toDataTable() : null,
      this.key,
      this.actionParameters,
      this.dhInfo != null ? this.dhInfo.toDataTable() : null,
      this.defaultContext
    );
  }

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPath(): string | null {
    return this.path;
  }

  public setPath(path: string): void {
    this.path = path;
  }

  public getLocation(): WindowLocation | null {
    return this.location;
  }

  public setLocation(location: WindowLocation): void {
    this.location = location;
  }

  public getDashboard(): DashboardProperties | null {
    return this.dashboard;
  }

  public setDashboard(dashboard: DashboardProperties): void {
    this.dashboard = dashboard;
  }

  public getKey(): string | null {
    return this.key;
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public getActionParameters(): DataTable | null {
    return this.actionParameters;
  }

  public setActionParameters(actionParameters: DataTable): void {
    this.actionParameters = actionParameters;
  }

  public getDashboardsHierarchyInfo(): DashboardsHierarchyInfo | null {
    return this.dhInfo;
  }

  public setDashboardsHierarchyInfo(dhInfo: DashboardsHierarchyInfo): void {
    this.dhInfo = dhInfo;
  }

  public getDefaultContext(): string | null {
    return this.defaultContext;
  }

  public setDefaultContext(defaultContext: string): void {
    this.defaultContext = defaultContext;
  }
}
