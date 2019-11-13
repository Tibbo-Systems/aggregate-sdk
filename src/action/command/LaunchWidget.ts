import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import Cres from '../../Cres';
import FieldConstants from '../../datatable/field/FieldConstants';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import DataTable from '../../datatable/DataTable';
import DashboardProperties from '../../util/DashboardProperties';
import WindowLocation from '../../util/WindowLocation';
import ActionUtils from '../ActionUtils';
import SimpleDataTable from '../../datatable/SimpleDataTable';

export default class LaunchWidget extends GenericActionCommand {
  public static readonly CF_DEFAULT_CONTEXT: string = 'defaultContext';
  public static readonly CF_WIDGET_CONTEXT: string = 'widgetContext';
  public static readonly CF_TEMPLATE: string = 'template';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';
  public static readonly CF_INPUT: string = 'input';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';
  public static readonly CF_WIDGET_SETTING: string = 'widgetSetting';

  public static readonly CFT_LAUNCH_WIDGET: TableFormat = new TableFormat(1, 1);

  public __static_initializer0() {
    LaunchWidget.CFT_LAUNCH_WIDGET.addField(
      '<' +
        LaunchWidget.CF_WIDGET_CONTEXT +
        '><S><F=N><D=' +
        Cres.get().getString('widget') +
        '><E=' +
        FieldConstants.EDITOR_CONTEXT +
        '>'
    );
    LaunchWidget.CFT_LAUNCH_WIDGET.addField(
      '<' +
        LaunchWidget.CF_DEFAULT_CONTEXT +
        '><S><F=N><D=' +
        Cres.get().getString('conDefaultContext') +
        '><E=' +
        FieldConstants.EDITOR_CONTEXT +
        '>'
    );
    LaunchWidget.CFT_LAUNCH_WIDGET.addField('<' + LaunchWidget.CF_TEMPLATE + '><S><F=N>');
    LaunchWidget.CFT_LAUNCH_WIDGET.addField('<' + LaunchWidget.CF_LOCATION + '><T><F=N>');
    LaunchWidget.CFT_LAUNCH_WIDGET.addField('<' + LaunchWidget.CF_DASHBOARD + '><T><F=N>');
    LaunchWidget.CFT_LAUNCH_WIDGET.addField('<' + LaunchWidget.CF_KEY + '><S><F=NH>');
    LaunchWidget.CFT_LAUNCH_WIDGET.addField('<' + LaunchWidget.CF_INPUT + '><T><F=N>');
    LaunchWidget.CFT_LAUNCH_WIDGET.addField('<' + LaunchWidget.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');
    LaunchWidget.CFT_LAUNCH_WIDGET.addField(
      FieldFormatFactory.create('<' + LaunchWidget.CF_WIDGET_SETTING + '><T><F=N>').setDefault(null)
    );
  }

  private widgetContext: string | null = null;
  private defaultContext: string | null = null;
  private template: string | null = null;
  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private key: string | null = null;
  private input: DataTable | null = null;
  private dhInfo: DashboardsHierarchyInfo | null = null;
  private widgetSetting: DataTable | null = null;

  public constructor(
    titleOrFormat: string | TableFormat = LaunchWidget.CFT_LAUNCH_WIDGET,
    widgetContext?: string,
    defaultContext?: string,
    template?: string | null
  ) {
    super(ActionUtils.CMD_LAUNCH_WIDGET, titleOrFormat, null);
    if (widgetContext && defaultContext) {
      this.widgetContext = widgetContext;
      this.defaultContext = defaultContext;
      if (template) {
        this.template = template;
      }
    }
  }

  public static createLaunchWidgetWithDataTable(title: string, parameters: DataTable) {
    const launchWidget = new LaunchWidget(title);
    launchWidget.setParameters(parameters);
    return launchWidget;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(
      LaunchWidget.CFT_LAUNCH_WIDGET,
      this.widgetContext,
      this.defaultContext,
      this.template,
      this.location != null ? this.location.toDataTable() : null,
      this.dashboard != null ? this.dashboard.toDataTable() : null,
      this.key,
      this.input,
      this.dhInfo != null ? this.dhInfo.toDataTable() : null,
      this.widgetSetting
    );
  }

  public getDefaultContext(): string | null {
    return this.defaultContext;
  }

  public setDefaultContext(defaultContext: string): void {
    this.defaultContext = defaultContext;
  }

  public getWidgetContext(): string | null {
    return this.widgetContext;
  }

  public setWidgetContext(widgetContext: string): void {
    this.widgetContext = widgetContext;
  }

  public getTemplate(): string | null {
    return this.template;
  }

  public setTemplate(encodedWidgetTemplate: string): void {
    this.template = encodedWidgetTemplate;
  }

  public getLocation(): WindowLocation | null {
    return this.location;
  }

  public setLocation(location: WindowLocation): void {
    this.location = location;
  }

  public etDashboard(): DashboardProperties | null {
    return this.dashboard;
  }

  public setDashboard(dashboard: DashboardProperties): void {
    this.dashboard = dashboard;
  }

  public getInput(): DataTable | null {
    return this.input;
  }

  public setInput(input: DataTable): void {
    this.input = input;
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

  public getWidgetSetting(): DataTable | null {
    return this.widgetSetting;
  }

  public setWidgetSetting(widgetSetting: DataTable): void {
    this.widgetSetting = widgetSetting;
  }
}
