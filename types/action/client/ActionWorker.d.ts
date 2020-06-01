import DataTable from '../../datatable/DataTable';
import ActionIdentifier from '../ActionIdentifier';
import Context from '../../context/Context';
import CallerController from '../../context/CallerController';
import GenericActionResponse from '../GenericActionResponse';
import StepActionInterceptor from '../StepActionInterceptor';
import Operation from './Operation';
export default class ActionWorker {
    private readonly params;
    private interrupted;
    private cancelled;
    private context;
    private controller?;
    private actionName;
    private readonly stepInterceptor;
    private operation;
    constructor(name: string, params: DataTable | null, context: Context<any, any>, controller: CallerController | undefined, actionName: string, stepInterceptor: StepActionInterceptor, operation: Operation);
    run(): Promise<void>;
    protected stepAction(resp: GenericActionResponse | null, actionId: ActionIdentifier): Promise<void>;
    private processCommand;
    interrupt(): void;
    start(): Promise<void>;
    cancel(): void;
}
