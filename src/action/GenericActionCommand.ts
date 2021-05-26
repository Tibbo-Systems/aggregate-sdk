import ActionCommand from './ActionCommand';
import ActionResponse from './ActionResponse';
import StringIdentifier from './StringIdentifier';
import JObject from '../util/java/JObject';
import RequestIdentifier from './RequestIdentifier';
import DataTable from '../datatable/DataTable';
import TableFormat from '../datatable/TableFormat';
import SimpleDataTable from '../datatable/SimpleDataTable';
import DataTableConversion from '../datatable/DataTableConversion';
import Util from '../util/Util';

export default class GenericActionCommand extends JObject implements ActionCommand {
  protected parameters: DataTable | null = null;
  private requestId: RequestIdentifier | null = null;
  private responseFormat: TableFormat | null = null;
  private interactive = true;
  private type: string;
  private title: string | null = null;
  private batchEntry = false;
  private last = false;

  public constructor(type: string, titleOrFormat?: string | TableFormat | null, responseFormat?: TableFormat | null) {
    super();
    this.type = type;
    if (Util.isString(titleOrFormat)) {
      this.title = titleOrFormat as string;
    }
    if (responseFormat && titleOrFormat instanceof TableFormat) {
      this.responseFormat = responseFormat;
      this.parameters = new SimpleDataTable(titleOrFormat);
    }
  }

  public static createWithParameters(type: string, title: string, parameters: DataTable | null, format?: TableFormat) {
    const genericActionCommand = new GenericActionCommand(type, title);
    if (parameters) {
      genericActionCommand.setParameters(parameters);
      genericActionCommand.setRequestId(new RequestIdentifier(type));
      genericActionCommand.setInteractive(false);
      if (format) {
        try {
          DataTableConversion.populateBeanFromRecord(this, parameters.rec(), format, true);
        } catch (ex) {
          throw new Error(ex.message);
        }
      }
    }
    return genericActionCommand;
  }

  public getType(): string {
    return this.type;
  }

  public setResponseFormat(responseFormat: TableFormat): void {
    this.responseFormat = responseFormat;
  }

  public getResponseFormat(): TableFormat | null {
    return this.responseFormat;
  }

  protected setTitle(title: string): void {
    this.title = title;
  }

  public getTitle(): string | null {
    return this.title;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public setLast(last: boolean): void {
    this.last = last;
  }

  public isLast(): boolean {
    return this.last;
  }

  clone(): this {
    try {
      return super.clone() as this;
    } catch (ex) {
      throw new Error();
    }
  }

  getRequestId(): StringIdentifier | null {
    return this.requestId;
  }

  isBatchEntry(): boolean {
    return this.batchEntry;
  }

  isInteractive(): boolean {
    return this.interactive;
  }

  isResponseValid(actionRequest: ActionResponse): boolean {
    return false;
  }

  setBatchEntry(batchEntry: boolean): void {
    this.batchEntry = batchEntry;
  }

  setParameters(parameters: DataTable | null) {
    this.parameters = parameters;
  }

  getParameters(): DataTable {
    return this.parameters != null ? this.parameters : this.constructParameters();
  }

  protected constructParameters(): DataTable {
    return new SimpleDataTable();
  }

  public setRequestId(requestId: RequestIdentifier | null): void {
    this.requestId = requestId;
  }

  public setInteractive(interactive: boolean): void {
    this.interactive = interactive;
  }

  public toString(): string {
    return '[type=' + this.type + ', title=' + this.title + ', id=' + this.requestId + ']';
  }

  public equals(obj: any): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof GenericActionCommand)) {
      return false;
    }
    const other: GenericActionCommand = obj;
    if (this.batchEntry != other.batchEntry) {
      return false;
    }
    if (this.type == null) {
      if (other.type != null) {
        return false;
      }
    } else if (!Util.equals(this.type, other.type)) {
      return false;
    }
    if (this.last != other.last) {
      return false;
    }
    if (this.parameters == null) {
      if (other.parameters != null) {
        return false;
      }
    } else if (!Util.equals(this.parameters, other.parameters)) {
      return false;
    }
    if (this.requestId == null) {
      if (other.requestId != null) {
        return false;
      }
    } else if (!Util.equals(this.requestId, other.requestId)) {
      return false;
    }
    if (this.title == null) {
      if (other.title != null) {
        return false;
      }
    } else if (!Util.equals(this.title, other.title)) {
      return false;
    }
    return true;
  }
}
