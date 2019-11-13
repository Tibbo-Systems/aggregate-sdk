import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
export default class Browse extends GenericActionCommand {
    static readonly CF_BROWSE_URI: string;
    static readonly CFT_BROWSE: TableFormat;
    private url;
    constructor(url?: string);
    static createBrowseWithDataTable(title: string, parameters: DataTable): Browse;
    protected constructParameters(): DataTable;
    getUrl(): string | null;
    setUrl(url: string): void;
}
