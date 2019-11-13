import ActionContext from './ActionContext';
import CallerController from '../context/CallerController';
import ActionDefinition from './ActionDefinition';
import ServerContext from '../server/ServerContext';

export default class ServerActionContext extends ActionContext {
  private callerController: CallerController;

  // Context in that the definition of currently executing action resides
  private definingContext: ServerContext;

  public constructor(actionDefinition: ActionDefinition, context: ServerContext, callerController: CallerController) {
    const cc = callerController.getCallerData();
    cc && super(actionDefinition, cc.getActionManager());
    this.callerController = callerController;
    this.definingContext = context;

    if (context == null) {
      throw new Error();
    }
  }

  public getCallerController(): CallerController {
    return this.callerController;
  }

  public getDefiningContext(): ServerContext {
    return this.definingContext;
  }

  public getActionDefinition(): ActionDefinition | null {
    return super.getActionDefinition();
  }

  setDefiningContext(context: ServerContext): void {
    this.definingContext = context;
  }
}
