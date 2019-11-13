import Command from './Command';
import BufferedCommandParser from './BufferedCommandParser';
import BlockingChannel from '../util/BlockingChannel';
export default abstract class SimpleCommandParser<C extends Command> extends BufferedCommandParser<C> {
    private startChar;
    private endChar;
    private endChar2;
    private needBoth;
    private started;
    private waitingEndChar2;
    private full;
    constructor(channel: BlockingChannel, startChar: number, endChar: number);
    protected abstract createCommandFromBufferContent(): C;
    clearCommand(): void;
    protected buildCommand(): C | null;
    protected commandEnded(cur: number): boolean;
    isFull(): boolean;
}
