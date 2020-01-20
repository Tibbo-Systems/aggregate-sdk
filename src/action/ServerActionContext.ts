import ActionContext from './ActionContext';
import CallerController from '../context/CallerController';
import ActionDefinition from './ActionDefinition';
import ServerContext from '../server/ServerContext';
import CallerData from '../context/CallerData';

export default class ServerActionContext extends ActionContext {
  private callerController: CallerController;

  // Context in that the definition of currently executing action resides
  private definingContext: ServerContext;

  public constructor(actionDefinition: ActionDefinition, context: ServerContext, callerController: CallerController) {
    super(actionDefinition, (callerController.getCallerData() as CallerData).getActionManager());
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
