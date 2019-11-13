import InitialRequest from './InitialRequest';
import ActionContext from './ActionContext';
export default class BatchEntry {
    private actionContext;
    private initialRequest;
    private fulfilled;
    constructor(actionContext: ActionContext | null, initialRequest: InitialRequest | null);
    getActionContext(): ActionContext;
    getInitialRequest(): InitialRequest;
    isFulfilled(): boolean;
    setFulfilled(fulfilled: boolean): void;
    toString(): string;
}
