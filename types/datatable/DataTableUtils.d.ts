import JObject from '../util/java/JObject';
import DataTable from './DataTable';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import Evaluator from '../expression/Evaluator';
import ErrorCollector from '../util/ErrorCollector';
import Context from '../context/Context';
export declare enum FilterMode {
    TEXT = 0,
    REGEXP = 1,
    EXPRESSION = 2
}
export default class DataTableUtils extends JObject {
    static readonly NAMING_ENVIRONMENT_SHORT_DATA = "short";
    static readonly NAMING_ENVIRONMENT_FULL_DATA = "full";
    static readonly ELEMENT_START = "\u001C";
    static readonly ELEMENT_END = "\u001D";
    static readonly ELEMENT_NAME_VALUE_SEPARATOR = "\u001E";
    static readonly ELEMENT_VISIBLE_START = "<";
    static readonly ELEMENT_VISIBLE_END = ">";
    static readonly ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR = "=";
    static readonly DATA_TABLE_NULL = "\u001A";
    static readonly DATA_TABLE_VISIBLE_NULL = "<NULL>";
    static readonly EDITOR_SELECTION_VALUES: Map<string | null, string>;
    private static __static_initializer_0;
    static readonly VALIDATOR_SELECTION_VALUES: Map<string | null, string>;
    private static __static_initializer_1;
    private static _init;
    static initialize(): void;
    constructor();
    static transferEncode(value: string | null): string | null;
    static transferDecode(value: string | null): string;
    static getValidatorSelectionValues(): Map<string | null, string>;
    static getEditorSelectionValues(): Map<any, string>;
    static inlineData(table: DataTable, contextManager: ContextManager<Context<any, any>> | null, caller: CallerController): void;
    static isEncodedTable(str: string): boolean;
    static processBindings(table: DataTable, evaluator: Evaluator, errorCollector?: ErrorCollector | undefined, split?: boolean): Promise<DataTable>;
}
