import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import EditorOptionsConverter from './EditorOptionsConverter';
export default abstract class AbstractEditorOptionsConverter implements EditorOptionsConverter {
    protected readonly editors: Array<string>;
    protected readonly types: Array<string>;
    abstract convertToString(options: DataTable): string;
    abstract getFormat(): TableFormat;
    isSupportingEditor(editor: string | null): boolean;
    isSupportingType(type: string): boolean;
}
