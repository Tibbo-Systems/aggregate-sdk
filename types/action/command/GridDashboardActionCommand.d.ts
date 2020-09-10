import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import DataTable from '../../datatable/DataTable';
export default class GridDashboardActionCommand extends GenericActionCommand {
    static readonly CF_DEFAULT_CONTEXT = "defaultContext";
    static readonly CF_CONTEXT_PATH: string;
    static CFT_GRID_DASHBOARD: TableFormat;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    private readonly contextPath;
    private readonly defaultContext;
    constructor(type: string, title: string | null, contextPath: string | null, defaultContext: string | null);
    protected constructParameters(): DataTable;
}
