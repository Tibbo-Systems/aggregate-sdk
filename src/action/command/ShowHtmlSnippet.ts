import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import FieldFormat from '../../datatable/FieldFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import FieldConstants from '../../datatable/field/FieldConstants';
import Cres from '../../Cres';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import DataTableBindingProvider from '../../datatable/DataTableBindingProvider';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import ActionUtils from '../ActionUtils';
import DataTable from '../../datatable/DataTable';
import DataRecord from '../../datatable/DataRecord';
import SimpleDataTable from '../../datatable/SimpleDataTable';

export default class ShowHtmlSnippet extends GenericActionCommand {
  public static readonly EXPRESSION_PATTERN: RegExp = new RegExp('<e>(.|\\n)*?</e>');

  public static readonly TYPE_FRAME: number = 0;
  public static readonly TYPE_EXPRESSION: number = 1;
  public static readonly TYPE_HTML: number = 2;

  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';
  public static readonly CF_TYPE: string = 'snippetType';
  public static readonly CF_URL: string = 'url';
  public static readonly CF_EXPRESSION: string = 'expression';
  public static readonly CF_HTML: string = 'html';
  public static readonly CF_CHECK_HTML_VALIDITY: string = 'checkHtmlValidity';
  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';
  public static readonly CF_RESOURCE_BUNDLE: string = 'resourceBundle';

