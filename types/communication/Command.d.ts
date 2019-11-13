import BlockingChannel from '../util/BlockingChannel';
import ByteBuffer from 'bytebuffer';
import JObject from '../util/java/JObject';
export default abstract class Command extends JObject {
    private timeout;
    protected data: ByteBuffer;
    protected completed: boolean;
    constructor(data?: ByteBuffer);
    header(): string | null;
    footer(): string | null;
    getContent(): string;
    isContentEmpty(): boolean;
    getId(): string | null;
    isAsync(): boolean;
    getTimeout(): number | null;
    setTimeout(timeout: number | null): void;
    add(data: string): void;
    size(): number;
    send(byteChannel: BlockingChannel, encapsulate?: boolean): void;
    complete(): void;
}
