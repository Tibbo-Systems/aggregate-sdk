import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import DataTable from '../../datatable/DataTable';
import FieldConstants from '../../datatable/field/FieldConstants';
import Cres from '../../Cres';
import DataRecord from '../../datatable/DataRecord';
import WebWindowLocation from '../../util/WebWindowLocation';

export default class GridDashboardActionCommand extends GenericActionCommand {
  public static readonly CF_DEFAULT_CONTEXT = 'defaultContext';
  public static readonly CF_CONTEXT_PATH: string = 'contextPath';
  public static readonly CF_LOCATION: string = 'location';

  public static CFT_GRID_DASHBOARD: TableFormat = new TableFormat();

  static __static_initializer_0() {
    GridDashboardActionCommand.CFT_GRID_DASHBOARD.addField('<' + GridDashboardActionCommand.CF_DEFAULT_CONTEXT + '><S><F=N><D=' + Cres.get().getString('conDefaultContext') + '><E=' + FieldConstants.EDITOR_CONTEXT + '>');
    let ff = FieldFormatFactory.createType(GridDashboardActionCommand.CF_CONTEXT_PATH, FieldConstants.STRING_FIELD);
    ff.setNullable(true);
    GridDashboardActionCommand.CFT_GRID_DASHBOARD.addField(ff);

    ff = FieldFormatFactory.createType(GridDashboardActionCommand.CF_LOCATION, FieldConstants.DATATABLE_FIELD);
    ff.setNullable(true);
    GridDashboardActionCommand.CFT_GRID_DASHBOARD.addField(ff);
  }

  private static _init = false;

  public static initialize() {
    if (GridDashboardActionCommand._init) return;
    GridDashboardActionCommand.__static_initializer_0();
    GridDashboardActionCommand._init = true;
  }

  private readonly contextPath: string | null;
  private readonly defaultContext: string | null;

  private readonly location: WebWindowLocation | null;

  public constructor(type: string, title: string | null, contextPath: string | null, defaultContext: string | null, location: WebWindowLocation | null = null) {
    super(type, title);
    this.defaultContext = defaultContext;
    this.contextPath = contextPath;
    this.location = location;
  }

  protected constructParameters(): DataTable {
    const dr = new DataRecord(GridDashboardActionCommand.CFT_GRID_DASHBOARD);
    dr.setValue(GridDashboardActionCommand.CF_DEFAULT_CONTEXT, this.defaultContext);
    dr.setValue(GridDashboardActionCommand.CF_CONTEXT_PATH, this.contextPath);
    dr.setValue(GridDashboardActionCommand.CF_LOCATION, this.location?.toDataTable());
    return dr.wrap();
  }
}

GridDashboardActionCommand.initialize();
