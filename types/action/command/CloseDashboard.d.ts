import DashboardProperties from '../../util/DashboardProperties';
import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
export default class CloseDashboard extends GenericActionCommand {
    static CF_DASHBOARD: string;
    static CF_TARGET_ELEMENT: string;
    static CF_CLOSE_ALL: string;
    static CF_DEEP_SEARCH: string;
    static CFT_CLOSE_DASHBOARD: TableFormat;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    private dashboard;
    private targetElement;
    private closeAll;
    private deepSearch;
    constructor();
    static createCloseDashboardWithDataTable(title: string, parameters: DataTable): CloseDashboard;
    getDashboard(): DashboardProperties | null;
    setDashboard(dashboard: DashboardProperties): void;
    getTargetElement(): string | null;
    setTargetElement(targetElement: string): void;
    getCloseAll(): boolean;
    setCloseAll(closeAll: boolean): void;
    getDeepSearch(): boolean;
    setDeepSearch(deepSearch: boolean): void;
    protected constructParameters(): DataTable;
}
