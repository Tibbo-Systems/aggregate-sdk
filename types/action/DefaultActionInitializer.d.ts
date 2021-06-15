import ActionInitializer from './ActionInitializer';
import DataTable from '../datatable/DataTable';
import ActionExecutionMode from './ActionExecutionMode';
import CallerController from '../context/CallerController';
import ActionIdentifier from './ActionIdentifier';
import Context from '../context/Context';
import ServerActionInput from './ServerActionInput';
import ErrorCollector from '../util/ErrorCollector';
export default class DefaultActionInitializer implements ActionInitializer {
    initAction(context: Context<any, any>, actionName: string, initialParametrs: ServerActionInput, inputData: DataTable | null, environment: Map<string, any>, mode: ActionExecutionMode, callerController?: CallerController, actionId?: string | null, collector?: ErrorCollector): Promise<ActionIdentifier>;
}
