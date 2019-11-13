import ActionDefinition from './ActionDefinition';
import ActionManager from './ActionManager';
import CallerController from '../context/CallerController';
import Context from '../context/Context';
import RequestIdentifier from './RequestIdentifier';
import BatchContext from './BatchContext';
import ActionExecutionMode from './ActionExecutionMode';
import RequestCache from './RequestCache';

export interface ChangeActionStateListener {
  changeActionState(oldState: ActionState, newState: ActionState): void;
}

export enum ActionState {
  CREATED,
  INITIALIZED,
  WORKING,
  DESTROYED,
}

export default abstract class ActionContext {
  private actionDefinition: ActionDefinition | null = null;
  private batchContext: BatchContext | null = null;
  private requestCache: RequestCache | null = null;
  private actionState: ActionState = ActionState.CREATED;
  private actionManager: ActionManager | null = null;
  private requestedIds: Array<RequestIdentifier> = new Array<RequestIdentifier>();
  private actionExecutionMode: ActionExecutionMode | null = null;

  private changeActionStateListener: ChangeActionStateListener | null = null;

  public constructor(actionDefinition: ActionDefinition, actionManager: ActionManager) {
    this.setActionDefinition(actionDefinition);
    this.setActionManager(actionManager);
  }

  public clearRequestedIds(): void {
    this.requestedIds = new Array<RequestIdentifier>();
  }

  public abstract getCallerController(): CallerController;

  public abstract getDefiningContext(): Context<any, any>;

  public getActionDefinition(): ActionDefinition | null {
    return this.actionDefinition;
  }

  public getBatchContext(): BatchContext | null {
    return this.batchContext;
  }

  public getRequestCache(): RequestCache | null {
    return this.requestCache;
  }

  public getActionState(): ActionState {
    return this.actionState;
  }

  public getActionManager(): ActionManager | null {
    return this.actionManager;
  }

  getRequestedIds(): Array<RequestIdentifier> {
    return this.requestedIds;
  }

  setActionDefinition(actionDefinition: ActionDefinition) {
    this.actionDefinition = actionDefinition;
  }

  public setBatchContext(batchContext: BatchContext) {
    this.batchContext = batchContext;
  }

  public setRequestCache(requestCache: RequestCache) {
    this.requestCache = requestCache;
  }

  setActionState(actionState: ActionState) {
    const old: ActionState = this.actionState;
    this.actionState = actionState;
    if (old != actionState) this.changeActionStateListener?.changeActionState(old, actionState);
  }

  setActionManager(actionManager: ActionManager) {
    this.actionManager = actionManager;
  }

  public setChangeActionStateListener(changeActionStateListener: ChangeActionStateListener) {
    this.changeActionStateListener = changeActionStateListener;
  }

  public getActionExecutionMode(): ActionExecutionMode | null {
    return this.actionExecutionMode;
  }

  public setActionExecutionMode(actionExecutionMode: ActionExecutionMode) {
    this.actionExecutionMode = actionExecutionMode;
  }
}
