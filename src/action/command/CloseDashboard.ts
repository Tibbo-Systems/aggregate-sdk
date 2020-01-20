import DashboardProperties from '../../util/DashboardProperties';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class CloseDashboard extends GenericActionCommand {
  public static CF_DASHBOARD = 'dashboard';

  public static CF_TARGET_ELEMENT = 'targetElement';

  public static CF_CLOSE_ALL = 'closeAll';

  public static CF_DEEP_SEARCH = 'deepSearch';

  public static CFT_CLOSE_DASHBOARD: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    CloseDashboard.CFT_CLOSE_DASHBOARD.addField(FieldFormatFactory.create('<' + CloseDashboard.CF_DASHBOARD + '><T><F=N>'));
    CloseDashboard.CFT_CLOSE_DASHBOARD.addField(FieldFormatFactory.create('<' + CloseDashboard.CF_TARGET_ELEMENT + '><S><F=N>'));
    CloseDashboard.CFT_CLOSE_DASHBOARD.addField(FieldFormatFactory.create('<' + CloseDashboard.CF_CLOSE_ALL + '><B><A=0>'));
    CloseDashboard.CFT_CLOSE_DASHBOARD.addField(FieldFormatFactory.create('<' + CloseDashboard.CF_DEEP_SEARCH + '><B><A=0>'));
  }

  private static _init = false;

  public static initialize() {
    if (CloseDashboard._init) return;

    CloseDashboard.__static_initializer_0();
    CloseDashboard._init = true;
  }

  private dashboard: DashboardProperties | null = null;

  private targetElement: string | null = null;

  private closeAll = false;

  private deepSearch = false;

  public constructor() {
    super(ActionUtilsConstants.CMD_CLOSE_DASHBOARD, CloseDashboard.CFT_CLOSE_DASHBOARD, null);
  }

  public static createCloseDashboardWithDataTable(title: string, parameters: DataTable) {
    const closeDashboard = new CloseDashboard();
    closeDashboard.setTitle(title);
    closeDashboard.setParameters(parameters);
    return closeDashboard;
  }

  public getDashboard(): DashboardProperties | null {
    return this.dashboard;
  }

  public setDashboard(dashboard: DashboardProperties): void {
    this.dashboard = dashboard;
  }

  public getTargetElement(): string | null {
    return this.targetElement;
  }

  public setTargetElement(targetElement: string): void {
    this.targetElement = targetElement;
  }

  public getCloseAll(): boolean {
    return this.closeAll;
  }

  public setCloseAll(closeAll: boolean): void {
    this.closeAll = closeAll;
  }

  public getDeepSearch(): boolean {
    return this.deepSearch;
  }

  public setDeepSearch(deepSearch: boolean): void {
    this.deepSearch = deepSearch;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(CloseDashboard.CFT_CLOSE_DASHBOARD, this.dashboard != null ? this.dashboard.toDataTable() : null, this.targetElement, this.closeAll, this.deepSearch);
  }
}

CloseDashboard.initialize();
