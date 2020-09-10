import ByteBuffer from 'bytebuffer';
import BlockingChannel from './BlockingChannel';
import JObject from './java/JObject';
export default class WebSocketBlockingChannel extends JObject implements BlockingChannel {
    private webSocket;
    private usesCompression;
    private static readonly BUFFER_SIZE;
    private inputBuffer;
    constructor(webSocket: WebSocket);
    setListener(listener: () => void): void;
    close(): void;
    flush(): void;
    getChannelAddress(): string;
    isOpen(): boolean;
    isUsesCompression(): boolean;
    read(dst: ByteBuffer): number;
    setUsesCompression(usesCompression: boolean): void;
    write(src: ByteBuffer): number;
}
