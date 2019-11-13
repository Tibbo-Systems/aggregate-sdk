import RequestIdentifier from './RequestIdentifier';
import ActionResponse from './ActionResponse';

export default class RequestCache {
  private requests: Map<RequestIdentifier, ActionResponse> = new Map();

  public getRequests(): Map<RequestIdentifier, ActionResponse> {
    return this.requests;
  }

  public getRequest(requestId: RequestIdentifier): ActionResponse | null {
    return this.requests.get(requestId) || null;
  }

  public addRequest(requestId: RequestIdentifier, actionRequest: ActionResponse): void {
    this.requests.set(requestId, actionRequest);
  }

  protected removeRequest(requestId: RequestIdentifier): void {
    this.requests.delete(requestId);
  }

  protected clear(): void {
    this.requests.clear();
  }
}
