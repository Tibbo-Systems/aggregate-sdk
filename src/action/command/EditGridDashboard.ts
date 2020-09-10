import GridDashboardActionCommand from './GridDashboardActionCommand';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class EditGridDashboard extends GridDashboardActionCommand {
  public constructor(contextPath: string | null = null, defaultContext: string | null = null) {
    super(ActionUtilsConstants.CMD_EDIT_GRID_DASHBOARD, null, contextPath, defaultContext);
  }
}
