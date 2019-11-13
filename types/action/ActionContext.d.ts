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
export declare enum ActionState {
    CREATED = 0,
    INITIALIZED = 1,
    WORKING = 2,
    DESTROYED = 3
}
export default abstract class ActionContext {
    private actionDefinition;
    private batchContext;
    private requestCache;
    private actionState;
    private actionManager;
    private requestedIds;
    private actionExecutionMode;
    private changeActionStateListener;
    constructor(actionDefinition: ActionDefinition, actionManager: ActionManager);
    clearRequestedIds(): void;
    abstract getCallerController(): CallerController;
    abstract getDefiningContext(): Context<any, any>;
    getActionDefinition(): ActionDefinition | null;
    getBatchContext(): BatchContext | null;
    getRequestCache(): RequestCache | null;
    getActionState(): ActionState;
    getActionManager(): ActionManager | null;
    getRequestedIds(): Array<RequestIdentifier>;
    setActionDefinition(actionDefinition: ActionDefinition): void;
    setBatchContext(batchContext: BatchContext): void;
    setRequestCache(requestCache: RequestCache): void;
    setActionState(actionState: ActionState): void;
    setActionManager(actionManager: ActionManager): void;
    setChangeActionStateListener(changeActionStateListener: ChangeActionStateListener): void;
    getActionExecutionMode(): ActionExecutionMode | null;
    setActionExecutionMode(actionExecutionMode: ActionExecutionMode): void;
}
