import BlockingChannel from '../util/BlockingChannel';
import ByteBuffer from 'bytebuffer';
import Cres from '../Cres';
import Log from '../Log';
import JObject from '../util/java/JObject';

export default abstract class Command extends JObject {
  private timeout: number | null = null;

  protected data: ByteBuffer;

  protected completed = false;

  constructor(data: ByteBuffer = new ByteBuffer(32)) {
    super();
    this.data = data;
  }

  public header(): string | null {
    return null;
  }

  public footer(): string | null {
    return null;
  }

  public getContent(): string {
    return this.data.toUTF8();
  }

  public isContentEmpty(): boolean {
    return this.data.limit <= 0;
  }

  public getId(): string | null {
    return null;
  }

  public isAsync(): boolean {
    return false;
  }

  public getTimeout(): number | null {
    return this.timeout;
  }

  public setTimeout(timeout: number | null): void {
    this.timeout = timeout;
  }

  public add(data: string): void {
    this.data.append(data, 'utf8');
  }

  public size(): number {
    return this.data.offset;
  }

  send(byteChannel: BlockingChannel, encapsulate = true): void {
    if (byteChannel == null || !byteChannel.isOpen()) {
      throw new Error(Cres.get().getString('disconnected'));
    }

    try {
      const header: string | null = encapsulate ? this.header() : null;
      const footer: string | null = encapsulate ? this.footer() : null;

      const size: number = (header != null ? header.length : 0) + this.size() + (footer != null ? footer.length : 0);

      const buff: ByteBuffer = ByteBuffer.allocate(size);

      if (header != null) {
        buff.append(header, 'utf8');
      }
      this.data.copyTo(buff, buff.offset, 0, this.data.offset);
      buff.offset += this.data.offset;
      if (footer != null) {
        buff.append(footer, 'utf8');
      }
      buff.flip();

      byteChannel.write(buff);
    } catch (error) {
      Log.COMMANDS.error(error);
      throw new Error(Cres.get().getString('disconnected'));
    }
  }

  public complete(): void {
    this.completed = true;
  }
}
