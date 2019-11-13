import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import EditText from './EditText';
import ActionUtils from '../ActionUtils';
import DataTable from '../../datatable/DataTable';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import FieldConstants from '../../datatable/field/FieldConstants';
import FieldFormat from '../../datatable/FieldFormat';

export default class EditCode extends GenericActionCommand {
  public static readonly CF_CODE: string = 'code';
  public static readonly CF_MODE: string = 'mode';

  public static readonly RF_RESULT: string = 'result';
  public static readonly RF_CODE: string = 'code';

  public static readonly CFT_EDIT_CODE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    EditCode.CFT_EDIT_CODE.addField(
      FieldFormatFactory.create('<' + EditCode.CF_CODE + '><S>').setEditor(FieldConstants.EDITOR_TEXT)
    );

    let ff: FieldFormat<Object> = FieldFormatFactory.create('<' + EditCode.CF_MODE + '><S><F=N>')
      .setSelectionValues(EditText.modes())
      .setExtendableSelectionValues(true)
      .setDefaultOverride(true);
    EditCode.CFT_EDIT_CODE.addField(ff);
  }

  public static readonly RFT_EDIT_CODE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_1() {
    EditCode.RFT_EDIT_CODE.addField('<' + EditCode.RF_RESULT + '><S>');
    EditCode.RFT_EDIT_CODE.addField('<' + EditCode.RF_CODE + '><S><F=N>');
  }

  private static _init = false;

  public static initialize() {
    if (EditCode._init) return;
    EditCode.__static_initializer_0();
    EditCode.__static_initializer_1();
    EditCode._init = true;
  }

  private code: string | null = null;
  private mode: string | null = null;

  public constructor() {
    super(ActionUtils.CMD_EDIT_CODE);
    EditCode.initialize();
  }

  public static createEditCodeWithDataTable(title: string, parameters: DataTable) {
    const editCode = new EditCode();
    editCode.setTitle(title);
    editCode.setParameters(parameters);
    return editCode;
  }

  public static createDefault() {
    const editCode = new EditCode();
    editCode.setParameters(new SimpleDataTable(EditCode.CFT_EDIT_CODE));
    editCode.setResponseFormat(EditCode.RFT_EDIT_CODE);
    return editCode;
  }

  public static createEditCode(title: string, code: string, mode: string) {
    const editCode = new EditCode();
    editCode.setTitle(title);
    editCode.setCode(code);
    editCode.setMode(mode);
    return editCode;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(EditCode.CFT_EDIT_CODE, this.code, this.mode);
  }

  public getCode(): string | null {
    return this.code;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public getMode(): string | null {
    return this.mode;
  }

  public setMode(mode: string): void {
    this.mode = mode;
  }
}
