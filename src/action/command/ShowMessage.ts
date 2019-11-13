import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import ActionUtils from '../ActionUtils';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTable from '../../datatable/DataTable';

export default class ShowMessage extends GenericActionCommand {
  public static readonly CF_MESSAGE: string = 'message';
  public static readonly CF_LEVEL: string = 'level';

  public static readonly CFT_SHOW_MESSAGE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowMessage.CFT_SHOW_MESSAGE.addField('<' + ShowMessage.CF_MESSAGE + '><S>');
    ShowMessage.CFT_SHOW_MESSAGE.addField('<' + ShowMessage.CF_LEVEL + '><I>');
  }

  private message: string | null = null;
  private level: number | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowMessage._init) return;
    ShowMessage.__static_initializer_0();
    ShowMessage._init = true;
  }

  public constructor(
    titleOrFormat: string | TableFormat = ShowMessage.CFT_SHOW_MESSAGE,
    message?: string,
    level?: number
  ) {
    super(ActionUtils.CMD_SHOW_MESSAGE, titleOrFormat, null);
    if (message && level) {
      this.message = message;
      this.level = level;
    }
  }

  public static createShowMessageWithDataTable(title: string, parameters: DataTable) {
    const showMessage = new ShowMessage(title);
    showMessage.setParameters(parameters);
    return showMessage;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(ShowMessage.CFT_SHOW_MESSAGE, this.message, this.level);
  }

  public getMessage(): string | null {
    return this.message;
  }

  public getLevel(): number | null {
    return this.level;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public setLevel(level: number): void {
    this.level = level;
  }
}

ShowMessage.initialize();
