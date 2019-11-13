import GridDashboardActionCommand from './GridDashboardActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
export default class OpenGridDashboard extends GridDashboardActionCommand {
    static readonly V_ELEMENTS: string;
    static readonly V_CONTEXT_PATH: string;
    static readonly V_DASHBOARD_NAME: string;
    static readonly V_DASHBOARD_DESCRIPTION: string;
    static VFT_GRID_PROPS: TableFormat;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    constructor(parameters: DataTable);
    static createOpenGridDashboardWithDataTable(title: string, parameters: DataTable): OpenGridDashboard;
}
