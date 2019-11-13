import GridDashboardActionCommand from './GridDashboardActionCommand';
import DataTable from '../../datatable/DataTable';
import ActionUtils from '../ActionUtils';

export default class EditGridDashboard extends GridDashboardActionCommand {
  public constructor(parameters: DataTable) {
    super(ActionUtils.CMD_EDIT_GRID_DASHBOARD, null, parameters);
  }

  public static createEditGridDashboardWithDataTable(title: string, parameters: DataTable) {
    const editGridDashboard = new EditGridDashboard(parameters);
    editGridDashboard.setTitle(title);
    return editGridDashboard;
  }
}
