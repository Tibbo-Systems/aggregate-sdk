import TableFormat from '../datatable/TableFormat';
import Cres from '../Cres';
import DataTable from '../datatable/DataTable';
import AggreGateBean from '../datatable/AggreGateBean';

export default class ActionHistoryItem extends AggreGateBean {
  public static readonly FORMAT: TableFormat = new TableFormat();

  static __static_initializer_0() {
    ActionHistoryItem.FORMAT.addField('<time><D><D=' + Cres.get().getString('timestamp') + '>');
    ActionHistoryItem.FORMAT.addField('<mask><S><D=' + Cres.get().getString('conContextMask') + '>');
    ActionHistoryItem.FORMAT.addField('<action><S><D=' + Cres.get().getString('action') + '>');
    ActionHistoryItem.FORMAT.addField('<input><T><F=N><D=' + Cres.get().getString('parameters') + '>');
  }

  private time: Date | null = null;
  private mask: string | null = null;
  private action: string | null = null;
  private input: DataTable | null = null;

  private static _init = false;

  public static initialize() {
    if (ActionHistoryItem._init) return;
    ActionHistoryItem.__static_initializer_0();
    ActionHistoryItem._init = true;
  }

  public constructor() {
    super(ActionHistoryItem.FORMAT);
  }

  public static create(
    time: Date,
    mask: string | null,
    action: string | null,
    input: DataTable | null
  ): ActionHistoryItem {
    const actionHistItem = new ActionHistoryItem();
    actionHistItem.setTime(time);
    actionHistItem.setMask(mask);
    actionHistItem.setAction(action);
    actionHistItem.setInput(input);
    return actionHistItem;
  }

  public getTime(): Date | null {
    return this.time;
  }

  public setTime(time: Date): void {
    this.time = time;
  }

  public getMask(): string | null {
    return this.mask;
  }

  public setMask(mask: string | null): void {
    this.mask = mask;
  }

  public getAction(): string | null {
    return this.action;
  }

  public setAction(action: string | null): void {
    this.action = action;
  }

  public getInput(): DataTable | null {
    return this.input;
  }

  public setInput(input: DataTable | null): void {
    this.input = input;
  }
}

ActionHistoryItem.initialize();
