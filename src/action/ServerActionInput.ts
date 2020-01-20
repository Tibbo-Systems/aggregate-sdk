import SimpleDataTable from '../datatable/SimpleDataTable';
import RequestIdentifier from './RequestIdentifier';
import DataTable from '../datatable/DataTable';
import InitialRequest from './InitialRequest';
import GenericActionResponse from './GenericActionResponse';

export default class ServerActionInput implements InitialRequest {
  private data: DataTable = new SimpleDataTable();
  private remember = false;
  private requestId: RequestIdentifier | null = null;

  public constructor(dataTable?: DataTable) {
    if (dataTable) this.data = dataTable.clone();
  }

  public createWithRequest(request: GenericActionResponse) {
    if (request == null) {
      throw new Error();
    }

    if (request.getParameters()) {
      this.data = request?.getParameters()?.clone() as DataTable;
    }
  }

  public getData(): DataTable {
    return this.data;
  }

  public shouldRemember(): boolean {
    return this.remember;
  }

  public setRemember(flag: boolean): void {
    this.remember = flag;
  }

  public setRequestId(requestId: RequestIdentifier): void {
    this.requestId = requestId;
  }

  public getRequestId(): RequestIdentifier | null {
    return this.requestId;
  }
}
