import InitialRequest from './InitialRequest';
import ActionContext from './ActionContext';

export default class BatchEntry {
  private actionContext: ActionContext;
  private initialRequest: InitialRequest;
  private fulfilled: boolean = false;

  public constructor(actionContext: ActionContext | null, initialRequest: InitialRequest | null) {
    if (actionContext == null) {
      throw new Error();
    }
    if (initialRequest == null) {
      throw new Error();
    }
    this.actionContext = actionContext;
    this.initialRequest = initialRequest;
  }

  public getActionContext(): ActionContext {
    return this.actionContext;
  }

  public getInitialRequest(): InitialRequest {
    return this.initialRequest;
  }

  public isFulfilled(): boolean {
    return this.fulfilled;
  }

  setFulfilled(fulfilled: boolean) {
    this.fulfilled = fulfilled;
  }

  public toString(): string {
    return this.actionContext + ' (' + this.initialRequest + ')';
  }
}
