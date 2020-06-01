import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import Cres from '../../Cres';
import FieldFormat from '../../datatable/FieldFormat';
import FieldConstants from '../../datatable/field/FieldConstants';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTableBindingProvider from '../../datatable/DataTableBindingProvider';
import DataTable from '../../datatable/DataTable';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import Functions from '../../expression/functions/Functions';
import EventFilterContextConstants from '../../server/EventFilterContextConstants';
import EntityList from '../../context/EntityList';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class ShowEventLog extends GenericActionCommand {
  public static readonly CF_EVENT_FILTER: string = 'eventFilter';
  public static readonly CF_EVENT_LIST: string = 'eventList';
  public static readonly CF_SHOW_REALTIME: string = 'showRealtime';
  public static readonly CF_SHOW_HISTORY: string = 'showHistory';
  public static readonly CF_PRELOAD_HISTORY: string = 'preloadHistory';
  public static readonly CF_SHOW_CONTEXTS: string = 'showContexts';
  public static readonly CF_SHOW_NAMES: string = 'showNames';
  public static readonly CF_SHOW_LEVELS: string = 'showLevels';
  public static readonly CF_SHOW_DATA: string = 'showData';
  public static readonly CF_SHOW_ACKNOWLEDGEMENTS: string = 'showAcknowledgements';
  public static readonly CF_SHOW_ENRICHMENTS: string = 'showEnrichments';
  public static readonly CF_FILTER_PARAMETERS: string = 'filterParameters';
  public static readonly CF_CUSTOM_LISTENER_CODE: string = 'customListenerCode';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';

  public static readonly CF_DEFAULT_CONTEXT: string = 'defaultContext';
  public static readonly CF_CLASS_NAME: string = 'className';
  public static readonly CF_INSTANCE_ID: string = 'instanceId';
  public static readonly CF_DEFAULT_EVENT: string = 'defaultEvent';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';

  public static readonly RF_LISTENER_CODE: string = 'listenerCode';

  public static readonly CFT_SHOW_EVENT_LOG: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_EVENT_FILTER + '><S><F=N><D=' + Cres.get().getString('efEventFilter') + '><E=' + FieldConstants.EDITOR_CONTEXT + '>');

    const ff: FieldFormat<any> = FieldFormatFactory.create('<' + ShowEventLog.CF_EVENT_LIST + '><T><D=' + Cres.get().getString('events') + '>');
    ff.setDefault(new SimpleDataTable(EntityList.FORMAT, true));
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField(ff);

    ShowEventLog.CFT_SHOW_EVENT_LOG.addField(FieldFormatFactory.createWith(ShowEventLog.CF_DEFAULT_EVENT, FieldConstants.STRING_FIELD, Cres.get().getString('elDefaultEvent')).setNullable(true));
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_REALTIME + '><B><A=1><D=' + Cres.get().getString('wCurrentEvents') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_HISTORY + '><B><A=1><D=' + Cres.get().getString('wEventHistory') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_PRELOAD_HISTORY + '><B><A=1><D=' + Cres.get().getString('wPreloadHistory') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_CONTEXTS + '><B><D=' + Cres.get().getString('wShowContextNames') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_NAMES + '><B><D=' + Cres.get().getString('wShowEventNames') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_LEVELS + '><B><D=' + Cres.get().getString('wShowEventLevels') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_DATA + '><B><A=1><D=' + Cres.get().getString('wShowEventData') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_ACKNOWLEDGEMENTS + '><B><D=' + Cres.get().getString('wShowEventAck') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_SHOW_ENRICHMENTS + '><B><A=0><D=' + Cres.get().getString('wShowEventEnrichments') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_FILTER_PARAMETERS + '><T><F=N><D=' + Cres.get().getString('parameters') + '>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_CUSTOM_LISTENER_CODE + '><I><F=NH>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_LOCATION + '><T><F=N>');
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_DASHBOARD + '><T><F=N>');

    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>');

    ShowEventLog.CFT_SHOW_EVENT_LOG.addField(FieldFormatFactory.createType(ShowEventLog.CF_DEFAULT_CONTEXT, FieldConstants.STRING_FIELD).setNullable(true).setHidden(true));
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField(FieldFormatFactory.createType(ShowEventLog.CF_CLASS_NAME, FieldConstants.STRING_FIELD).setNullable(true).setHidden(true));
    ShowEventLog.CFT_SHOW_EVENT_LOG.addField(FieldFormatFactory.createType(ShowEventLog.CF_INSTANCE_ID, FieldConstants.LONG_FIELD).setNullable(true).setHidden(true));

    ShowEventLog.CFT_SHOW_EVENT_LOG.addField('<' + ShowEventLog.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');

    let ref: string = ShowEventLog.CF_EVENT_LIST + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    let exp: string = '{' + ShowEventLog.CF_EVENT_FILTER + '} == null';
    ShowEventLog.CFT_SHOW_EVENT_LOG.addBinding(ref, exp);

    ref = ShowEventLog.CF_FILTER_PARAMETERS;
    exp = '{' + ShowEventLog.CF_EVENT_FILTER + '} != null ? ' + Functions.CALL_FUNCTION + '({' + ShowEventLog.CF_EVENT_FILTER + "}, '" + EventFilterContextConstants.F_GET_PARAMETERS + "', true, true) : null";
    ShowEventLog.CFT_SHOW_EVENT_LOG.addBinding(ref, exp);
  }

  public static readonly RFT_SHOW_EVENT_LOG: TableFormat = new TableFormat(1, 1, '<' + ShowEventLog.RF_LISTENER_CODE + '><I><F=N>');

  private eventFilter: string | null = null;
  private events: EntityList = new EntityList();
  private showRealtime = false;
  private showHistory = false;
  private preloadHistory = false;
  private showContexts = false;
  private showNames = false;
  private showLevels = false;
  private showData = false;
  private showAcknowledgements = false;
  private showEnrichments = false;
  private filterParameters: DataTable | null = null;
  private customListenerCode: number | null = null;
  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private key: string | null = null;
  private dhInfo: DashboardsHierarchyInfo | null = null;

  private defaultContext: string | null = null;
  private className: string | null = null;
  private instanceId: number | null = null;
  private defaultEvent: string | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowEventLog._init) return;
    ShowEventLog.__static_initializer_0();
    ShowEventLog._init = true;
  }

  public constructor() {
    super(ActionUtilsConstants.CMD_SHOW_EVENT_LOG);
  }

  public static createShowEventLogWithDataTable(title: string, parameters: DataTable) {
    const showEventLog = new ShowEventLog();
    showEventLog.setTitle(title);
    showEventLog.setParameters(parameters);
    return showEventLog;
  }

  public static createDefault() {
    const showEventLog = new ShowEventLog();
    showEventLog.setParameters(new SimpleDataTable(ShowEventLog.CFT_SHOW_EVENT_LOG));
    showEventLog.setResponseFormat(ShowEventLog.RFT_SHOW_EVENT_LOG);
    return showEventLog;
  }

  public static createShowEventLog(
    title: string,
    eventList: EntityList,
    showRealtime: boolean,
    showHistory: boolean,
    preloadHistory: boolean,
    showContexts: boolean,
    showNames: boolean,
    showLevels: boolean,
    showAcknowledgements: boolean,
    showEnrichments: boolean,
    customListenerCode: number,
    location: WindowLocation,
    dashboard: DashboardProperties
  ) {
    const showEventLog = new ShowEventLog();
    showEventLog.setTitle(title);
    showEventLog.setEvents(eventList);
    showEventLog.setShowRealtime(showRealtime);
    showEventLog.setShowHistory(showHistory);
    showEventLog.setPreloadHistory(preloadHistory);
    showEventLog.setShowContexts(showContexts);
    showEventLog.setShowNames(showNames);
    showEventLog.setShowLevels(showLevels);
    showEventLog.setShowAcknowledgements(showAcknowledgements);
    showEventLog.setShowEnrichments(showEnrichments);
    showEventLog.setCustomListenerCode(customListenerCode);
    showEventLog.setLocation(location);
    showEventLog.setDashboard(dashboard);
    return showEventLog;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(
      ShowEventLog.CFT_SHOW_EVENT_LOG,
      this.eventFilter,
      this.events.toDataTable(),
      this.defaultEvent,
      this.showRealtime,
      this.showHistory,
      this.preloadHistory,
      this.showContexts,
      this.showNames,
      this.showLevels,
      this.showData,
      this.showAcknowledgements,
      this.showEnrichments,
      this.filterParameters,
      this.customListenerCode,
      this.location != null ? this.location.toDataTable() : null,
      this.dashboard != null ? this.dashboard.toDataTable() : null,
      this.key,
      this.defaultContext,
      this.className,
      this.instanceId,
      this.dhInfo != null ? this.dhInfo.toDataTable() : null
    );
  }

  public getEventFilter(): string | null {
    return this.eventFilter;
  }

  public setEventFilter(eventFilter: string): void {
    this.eventFilter = eventFilter;
  }

  public getEvents(): EntityList {
    return this.events;
  }

  public setEvents(eventList: EntityList): void {
    this.events = eventList;
  }

  public isShowRealtime(): boolean {
    return this.showRealtime;
  }

  public setShowRealtime(showRealtime: boolean): void {
    this.showRealtime = showRealtime;
  }

  public isShowHistory(): boolean {
    return this.showHistory;
  }

  public setShowHistory(showHistory: boolean): void {
    this.showHistory = showHistory;
  }

  public isPreloadHistory(): boolean {
    return this.preloadHistory;
  }

  public setPreloadHistory(preloadHistory: boolean): void {
    this.preloadHistory = preloadHistory;
  }

  public isShowContexts(): boolean {
    return this.showContexts;
  }

  public setShowContexts(showContexts: boolean): void {
    this.showContexts = showContexts;
  }

  public isShowNames(): boolean {
    return this.showNames;
  }

  public setShowNames(showNames: boolean): void {
    this.showNames = showNames;
  }

  public isShowLevels(): boolean {
    return this.showLevels;
  }

  public setShowLevels(showLevels: boolean): void {
    this.showLevels = showLevels;
  }

  public isShowData(): boolean {
    return this.showData;
  }

  public setShowData(showData: boolean): void {
    this.showData = showData;
  }

  public isShowAcknowledgements(): boolean {
    return this.showAcknowledgements;
  }

  public setShowAcknowledgements(showAcknowledgements: boolean): void {
    this.showAcknowledgements = showAcknowledgements;
  }

  public isShowEnrichments(): boolean {
    return this.showEnrichments;
  }

  public setShowEnrichments(showEnrichments: boolean): void {
    this.showEnrichments = showEnrichments;
  }

  public getFilterParameters(): DataTable | null {
    return this.filterParameters;
  }

  public setFilterParameters(filterParameters: DataTable): void {
    this.filterParameters = filterParameters;
  }

  public getCustomListenerCode(): number | null {
    return this.customListenerCode;
  }

  public setCustomListenerCode(customListenerCode: number): void {
    this.customListenerCode = customListenerCode;
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

  public getDefaultContext(): string | null {
    return this.defaultContext;
  }

  public setDefaultContext(defaultContext: string): void {
    this.defaultContext = defaultContext;
  }

  public getClassName(): string | null {
    return this.className;
  }

  public setClassName(className: string): void {
    this.className = className;
  }

  public getInstanceId(): number | null {
    return this.instanceId;
  }

  public setInstanceId(instanceId: number): void {
    this.instanceId = instanceId;
  }

  public getDefaultEvent(): string | null {
    return this.defaultEvent;
  }

  public setDefaultEvent(event: string): void {
    this.defaultEvent = event;
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
}

ShowEventLog.initialize();
