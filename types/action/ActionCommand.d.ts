import StringIdentifier from './StringIdentifier';
import ActionResponse from './ActionResponse';
export default interface ActionCommand {
    isResponseValid(actionRequest: ActionResponse): boolean;
    getRequestId(): StringIdentifier | null;
    setBatchEntry(batchEntry: boolean): void;
    isBatchEntry(): boolean;
    clone(): ActionCommand;
    isInteractive(): boolean;
}
