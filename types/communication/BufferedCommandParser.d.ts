import Command from './Command';
import AbstractCommandParser from './AbstractCommandParser';
import ByteBuffer from 'bytebuffer';
import BlockingChannel from '../util/BlockingChannel';
export default abstract class BufferedCommandParser<C extends Command> extends AbstractCommandParser<C> {
    private static readonly BUFFER_SIZE;
    protected readonly buffer: ByteBuffer;
    protected channel: BlockingChannel;
    constructor(channel: BlockingChannel);
    protected commandCompleted(): boolean;
    readCommand(): C | null;
    protected abstract buildCommand(): C | null;
    protected abstract commandEnded(cur: number): boolean;
    getChannel(): BlockingChannel;
}
