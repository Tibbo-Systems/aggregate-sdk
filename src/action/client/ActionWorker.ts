import DataTable from '../../datatable/DataTable';
import ActionIdentifier from '../ActionIdentifier';
import ActionUtils from '../ActionUtils';
import Log from '../../Log';
import Context from '../../context/Context';
import ActionExecutionMode from '../ActionExecutionMode';
import ServerActionInput from '../ServerActionInput';
import CallerController from '../../context/CallerController';
import GenericActionResponse from '../GenericActionResponse';
import GenericActionCommand from '../GenericActionCommand';
import StepActionInterceptor from '../StepActionInterceptor';
import ExecutionHelper from './ExecutionHelper';
import Operation from './Operation';

export default class ActionWorker {
  private readonly params: DataTable | null;
  private interrupted = false;
  private cancelled = false;
  private context: Context<any, any>;
  private controller?: CallerController;
  private actionName: string;
  private readonly stepInterceptor: StepActionInterceptor;
  private operation: Operation;

  constructor(name: string, params: DataTable | null, context: Context<any, any>, controller: CallerController | undefined, actionName: string, stepInterceptor: StepActionInterceptor, operation: Operation) {
    this.params = params;
    this.context = context;
    this.controller = controller;
    this.actionName = actionName;
    this.stepInterceptor = stepInterceptor;
    this.operation = operation;
  }

  async run(): Promise<void> {
    try {
      let serverActionInput;
      if (this.params) serverActionInput = new ServerActionInput(this.params);
      else serverActionInput = new ServerActionInput();
      const actionId = await ActionUtils.initAction(this.context, this.actionName, serverActionInput, null, null, new ActionExecutionMode(ActionExecutionMode.NORMAL), this.controller);

      if (actionId == null || actionId.getId().length === 0) {
        throw new Error('Unexpected actionId == NULL');
      }

      await this.stepAction(null, actionId);
    } catch (ex) {
      Log.CONTEXT_ACTIONS.info(ex);
      throw ex;
    }
  }

  protected async stepAction(resp: GenericActionResponse | null, actionId: ActionIdentifier): Promise<void> {
    let actionResponse = resp;

    let cmd = null;
    try {
      while (true) {
        if (this.interrupted) {
          break;
        }

        if (this.cancelled) {
          await ActionUtils.stepAction(this.context, actionId, null);
          break;
        }

        cmd = await ActionUtils.stepAction(this.context, actionId, actionResponse, this.controller);

        if (cmd == null) {
          break;
        }

        actionResponse = await this.processCommand(cmd);

        this.stepInterceptor.interceptActionResponse(actionResponse);

        actionResponse.setRequestId(cmd.getRequestId());

        if (cmd.isLast()) {
          break;
        }
      }

      this.stepInterceptor.afterLastStep();
    } catch (ex) {
      Log.CONTEXT_ACTIONS.info(cmd?.getTitle() ?? '', ex);
      throw ex;
    }
  }

  private async processCommand(cmd: GenericActionCommand): Promise<GenericActionResponse> {
    let resp = await ExecutionHelper.executeCommand(this.operation, cmd);

    if (resp == null) {
      resp = new GenericActionResponse(null);
    }

    resp.setRequestId(cmd.getRequestId());

    return resp;
  }

  interrupt() {
    this.interrupted = true;
    //   ExecutionHelper.requestCancel(this.operation);
  }

  start(): Promise<void> {
    return this.run().catch((reason) => {
      Log.CONTEXT_ACTIONS.error(reason);
    });
  }

  public cancel(): void {
    this.cancelled = true;
  }
}
