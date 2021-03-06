import JObject from '../util/java/JObject';
import ActionDirectory from './ActionDirectory';
import BatchEntry from './BatchEntry';
import ActionResult from './ActionResult';
import InitialRequest from './InitialRequest';
import ActionIdentifier from './ActionIdentifier';
import ActionExecutionMode from './ActionExecutionMode';
import ActionLocator from './ActionLocator';
import ActionContext from './ActionContext';
import ActionDefinition from './ActionDefinition';
import Action from './Action';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
export default class ActionManager extends JObject {
    private actionDirectory;
    private actionIdGenerator;
    private actions;
    private actionIDs;
    private actionContexts;
    ActionManager(actionDirectory: ActionDirectory<any>): void;
    resolveDefinitions(actionLocators: Array<ActionLocator>): Array<ActionDefinition>;
    initActions(entries: Array<BatchEntry>, batchActionContext: ActionContext): ActionIdentifier;
    initAction(actionContext: ActionContext, initialParameters: InitialRequest, mode: ActionExecutionMode, customActionId: string | null): ActionIdentifier;
    protected instantiateAction(actionDefinition: ActionDefinition | null): Action<InitialRequest, ActionCommand, ActionResponse>;
    service(actionId: ActionIdentifier, actionRequest: ActionResponse | null): ActionCommand | null;
    destroyAction(actionId: ActionIdentifier): ActionResult | null;
    destroyAll(): void;
    getActionContext(actionId: ActionIdentifier): ActionContext | null;
    getActionID(action: Action<InitialRequest, ActionCommand, ActionResponse>): ActionIdentifier | null;
    getAction(actionID: ActionIdentifier): Action<InitialRequest, ActionCommand, ActionResponse> | null;
    getActionDirectory(): ActionDirectory<any> | null;
    protected registerAction(actionContext: ActionContext, action: Action<InitialRequest, ActionCommand, ActionResponse>, mode: ActionExecutionMode, customActionId: string | null): ActionIdentifier;
}
