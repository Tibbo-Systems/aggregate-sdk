import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import DataTable from '../../datatable/DataTable';

export default class GridDashboardActionCommand extends GenericActionCommand {
  public static readonly CF_ELEMENTS: string = 'elements';
  public static readonly CFT_GRID_DASHBOARD: TableFormat = TableFormat.createWithFormat(FieldFormatFactory.create('<' + GridDashboardActionCommand.CF_ELEMENTS + '><T>'));

  readonly parameters: DataTable;

  public constructor(type: string, title: string | null, parameters: DataTable) {
    super(type, title);
    this.parameters = parameters;
  }

  protected constructParameters(): DataTable {
    return this.parameters;
  }
}
