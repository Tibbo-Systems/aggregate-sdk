import GenericActionCommand from '../GenericActionCommand';
import GenericActionResponse from '../GenericActionResponse';
import Operation from './Operation';

export default abstract class ActionCommandExecutor {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canExecute(cmd: GenericActionCommand): boolean {
    return true;
  }

  abstract execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse>;

  cancel(): void {}
}
