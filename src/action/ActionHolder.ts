import DataTable from '../datatable/DataTable';
import ServerContext from '../server/ServerContext';

export default class ActionHolder {
  private context: ServerContext | null = null;
  private actionName: string | null = null;
  private initialParameters: DataTable | null = null;
  private inputData: DataTable | null = null;

  public getActionName(): string | null {
    return this.actionName;
  }

  public getContext(): ServerContext | null {
    return this.context;
  }

  public getInitialParameters(): DataTable | null {
    return this.initialParameters;
  }

  public getInputData(): DataTable | null {
    return this.inputData;
  }

  public setActionName(actionName: string): void {
    this.actionName = actionName;
  }

  public setContext(context: ServerContext): void {
    this.context = context;
  }

  public setInitialParameters(initialParameters: DataTable): void {
    this.initialParameters = initialParameters;
  }

  public setInputData(inputData: DataTable): void {
    this.inputData = inputData;
  }
}
