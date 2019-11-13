import GridDashboardActionCommand from './GridDashboardActionCommand';
import TableFormat from '../../datatable/TableFormat';
import FieldFormat from '../../datatable/FieldFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import FieldConstants from '../../datatable/field/FieldConstants';
import ActionUtils from '../ActionUtils';
import DataTable from '../../datatable/DataTable';

export default class OpenGridDashboard extends GridDashboardActionCommand {
  public static readonly V_ELEMENTS: string = 'elements';
  public static readonly V_CONTEXT_PATH: string = 'contextPath';
  public static readonly V_DASHBOARD_NAME: string = 'dashboardName';
  public static readonly V_DASHBOARD_DESCRIPTION: string = 'dashboardDescription';

  public static VFT_GRID_PROPS: TableFormat = new TableFormat();

  static __static_initializer_0() {
    let ff: FieldFormat<any> = FieldFormatFactory.createType(
      OpenGridDashboard.V_ELEMENTS,
      FieldConstants.DATATABLE_FIELD
    );
    ff.setNullable(true);
    OpenGridDashboard.VFT_GRID_PROPS.addField(ff);
    ff = FieldFormatFactory.createType(OpenGridDashboard.V_CONTEXT_PATH, FieldConstants.STRING_FIELD);
    ff.setNullable(true);
    OpenGridDashboard.VFT_GRID_PROPS.addField(ff);
    ff = FieldFormatFactory.createType(OpenGridDashboard.V_DASHBOARD_NAME, FieldConstants.STRING_FIELD);
    ff.setNullable(true);
    OpenGridDashboard.VFT_GRID_PROPS.addField(ff);
    ff = FieldFormatFactory.createType(OpenGridDashboard.V_DASHBOARD_DESCRIPTION, FieldConstants.STRING_FIELD);
    ff.setNullable(true);
    OpenGridDashboard.VFT_GRID_PROPS.addField(ff);
  }

  private static _init = false;

  public static initialize() {
    if (OpenGridDashboard._init) return;
    OpenGridDashboard.__static_initializer_0();
    OpenGridDashboard._init = true;
  }

  public constructor(parameters: DataTable) {
    super(ActionUtils.CMD_OPEN_GRID_DASHBOARD, null, parameters);
  }

  public static createOpenGridDashboardWithDataTable(title: string, parameters: DataTable) {
    const openGridDashboard = new OpenGridDashboard(parameters);
    openGridDashboard.setTitle(title);
    return openGridDashboard;
  }
}

OpenGridDashboard.initialize();
