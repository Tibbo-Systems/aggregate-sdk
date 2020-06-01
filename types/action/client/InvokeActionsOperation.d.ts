import DataTable from '../../datatable/DataTable';
import UserSettings from '../../util/UserSettings';
import RemoteConnector from '../../util/RemoteConnector';
import Context from '../../context/Context';
import InvokeActionOperation from './InvokeActionOperation';
export default class InvokeActionsOperation extends InvokeActionOperation {
    private readonly contextActions;
    constructor(name: string, description: string, iconId: string, group: string, context: Context<any, any>, userSettings?: UserSettings | null, connector?: RemoteConnector | null);
    addAction(contextPath: string, actionName: string, input: DataTable): void;
    execute(params: DataTable): Promise<void>;
}
