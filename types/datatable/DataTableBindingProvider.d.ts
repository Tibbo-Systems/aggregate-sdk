import AbstractDataTableBindingProvider from './AbstractDataTableBindingProvider';
import Reference from '../expression/Reference';
import ReferenceListener from '../binding/ReferenceListener';
import EvaluationOptions from '../binding/EvaluationOptions';
import Binding from '../binding/Binding';
import ChangeCache from '../binding/ChangeCache';
import ErrorCollector from '../util/ErrorCollector';
import DataTable from './DataTable';
import ReferenceWriter from '../binding/ReferenceWriter';
export default class DataTableBindingProvider extends AbstractDataTableBindingProvider {
    private headless;
    private table;
    private static EVALUATION_OPTIONS;
    constructor(table: DataTable, errorCollector?: ErrorCollector);
    addReferenceListener(ref: Reference, listener: ReferenceListener): void;
    createBindings(): Array<[Binding, EvaluationOptions]>;
    start(): void;
    stop(): void;
    writeReference(method: number, binding: Binding, value: any, cause?: Reference, cache?: ChangeCache): void;
    protected callReferenceChanged(cause: Reference, method: number, listener: ReferenceListener, asynchronousProcessing: boolean): void;
    protected getExternalReferenceWriter(): ReferenceWriter | null;
    protected setCellValue(value: any, row: number, field: string): void;
    protected setEditorEnabled(enabled: boolean): void;
    protected setEnabled(value: any, row: number, field: string): void;
    protected setHidden(value: any, row: number, field: string): void;
    protected getFieldFormat(row: number, field: string): import("./FieldFormat").default<any>;
    protected setOptions(value: any, row: number, field: string): void;
    protected setSelectionValues(value: any, row: number, field: string): void;
}
