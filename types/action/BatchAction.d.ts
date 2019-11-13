import ActionManager from './ActionManager';
import ActionContext from './ActionContext';
import Action from './Action';
import ActionCommand from './ActionCommand';
import InitialRequest from './InitialRequest';
import ActionResponse from './ActionResponse';
import ActionResult from './ActionResult';
export default class BatchAction implements Action<InitialRequest, ActionCommand, ActionResponse> {
    private actionManager;
    private actionContext;
    private currentActionId;
    constructor(actionManager: ActionManager);
    init(actionContext: ActionContext, initialParameters: InitialRequest | null): void;
    service(actionRequest: ActionResponse): ActionCommand | null;
    private getNextEntry;
    destroy(): ActionResult | null;
}
