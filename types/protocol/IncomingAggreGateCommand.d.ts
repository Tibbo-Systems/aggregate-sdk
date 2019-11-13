import AggreGateCommand from './AggreGateCommand';
import ByteBuffer from 'bytebuffer';
export default class IncomingAggreGateCommand extends AggreGateCommand {
    private static readonly EMPTY_ID;
    protected parameters: Array<string> | null;
    constructor(data: ByteBuffer);
    protected parse(): void;
    getNumberOfParameters(): number;
    hasParameter(parameter: number): boolean;
    getParameter(parameter: number): string;
    isReply(): boolean;
    isMessage(): boolean;
    getReplyCode(): string;
    getMessageCode(): string;
    getEncodedDataTable(index: number): string;
    getEncodedDataTableFromReply(): string;
    getEncodedDataTableFromOperationMessage(): string;
    getEncodedDataTableFromEventMessage(): string;
    getQueueName(): string | null;
    getFlags(): string | null;
    getId(): string;
    isAsync(): boolean;
}
