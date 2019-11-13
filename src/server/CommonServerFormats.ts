import TableFormat from '../datatable/TableFormat';
import RootContextConstants from './RootContextConstants';
import StringFieldFormat from '../datatable/field/StringFieldFormat';
import FieldConstants from '../datatable/field/FieldConstants';

export default class CommonServerFormats {
  public static readonly FIFT_GET_FORMAT: TableFormat = new TableFormat(
    1,
    1,
    '<' + RootContextConstants.FIF_GET_FORMAT_ID + '><I>'
  );

  public static readonly FOFT_GET_FORMAT: TableFormat = new TableFormat(
    1,
    1,
    '<' + RootContextConstants.FOF_GET_FORMAT_DATA + '><S>'
  );
  public static readonly FIFT_LOGIN = new TableFormat(1, 1);

  public static __init = false;

  static init() {
    if (CommonServerFormats.__init) return;
    CommonServerFormats.FIFT_LOGIN.addField('<' + RootContextConstants.FIF_LOGIN_USERNAME + '><S>');
    CommonServerFormats.FIFT_LOGIN.addField(
      '<' + RootContextConstants.FIF_LOGIN_PASSWORD + '><S><E=' + FieldConstants.EDITOR_PASSWORD + '>'
    );
    CommonServerFormats.FIFT_LOGIN.addField('<' + RootContextConstants.FIF_LOGIN_CODE + '><S><F=N>');
    CommonServerFormats.FIFT_LOGIN.addField('<' + RootContextConstants.FIF_LOGIN_STATE + '><S><F=N>');
    CommonServerFormats.FIFT_LOGIN.addField('<' + RootContextConstants.FIF_LOGIN_PROVIDER + '><S><F=N>');
    CommonServerFormats.__init = true;
  }
}

CommonServerFormats.init();
