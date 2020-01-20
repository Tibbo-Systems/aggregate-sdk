import RequestIdentifier from './RequestIdentifier';
import DataTable from '../datatable/DataTable';
import InitialRequest from './InitialRequest';
import GenericActionResponse from './GenericActionResponse';
export default class ServerActionInput implements InitialRequest {
    private data;
    private remember;
    private requestId;
    constructor(dataTable?: DataTable);
    createWithRequest(request: GenericActionResponse): void;
    getData(): DataTable;
    shouldRemember(): boolean;
    setRemember(flag: boolean): void;
    setRequestId(requestId: RequestIdentifier): void;
    getRequestId(): RequestIdentifier | null;
}
