import JObject from '../util/java/JObject';
import DataTable from './DataTable';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import Evaluator from '../expression/Evaluator';
import ErrorCollector from '../util/ErrorCollector';
export declare enum FilterMode {
    TEXT = 0,
    REGEXP = 1,
    EXPRESSION = 2
}
export default class DataTableUtils extends JObject {
    static readonly NAMING_ENVIRONMENT_SHORT_DATA: string;
    static readonly NAMING_ENVIRONMENT_FULL_DATA: string;
    static readonly ELEMENT_START: string;
    static readonly ELEMENT_END: string;
    static readonly ELEMENT_NAME_VALUE_SEPARATOR: string;
    static readonly ELEMENT_VISIBLE_START: string;
    static readonly ELEMENT_VISIBLE_END: string;
    static readonly ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR: string;
    static readonly DATA_TABLE_NULL: string;
    static readonly DATA_TABLE_VISIBLE_NULL: string;
    private static readonly EDITOR_SELECTION_VALUES;
    static __static_initializer_0(): void;
    private static readonly VALIDATOR_SELECTION_VALUES;
    static __static_initializer_1(): void;
    private static _init;
    static initialize(): void;
    constructor();
    static transferEncode(value: string | null): string | null;
    static transferDecode(value: string | null): string;
    static getValidatorSelectionValues(): Map<string | null, string>;
    static getEditorSelectionValues(): Map<any, string>;
    static inlineData(tgtVal: DataTable, contextManager: ContextManager<any> | null, caller: CallerController): void;
    static isEncodedTable(str: string): boolean;
    static processBindings(table: DataTable, evaluator: Evaluator, errorCollector: ErrorCollector | null): DataTable;
}
