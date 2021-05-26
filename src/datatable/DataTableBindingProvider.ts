import AbstractDataTableBindingProvider from './AbstractDataTableBindingProvider';
import Reference from '../expression/Reference';
import ReferenceListener from '../binding/ReferenceListener';
import EvaluationOptions from '../binding/EvaluationOptions';
import Binding from '../binding/Binding';
import ChangeCache from '../binding/ChangeCache';
import ErrorCollector from '../util/ErrorCollector';
import DataTable from './DataTable';
import ReferenceWriter from '../binding/ReferenceWriter';
import Log from '../Log';
import Cres from '../Cres';

export default class DataTableBindingProvider extends AbstractDataTableBindingProvider {
  private headless = true;

  private table: DataTable;

  private static EVALUATION_OPTIONS = EvaluationOptions.of(true, false, 0);

  constructor(table: DataTable, errorCollector?: ErrorCollector) {
    super(errorCollector);
    this.table = table;
  }

  addReferenceListener(ref: Reference, listener: ReferenceListener): void {}

  createBindings(): Array<[Binding, EvaluationOptions]> {
    const bindings = new Array<[Binding, EvaluationOptions]>();
    for (const b of this.table.getFormat().getBindings()) {
      bindings.push([b, DataTableBindingProvider.EVALUATION_OPTIONS]);
    }
    return bindings;
  }

  public start(): void {
    for (let i = 0; i < this.table.getRecordCount(); i++) {
      for (const ff of this.table.getFormat()) {
        this.processBindings(ff.getName(), i, true, true);
      }
    }
  }

  stop(): void {}

  writeReference(method: number, binding: Binding, value: any, cause?: Reference, cache?: ChangeCache): void {
    const ref = binding.getTarget();
    const row = ref.getRow() != null ? ref.getRow() : cause != null && cause.getRow() != null ? cause.getRow() : null;
    const clone = ref.clone();
    clone.setRow(row);
    this.internalWriteReference(clone, value);
  }

  protected callReferenceChanged(cause: Reference, method: number, listener: ReferenceListener, asynchronousProcessing: boolean): void {
    try {
      listener.referenceChanged(cause, asynchronousProcessing);
    } catch (ex) {
      this.processError(listener.getBinding(), method, cause, ex);
    }
  }

  protected getExternalReferenceWriter(): ReferenceWriter | null {
    return null;
  }

  protected setCellValue(value: any, row: number, field: string): void {
    this.table.getRecord(row).setValue(field, value);
  }

  protected setEditorEnabled(enabled: boolean): void {}

  protected setEnabled(value: any, row: number, field: string): void {}

  protected setHidden(value: any, row: number, field: string): void {
    if (this.headless) {
      return; // Format will be immutable in headless mode
    }
    const hidden = value as boolean;

    try {
      const ff = this.getFieldFormat(row, field);
      if (ff != null) {
        ff.setHidden(hidden);
      }
    } catch (error) {
      Log.BINDINGS.error('Error hidden status setting field ' + field + ' in row ' + row + ' to ' + hidden, error.message);
    }
  }

  protected getFieldFormat(row: number, field: string) {
    if (row >= this.table.getRecordCount()) {
      throw new Error(Cres.get().getString('dtRecordNotAvail') + row);
    }

    const ff = this.table.getRecord(row).getFormat().getField(field);

    if (ff == null) {
      throw new Error(Cres.get().getString('dtFieldNotAvail') + field);
    }

    return ff;
  }

  protected setOptions(value: any, row: number, field: string): void {}

  protected setSelectionValues(value: any, row: number, field: string): void {}
}
