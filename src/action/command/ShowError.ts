import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class ShowError extends GenericActionCommand {
  public static readonly CF_LEVEL: string = 'level';
  public static readonly CF_MESSAGE: string = 'message';
  public static readonly CF_EXCEPTION: string = 'exception';

  public static readonly CFT_SHOW_ERROR: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowError.CFT_SHOW_ERROR.addField('<' + ShowError.CF_LEVEL + '><I>');
    ShowError.CFT_SHOW_ERROR.addField('<' + ShowError.CF_MESSAGE + '><S><F=N>');
    ShowError.CFT_SHOW_ERROR.addField('<' + ShowError.CF_EXCEPTION + '><S><F=N>');
  }

  private exception: Error | null = null;
  private level = 0;
  private message: string | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowError._init) return;
    ShowError.__static_initializer_0();
    ShowError._init = true;
  }

  public constructor(title: string | TableFormat = ShowError.CFT_SHOW_ERROR, message?: string, level?: number, exception?: Error) {
    super(ActionUtilsConstants.CMD_SHOW_ERROR, title, null);
    if (message && level && exception) {
      this.message = message;
      this.level = level;
      this.exception = exception;
    }
  }

  public static createShowErrorWithDataTable(title: string, parameters: DataTable) {
    const showError = new ShowError(title);
    showError.setParameters(parameters);
    return showError;
  }

  protected constructParameters(): DataTable {
    const t: DataTable = new SimpleDataTable(ShowError.CFT_SHOW_ERROR);
    const rec = t.addRecord();
    rec.addInt(this.level).addString(this.message);

    if (this.exception) {
      rec.addString(this.exception.message + this.exception.stack);
    }

    return t;
  }

  public getLevel(): number | null {
    return this.level;
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public getMessage(): string | null {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getException(): Error | null {
    return this.exception;
  }

  public setException(exception: Error): void {
    this.exception = exception;
  }
}

ShowError.initialize();
