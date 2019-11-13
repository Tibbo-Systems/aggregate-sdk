import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import DataTable from '../../datatable/DataTable';
export default class GridDashboardActionCommand extends GenericActionCommand {
    static readonly CF_ELEMENTS: string;
    static readonly CFT_GRID_DASHBOARD: TableFormat;
    readonly parameters: DataTable;
    constructor(type: string, title: string | null, parameters: DataTable);
    protected constructParameters(): DataTable;
}
