import AbstractBindingProvider from '../binding/AbstractBindingProvider';
import ErrorCollector from '../util/ErrorCollector';
import ReferenceListener from '../binding/ReferenceListener';
import Reference from '../expression/Reference';
import Util from '../util/Util';
import Log from '../Log';
import ReferenceWriter from '../binding/ReferenceWriter';
import EvaluationOptions from '../binding/EvaluationOptions';

export default abstract class AbstractDataTableBindingProvider extends AbstractBindingProvider {
  public static PROPERTY_ENABLED = 'enabled';
  public static PROPERTY_HIDDEN = 'hidden';
  public static PROPERTY_CHOICES = 'choices';
  public static PROPERTY_OPTIONS = 'options';

  protected listeners = new Array<[ReferenceListener, Reference]>();
  protected constructor(errorCollector?: ErrorCollector) {
    super(errorCollector);
  }

  public internalWriteReference(ref: Reference, value: any): void {
    if (this.isLocalReference(ref) && ref.getServer() == null) {
      const r = ref.getRow();
      const row = r != null ? r : 0;
      const field = ref.getField();
      const property = ref.getProperty();

      if (field == null || field.length == 0) {
        this.writeToEditor(property, value);
      } else {
        this.writeToField(row, field, property, value);
      }
    } else {
      const externalReferenceWriter = this.getExternalReferenceWriter();
      if (externalReferenceWriter != null) {
        externalReferenceWriter.writeReference(ref, value);
      } else {
        Log.BINDINGS.debug("Unable to write value referenced by '" + ref + "': no external reference writer is defined");
      }
    }
  }

  stop() {
    this.clearListeners();
  }

  public addReferenceListener(ref: Reference, listener: ReferenceListener): void {
    this.listeners.push([listener, ref]);
  }

  public clearListeners(): void {
    this.listeners = new Array<[ReferenceListener, Reference]>();
  }

  private writeToEditor(property: string | null, value: any) {
    if (AbstractDataTableBindingProvider.PROPERTY_ENABLED === property) {
      this.setEditorEnabled(Util.convertToBoolean(value, true, false) as boolean);
    }
  }

  private writeToField(row: number, field: string, property: string | null, value: any) {
    if (AbstractDataTableBindingProvider.PROPERTY_ENABLED === property) {
      this.setEnabled(value, row, field);
    } else if (AbstractDataTableBindingProvider.PROPERTY_HIDDEN === property) {
      this.setHidden(value, row, field);
    } else if (AbstractDataTableBindingProvider.PROPERTY_CHOICES === property) {
      this.setSelectionValues(value, row, field);
    } else if (AbstractDataTableBindingProvider.PROPERTY_OPTIONS === property) {
      this.setOptions(value, row, field);
    } else if (property == null) {
      this.setCellValue(value, row, field);
    } else {
      throw new Error("Unknown property: '" + property + "'");
    }
  }

  public getListenerCount(): number {
    return this.listeners.length;
  }

  public getListeners(): Array<[ReferenceListener, Reference]> {
    return this.listeners;
  }

  public isLocalReference(ref: Reference): boolean {
    return ref.getSchema() == null && ref.getContext() == null && ref.getEntity() == null;
  }

  protected processBindings(field: string, record: number, startup: boolean, asynchronousProcessing: boolean): void {
    for (const entry of this.listeners) {
      const ref = entry[1];
      const listener = entry[0];

      if (startup && Util.equals(listener.getBinding().getTarget().getSchema(), Reference.SCHEMA_TABLE)) {
        continue; // Bindings that change whole table should not be processed on startup
      }

      const rfield = ref.getField();

      const nonLocal = !this.isLocalReference(ref);

      const listenerField = listener.getBinding().getTarget().getField();
      const targetPointsToCurrentField = listenerField != null && listenerField === field;
      if ((startup && nonLocal && targetPointsToCurrentField) || (rfield != null && this.isLocalReference(ref) && rfield === field)) {
        if (ref.getRow() != null && ref.getRow() == record) {
          this.callReferenceChanged(ref, startup ? EvaluationOptions.STARTUP : EvaluationOptions.EVENT, listener, asynchronousProcessing);
        }

        if (ref.getRow() == null) {
          const clone = ref.clone();
          clone.setRow(ref.getSchema() == null ? record : null); // Substituting row to current one if reference uses default schema
          this.callReferenceChanged(clone, startup ? EvaluationOptions.STARTUP : EvaluationOptions.EVENT, listener, asynchronousProcessing);
        }
      }
    }
  }

  protected abstract getExternalReferenceWriter(): ReferenceWriter | null;

  protected abstract callReferenceChanged(cause: Reference, method: number, listener: ReferenceListener, asynchronousProcessing: boolean): void;

  protected abstract setEnabled(value: any, row: number, field: string): void;

  protected abstract setCellValue(value: any, row: number, field: string): void;

  protected abstract setOptions(value: any, row: number, field: string): void;

  protected abstract setSelectionValues(value: any, row: number, field: string): void;

  protected abstract setHidden(value: any, row: number, field: string): void;

  protected abstract setEditorEnabled(enabled: boolean): void;
}
