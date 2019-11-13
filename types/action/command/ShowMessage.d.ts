import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
export default class ShowMessage extends GenericActionCommand {
    static readonly CF_MESSAGE: string;
    static readonly CF_LEVEL: string;
    static readonly CFT_SHOW_MESSAGE: TableFormat;
    static __static_initializer_0(): void;
    private message;
    private level;
    private static _init;
    static initialize(): void;
    constructor(titleOrFormat?: string | TableFormat, message?: string, level?: number);
    static createShowMessageWithDataTable(title: string, parameters: DataTable): ShowMessage;
    protected constructParameters(): DataTable;
    getMessage(): string | null;
    getLevel(): number | null;
    setMessage(message: string): void;
    setLevel(level: number): void;
}
