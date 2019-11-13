import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
export default class ShowDiff extends GenericActionCommand {
    static readonly CF_FIRST_FILE_TITLE: string;
    static readonly CF_FIRST_FILE: string;
    static readonly CF_SECOND_FILE_TITLE: string;
    static readonly CF_SECOND_FILE: string;
    static readonly CFT_SHOW_DIFF: TableFormat;
    static __static_initializer_0(): void;
    private firstFileTitle;
    private secondFileTitle;
    private firstFile;
    private secondFile;
    private static _init;
    static initialize(): void;
    constructor(title?: string | TableFormat, firstFileTitle?: string, firstFile?: string, secondFileTitle?: string, secondFile?: string);
    static createShowDiffWithDataTable(title: string, parameters: DataTable): ShowDiff;
    protected constructParameters(): DataTable;
}
