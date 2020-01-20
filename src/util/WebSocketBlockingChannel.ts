import ByteBuffer from 'bytebuffer';
import BlockingChannel from './BlockingChannel';
import JObject from './java/JObject';

export default class WebSocketBlockingChannel extends JObject implements BlockingChannel {
  private webSocket: WebSocket;
  private usesCompression = false;

  private inputBuffer: ByteBuffer = new ByteBuffer(32);

  constructor(webSocket: WebSocket) {
    super();
    this.webSocket = webSocket;
  }

  public setListener(listener: () => void) {
    const _this = this;
    this.webSocket.onmessage = function(this: WebSocket, event: MessageEvent) {
      const message: ArrayBuffer = event.data;
      _this.inputBuffer.append(message);
      listener();
    };
  }

  close(): void {
    this.webSocket.close();
  }

  flush(): void {}

  getChannelAddress(): string {
    return '';
  }

  isOpen(): boolean {
    return true;
  }

  isUsesCompression(): boolean {
    return this.usesCompression;
  }

  read(dst: ByteBuffer): number {
    //TODO if you have problems with websocket - check WebSocketBlockingChanel.java
    if (this.inputBuffer.offset > 0) {
      this.inputBuffer.copyTo(dst, dst.offset, 0, this.inputBuffer.offset);
      dst.offset += this.inputBuffer.offset;
      const size = this.inputBuffer.offset;
      this.inputBuffer.clear();
      return size;
    }
    return 0;
  }

  setUsesCompression(usesCompression: boolean): void {
    this.usesCompression = usesCompression;
  }

  write(src: ByteBuffer): number {
    this.webSocket.send(src.toBuffer());
    return src.limit;
  }
}
