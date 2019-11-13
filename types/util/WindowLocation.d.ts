import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import DataRecord from '../datatable/DataRecord';
export default class WindowLocation extends AggreGateBean {
    static FORMAT: TableFormat;
    private state;
    static readonly STATE_FLOATING: number;
    constructor(data?: DataRecord | number);
}
