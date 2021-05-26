import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import DataRecord from '../datatable/DataRecord';
import Util from './Util';

//TODO: not yet implemented
export default class WindowLocation extends AggreGateBean {
  public static FORMAT: TableFormat = new TableFormat(1, 1);
  private state: number;
  public static readonly STATE_FLOATING: number = 1;
  //TODO constructor for state
  public constructor(data?: DataRecord | number) {
    super(WindowLocation.FORMAT);
    this.state = 0;
    if (Util.isNumber(data)) {
      this.state = data;
    }
  }
  public getState(): number {
    return this.state;
  }

  public setState(state: number): void {
    this.state = state;
  }
}
