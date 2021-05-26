import JObject from '../util/java/JObject';
import TransferEncodingHelper from './encoding/TransferEncodingHelper';
import DataTable from './DataTable';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import Cres from '../Cres';
import FieldConstants from './field/FieldConstants';
import Evaluator from '../expression/Evaluator';
import ErrorCollector from '../util/ErrorCollector';
import Context from '../context/Context';
import DefaultBindingProcessor from '../binding/DefaultBindingProcessor';
import DataTableBindingProvider from './DataTableBindingProvider';
export enum FilterMode {
  TEXT,
  REGEXP,
  EXPRESSION,
}

export default class DataTableUtils extends JObject {
  public static readonly NAMING_ENVIRONMENT_SHORT_DATA = 'short';
  public static readonly NAMING_ENVIRONMENT_FULL_DATA = 'full';

  public static readonly ELEMENT_START = '\u001c';
  public static readonly ELEMENT_END = '\u001d';
  public static readonly ELEMENT_NAME_VALUE_SEPARATOR = '\u001e';

  public static readonly ELEMENT_VISIBLE_START = '<';
  public static readonly ELEMENT_VISIBLE_END = '>';
  public static readonly ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR = '=';

  public static readonly DATA_TABLE_NULL = '\u001a';
  public static readonly DATA_TABLE_VISIBLE_NULL = '<NULL>';

  public static readonly EDITOR_SELECTION_VALUES = new Map<string | null, string>();

  private static __static_initializer_0() {
    DataTableUtils.EDITOR_SELECTION_VALUES.set(null, Cres.get().getString('default'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_LIST, Cres.get().getString('dtEditorList'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_DATE, Cres.get().getString('date'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_TIME, Cres.get().getString('time'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_BAR, Cres.get().getString('dtEditorBar'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_BYTES, Cres.get().getString('dtEditorBytes'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_INSTANCE, Cres.get().getString('dtEditorInstance'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_PERIOD, Cres.get().getString('dtEditorPeriod'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_FOREIGN_INSTANCE, Cres.get().getString('dtEditorForeignInstance'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_EXPRESSION, Cres.get().getString('expression'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_FUNCTION_SELECTOR, Cres.get().getString('functionSelector'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_PASSWORD, Cres.get().getString('password'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_TEXT, Cres.get().getString('dtEditorTextEditor'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_HTML, Cres.get().getString('dtEditorHtml'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_TEXT_AREA, Cres.get().getString('dtEditorTextArea'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_EMBEDDED_TEXT_AREA, Cres.get().getString('dtEditorEmbeddedTextArea'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_CONTEXT, Cres.get().getString('context'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_CONTEXT_MASK, Cres.get().getString('conContextMask'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_FONT, Cres.get().getString('font'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_IP, Cres.get().getString('dtEditorIp'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_BOX, Cres.get().getString('dtEditorBox'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_IMAGE, Cres.get().getString('image'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_SOUND, Cres.get().getString('sound'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_HEX, Cres.get().getString('dtEditorHex'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_REFERENCE, Cres.get().getString('dtEditorReference'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_ACTIVATOR, Cres.get().getString('activator'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_CODE, Cres.get().getString('dtEditorCodeEditor'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_SPINNER, Cres.get().getString('wSpinner'));
    DataTableUtils.EDITOR_SELECTION_VALUES.set(FieldConstants.EDITOR_EVENT_LEVEL, Cres.get().getString('efEventLevel'));
  }

  public static readonly VALIDATOR_SELECTION_VALUES = new Map<string | null, string>();

  private static __static_initializer_1() {
    DataTableUtils.VALIDATOR_SELECTION_VALUES.set(null, Cres.get().getString('default'));
    DataTableUtils.VALIDATOR_SELECTION_VALUES.set(FieldConstants.VALIDATOR_ID, Cres.get().getString('dtIdValidator'));
    DataTableUtils.VALIDATOR_SELECTION_VALUES.set(FieldConstants.VALIDATOR_LIMITS, Cres.get().getString('dtLimitsValidator'));
    DataTableUtils.VALIDATOR_SELECTION_VALUES.set(FieldConstants.VALIDATOR_NON_NULL, Cres.get().getString('dtNonNullValidator'));
    DataTableUtils.VALIDATOR_SELECTION_VALUES.set(FieldConstants.VALIDATOR_REGEX, Cres.get().getString('dtRegexValidator'));
    DataTableUtils.VALIDATOR_SELECTION_VALUES.set(FieldConstants.VALIDATOR_EXPRESSION, Cres.get().getString('dtExpressionValidator'));
  }

  private static _init = false;

  public static initialize() {
    if (DataTableUtils._init) return;

    DataTableUtils.__static_initializer_0();
    DataTableUtils.__static_initializer_1();

    DataTableUtils._init = true;
  }

  constructor() {
    super();

    DataTableUtils.initialize();
  }

  static transferEncode(value: string | null): string | null {
    return TransferEncodingHelper.encodeFromString(value, 1);
  }

  public static transferDecode(value: string | null): string {
    try {
      return TransferEncodingHelper.decode(value);
    } catch (ex) {
      throw new Error("Error decoding string value '" + value + "'");
    }
  }

  public static getValidatorSelectionValues(): Map<string | null, string> {
    return DataTableUtils.VALIDATOR_SELECTION_VALUES;
  }

  public static getEditorSelectionValues(): Map<any, string> {
    return DataTableUtils.EDITOR_SELECTION_VALUES;
  }

  public static inlineData(table: DataTable, contextManager: ContextManager<Context<any, any>> | null, caller: CallerController) {
    if (table == null) {
      return;
    }

    for (const ff of table.getFormat()) {
      if (ff.getType() === FieldConstants.DATA_FIELD) {
        for (const rec of table) {
          const data = rec.getData(ff.getName());
          if (data != null) {
            data.fetchData(contextManager, caller);
            data.setId(null);
          }
        }
      }

      if (ff.getType() == FieldConstants.DATATABLE_FIELD) {
        for (const rec of table) {
          const dt = rec.getDataTable(ff.getName());
          DataTableUtils.inlineData(dt, contextManager, caller);
        }
      }
    }
  }

  public static isEncodedTable(str: string): boolean {
    return str != null && str.length > 0 && str.charAt(0) == DataTableUtils.ELEMENT_START;
  }

  public static async processBindings(table: DataTable, evaluator: Evaluator, errorCollector: ErrorCollector | undefined = undefined, split = false): Promise<DataTable> {
    if (!table) {
      return table;
    }

    if (table.getFormat().getBindings().length == 0) {
      return table;
    }

    let result;
    if (split) {
      result = table.clone();
      result.splitFormat();
    } else {
      result = table;
    }

    evaluator.getDefaultResolver().setDefaultTable(result);

    const processor = new DefaultBindingProcessor(new DataTableBindingProvider(result, errorCollector), evaluator);

    await processor.start();

    return result;
  }
}
