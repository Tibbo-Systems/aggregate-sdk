import JObject from '../util/java/JObject';
import ActionDirectory from './ActionDirectory';
import BatchEntry from './BatchEntry';
import BatchContext from './BatchContext';
import ActionResult from './ActionResult';
import InitialRequest from './InitialRequest';
import ActionIdentifier from './ActionIdentifier';
import ActionExecutionMode from './ActionExecutionMode';
import ActionLocator from './ActionLocator';
import ActionContext, { ActionState } from './ActionContext';
import ActionDefinition from './ActionDefinition';
import ActionIdGenerator from './ActionIdGenerator';
import Action from './Action';
import BatchAction from './BatchAction';
import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
import Log from '../Log';
import RequestCache from './RequestCache';

export default class ActionManager extends JObject {
  private actionDirectory: ActionDirectory<ActionLocator> | null = null;
  private actionIdGenerator: ActionIdGenerator = new ActionIdGenerator();
  //TODO rework maps. Should not use objects as keys.
  private actions: Map<ActionIdentifier, Action<InitialRequest, ActionCommand, ActionResponse>> = new Map();
  private actionIDs: Map<Action<InitialRequest, ActionCommand, ActionResponse>, ActionIdentifier> = new Map();
  private actionContexts: Map<Action<InitialRequest, ActionCommand, ActionResponse>, ActionContext> = new Map();

  public ActionManager(actionDirectory: ActionDirectory<any>) {
    if (actionDirectory == null) {
      throw new Error();
    }

    this.actionDirectory = actionDirectory;
  }

  public resolveDefinitions(actionLocators: Array<ActionLocator>): Array<ActionDefinition> {
    const actionDefinitions: Array<ActionDefinition> = actionLocators.map((element) => {
      const actionDefinition = this.actionDirectory !== null ? this.actionDirectory.getActionDefinition(element) : null;
      if (actionDefinition == null) {
        throw new Error("Can't resolve: " + element);
      }
      return actionDefinition;
    });

    return actionDefinitions;
  }

  public initActions(entries: Array<BatchEntry>, batchActionContext: ActionContext): ActionIdentifier {
    const requestCache: RequestCache = new RequestCache();
    const batchContext: BatchContext = new BatchContext();
    for (const entry of entries) {
      if (entry == null) {
        throw new Error('Entries list contains nulls');
      }

      const actionContext: ActionContext = entry.getActionContext();
      actionContext.setBatchContext(batchContext);
      actionContext.setRequestCache(requestCache);

      batchContext.addBatchEntry(entry);
    }

    batchActionContext.setBatchContext(batchContext);
    batchActionContext.setRequestCache(requestCache);

    const batchAction: BatchAction = new BatchAction(this);
    batchAction.init(batchActionContext, null);

    batchActionContext.setActionState(ActionState.INITIALIZED);

    return this.registerAction(batchActionContext, batchAction, new ActionExecutionMode(ActionExecutionMode.BATCH));
  }

  public initAction(actionContext: ActionContext, initialParameters: InitialRequest, mode: ActionExecutionMode): ActionIdentifier {
    const actionDefinition = actionContext.getActionDefinition();
    const action = this.instantiateAction(actionDefinition);
    actionContext.setActionState(ActionState.CREATED);
    action.init(actionContext, initialParameters);
    actionContext.setActionState(ActionState.INITIALIZED);

    return this.registerAction(actionContext, action, mode);
  }

  protected instantiateAction(actionDefinition: ActionDefinition | null): Action<InitialRequest, ActionCommand, ActionResponse> {
    if (!actionDefinition) throw new Error();
    return actionDefinition.instantiate();
  }

  public service(actionId: ActionIdentifier, actionRequest: ActionResponse | null): ActionCommand | null {
    const action = this.actions.get(actionId);
    if (action == null) {
      throw new Error("Action with id '" + actionId + "' doesn't exists");
    }

    const actionContext = this.actionContexts.get(action);
    if (!actionContext) {
      return null;
    }

    if (!actionRequest && actionContext.getActionState() != ActionState.INITIALIZED) {
      throw new Error('Null actionRequest is allowed only within first call to service()');
    }

    actionContext.setActionState(ActionState.WORKING);

    let actionCommand: ActionCommand | null = null;
    let activeRequest: ActionResponse | null = actionRequest;

    do {
      let requestCache = actionContext.getRequestCache();

      if (activeRequest?.getRequestId() != null && activeRequest.shouldRemember()) {
        if (requestCache == null) {
          requestCache = new RequestCache();
          actionContext.setRequestCache(requestCache);
        }
        const activeRequestGetRequestId = activeRequest.getRequestId();
        activeRequestGetRequestId && requestCache.addRequest(activeRequestGetRequestId, activeRequest);
      }

      if (activeRequest) actionCommand = action.service(activeRequest);

      if (requestCache && actionCommand?.getRequestId()) {
        const actionCommandGetRequestId = actionCommand.getRequestId();

        if (actionCommandGetRequestId && !actionContext.getRequestedIds().includes(actionCommandGetRequestId)) {
          activeRequest = requestCache.getRequest(actionCommandGetRequestId);
        } else {
          activeRequest = null;
        }

        if (actionCommand?.getRequestId()) {
          actionCommandGetRequestId && actionContext.getRequestedIds().push(actionCommandGetRequestId);
        }
      }
    } while (activeRequest != null);

    return actionCommand;
  }

  public destroyAction(actionId: ActionIdentifier): ActionResult | null {
    const action = this.actions.get(actionId);
    if (action == null) {
      Log.CONTEXT_ACTIONS.debug("Action with id '" + actionId + "' doesn't exists");
      return null;
    }

    try {
      const act = this.actionContexts.get(action);
      act?.setActionState(ActionState.DESTROYED);

      return action.destroy();
    } finally {
      this.actions.delete(actionId);
      this.actionIDs.delete(action);
      this.actionContexts.delete(action);
    }
  }

  public destroyAll(): void {
    for (const actionId of this.actions.keys()) {
      this.destroyAction(actionId);
    }
  }

  public getActionContext(actionId: ActionIdentifier): ActionContext | null {
    const action = this.actions.get(actionId);
    if (!action) {
      return null;
    }

    return this.actionContexts.get(action) || null;
  }

  public getActionID(action: Action<InitialRequest, ActionCommand, ActionResponse>): ActionIdentifier | null {
    return this.actionIDs.get(action) || null;
  }

  public getAction(actionID: ActionIdentifier): Action<InitialRequest, ActionCommand, ActionResponse> | null {
    return this.actions.get(actionID) || null;
  }

  public getActionDirectory(): ActionDirectory<any> | null {
    return this.actionDirectory;
  }

  protected registerAction(actionContext: ActionContext, action: Action<InitialRequest, ActionCommand, ActionResponse>, mode: ActionExecutionMode): ActionIdentifier {
    const actionId: ActionIdentifier = this.actionIdGenerator.generate(action);

    actionContext.setActionExecutionMode(mode);

    if (action) {
      this.actions.set(actionId, action);
      this.actionIDs.set(action, actionId);
      this.actionContexts.set(action, actionContext);
    }

    return actionId;
  }
}
