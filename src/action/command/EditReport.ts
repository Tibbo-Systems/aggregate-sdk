import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import ActionUtils from '../ActionUtils';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class EditReport extends GenericActionCommand {
  public static readonly CF_TEMPLATE: string = 'template';
  public static readonly CF_DATA: string = 'data';
  public static readonly CF_SUBREPORTS: string = 'subreports';
  public static readonly CF_RESOURCES: string = 'resources';
  public static readonly RF_TEMPLATE: string = 'template';
  public static readonly RF_RESULT: string = 'result';
  public static readonly CFT_EDIT_REPORT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    EditReport.CFT_EDIT_REPORT.addField('<' + EditReport.CF_TEMPLATE + '><S>');
    EditReport.CFT_EDIT_REPORT.addField('<' + EditReport.CF_DATA + '><T>');
    EditReport.CFT_EDIT_REPORT.addField('<' + EditReport.CF_SUBREPORTS + '><T>');
    EditReport.CFT_EDIT_REPORT.addField('<' + EditReport.CF_RESOURCES + '><T>');
  }

  public static readonly RFT_EDIT_REPORT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_1() {
    EditReport.RFT_EDIT_REPORT.addField('<' + EditReport.RF_RESULT + '><S>');
    EditReport.RFT_EDIT_REPORT.addField('<' + EditReport.RF_TEMPLATE + '><S><F=N>');
  }

  public static CF_SUBREPORTS_NAME = 'name';
  public static CF_SUBREPORTS_TEMPLATE = 'template';
  public static CF_SUBREPORTS_DATA = 'data';
  public static CFT_SUBREPORTS: TableFormat = new TableFormat();

  static __static_initializer_2() {
    EditReport.CFT_SUBREPORTS.addField('<' + EditReport.CF_SUBREPORTS_NAME + '><S>');
    EditReport.CFT_SUBREPORTS.addField('<' + EditReport.CF_SUBREPORTS_TEMPLATE + '><S>');
    EditReport.CFT_SUBREPORTS.addField('<' + EditReport.CF_SUBREPORTS_DATA + '><T>');
  }

  public static CF_RESOURCES_DATA = 'data';

  public static CFT_RESOURCES: TableFormat = new TableFormat();

  static __static_initializer_3() {
    EditReport.CFT_RESOURCES.addField('<' + EditReport.CF_RESOURCES_DATA + '><A>');
  }

  private static _init = false;

  public static initialize() {
    if (EditReport._init) return;
    EditReport.__static_initializer_0();
    EditReport.__static_initializer_1();
    EditReport.__static_initializer_2();
    EditReport.__static_initializer_3();
    EditReport._init = true;
  }

  private template: string | null = null;
  private data: DataTable | null = null;
  private subreports: DataTable | null = null;
  private resources: DataTable | null = null;

  public constructor() {
    super(ActionUtilsConstants.CMD_EDIT_REPORT);
    EditReport.initialize();
  }

  public static createEditReportWithDataTable(title: string, parameters: DataTable) {
    const editReport = new EditReport();
    editReport.setTitle(title);
    editReport.setParameters(parameters);
    return editReport;
  }

  public static createDefault() {
    const editReport = new EditReport();
    editReport.setParameters(new SimpleDataTable(EditReport.CFT_EDIT_REPORT));
    editReport.setResponseFormat(EditReport.RFT_EDIT_REPORT);
    return editReport;
  }

  public static createEditReport(title: string, template: string, data: DataTable, subreports: DataTable, resources: DataTable) {
    const editReport = new EditReport();
    editReport.setTitle(title);
    editReport.setTemplate(template);
    editReport.setData(data);
    editReport.setSubReports(subreports);
    editReport.setResources(resources);
    return editReport;
  }

  constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(EditReport.CFT_EDIT_REPORT, this.template, this.data, this.subreports, this.resources);
  }

  public getTemplate(): string | null {
    return this.template;
  }

  public setTemplate(template: string): void {
    this.template = template;
  }

  public getData(): DataTable | null {
    return this.data;
  }

  public setData(data: DataTable): void {
    this.data = data;
  }

  public setSubReports(subreports: DataTable): void {
    this.subreports = subreports;
  }

  public setResources(resources: DataTable): void {
    this.resources = resources;
  }
}
