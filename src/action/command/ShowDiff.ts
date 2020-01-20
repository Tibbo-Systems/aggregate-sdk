import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import FieldConstants from '../../datatable/field/FieldConstants';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataRecord from '../../datatable/DataRecord';
import ActionUtilsConstants from '../ActionUtilsConstants';

export default class ShowDiff extends GenericActionCommand {
  public static readonly CF_FIRST_FILE_TITLE: string = 'firstFileTitle';
  public static readonly CF_FIRST_FILE: string = 'firstFile';
  public static readonly CF_SECOND_FILE_TITLE: string = 'secondFileTitle';
  public static readonly CF_SECOND_FILE: string = 'secondFile';

  public static readonly CFT_SHOW_DIFF: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowDiff.CFT_SHOW_DIFF.addField(FieldFormatFactory.createType(ShowDiff.CF_FIRST_FILE_TITLE, FieldConstants.STRING_FIELD));
    ShowDiff.CFT_SHOW_DIFF.addField(FieldFormatFactory.createType(ShowDiff.CF_FIRST_FILE, FieldConstants.STRING_FIELD).setEditor(FieldConstants.EDITOR_TEXT));
    ShowDiff.CFT_SHOW_DIFF.addField(FieldFormatFactory.createType(ShowDiff.CF_SECOND_FILE_TITLE, FieldConstants.STRING_FIELD));
    ShowDiff.CFT_SHOW_DIFF.addField(FieldFormatFactory.createType(ShowDiff.CF_SECOND_FILE, FieldConstants.STRING_FIELD).setEditor(FieldConstants.EDITOR_TEXT));
  }

  private firstFileTitle: string | null = null;
  private secondFileTitle: string | null = null;
  private firstFile: string | null = null;
  private secondFile: string | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowDiff._init) return;
    ShowDiff.__static_initializer_0();
    ShowDiff._init = true;
  }

  public constructor(title: string | TableFormat = ShowDiff.CFT_SHOW_DIFF, firstFileTitle?: string, firstFile?: string, secondFileTitle?: string, secondFile?: string) {
    super(ActionUtilsConstants.CMD_SHOW_DIFF, title, null);
    if (firstFileTitle && firstFile && secondFileTitle && secondFile) {
      this.firstFileTitle = firstFileTitle;
      this.firstFile = firstFile;
      this.secondFileTitle = secondFileTitle;
      this.secondFile = secondFile;
    }
  }

  public static createShowDiffWithDataTable(title: string, parameters: DataTable) {
    const showDiff = new ShowDiff(title);
    showDiff.setParameters(parameters);
    return showDiff;
  }

  protected constructParameters(): DataTable {
    const dt: DataTable = new SimpleDataTable(ShowDiff.CFT_SHOW_DIFF);
    const rec: DataRecord = dt.addRecord();

    rec.setValue(ShowDiff.CF_FIRST_FILE_TITLE, this.firstFileTitle);
    rec.setValue(ShowDiff.CF_FIRST_FILE, this.firstFile);
    rec.setValue(ShowDiff.CF_SECOND_FILE_TITLE, this.secondFileTitle);
    rec.setValue(ShowDiff.CF_SECOND_FILE, this.secondFile);

    return dt;
  }
}

ShowDiff.initialize();
