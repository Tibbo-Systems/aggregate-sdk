import DataTable from '../datatable/DataTable';
import ServerContext from '../server/ServerContext';
export default class ActionHolder {
    private context;
    private actionName;
    private initialParameters;
    private inputData;
    getActionName(): string | null;
    getContext(): ServerContext | null;
    getInitialParameters(): DataTable | null;
    getInputData(): DataTable | null;
    setActionName(actionName: string): void;
    setContext(context: ServerContext): void;
    setInitialParameters(initialParameters: DataTable): void;
    setInputData(inputData: DataTable): void;
}
