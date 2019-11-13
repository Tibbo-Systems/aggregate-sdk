import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import DataTable from '../../datatable/DataTable';
export default class ShowError extends GenericActionCommand {
    static readonly CF_LEVEL: string;
    static readonly CF_MESSAGE: string;
    static readonly CF_EXCEPTION: string;
    static readonly CFT_SHOW_ERROR: TableFormat;
    static __static_initializer_0(): void;
    private exception;
    private level;
    private message;
    private static _init;
    static initialize(): void;
    constructor(title?: string | TableFormat, message?: string, level?: number, exception?: Error);
    static createShowErrorWithDataTable(title: string, parameters: DataTable): ShowError;
    protected constructParameters(): DataTable;
    getLevel(): number | null;
    setLevel(level: number): void;
    getMessage(): string | null;
    setMessage(message: string): void;
    getException(): Error | null;
    setException(exception: Error): void;
}
