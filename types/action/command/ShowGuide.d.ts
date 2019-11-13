import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
export default class ShowGuide extends GenericActionCommand {
    static readonly CF_INVOKER_CONTEXT: string;
    static readonly CF_MACRO_NAME: string;
    static readonly CFT_SHOW_GUIDE: TableFormat;
    static __static_initializer_0(): void;
    private invokerContext;
    private macroName;
    private static _init;
    static initialize(): void;
    constructor(title?: string | TableFormat, invokerContext?: string, macroName?: string);
    static createShowGuideWithDataTable(title: string, parameters: DataTable): ShowGuide;
    protected constructParameters(): DataTable;
    getInvokerContext(): string | null;
    setInvokerContext(invokerContext: string): void;
    getMacroName(): string | null;
    setMacroName(macroName: string): void;
}
