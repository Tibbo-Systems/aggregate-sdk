import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import Cres from '../../Cres';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import ActionUtils from '../ActionUtils';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import ByteBuffer from 'bytebuffer';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataRecord from '../../datatable/DataRecord';
import Data from '../../data/Data';

export default class ShowReport extends GenericActionCommand {
  public static readonly CF_REPORT_DATA: string = 'reportData';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';

  public static readonly CF_KEY: string = 'key';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';
  public static readonly CF_REPORT_FORMAT: string = 'reportFormat';

  public static readonly CFT_SHOW_REPORT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowReport.CFT_SHOW_REPORT.addField('<' + ShowReport.CF_REPORT_DATA + '><A><F=N>');
    ShowReport.CFT_SHOW_REPORT.addField('<' + ShowReport.CF_LOCATION + '><T><F=N>');
    ShowReport.CFT_SHOW_REPORT.addField('<' + ShowReport.CF_DASHBOARD + '><T><F=N>');
    ShowReport.CFT_SHOW_REPORT.addField('<' + ShowReport.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>');
    ShowReport.CFT_SHOW_REPORT.addField('<' + ShowReport.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');
    ShowReport.CFT_SHOW_REPORT.addField('<' + ShowReport.CF_REPORT_FORMAT + '><S><F=N>');
  }

  private reportData: ByteBuffer | null = null;
  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private key: string | null = null;
  private dhInfo: DashboardsHierarchyInfo | null = null;
  private reportFormat: string | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowReport._init) return;
    ShowReport.__static_initializer_0();
    ShowReport._init = true;
  }

  public constructor(
    titleOrFormat: string | TableFormat = ShowReport.CFT_SHOW_REPORT,
    reportData?: ByteBuffer,
    location?: WindowLocation,
    dashboard?: DashboardProperties,
    reportFormat?: string
  ) {
    super(ActionUtils.CMD_SHOW_REPORT, titleOrFormat, null);
    if (reportData && location && dashboard && reportFormat) {
      this.reportData = reportData;
      this.location = location;
      this.dashboard = dashboard;
      this.reportFormat = reportFormat;
    }
  }

  public static createShowReportWithDataTable(title: string, parameters: DataTable) {
    const showReport = new ShowReport(title);
    showReport.setParameters(parameters);
    return showReport;
  }

  protected constructParameters(): DataTable {
    const t: DataTable = new SimpleDataTable(ShowReport.CFT_SHOW_REPORT);
    const r: DataRecord = t.addRecord();
    r.addData(new Data(this.reportData));
    r.addDataTable(this.location != null ? this.location.toDataTable() : null);
    r.addDataTable(this.dashboard != null ? this.dashboard.toDataTable() : null);
    r.addString(this.key);
    r.addDataTable(this.dhInfo != null ? this.dhInfo.toDataTable() : null);
    r.addString(this.reportFormat);
    return t;
  }

  public getReportData(): ByteBuffer | null {
    return this.reportData;
  }

  public setReportData(reportData: ByteBuffer): void {
    this.reportData = reportData;
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

  public getDashboardsHierarchyInfo(): DashboardsHierarchyInfo | null {
    return this.dhInfo;
  }

  public setDashboardsHierarchyInfo(dhInfo: DashboardsHierarchyInfo): void {
    this.dhInfo = dhInfo;
  }

  public getReportFormat(): string | null {
    return this.reportFormat;
  }

  public setReportFormat(reportFormat: string | null): void {
    this.reportFormat = reportFormat;
  }
}
ShowReport.initialize();
