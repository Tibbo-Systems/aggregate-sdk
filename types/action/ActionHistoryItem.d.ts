import TableFormat from '../datatable/TableFormat';
import DataTable from '../datatable/DataTable';
import AggreGateBean from '../datatable/AggreGateBean';
export default class ActionHistoryItem extends AggreGateBean {
    static readonly FORMAT: TableFormat;
    static __static_initializer_0(): void;
    private time;
    private mask;
    private action;
    private input;
    private static _init;
    static initialize(): void;
    constructor();
    static create(time: Date, mask: string | null, action: string | null, input: DataTable | null): ActionHistoryItem;
    getTime(): Date | null;
    setTime(time: Date): void;
    getMask(): string | null;
    setMask(mask: string | null): void;
    getAction(): string | null;
    setAction(action: string | null): void;
    getInput(): DataTable | null;
    setInput(input: DataTable | null): void;
}
