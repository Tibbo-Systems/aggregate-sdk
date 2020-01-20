import GenericActionResponse from './GenericActionResponse';
import ServerContext from '../server/ServerContext';
import ServerActionInput from './ServerActionInput';
import SingleThreadAction from './SingleThreadAction';
import ActionDefinition from './ActionDefinition';
import DataTable from '../datatable/DataTable';
import GenericActionCommand from './GenericActionCommand';
import ServerActionContext from './ServerActionContext';
import CallerController from '../context/CallerController';
import ServerActionCommandProcessor from './ServerActionCommandProcessor';
import Context from '../context/Context';
import ActionResult from './ActionResult';
import EventLevel from '../event/EventLevel';
import Cres from '../Cres';
import Util from '../util/Util';
import Log from '../Log';

export default abstract class ServerAction extends SingleThreadAction<ServerActionInput, GenericActionCommand, GenericActionResponse> {
  private readonly processor: ServerActionCommandProcessor = new ServerActionCommandProcessor(this);

  public send(actionCommand: GenericActionCommand): GenericActionResponse {
    //TODO SingleThreadAction.send()
    throw new Error();
  }

  public getProcessor(): ServerActionCommandProcessor {
    return this.processor;
  }

  protected getActionContext(): ServerActionContext {
    //TODO getActionContext()
    throw new Error();
  }

  protected getActionDefinition(): ActionDefinition | null {
    return this.getActionContext().getActionDefinition();
  }

  public getDefiningContext(): ServerContext {
    return this.getActionContext().getDefiningContext();
  }

  public getCallerController(): CallerController {
    return this.getActionContext().getCallerController();
  }

  public redirect(ctx: ServerContext, defOrAction: ActionDefinition | string, input: ServerActionInput): ActionResult | null {
    // TODO SingleThreadAction.redirect
    throw new Error();
  }

  public call(devicesContext: ServerContext, def: ActionDefinition, serverActionInput: ServerActionInput): ActionResult | null {
    return null;
  }

  public redirectToGroupedAction(ctx: ServerContext, contexts: Array<Context<any, any>>, action: string, caller: CallerController, executionParameters: DataTable): void {
    //TODO redirectToGroupedAction
    throw new Error();
  }

  protected processError(ex: Error): void {
    if (Util.getRootCause(ex) instanceof Error) {
      Log.CONTEXT_ACTIONS.info('Action interrupted: ' + toString() + ' (caller: ' + this.getCallerController() + ')');
    } else {
      this.getProcessor().showError(Cres.get().getString('error'), EventLevel.ERROR, ex.message, ex);
    }
  }
}
