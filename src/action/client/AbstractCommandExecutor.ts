import ActionCommandExecutor from './ActionCommandExecutor';
import GenericActionCommand from '../GenericActionCommand';
import Operation from './Operation';
import GenericActionResponse from '../GenericActionResponse';

export default abstract class AbstractCommandExecutor implements ActionCommandExecutor {
  private commandType: string;

  public constructor(commandType: string) {
    this.commandType = commandType;
  }

  public canExecute(cmd: GenericActionCommand): boolean {
    if (cmd == null) {
      return false;
    }

    return this.commandType === cmd.getType();
  }

  public cancel(): void {}

  abstract execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse>;
}
