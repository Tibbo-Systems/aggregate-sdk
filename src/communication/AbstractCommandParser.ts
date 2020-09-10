import Command from './Command';
import CommandParser from './CommandParser';
import CommandParserListener from './CommandParserListener';
import ByteBuffer from 'bytebuffer';
import JObject from '../util/java/JObject';
import BlockingChannel from '../util/BlockingChannel';

export default abstract class AbstractCommandParser<C extends Command> extends JObject implements CommandParser<C> {
  private static readonly DEFAULT_SIZE: number = 1024;

  private data: ByteBuffer = new ByteBuffer(AbstractCommandParser.DEFAULT_SIZE);

  private listener: CommandParserListener | null = null;

  public reset(): void {
    if (this.data != null) this.data.reset();
  }

  public getData(): ByteBuffer {
    return this.data;
  }

  public clearData(): ByteBuffer {
    const dataArray = this.data.copy(0, this.data.offset);
    this.data.clear();
    return dataArray;
  }

  public addData(dataByte: number): void {
    this.data.writeByte(dataByte);
  }

  public setListener(listener: CommandParserListener): void {
    this.listener = listener;
  }

  protected getListener(): CommandParserListener | null {
    return this.listener;
  }

  public toString(): string {
    return this.data.toString();
  }

  abstract readCommand(): C | null;

  abstract getChannel(): BlockingChannel;
}
