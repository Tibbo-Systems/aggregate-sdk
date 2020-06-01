import GenericActionCommand from '../GenericActionCommand';
import Operation from './Operation';
import GenericActionResponse from '../GenericActionResponse';
import ActionCommandExecutor from './ActionCommandExecutor';

export default class ExecutionHelper {
  private static EXECUTOR_CLASSES = new Map<string, any>(); // only ActionCommandExecutor.constructor

  static async executeCommand(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse> {
    const executor = this.getExecutorByCommand(cmd);
    return executor.execute(originator, cmd);
  }

  public static registerExecutor(operation: string, executorClass: any): void {
    ExecutionHelper.EXECUTOR_CLASSES.set(operation, executorClass);
  }

  protected static getExecutorByCommand(cmd: GenericActionCommand): ActionCommandExecutor {
    let executor;
    const executorClass = ExecutionHelper.EXECUTOR_CLASSES.get(cmd.getType());
    if (executorClass != null) {
      try {
        executor = Reflect.construct(executorClass, []) as ActionCommandExecutor;
      } catch (ex) {
        throw new Error(ex);
      }
    }

    if (executor == null || !executor.canExecute(cmd)) {
      throw new Error('Unsupported action command: ' + cmd.getType());
    }
    return executor;
  }
}
