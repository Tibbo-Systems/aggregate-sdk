import AbstractOperation from './AbstractOperation';
import DataTable from '../../datatable/DataTable';
import UserSettings from '../../util/UserSettings';
import StepActionInterceptor from '../StepActionInterceptor';
import RemoteConnector from '../../util/RemoteConnector';
import ActionWorker from './ActionWorker';
import Context from '../../context/Context';
export default class InvokeActionOperation extends AbstractOperation {
    protected readonly actionName: string;
    protected readonly userSettings: UserSettings | null;
    protected readonly stepInterceptor: StepActionInterceptor;
    private connector;
    private actionWorker;
    private default;
    private enabled;
    private executionGroup;
    private executor;
    private defaultParameters;
    constructor(name: string, description: string, iconId: string, group: string, context: Context<any, any>, invokerContext: Context<any, any>, userSettings?: UserSettings | null, interceptor?: StepActionInterceptor | null);
    getConnector(): RemoteConnector | null;
    setConnector(connector: RemoteConnector): void;
    getDefaultParameters(): DataTable | null;
    interrupt(): void;
    execute(params?: DataTable | null): Promise<void>;
    private getCallerController;
    isEnabled(): boolean;
    isDefault(): boolean;
    getActionWorker(): ActionWorker | null;
}
