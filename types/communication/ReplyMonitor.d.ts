import Command from './Command';
import JObject from '../util/java/JObject';
export default class ReplyMonitor<C extends Command, R extends Command> extends JObject {
    private command;
    private reply;
    private readonly startTime;
    private timeoutReset;
    private terminated;
    private signalAll;
    constructor(command: C);
    setReply(reply: R | null): void;
    terminate(): void;
    reset(): void;
    waitReply(timeout: number): Promise<boolean>;
    getCommand(): C;
    getReply(): R | null;
    getStartTime(): number;
    toString(): string;
}
