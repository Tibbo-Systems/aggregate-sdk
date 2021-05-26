import CallerController from '../context/CallerController';
import DataTable from '../datatable/DataTable';
import Context from '../context/Context';
import ActionIdentifier from './ActionIdentifier';
import ActionContext from './ActionContext';
import ContextManager from '../context/ContextManager';
import ErrorCollector from '../util/ErrorCollector';
import ServerContext from '../server/ServerContext';
import ActionHolder from './ActionHolder';
import ActionExecutionMode from './ActionExecutionMode';
export default class ServerActionHelper {
    static readonly ENV_VARIABLE_PARAMETERS: string;
    private static readonly FIELD_CONTEXT;
    private static readonly FIELD_SELECT;
    private static readonly CONTEXTS_FORMAT;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    static fillRequestCache(actionContext: ActionContext, initialParameters: DataTable | null, inputData: DataTable | null, environment: Map<string, any> | null, caller: CallerController, cm: ContextManager<any> | null, con: Context<any, any>, collector?: ErrorCollector): void;
    static executeNonInteractively(context: Context<any, any>, action: string, initialParameters: DataTable, inputData: DataTable, environment: Map<string, any>, mode: ActionExecutionMode, caller: CallerController): Promise<Map<string, string | null>>;
    private static buildResponse;
    static initActions(caller: CallerController, actions: Array<ActionHolder>, con: ServerContext): ActionIdentifier | null;
}
