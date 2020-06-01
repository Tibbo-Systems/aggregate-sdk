import ActionCommandExecutor from './ActionCommandExecutor';
import GenericActionCommand from '../GenericActionCommand';
import Operation from './Operation';
import GenericActionResponse from '../GenericActionResponse';
export default abstract class AbstractCommandExecutor implements ActionCommandExecutor {
    private commandType;
    constructor(commandType: string);
    canExecute(cmd: GenericActionCommand): boolean;
    cancel(): void;
    abstract execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse>;
}
