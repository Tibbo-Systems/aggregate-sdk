import DataTable from '../../datatable/DataTable';
import UserSettings from '../../util/UserSettings';
import RemoteConnector from '../../util/RemoteConnector';
import ActionWorker from './ActionWorker';
import Context from '../../context/Context';
import InvokeActionOperation from './InvokeActionOperation';
import FunctionDefinition from '../../context/FunctionDefinition';
import UtilitiesContextConstants from '../../server/UtilitiesContextConstants';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataRecord from '../../datatable/DataRecord';
import ActionIdentifier from '../ActionIdentifier';
import GenericActionResponse from '../GenericActionResponse';

class ContextActionHolder {
  public contextPath: string;
  public actionName: string;
  public parameters: DataTable;

  constructor(contextPath: string, actionName: string, parameters: DataTable) {
    this.contextPath = contextPath;
    this.actionName = actionName;
    this.parameters = parameters;
  }
}

export default class InvokeActionsOperation extends InvokeActionOperation {
  private readonly contextActions: Array<ContextActionHolder> = new Array<ContextActionHolder>();

  constructor(name: string, description: string, iconId: string, group: string, context: Context<any, any>, userSettings: UserSettings | null = null, connector: RemoteConnector | null = null) {
    super(name, description, iconId, group, context, context, userSettings);
    if (connector != null) this.setConnector(connector);
  }

  public addAction(contextPath: string, actionName: string, input: DataTable): void {
    this.contextActions.push(new ContextActionHolder(contextPath, actionName, input));
  }

  async execute(params: DataTable): Promise<void> {
    const _this = this;
    const actionWorker = this.getActionWorker();
    if (actionWorker != null) {
      actionWorker.cancel();
    }
    const connector = this.getConnector();
    const aw = new (class MyActionWorker extends ActionWorker {
      public async run(): Promise<void> {
        if (_this.contextActions.length === 0) {
          return;
        }

        const utilsContext = _this.getContext();

        const fd = utilsContext.getFunctionDefinition(UtilitiesContextConstants.F_INIT_ACTIONS) as FunctionDefinition;

        const actions = new SimpleDataTable(fd.getInputFormat()) as DataTable;

        for (const contextAction of _this.contextActions) {
          const rec = actions.addRecord() as DataRecord;
          rec.setValue(UtilitiesContextConstants.FIF_INIT_ACTIONS_CONTEXT, contextAction.contextPath);
          rec.setValue(UtilitiesContextConstants.FIF_INIT_ACTIONS_ACTION_NAME, contextAction.actionName);
          rec.setValue(UtilitiesContextConstants.FIF_INIT_ACTIONS_PARAMETERS, contextAction.parameters);
        }

        const actionId = new ActionIdentifier((await utilsContext.callFunction(fd.getName(), actions)).rec().getString(UtilitiesContextConstants.FOF_INIT_ACTIONS_ACTION_ID)) as ActionIdentifier;

        const resp = new GenericActionResponse(params) as GenericActionResponse;

        await this.stepAction(resp, actionId);

        return;
      }
    })('initBatchAction', params, this.getContext(), connector ? connector.getCallerController() : undefined, this.actionName, this.stepInterceptor, this);
    return aw.run();
  }
}
