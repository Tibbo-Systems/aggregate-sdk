import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import GenericActionResponse from '../GenericActionResponse';
import Cres from '../../Cres';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTable from '../../datatable/DataTable';
import DataRecord from '../../datatable/DataRecord';
import ActionUtilsConstants from '../ActionUtilsConstants';

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

  public static readonly RFT_CONFIRM: TableFormat = new TableFormat(1, 1, '<' + Confirm.RF_OPTION + '><I><D=' + Cres.get().getString('option') + '>');

  private message: string | null = null;
  private optionType = 0;
  private messageType = 0;

  public constructor() {
    super(ActionUtilsConstants.CMD_CONFIRM);
  }

  protected constructParameters(): DataTable {
    return new DataRecord(Confirm.CFT_CONFIRM).addString(this.message).addInt(this.optionType).addInt(this.messageType).wrap();
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

    if (ActionUtilsConstants.YES_NO_OPTION == optionType) {
      selectionValues.set(ActionUtilsConstants.YES_OPTION, Cres.get().getString('yes'));
      selectionValues.set(ActionUtilsConstants.NO_OPTION, Cres.get().getString('no'));
    } else if (ActionUtilsConstants.OK_CANCEL_OPTION == optionType) {
      selectionValues.set(ActionUtilsConstants.OK_OPTION, Cres.get().getString('ok'));
      selectionValues.set(ActionUtilsConstants.CANCEL_OPTION, Cres.get().getString('cancel'));
    } else if (ActionUtilsConstants.YES_NO_CANCEL_OPTION == optionType) {
      selectionValues.set(ActionUtilsConstants.YES_OPTION, Cres.get().getString('yes'));
      selectionValues.set(ActionUtilsConstants.NO_OPTION, Cres.get().getString('no'));
      selectionValues.set(ActionUtilsConstants.CANCEL_OPTION, Cres.get().getString('cancel'));
    } else {
      throw new Error('Unsupported option type: ' + optionType);
    }
    selectionValues.set(ActionUtilsConstants.CLOSED_OPTION, Cres.get().getString('close'));

    return new GenericActionResponse(new SimpleDataTable(responseFormat, true));
  }

  public getMessage(): string | null {
    return this.message;
  }

  public getOptionType(): number {
    return this.optionType;
  }

  public getMessageType(): number {
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
