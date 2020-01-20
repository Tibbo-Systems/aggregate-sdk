import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import DataRecord from '../datatable/DataRecord';
import Util from './Util';

export default class WindowLocation extends AggreGateBean {
  public static FORMAT: TableFormat = new TableFormat(1, 1);
  private state: number | null = null;
  public static readonly STATE_FLOATING: number = 1;
  //TODO constructor for state
  public constructor(data?: DataRecord | number) {
    super(WindowLocation.FORMAT);
    if (Util.isNumber(data)) {
      this.state = data as number;
    }
  }
}
