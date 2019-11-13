import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import ActionUtils from '../ActionUtils';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTable from '../../datatable/DataTable';

export default class Browse extends GenericActionCommand {
  public static readonly CF_BROWSE_URI: string = 'uri';

  public static readonly CFT_BROWSE: TableFormat = FieldFormatFactory.create(
    '<' + Browse.CF_BROWSE_URI + '><S>'
  ).wrap();

  private url: string | null = null;

  public constructor(url?: string) {
    super(ActionUtils.CMD_BROWSE, null);
    if (url) this.url = url;
  }

  public static createBrowseWithDataTable(title: string, parameters: DataTable) {
    const browse = new Browse();
    browse.setTitle(title);
    browse.setParameters(parameters);
    return browse;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(Browse.CFT_BROWSE, this.url);
  }

  public getUrl(): string | null {
    return this.url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }
}
