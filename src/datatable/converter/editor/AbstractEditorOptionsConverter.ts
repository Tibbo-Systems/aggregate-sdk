import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import EditorOptionsConverter from './EditorOptionsConverter';

export default abstract class AbstractEditorOptionsConverter implements EditorOptionsConverter {
  // See DataTableUtils.getEditorSelectionValues()
  protected readonly editors: Array<string> = new Array<string>();

  // See FieldFormat.getTypeSelectionValues()
  protected readonly types: Array<string> = new Array<string>();

  /* (non-Javadoc)
   * @see com.tibbo.aggregate.common.datatable.converter.editor.EditorOptionsConverter#convertToString(com.tibbo.aggregate.common.datatable.DataTable)
   */
  public abstract convertToString(options: DataTable): string;

  /* (non-Javadoc)
   * @see com.tibbo.aggregate.common.datatable.converter.editor.EditorOptionsConverter#getFormat()
   */
  public abstract getFormat(): TableFormat;

  /* (non-Javadoc)
   * @see com.tibbo.aggregate.common.datatable.converter.editor.EditorOptionsConverter#isSupportingEditor(java.lang.String)
   */
  public isSupportingEditor(editor: string | null): boolean {
    if (editor == null) return false;
    return this.editors.findIndex((el) => el === editor) !== -1;
  }

  /* (non-Javadoc)
   * @see com.tibbo.aggregate.common.datatable.converter.editor.EditorOptionsConverter#isSupportingType(java.lang.String)
   */
  public isSupportingType(type: string): boolean {
    return this.types.findIndex((el) => el === type) !== -1;
  }
}
