import Command from './Command';
import CommandParser from './CommandParser';
import CommandParserListener from './CommandParserListener';
import ByteBuffer from 'bytebuffer';
import JObject from '../util/java/JObject';
import BlockingChannel from '../util/BlockingChannel';
export default abstract class AbstractCommandParser<C extends Command> extends JObject implements CommandParser<C> {
    private static readonly DEFAULT_SIZE;
    private data;
    private listener;
    reset(): void;
    getData(): ByteBuffer;
    clearData(): ByteBuffer;
    addData(dataByte: number): void;
    setListener(listener: CommandParserListener): void;
    protected getListener(): CommandParserListener | null;
    toString(): string;
    abstract readCommand(): C | null;
    abstract getChannel(): BlockingChannel;
}
