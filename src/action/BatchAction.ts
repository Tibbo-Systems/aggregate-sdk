import ActionManager from './ActionManager';
import ActionContext from './ActionContext';
import ActionIdentifier from './ActionIdentifier';
import Action from './Action';
import ActionCommand from './ActionCommand';
import BatchContext from './BatchContext';
import InitialRequest from './InitialRequest';
import ActionResponse from './ActionResponse';
import BatchEntry from './BatchEntry';
import ActionExecutionMode from './ActionExecutionMode';
import ActionResult from './ActionResult';

export default class BatchAction implements Action<InitialRequest, ActionCommand, ActionResponse> {
  private actionManager: ActionManager | null = null;
  private actionContext: ActionContext | null = null;
  private currentActionId: ActionIdentifier | null = null;

  public constructor(actionManager: ActionManager) {
    this.actionManager = actionManager;
  }

  //TODO synchronized
  public init(actionContext: ActionContext, initialParameters: InitialRequest | null): void {
    this.actionContext = actionContext;
  }

  //TODO synchronized
  public service(actionRequest: ActionResponse): ActionCommand | null {
    const batchContext: BatchContext | null = this.actionContext ? this.actionContext.getBatchContext() : null;

    if (batchContext == null) {
      // It's incorrect to use BatchAction without BatchContext
      throw new Error();
    }

    do {
      let actionCommand: ActionCommand | null;

      if (this.currentActionId == null) {
        const batchEntry: BatchEntry | null = this.getNextEntry(batchContext);

        if (batchEntry == null) {
          return null;
        }

        const entryContext: ActionContext = batchEntry.getActionContext();

        entryContext.clearRequestedIds();

        this.currentActionId = this.actionManager && this.actionManager.initAction(entryContext, batchEntry.getInitialRequest(), new ActionExecutionMode(ActionExecutionMode.BATCH));
        actionCommand = this.currentActionId && this.actionManager?.service(this.currentActionId, null) || null;
      } else {
        actionCommand = this.actionManager?.service(this.currentActionId, actionRequest) || null;
      }

      if (actionCommand != null) {
        actionCommand.setBatchEntry(true);
        return actionCommand;
      } else {
        const batchEntry = batchContext.getCurrentEntry();
        if (!batchEntry) return null;
        this.currentActionId = null;
        batchContext.markAsPerfomed(batchEntry);
      }
    } while (true);
  }

  private getNextEntry(batchContext: BatchContext): BatchEntry | null {
    const batch = batchContext.getEntries();
    if (!batch) return null;

    for (let batchEntry of batch) {
      if (!batchEntry.isFulfilled()) {
        batchContext.setCurrentEntry(batchEntry);
        return batchEntry;
      }
    }

    return null;
  }
  //TODO synchronized
  public destroy(): ActionResult | null {
    if (this.currentActionId != null) {
      this.actionManager?.destroyAction(this.currentActionId);
    }

    this.actionManager = null;
    this.actionContext = null;
    this.currentActionId = null;

    return null;
  }
}
