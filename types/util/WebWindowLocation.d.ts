import { AggreGateBean, DataRecord } from '../index';
import TableFormat from '../datatable/TableFormat';
export default class WebWindowLocation extends AggreGateBean {
    static readonly F_BROWSER_TAB: string;
    static readonly BROWSER_TAB_CURRENT = 0;
    static readonly BROWSER_TAB_NEW = 1;
    static readonly FORMAT: TableFormat;
    constructor(data?: DataRecord);
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    private browserTab;
    getBrowserTab(): number;
    setBrowserTab(browserTab: number): void;
}
