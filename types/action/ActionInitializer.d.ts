import DataTable from '../datatable/DataTable';
import ActionExecutionMode from './ActionExecutionMode';
import CallerController from '../context/CallerController';
import ActionIdentifier from './ActionIdentifier';
import Context from '../context/Context';
import ServerActionInput from './ServerActionInput';
import ErrorCollector from '../util/ErrorCollector';
export default interface ActionInitializer {
    initAction(context: Context<any, any>, actionName: string, initialParameters: ServerActionInput, inputData: DataTable | null, environment: Map<string, any> | null, mode: ActionExecutionMode, callerController?: CallerController, actionId?: string | null, collector?: ErrorCollector): Promise<ActionIdentifier>;
}
