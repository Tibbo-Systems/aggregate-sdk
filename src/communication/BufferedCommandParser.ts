import Command from './Command';
import AbstractCommandParser from './AbstractCommandParser';
import ByteBuffer from 'bytebuffer';
import BlockingChannel from '../util/BlockingChannel';
import Log from '../Log';
import Cres from '../Cres';

export default abstract class BufferedCommandParser<C extends Command> extends AbstractCommandParser<C> {
  //we cannot use this constant. See WebsocketBlockingChannel
  private static readonly BUFFER_SIZE: number = 36000;

  protected readonly buffer: ByteBuffer = ByteBuffer.allocate(BufferedCommandParser.BUFFER_SIZE);
  protected channel: BlockingChannel;

  constructor(channel: BlockingChannel) {
    super();
    this.channel = channel;
    this.buffer.flip();
  }

  protected commandCompleted(): boolean {
    while (this.buffer.remaining() > 0) {
      try {
        const cur: number = this.buffer.readByte();

        if (this.commandEnded(cur)) {
          return true;
        }
      } catch (error) {
        Log.COMMANDS.debug('Buffer underflow error in ' + this.toString());
        return false;
      }
    }

    return false;
  }

  public readCommand(): C | null {
    let read: number;

    if (this.commandCompleted()) {
      return this.buildCommand();
    }

    while (true) {
      this.buffer.clear();

      read = this.getChannel().read(this.buffer);

      this.buffer.flip();

      if (read > 0) {
        const listener = this.getListener();
        if (listener != null) {
          listener.newDataReceived();
        }
      } else {
        break;
      }

      if (this.commandCompleted()) {
        return this.buildCommand();
      }
    }

    if (read == -1) {
      this.getChannel().close();
      throw new Error(Cres.get().getString('disconnected'));
    }

    return this.buildCommand();
  }

  protected abstract buildCommand(): C | null;

  protected abstract commandEnded(cur: number): boolean;

  public getChannel(): BlockingChannel {
    return this.channel;
  }
}
