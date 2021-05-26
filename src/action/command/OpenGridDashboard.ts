import GridDashboardActionCommand from './GridDashboardActionCommand';
import ActionUtilsConstants from '../ActionUtilsConstants';
import WebWindowLocation from '../../util/WebWindowLocation';

export default class OpenGridDashboard extends GridDashboardActionCommand {
  public constructor(contextPath: string | null = null, defaultContext: string | null = null, location: WebWindowLocation | null = null) {
    super(ActionUtilsConstants.CMD_OPEN_GRID_DASHBOARD, null, contextPath, defaultContext, location);
  }
}
