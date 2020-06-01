import AbstractOperation from './AbstractOperation';
import DataTable from '../../datatable/DataTable';
import UserSettings from '../../util/UserSettings';
import StepActionInterceptor from '../StepActionInterceptor';
import RemoteConnector from '../../util/RemoteConnector';
import ActionExecutor from './ActionExecutor';
import ActionWorker from './ActionWorker';
import Context from '../../context/Context';
import DefaultStepActionInterceptor from '../DefaultStepActionInterceptor';
import Runnable from '../../util/java/Runnable';
import CallerController from '../../context/CallerController';

export default class InvokeActionOperation extends AbstractOperation {
  protected readonly actionName: string;
  protected readonly userSettings: UserSettings | null;
  protected readonly stepInterceptor: StepActionInterceptor;

  private connector: RemoteConnector | null = null;

  private actionWorker: ActionWorker | null = null;

  private default = false;

  private enabled = true;

  private executionGroup = 0;

  private executor: ActionExecutor | null = null;

  private defaultParameters: DataTable | null = null;

  constructor(name: string, description: string, iconId: string, group: string, context: Context<any, any>, invokerContext: Context<any, any>, userSettings: UserSettings | null = null, interceptor: StepActionInterceptor | null = null) {
    super(name, description, iconId, group, context, invokerContext);
    this.actionName = name;
    this.userSettings = userSettings;
    this.stepInterceptor = interceptor != null ? interceptor : new DefaultStepActionInterceptor();
  }

  public getConnector(): RemoteConnector | null {
    return this.connector;
  }

  public setConnector(connector: RemoteConnector): void {
    this.connector = connector;
  }

  getDefaultParameters(): DataTable | null {
    return this.defaultParameters;
  }

  interrupt(): void {
    if (this.actionWorker != null) {
      this.actionWorker.interrupt();
    }
  }

  execute(params?: DataTable | null): Promise<void> {
    let parameters = this.defaultParameters;
    if (params) parameters = params;
    this.actionWorker = new ActionWorker(
      'Action: ' + this.getContext().getPath() + ':' + this.actionName,
      parameters != null ? parameters : this.defaultParameters,
      this.getContext(),
      this.getCallerController(this.connector),
      this.actionName,
      this.stepInterceptor,
      this
    );

    return this.actionWorker.start();
  }

  private getCallerController(connector: RemoteConnector | null): CallerController | undefined {
    return this.connector != null ? this.connector.getCallerController() : undefined;
  }

  isEnabled(): boolean {
    return this.enabled && super.isEnabled();
  }

  isDefault(): boolean {
    return this.default;
  }

  getActionWorker(): ActionWorker | null {
    return this.actionWorker;
  }
}
