import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import FieldFormat from '../../datatable/FieldFormat';
import Cres from '../../Cres';
import FieldConstants from '../../datatable/field/FieldConstants';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import DataTableBindingProvider from '../../datatable/DataTableBindingProvider';
import Context from '../../context/Context';
import DataRecord from '../../datatable/DataRecord';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class ShowSystemTree extends GenericActionCommand {
  public static readonly CF_ROOT: string = 'root';
  public static readonly CF_ROOTS: string = 'roots';
  public static readonly CF_LOCATION: string = 'location';
  public static readonly CF_DASHBOARD: string = 'dashboard';
  public static readonly CF_KEY: string = 'key';
  public static readonly CF_RELATED_ACTIONS: string = 'relatedActions';
  public static readonly CF_CONTEXT_MENU: string = 'contextMenu';
  public static readonly CF_SHOW_TOOLBAR: string = 'showToolbar';
  public static readonly CF_NODE_CLICK_EXPRESSION: string = 'nodeClickExpression';
  public static readonly CF_NODE_FILTER_EXPRESSION: string = 'nodeFilterExpression';

  public static readonly CF_DASHBOARDS_HIERARCHY_INFO: string = 'dashboardsHierarchyInfo';

  public static readonly CF_ROOTS_ROOT: string = 'root';

  public static readonly CFT_SHOW_SYSTEM_TREE_ROOTS: TableFormat = FieldFormatFactory.create('<' + ShowSystemTree.CF_ROOTS_ROOT + '><S>').wrap();

  public static readonly CFT_SHOW_SYSTEM_TREE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField('<' + ShowSystemTree.CF_ROOT + '><S><F=N><D=' + Cres.get().getString('root') + '><E=' + FieldConstants.EDITOR_CONTEXT + '>');

    let ff: FieldFormat<DataTable> = FieldFormatFactory.create('<' + ShowSystemTree.CF_ROOTS + '><T>');
    ff.setDefault(new SimpleDataTable(ShowSystemTree.CFT_SHOW_SYSTEM_TREE_ROOTS, true));
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowSystemTree.CF_RELATED_ACTIONS + '><B><A=1><D=' + Cres.get().getString('relatedActions') + '>');
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowSystemTree.CF_CONTEXT_MENU + '><B><A=1><D=' + Cres.get().getString('contextMenu') + '>');
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowSystemTree.CF_SHOW_TOOLBAR + '><B><A=1><D=' + Cres.get().getString('showToolbar') + '>');
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowSystemTree.CF_LOCATION + '><T><F=N>');
    ff.setDefault(new WindowLocation().toDataTable());
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ff = FieldFormatFactory.create('<' + ShowSystemTree.CF_DASHBOARD + '><T><F=N>');
    ff.setDefault(new DashboardProperties().toDataTable());
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField('<' + ShowSystemTree.CF_KEY + '><S><F=NH><D=' + Cres.get().getString('key') + '>');

    ff = FieldFormatFactory.create('<' + ShowSystemTree.CF_DASHBOARDS_HIERARCHY_INFO + '><T><F=N>');
    ff.setDefault(new DashboardsHierarchyInfo().toDataTable());
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(ff);

    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(
      FieldFormatFactory.createWith(ShowSystemTree.CF_NODE_CLICK_EXPRESSION, FieldConstants.STRING_FIELD, Cres.get().getString('nodeClickExpression')).setNullable(true).setDefault(null).setEditor(FieldConstants.EDITOR_EXPRESSION)
    );

    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addField(
      FieldFormatFactory.createWith(ShowSystemTree.CF_NODE_FILTER_EXPRESSION, FieldConstants.STRING_FIELD, Cres.get().getString('nodeFilterExpression')).setNullable(true).setEditor(FieldConstants.EDITOR_EXPRESSION)
    );

    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addBinding(ShowSystemTree.CF_NODE_CLICK_EXPRESSION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
    ShowSystemTree.CFT_SHOW_SYSTEM_TREE.addBinding(ShowSystemTree.CF_NODE_FILTER_EXPRESSION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, true.toString());
  }

  private root: string | null = null;
  private roots: Array<string> | null = null;
  private relatedActions = true;
  private contextMenu = true;
  private showToolbar = true;
  private location: WindowLocation | null = null;
  private dashboard: DashboardProperties | null = null;
  private key: string | null = null;
  private dhInfo: DashboardsHierarchyInfo | null = null;
  private nodeClickExpression: string | null = null;
  private nodeFilterExpression: string | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowSystemTree._init) return;
    ShowSystemTree.__static_initializer_0();
    ShowSystemTree._init = true;
  }

  public constructor(titleOrFormat: string | TableFormat = ShowSystemTree.CFT_SHOW_SYSTEM_TREE, roots?: Context<any, any> | Array<string>) {
    super(ActionUtilsConstants.CMD_SHOW_SYSTEM_TREE, titleOrFormat, null);
    if (roots) {
      if (Array.isArray(roots)) {
        this.roots = roots;
      } else {
        this.root = roots.getPath();
      }
    }
  }

  public static createShowSystemTreeWithDataTable(title: string, parameters: DataTable) {
    const showSystemTree = new ShowSystemTree(title);
    showSystemTree.setParameters(parameters);
    return showSystemTree;
  }

  protected constructParameters(): DataTable {
    const res: DataRecord = new DataRecord(ShowSystemTree.CFT_SHOW_SYSTEM_TREE);
    res.addString(this.root);

    const t: DataTable = new SimpleDataTable(ShowSystemTree.CFT_SHOW_SYSTEM_TREE_ROOTS);
    if (this.roots != null) {
      for (const each of this.roots) {
        t.addRecordWith(each);
      }
    }
    res.addDataTable(t);
    res.addBoolean(this.relatedActions);
    res.addBoolean(this.contextMenu);
    res.addBoolean(this.showToolbar);
    res.addDataTable(this.location != null ? this.location.toDataTable() : null);
    res.addDataTable(this.dashboard != null ? this.dashboard.toDataTable() : null);
    res.addString(this.key);
    res.addDataTable(this.dhInfo != null ? this.dhInfo.toDataTable() : null);
    res.setValue(ShowSystemTree.CF_NODE_CLICK_EXPRESSION, this.nodeClickExpression);
    res.setValue(ShowSystemTree.CF_NODE_FILTER_EXPRESSION, this.nodeFilterExpression);
    return res.wrap();
  }

  public isRelatedActions(): boolean {
    return this.relatedActions;
  }

  public setRelatedActions(relatedActions: boolean): void {
    this.relatedActions = relatedActions;
  }

  public isContextMenu(): boolean {
    return this.contextMenu;
  }

  public setContextMenu(contextMenu: boolean): void {
    this.contextMenu = contextMenu;
  }

  public isShowToolbar(): boolean {
    return this.showToolbar;
  }

  public setShowToolbar(showToolbar: boolean): void {
    this.showToolbar = showToolbar;
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

  public getNodeClickExpression(): string | null {
    return this.nodeClickExpression;
  }

  public setNodeClickExpression(nodeClickExpression: string): void {
    this.nodeClickExpression = nodeClickExpression;
  }

  public getNodeFilterExpression(): string | null {
    return this.nodeFilterExpression;
  }

  public setNodeFilterExpression(nodeFilterExpression: string): void {
    this.nodeFilterExpression = nodeFilterExpression;
  }

  public getDashboardsHierarchyInfo(): DashboardsHierarchyInfo | null {
    return this.dhInfo;
  }

  public setDashboardsHierarchyInfo(dhInfo: DashboardsHierarchyInfo): void {
    this.dhInfo = dhInfo;
  }
}

ShowSystemTree.initialize();
