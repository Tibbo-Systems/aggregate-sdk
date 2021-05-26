import GenericActionCommand from './GenericActionCommand';
import Confirm from './command/Confirm';
import ActivateDashboard from './command/ActivateDashboard';
import EditText from './command/EditText';
import SelectEntities from './command/SelectEntities';
import ShowDiff from './command/ShowDiff';
import OpenGridDashboard from './command/OpenGridDashboard';
import LaunchProcessControlProgram from './command/LaunchProcessControlProgram';
import EditTemplate from './command/EditTemplate';
import CloseDashboard from './command/CloseDashboard';
import ShowEventLog from './command/ShowEventLog';
import LaunchWidget from './command/LaunchWidget';
import ShowGuide from './command/ShowGuide';
import EditCode from './command/EditCode';
import EditReport from './command/EditReport';
import ShowError from './command/ShowError';
import ShowMessage from './command/ShowMessage';
import EditData from './command/EditData';
import EditProperties from './command/EditProperties';
import ShowReport from './command/ShowReport';
import ShowHtmlSnippet from './command/ShowHtmlSnippet';
import ShowSystemTree from './command/ShowSystemTree';
import Browse from './command/Browse';
import EditGridDashboard from './command/EditGridDashboard';
import ActionUtilsConstants from './ActionUtilsConstants';

export default class ActionCommandRegistry {
  private static COMMANDS: Map<string, GenericActionCommand> = new Map<string, GenericActionCommand>();

  static _static_initializer_0() {
    ActionCommandRegistry.register(new ActivateDashboard());
    ActionCommandRegistry.register(new Browse());
    ActionCommandRegistry.register(Confirm.createDefault());
    ActionCommandRegistry.register(EditCode.createDefault());
    ActionCommandRegistry.register(new EditData());
    ActionCommandRegistry.register(EditProperties.createDefault());
    ActionCommandRegistry.register(EditReport.createDefault());
    ActionCommandRegistry.register(EditText.createDefault());
    ActionCommandRegistry.register(new EditTemplate(ActionUtilsConstants.CMD_EDIT_WIDGET));
    ActionCommandRegistry.register(new LaunchWidget());
    ActionCommandRegistry.register(new EditTemplate(ActionUtilsConstants.CMD_EDIT_PROCESS_CONTROL_PROGRAM));
    ActionCommandRegistry.register(new LaunchProcessControlProgram());
    ActionCommandRegistry.register(new EditTemplate(ActionUtilsConstants.CMD_EDIT_WORKFLOW));
    ActionCommandRegistry.register(new SelectEntities());
    ActionCommandRegistry.register(new ShowDiff());
    ActionCommandRegistry.register(new ShowError());
    ActionCommandRegistry.register(ShowEventLog.createDefault());
    ActionCommandRegistry.register(new ShowGuide());
    ActionCommandRegistry.register(new ShowMessage());
    ActionCommandRegistry.register(new ShowReport());
    ActionCommandRegistry.register(new ShowHtmlSnippet());
    ActionCommandRegistry.register(new ShowSystemTree());
    ActionCommandRegistry.register(new CloseDashboard());
    ActionCommandRegistry.register(new OpenGridDashboard());
    ActionCommandRegistry.register(new EditGridDashboard());
  }

  public static getCommand(type: string): GenericActionCommand | null {
    return ActionCommandRegistry.COMMANDS.get(type) || null;
  }

  private static register(command: GenericActionCommand): void {
    ActionCommandRegistry.COMMANDS.set(command?.getType(), command);
  }
}
ActionCommandRegistry._static_initializer_0();
