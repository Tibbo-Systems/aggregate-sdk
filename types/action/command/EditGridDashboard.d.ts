import GridDashboardActionCommand from './GridDashboardActionCommand';
import DataTable from '../../datatable/DataTable';
export default class EditGridDashboard extends GridDashboardActionCommand {
    constructor(parameters: DataTable);
    static createEditGridDashboardWithDataTable(title: string, parameters: DataTable): EditGridDashboard;
}
