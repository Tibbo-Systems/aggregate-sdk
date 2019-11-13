import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';

export default interface EditorOptionsConverter {
  convertToString(options: DataTable): string | null;

  getFormat(): TableFormat;

  isSupportingEditor(editor: string): boolean;

  isSupportingType(type: string): boolean;
}
