import ActionResponse from './ActionResponse';
import DataTable from '../datatable/DataTable';
import RequestIdentifier from './RequestIdentifier';
export default class GenericActionResponse implements ActionResponse {
    private parameters;
    private remember;
    private requestId;
    constructor(parameters?: DataTable | null, remember?: boolean, requestId?: RequestIdentifier | null);
    getParameters(): DataTable | null;
    shouldRemember(): boolean;
    getRequestId(): RequestIdentifier | null;
    setParameters(parameters: DataTable): void;
    setRemember(remember: boolean): void;
    setRequestId(requestId: RequestIdentifier): void;
}
