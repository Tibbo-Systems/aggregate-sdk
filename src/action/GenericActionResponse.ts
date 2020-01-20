import ActionResponse from './ActionResponse';
import DataTable from '../datatable/DataTable';
import RequestIdentifier from './RequestIdentifier';

export default class GenericActionResponse implements ActionResponse {
  private parameters: DataTable | null = null;
  private remember = false;
  private requestId: RequestIdentifier | null = null;

  public constructor(parameters: DataTable | null = null, remember = false, requestId: RequestIdentifier | null = null) {
    this.parameters = parameters;
    this.remember = remember;
    this.requestId = requestId;
  }

  public getParameters(): DataTable | null {
    return this.parameters;
  }

  public shouldRemember(): boolean {
    return this.remember;
  }

  public getRequestId(): RequestIdentifier | null {
    return this.requestId;
  }

  public setParameters(parameters: DataTable): void {
    this.parameters = parameters;
  }

  public setRemember(remember: boolean): void {
    this.remember = remember;
  }

  public setRequestId(requestId: RequestIdentifier | null): void {
    this.requestId = requestId;
  }
}
