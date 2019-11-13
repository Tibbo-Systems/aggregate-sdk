import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import Cres from '../../../Cres';
import AggreGateBean from '../../AggreGateBean';
import DataRecord from '../../DataRecord';
import DataTableFactory from '../../DataTableFactory';
import FieldConstants from '../../field/FieldConstants';
import FieldFormatFactory from '../../FieldFormatFactory';

export default class ContextMaskConverter extends AbstractEditorOptionsConverter {
  public static readonly FIELD_ROOT_CONTEXT: string = 'rootContext';
  public static readonly FIELD_CONTEXT_TYPES: string = 'contextTypes';
  public static readonly FIELD_CONTEXT_MASKS: string = 'contextMasks';
  public static readonly FIELD_CONTEXT_TYPE: string = 'contextType';
  public static readonly FIELD_CONTEXT_MASK: string = 'contextMask';

  private static readonly TYPE_FORMAT: TableFormat = new TableFormat(0, Number.MAX_VALUE);

  static __static_initializer_0() {
    ContextMaskConverter.TYPE_FORMAT.addField(
      FieldFormatFactory.createWith(
        ContextMaskConverter.FIELD_CONTEXT_TYPE,
        FieldConstants.STRING_FIELD,
        Cres.get().getString('conContextType')
      )
    );
  }

  private static readonly MASK_FORMAT: TableFormat = new TableFormat(0, Number.MAX_VALUE);

  static __static_initializer_1() {
    ContextMaskConverter.MASK_FORMAT.addField(
      FieldFormatFactory.createWith(
        ContextMaskConverter.FIELD_CONTEXT_MASK,
        FieldConstants.STRING_FIELD,
        Cres.get().getString('conContextMask')
      )
    );
  }

  private static readonly FORMAT: TableFormat = new TableFormat(1, 1);

  static __static_initializer_2() {
    ContextMaskConverter.FORMAT.addField(
      FieldFormatFactory.createWith(
        ContextMaskConverter.FIELD_ROOT_CONTEXT,
        FieldConstants.STRING_FIELD,
        Cres.get().getString('wRoot')
      )
        .setEditor(FieldConstants.EDITOR_CONTEXT)
        .setNullable(true)
    );
    ContextMaskConverter.FORMAT.addField(
      FieldFormatFactory.createWith(
        ContextMaskConverter.FIELD_CONTEXT_TYPES,
        FieldConstants.DATATABLE_FIELD,
        Cres.get().getString('conContextTypes')
      ).setDefault(DataTableFactory.of(ContextMaskConverter.TYPE_FORMAT))
    );
    ContextMaskConverter.FORMAT.addField(
      FieldFormatFactory.createWith(
        ContextMaskConverter.FIELD_CONTEXT_MASKS,
        FieldConstants.DATATABLE_FIELD,
        Cres.get().getString('conContextMasks')
      ).setDefault(DataTableFactory.of(ContextMaskConverter.MASK_FORMAT))
    );
  }

  private static _init = false;

  public static initialize() {
    if (ContextMaskConverter._init) return;

    ContextMaskConverter.__static_initializer_0();
    ContextMaskConverter.__static_initializer_1();
    ContextMaskConverter.__static_initializer_2();

    ContextMaskConverter._init = true;
  }

  constructor() {
    super();
    ContextMaskConverter.initialize();
    this.editors.push(FieldConstants.EDITOR_CONTEXT);
    this.editors.push(FieldConstants.EDITOR_CONTEXT_MASK);
    this.types.push(FieldConstants.STRING_FIELD);
  }

  convertToString(options: DataTable): string | null {
    return options.encodeToString();
  }

  getFormat(): TableFormat {
    return ContextMaskConverter.FORMAT;
  }

  static prepareAndGetFormat(): TableFormat {
    ContextMaskConverter.initialize();
    return ContextMaskConverter.FORMAT;
  }
}

export class Options extends AggreGateBean {
  public rootContext: string | null = null;
  public contextTypes: Array<string> = new Array<string>();
  public contextMasks: Array<string> = new Array<string>();

  constructor(data?: DataRecord) {
    super(ContextMaskConverter.prepareAndGetFormat(), data ? data : undefined);
  }

  public getRootContext(): string | null {
    return this.rootContext;
  }

  public setRootContext(rootContext: string): void {
    this.rootContext = rootContext;
  }

  public getContextTypes(): Array<string> {
    return this.contextTypes;
  }

  public setContextTypes(contextTypes: Array<string>): void {
    this.contextTypes = contextTypes;
  }

  public getContextMasks(): Array<string> {
    return this.contextMasks;
  }

  public setContextMasks(contextMasks: Array<string>): void {
    this.contextMasks = contextMasks;
  }
}
