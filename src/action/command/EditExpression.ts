import ActionUtilsConstants from '../ActionUtilsConstants';
import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';

export default class EditExpression extends GenericActionCommand {
  public constructor(title: string | TableFormat | null) {
    super(ActionUtilsConstants.CMD_EDIT_EXPRESSION, title, null);
  }
}
