import TableFormat from '../../datatable/TableFormat';
import GenericActionCommand from '../GenericActionCommand';
import DataTable from '../../datatable/DataTable';
export default class EditCode extends GenericActionCommand {
    static readonly CF_CODE: string;
    static readonly CF_MODE: string;
    static readonly RF_RESULT: string;
    static readonly RF_CODE: string;
    static readonly CFT_EDIT_CODE: TableFormat;
    static __static_initializer_0(): void;
    static readonly RFT_EDIT_CODE: TableFormat;
    static __static_initializer_1(): void;
    private static _init;
    static initialize(): void;
    private code;
    private mode;
    constructor();
    static createEditCodeWithDataTable(title: string, parameters: DataTable): EditCode;
    static createDefault(): EditCode;
    static createEditCode(title: string, code: string, mode: string): EditCode;
    protected constructParameters(): DataTable;
    getCode(): string | null;
    setCode(code: string): void;
    getMode(): string | null;
    setMode(mode: string): void;
}
