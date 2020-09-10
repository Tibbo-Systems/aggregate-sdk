import GridDashboardActionCommand from './GridDashboardActionCommand';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class OpenGridDashboard extends GridDashboardActionCommand {
  public constructor(contextPath: string | null = null, defaultContext: string | null = null) {
    super(ActionUtilsConstants.CMD_OPEN_GRID_DASHBOARD, null, contextPath, defaultContext);
  }
}
