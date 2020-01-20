import Context from '../context/Context';
import DataTable from '../datatable/DataTable';
import ServerActionInput from './ServerActionInput';
import TableFormat from '../datatable/TableFormat';
import ActionIdentifier from './ActionIdentifier';
import GenericActionCommand from './GenericActionCommand';
import GenericActionResponse from './GenericActionResponse';
import ActionExecutionMode from './ActionExecutionMode';
import ErrorCollector from '../util/ErrorCollector';
import CallerController from '../context/CallerController';
export default abstract class ActionUtils {
    static readonly FORMAT_DND_ACTION: TableFormat;
    static readonly FORMAT_NORMAL_ACTION: TableFormat;
    private static ACTION_INITIALIZER;
    static readonly DESCRIPTIONS: Map<string, string>;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    static readonly FIELD_ACTION_EXECUTION_PARAMETERS: string;
    static readonly FIELD_ACTION_FROM_CONTEXT: string;
    static readonly FIELD_ACTION_TARGET_CONTEXT: string;
    static checkResponseCode(result: string): void;
    static createDndActionParametersContext(acceptedContext: Context<any, any>): DataTable;
    static createDndActionParameters(accepterContextPath: string): DataTable;
    static createActionInput(executionParameters: DataTable): ServerActionInput;
    static initActionCreate(context: Context<any, any>, actionName: string, initialParameters: ServerActionInput, inputData: DataTable, mode: ActionExecutionMode, callerController: CallerController): Promise<ActionIdentifier>;
    static initAction(context: Context<any, any>, actionName: string, initialParameters: ServerActionInput, inputData: DataTable | null, environment: Map<string, any> | null, mode: ActionExecutionMode, callerController: CallerController | null, collector: ErrorCollector | null): Promise<ActionIdentifier>;
    static stepAction(context: Context<any, any>, actionId: ActionIdentifier, actionResponse: GenericActionResponse | null, callerController: CallerController | null): Promise<GenericActionCommand | null>;
}
