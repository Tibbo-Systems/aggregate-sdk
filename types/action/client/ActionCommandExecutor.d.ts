import GenericActionCommand from '../GenericActionCommand';
import GenericActionResponse from '../GenericActionResponse';
import Operation from './Operation';
export default abstract class ActionCommandExecutor {
    canExecute(cmd: GenericActionCommand): boolean;
    abstract execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse>;
    cancel(): void;
}
