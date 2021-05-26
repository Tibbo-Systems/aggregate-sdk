import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import TableFormat from '../../TableFormat';
import DataTable from '../../DataTable';
export default class ExpressionConverter extends AbstractEditorOptionsConverter {
    static readonly FIELD_ADDITIONAL_REFERENCES_DESCRIPTION: string;
    static readonly FIELD_ADDITIONAL_REFERENCES_REFERENCE: string;
    static FORMAT: TableFormat;
    static REFERENCES_FORMAT: TableFormat;
    constructor();
    convertToString(options: DataTable): string;
    getFormat(): TableFormat;
}
