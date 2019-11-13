import ActionContext from './ActionContext';
import CallerController from '../context/CallerController';
import ActionDefinition from './ActionDefinition';
import ServerContext from '../server/ServerContext';
export default class ServerActionContext extends ActionContext {
    private callerController;
    private definingContext;
    constructor(actionDefinition: ActionDefinition, context: ServerContext, callerController: CallerController);
    getCallerController(): CallerController;
    getDefiningContext(): ServerContext;
    getActionDefinition(): ActionDefinition | null;
    setDefiningContext(context: ServerContext): void;
}
