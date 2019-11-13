import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import DataTable from '../../datatable/DataTable';
export default class EditText extends GenericActionCommand {
    static CF_TEXT: string;
    static CF_MODE: string;
    static RF_RESULT: string;
    static RF_TEXT: string;
    static CFT_EDIT_TEXT: TableFormat;
    static __static_initializer_0(): void;
    static modes(): Map<string, string>;
    static RFT_EDIT_TEXT: TableFormat;
    static __static_initializer_1(): void;
    private text;
    private mode;
    private static _init;
    static initialize(): void;
    constructor();
    static createEditTextWithDataTable(title: string, parameters: DataTable): EditText;
    static createDefault(): EditText;
    static createEditText(title: string, text: string, mode: string): EditText;
    constructParameters(): DataTable;
    getText(): string | null;
    setText(text: string): void;
    getMode(): string | null;
    setMode(mode: string): void;
}
