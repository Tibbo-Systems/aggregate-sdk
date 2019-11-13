import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import GenericActionResponse from '../GenericActionResponse';
import ActionUtils from '../ActionUtils';
import Cres from '../../Cres';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTable from '../../datatable/DataTable';

export default class Confirm extends GenericActionCommand {
  public static readonly CF_MESSAGE: string = 'message';
  public static readonly CF_OPTION_TYPE: string = 'optionType';
  public static readonly CF_MESSAGE_TYPE: string = 'messageType';
  public static readonly RF_OPTION: string = 'option';

  public static readonly CFT_CONFIRM: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    Confirm.CFT_CONFIRM.addField('<' + Confirm.CF_MESSAGE + '><S>');
    Confirm.CFT_CONFIRM.addField('<' + Confirm.CF_OPTION_TYPE + '><I>');
    Confirm.CFT_CONFIRM.addField('<' + Confirm.CF_MESSAGE_TYPE + '><I>');
  }

  private static _init = false;

  public static initialize() {
    if (Confirm._init) return;

    Confirm.__static_initializer_0();
    Confirm._init = true;
  }

  public static readonly RFT_CONFIRM: TableFormat = new TableFormat(
    1,
    1,
    '<' + Confirm.RF_OPTION + '><I><D=' + Cres.get().getString('option') + '>'
  );

  private message: string | null = null;
  private optionType: number | null = null;
  private messageType: number | null = null;

  public constructor() {
    super(ActionUtils.CMD_CONFIRM);
  }

  public static createDefault() {
    const confirm = new Confirm();
    confirm.setParameters(new SimpleDataTable(Confirm.CFT_CONFIRM));
    confirm.setResponseFormat(Confirm.RFT_CONFIRM);
    return confirm;
  }

  public static createConfirmWithDataTable(title: string, parameters: DataTable) {
    const confirm = new Confirm();
    confirm.setTitle(title);
    confirm.setParameters(parameters);
    return confirm;
  }

  public static createConfirm(title: string, message: string, optionType: number, messageType: number) {
    const confirm = new Confirm();
    confirm.setTitle(title);
    confirm.setMessage(message);
    confirm.setOptionType(optionType);
    confirm.setMessageType(messageType);
    return confirm;
  }

  public createDefaultResponse(): GenericActionResponse {
    const responseFormat: TableFormat = Confirm.RFT_CONFIRM.clone();
    const selectionValues: Map<any, string> = new Map();
    const parameters = this.getParameters();
    const optionType: number | null = parameters ? parameters.rec().getInt(Confirm.CF_OPTION_TYPE) : null;

    if (ActionUtils.YES_NO_OPTION == optionType) {
      selectionValues.set(ActionUtils.YES_OPTION, Cres.get().getString('yes'));
      selectionValues.set(ActionUtils.NO_OPTION, Cres.get().getString('no'));
    } else if (ActionUtils.OK_CANCEL_OPTION == optionType) {
      selectionValues.set(ActionUtils.OK_OPTION, Cres.get().getString('ok'));
      selectionValues.set(ActionUtils.CANCEL_OPTION, Cres.get().getString('cancel'));
    } else if (ActionUtils.YES_NO_CANCEL_OPTION == optionType) {
      selectionValues.set(ActionUtils.YES_OPTION, Cres.get().getString('yes'));
      selectionValues.set(ActionUtils.NO_OPTION, Cres.get().getString('no'));
      selectionValues.set(ActionUtils.CANCEL_OPTION, Cres.get().getString('cancel'));
    } else {
      throw new Error('Unsupported option type: ' + optionType);
    }
    selectionValues.set(ActionUtils.CLOSED_OPTION, Cres.get().getString('close'));

    return new GenericActionResponse(new SimpleDataTable(responseFormat, true));
  }

  public getMessage(): string | null {
    return this.message;
  }

  public getOptionType(): number | null {
    return this.optionType;
  }

  public getMessageType(): number | null {
    return this.messageType;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public setOptionType(optionType: number): void {
    this.optionType = optionType;
  }

  public setMessageType(messageType: number): void {
    this.messageType = messageType;
  }
}

Confirm.initialize();
