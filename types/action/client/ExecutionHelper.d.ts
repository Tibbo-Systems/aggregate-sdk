import GenericActionCommand from '../GenericActionCommand';
import Operation from './Operation';
import GenericActionResponse from '../GenericActionResponse';
import ActionCommandExecutor from './ActionCommandExecutor';
export default class ExecutionHelper {
    private static EXECUTOR_CLASSES;
    static executeCommand(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse>;
    static registerExecutor(operation: string, executorClass: any): void;
    protected static getExecutorByCommand(cmd: GenericActionCommand): ActionCommandExecutor;
}
