import RequestIdentifier from './RequestIdentifier';
import ActionResponse from './ActionResponse';
export default class RequestCache {
    private requests;
    getRequests(): Map<RequestIdentifier, ActionResponse>;
    getRequest(requestId: RequestIdentifier): ActionResponse | null;
    addRequest(requestId: RequestIdentifier, actionRequest: ActionResponse): void;
    protected removeRequest(requestId: RequestIdentifier): void;
    protected clear(): void;
}
