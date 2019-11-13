import TableFormat from '../../datatable/TableFormat';
import FieldFormat from '../../datatable/FieldFormat';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import GenericActionCommand from '../GenericActionCommand';
import ActionUtils from '../ActionUtils';
import { FieldConstants, StringFieldFormat } from '../..';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTable from '../../datatable/DataTable';

export default class EditText extends GenericActionCommand {
  public static CF_TEXT: string = 'text';
  public static CF_MODE: string = 'mode';
  public static RF_RESULT: string = 'result';
  public static RF_TEXT: string = 'text';

  public static CFT_EDIT_TEXT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    EditText.CFT_EDIT_TEXT.addField('<' + EditText.CF_TEXT + '><S>');
    const ff: FieldFormat<any> = FieldFormatFactory.create('<' + EditText.CF_MODE + '><S><F=N>')
      .setSelectionValues(EditText.modes())
      .setExtendableSelectionValues(true)
      .setDefaultOverride(true);
    EditText.CFT_EDIT_TEXT.addField(ff);
  }

  public static modes(): Map<string, string> {
    const map: Map<string, string> = new Map();
    map.set(FieldConstants.TEXT_EDITOR_MODE_AGGREGATE, FieldConstants.TEXT_EDITOR_MODE_AGGREGATE);
    map.set(FieldConstants.TEXT_EDITOR_MODE_JAVA, FieldConstants.TEXT_EDITOR_MODE_JAVA);
    map.set(FieldConstants.TEXT_EDITOR_MODE_XML, FieldConstants.TEXT_EDITOR_MODE_XML);
    map.set(FieldConstants.TEXT_EDITOR_MODE_SQL, FieldConstants.TEXT_EDITOR_MODE_SQL);
    map.set(FieldConstants.TEXT_EDITOR_MODE_HTML, FieldConstants.TEXT_EDITOR_MODE_HTML);
    map.set(FieldConstants.TEXT_EDITOR_MODE_SHELLSCRIPT, FieldConstants.TEXT_EDITOR_MODE_SHELLSCRIPT);
    map.set(FieldConstants.TEXT_EDITOR_MODE_SMI_MIB, FieldConstants.TEXT_EDITOR_MODE_SMI_MIB);
    return map;
  }

  public static RFT_EDIT_TEXT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_1() {
    EditText.RFT_EDIT_TEXT.addField('<' + EditText.RF_RESULT + '><S>');
    EditText.RFT_EDIT_TEXT.addField('<' + EditText.RF_TEXT + '><S><F=N>');
  }

  private text: string | null = null;
  private mode: string | null = null;

  private static _init = false;

  public static initialize() {
    if (EditText._init) return;
    EditText.__static_initializer_0();
    EditText.__static_initializer_1();
    EditText._init = true;
  }

  public constructor() {
    super(ActionUtils.CMD_EDIT_TEXT);
  }

  public static createEditTextWithDataTable(title: string, parameters: DataTable) {
    const editText = new EditText();
    editText.setTitle(title);
    editText.setParameters(parameters);
    return editText;
  }

  public static createDefault() {
    const editText = new EditText();
    editText.setParameters(new SimpleDataTable(EditText.CFT_EDIT_TEXT));
    editText.setResponseFormat(EditText.RFT_EDIT_TEXT);
    return editText;
  }

  public static createEditText(title: string, text: string, mode: string) {
    const editText = new EditText();
    editText.setTitle(title);
    editText.setText(text);
    editText.setMode(mode);
    return editText;
  }

  constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(EditText.CFT_EDIT_TEXT, this.text, this.mode);
  }

  public getText(): string | null {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
  }

  public getMode(): string | null {
    return this.mode;
  }

  public setMode(mode: string): void {
    this.mode = mode;
  }
}

EditText.initialize();
