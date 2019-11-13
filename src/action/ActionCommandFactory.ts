import DataTable from '../datatable/DataTable';
import GenericActionCommand from './GenericActionCommand';
import ShowMessage from './command/ShowMessage';
import Confirm from './command/Confirm';
import EditData from './command/EditData';
import EditProperties from './command/EditProperties';
import EditTemplate from './command/EditTemplate';
import LaunchWidget from './command/LaunchWidget';
import LaunchProcessControlProgram from './command/LaunchProcessControlProgram';
import Browse from './command/Browse';
import ShowEventLog from './command/ShowEventLog';
import ShowError from './command/ShowError';
import EditReport from './command/EditReport';
import ShowReport from './command/ShowReport';
import ShowGuide from './command/ShowGuide';
import SelectEntities from './command/SelectEntities';
import EditText from './command/EditText';
import EditCode from './command/EditCode';
import ShowSystemTree from './command/ShowSystemTree';
import ActivateDashboard from './command/ActivateDashboard';
import CloseDashboard from './command/CloseDashboard';
import OpenGridDashboard from './command/OpenGridDashboard';
import DataRecord from '../datatable/DataRecord';
import EditGridDashboard from './command/EditGridDashboard';
import ShowHtmlSnippet from './command/ShowHtmlSnippet';
import ShowDiff from './command/ShowDiff';
import ActionUtils from './ActionUtils';

export default class ActionCommandFactory {
  public static createActionCommand(type: string, title: string, parameters: DataTable): GenericActionCommand {
    switch (type) {
      case ActionUtils.CMD_SHOW_MESSAGE:
        return ShowMessage.createShowMessageWithDataTable(title, parameters);
      case ActionUtils.CMD_CONFIRM:
        return Confirm.createConfirmWithDataTable(title, parameters);
      case ActionUtils.CMD_EDIT_DATA:
        return EditData.createEditDataWithDataTable(title, parameters);
      case ActionUtils.CMD_EDIT_PROPERTIES:
        return EditProperties.createEditPropertiesWithDataTable(title, parameters);
      case ActionUtils.CMD_EDIT_WIDGET:
        return EditTemplate.createEditTemplateWithDataTable(ActionUtils.CMD_EDIT_WIDGET, title, parameters);
      case ActionUtils.CMD_EDIT_PROCESS_CONTROL_PROGRAM:
        return EditTemplate.createEditTemplateWithDataTable(
          ActionUtils.CMD_EDIT_PROCESS_CONTROL_PROGRAM,
          title,
          parameters
        );
      case ActionUtils.CMD_EDIT_WORKFLOW:
        return EditTemplate.createEditTemplateWithDataTable(ActionUtils.CMD_EDIT_WORKFLOW, title, parameters);
      case ActionUtils.CMD_LAUNCH_WIDGET:
        return LaunchWidget.createLaunchWidgetWithDataTable(title, parameters);
      case ActionUtils.CMD_LAUNCH_PROCESS_CONTROL_PROGRAM:
        return LaunchProcessControlProgram.createLaunchProcessControlProgramWithDataTable(title, parameters);
      case ActionUtils.CMD_BROWSE:
        return Browse.createBrowseWithDataTable(title, parameters);
      case ActionUtils.CMD_SHOW_EVENT_LOG:
        return ShowEventLog.createShowEventLogWithDataTable(title, parameters);
      case ActionUtils.CMD_SHOW_ERROR:
        return ShowError.createShowErrorWithDataTable(title, parameters);
      case ActionUtils.CMD_EDIT_REPORT:
        return EditReport.createEditReportWithDataTable(title, parameters);
      case ActionUtils.CMD_SHOW_REPORT:
        return ShowReport.createShowReportWithDataTable(title, parameters);
      case ActionUtils.CMD_SHOW_GUIDE:
        return ShowGuide.createShowGuideWithDataTable(title, parameters);
      case ActionUtils.CMD_SELECT_ENTITIES:
        return SelectEntities.createSelectEntitiesWithDataTable(ActionUtils.CMD_SELECT_ENTITIES, title, parameters);
      case ActionUtils.CMD_EDIT_TEXT:
        return EditText.createEditTextWithDataTable(title, parameters);
      case ActionUtils.CMD_EDIT_CODE:
        return EditCode.createEditCodeWithDataTable(title, parameters);
      case ActionUtils.CMD_SHOW_SYSTEM_TREE:
        return ShowSystemTree.createShowSystemTreeWithDataTable(title, parameters);
      case ActionUtils.CMD_ACTIVATE_DASHBOARD:
        return ActivateDashboard.createActivateDashboardWithDataTable(title, parameters);
      case ActionUtils.CMD_CLOSE_DASHBOARD:
        return CloseDashboard.createCloseDashboardWithDataTable(title, parameters);
      case ActionUtils.CMD_OPEN_GRID_DASHBOARD:
        return new OpenGridDashboard(new DataRecord(null).wrap());
      case ActionUtils.CMD_EDIT_GRID_DASHBOARD:
        return new EditGridDashboard(new DataRecord(null).wrap());
      case ActionUtils.CMD_SHOW_HTML_SNIPPET:
        return ShowHtmlSnippet.createShowHtmlSnippetWithDataTable(title, parameters);
      case ActionUtils.CMD_SHOW_DIFF:
        return ShowDiff.createShowDiffWithDataTable(title, parameters);
      default:
        throw new Error("Error creating action command of type '" + type);
    }
  }
}
