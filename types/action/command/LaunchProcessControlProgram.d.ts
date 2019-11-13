import TableFormat from '../../datatable/TableFormat';
import LaunchWidget from './LaunchWidget';
import DataTable from '../../datatable/DataTable';
export default class LaunchProcessControlProgram extends LaunchWidget {
    static readonly FIFT_DEBUG_PROGRAM: TableFormat;
    static readonly FIFT_BREAKPOINT: TableFormat;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    constructor(title?: string, widgetContext?: string, defaultContext?: string, template?: string);
    static createLaunchProcessControlProgramWithDataTable(title: string, parameters: DataTable): LaunchProcessControlProgram;
}