  public static readonly CFT_SHOW_HTML_SNIPPET: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    let ff: FieldFormat<any> = FieldFormatFactory.createWith(
      ShowHtmlSnippet.CF_TYPE,
      FieldConstants.INTEGER_FIELD,
      Cres.get().getString('wHtmlSnippetType')
    );
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);
    ff.setSelectionValues(this.snippetTypes());

    ff = FieldFormatFactory.createWith(
      ShowHtmlSnippet.CF_URL,
      FieldConstants.STRING_FIELD,
      Cres.get().getString('wURL')
    );
    ff.setNullable(true);
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowHtmlSnippet.CF_LOCATION + '><T><F=N>');
    ff.setDefault(new WindowLocation().toDataTable());
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowHtmlSnippet.CF_DASHBOARD + '><T><F=N>');
    ff.setDefault(new DashboardProperties().toDataTable());
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(
      '<' + ShowHtmlSnippet.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>'
    );

    ff = FieldFormatFactory.create('<' + ShowHtmlSnippet.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');
    ff.setDefault(new DashboardsHierarchyInfo().toDataTable());
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ff = FieldFormatFactory.createWith(
      ShowHtmlSnippet.CF_EXPRESSION,
      FieldConstants.STRING_FIELD,
      Cres.get().getString('wHtmlSnippetExpression')
    );
    ff.setNullable(true);
    ff.setEditor(FieldConstants.EDITOR_EXPRESSION);
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ff = FieldFormatFactory.createWith(
      ShowHtmlSnippet.CF_HTML,
      FieldConstants.STRING_FIELD,
      Cres.get().getString('wHtmlSnippetHtml')
    );
    ff.setNullable(true);
    ff.setEditor(FieldConstants.EDITOR_TEXT);
    ff.setEditorOptions(FieldConstants.TEXT_EDITOR_MODE_HTML);
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowHtmlSnippet.CF_RESOURCE_BUNDLE + '><S><F=NRH>');
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ff = FieldFormatFactory.createWith(
      ShowHtmlSnippet.CF_CHECK_HTML_VALIDITY,
      FieldConstants.BOOLEAN_FIELD,
      Cres.get().getString('wHtmlSnippetCheckHtmlValidity'),
      true
    );
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addField(ff);

    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addBinding(
      ShowHtmlSnippet.CF_URL + '#' + DataTableBindingProvider.PROPERTY_HIDDEN,
      '{' + ShowHtmlSnippet.CF_TYPE + '} != ' + ShowHtmlSnippet.TYPE_FRAME
    );
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addBinding(
      ShowHtmlSnippet.CF_EXPRESSION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN,
      '{' + ShowHtmlSnippet.CF_TYPE + '} != ' + ShowHtmlSnippet.TYPE_EXPRESSION
    );
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addBinding(
      ShowHtmlSnippet.CF_HTML + '#' + DataTableBindingProvider.PROPERTY_HIDDEN,
      '{' + ShowHtmlSnippet.CF_TYPE + '} != ' + ShowHtmlSnippet.TYPE_HTML
    );
    ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET.addBinding(
      ShowHtmlSnippet.CF_CHECK_HTML_VALIDITY + '#' + DataTableBindingProvider.PROPERTY_HIDDEN,
      '{' + ShowHtmlSnippet.CF_TYPE + '} != ' + ShowHtmlSnippet.TYPE_HTML
    );
  }

  private static snippetTypes(): Map<number, string> {
    const hashMap: Map<number, string> = new Map();
    hashMap.set(ShowHtmlSnippet.TYPE_FRAME, Cres.get().getString('wHtmlSnippetTypeFrame'));
    hashMap.set(ShowHtmlSnippet.TYPE_EXPRESSION, Cres.get().getString('wHtmlSnippetTypeExpression'));
    hashMap.set(ShowHtmlSnippet.TYPE_HTML, Cres.get().getString('wHtmlSnippetTypeHtml'));
    return hashMap;
  }

  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private key: string | null = null;
  private url: string | null = null;
  private snippetType: number | null = null;
  private html: string | null = null;
  private checkHtmlValidity: boolean = false;
  private expression: string | null = null;
  private dhInfo: DashboardsHierarchyInfo | null = null;
  private resourceBundle: string | null = null;

  public getResourceBundle(): string | null {
    return this.resourceBundle;
  }

  public setResourceBundle(resourceBundle: string): void {
    this.resourceBundle = resourceBundle;
  }

  private static _init = false;

  public static initialize() {
    if (ShowHtmlSnippet._init) return;
    ShowHtmlSnippet.__static_initializer_0();
    ShowHtmlSnippet._init = true;
  }

  public constructor() {
    super(ActionUtils.CMD_SHOW_HTML_SNIPPET, ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET, null);
  }

  public static createShowHtmlSnippetWithDataTable(title: string, parameters: DataTable) {
    const showHtmlSnippet = new ShowHtmlSnippet();
    showHtmlSnippet.setTitle(title);
    showHtmlSnippet.setParameters(parameters);
    return showHtmlSnippet;
  }

  protected constructParameters(): DataTable {
    const rec: DataRecord = new DataRecord(ShowHtmlSnippet.CFT_SHOW_HTML_SNIPPET);
    rec.setValue(ShowHtmlSnippet.CF_TYPE, this.getSnippetType());
    rec.setValue(ShowHtmlSnippet.CF_URL, this.getUrl());
    const loc = this.getLocation();
    const dash = this.getDashboard();
    const dashHier = this.getDashboardsHierarchyInfo();
    rec.setValue(ShowHtmlSnippet.CF_LOCATION, this.getLocation() != null ? loc && loc.toDataTable() : null);
    rec.setValue(ShowHtmlSnippet.CF_DASHBOARD, this.getDashboard() != null ? dash && dash.toDataTable() : null);
    rec.setValue(ShowHtmlSnippet.CF_KEY, this.getKey());
    rec.setValue(
      ShowHtmlSnippet.CF_DASHBOARDS_HIERARCHY_INFO,
      this.getDashboardsHierarchyInfo() != null ? dashHier && dashHier.toDataTable() : null
    );
    rec.setValue(ShowHtmlSnippet.CF_HTML, this.getHtml());
    rec.setValue(ShowHtmlSnippet.CF_CHECK_HTML_VALIDITY, this.getCheckHtmlValidity());
    rec.setValue(ShowHtmlSnippet.CF_EXPRESSION, this.getExpression());
    rec.setValue(ShowHtmlSnippet.CF_RESOURCE_BUNDLE, this.getResourceBundle());
    return rec.wrap();
  }

  public getLocation(): WindowLocation | null {
    return this.location || null;
  }

  public setLocation(location: WindowLocation): void {
    this.location = location;
  }

  public getDashboard(): DashboardProperties | null {
    return this.dashboard || null;
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

  public getUrl(): string | null {
    return this.url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  public getDashboardsHierarchyInfo(): DashboardsHierarchyInfo | null {
    return this.dhInfo;
  }

  public setDashboardsHierarchyInfo(dhInfo: DashboardsHierarchyInfo): void {
    this.dhInfo = dhInfo;
  }

  public getSnippetType(): number | null {
    return this.snippetType;
  }

  public setSnippetType(snippetType: number): void {
    this.snippetType = snippetType;
  }

  public getHtml(): string | null {
    return this.html;
  }

  public setHtml(html: string): void {
    this.html = html;
  }

  public getExpression(): string | null {
    return this.expression;
  }

  public setExpression(expression: string): void {
    this.expression = expression;
  }

  public getCheckHtmlValidity(): boolean {
    return this.checkHtmlValidity;
  }

  public setCheckHtmlValidity(checkHtmlValidity: boolean): void {
    this.checkHtmlValidity = checkHtmlValidity;
  }
}

ShowHtmlSnippet.initialize();
