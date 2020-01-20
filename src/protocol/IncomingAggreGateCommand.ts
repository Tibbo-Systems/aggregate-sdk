import AggreGateCommand from './AggreGateCommand';
import ByteBuffer from 'bytebuffer';
import TransferEncodingHelper from '../datatable/encoding/TransferEncodingHelper';

export default class IncomingAggreGateCommand extends AggreGateCommand {
  private static readonly EMPTY_ID: string = '';

  protected parameters: Array<string> | null = null;

  constructor(data: ByteBuffer) {
    super(data);
    this.parse();
  }

  protected parse(): void {
    if (this.isContentEmpty()) {
      throw new Error('Zero length command received');
    }

    if (this.data.offset < TransferEncodingHelper.LARGE_DATA_SIZE) {
      this.parameters = this.getContent().split(AggreGateCommand.CLIENT_COMMAND_SEPARATOR.charAt(0));
    } else {
      //TODO not implemented yet
      // this.parseBigCommand();
    }
  }

  /* private parseBigCommand(): void {
         ByteBuffer
         b = ByteBuffer.wrap(buf);
         parameters = new ArrayList<>();

         int
         position = 0;
         Integer
         end = null;

         while (b.hasRemaining()) {
             char
             currentChar = (char)
             b.get();
             if (currentChar == AggreGateCommand.CLIENT_COMMAND_SEPARATOR.charAt(0)) {
                 parameters.add(StringWrapper.valueOf(new String(buf, position, b.position() - position - 1, StringUtils.UTF8_CHARSET)));
                 position = b.position();
             } else {
                 if (currentChar == Character.MIN_VALUE && end == null) {
                     end = b.position() - 1;
                 }

                 if (currentChar != Character.MIN_VALUE && end != null) {
                     end = null;
                 }
             }

             if (!b.hasRemaining()) {
                 if (end == null)
                     end = buf.length;

                 parseData(position);
             }
         }
     }

     private parseData(position: number): void {
         try {
             CharsetDecoder
             cd = StringUtils.UTF8_CHARSET.newDecoder();
             char[]
             ca = new char[buf.length];
             ((ArrayDecoder)
             cd
         ).
             decode(buf, position, buf.length - position, ca);
             buf = null;

             String
             parameter = new String(); // can't touch this! If it replaced on "", all empty string will have buf value, because of below dirty hack with reflection!!!
             stringValue.set(parameter, ca);
             parameters.add(StringWrapper.valueOf(parameter));
         } catch (OutOfMemoryError
     |
         Exception
         ex
     )
         {
             Log.COMMANDS.warn(ex.message, ex);
         }
     }*/

  public getNumberOfParameters(): number {
    return this.parameters != null ? this.parameters.length : 0;
  }

  public hasParameter(parameter: number): boolean {
    return parameter < this.getNumberOfParameters();
  }

  public getParameter(parameter: number): string {
    if (parameter > this.getNumberOfParameters()) {
      throw new Error('Trying to access parameter #' + parameter + ' of command that has only ' + this.getNumberOfParameters() + ' parameters');
    } else {
      if (this.parameters != null) return this.parameters[parameter];
      else throw new Error('Invalid array');
    }
  }

  public isReply(): boolean {
    if (this.getParameter(0).length > 1) {
      throw new Error('Invalid command type: ' + this.getParameter(0));
    }

    return this.getParameter(0).charAt(0) == AggreGateCommand.COMMAND_CODE_REPLY;
  }

  public isMessage(): boolean {
    if (this.getParameter(0).length > 1) {
      throw new Error('Invalid command type: ' + this.getParameter(0));
    }

    return this.getParameter(0).charAt(0) == AggreGateCommand.COMMAND_CODE_MESSAGE;
  }

  public getReplyCode(): string {
    if (!this.isReply()) {
      throw new Error('Command is not a reply');
    }

    return this.getParameter(AggreGateCommand.INDEX_REPLY_CODE);
  }

  public getMessageCode(): string {
    if (!this.isMessage()) {
      throw new Error('Command is not a message');
    }

    return this.getParameter(AggreGateCommand.INDEX_MESSAGE_CODE);
  }

  public getEncodedDataTable(index: number): string {
    return this.getParameter(index);
  }

  public getEncodedDataTableFromReply(): string {
    if (!this.isReply()) {
      throw new Error('Command is not a reply');
    }

    return this.getEncodedDataTable(AggreGateCommand.INDEX_DATA_TABLE_IN_REPLY);
  }

  public getEncodedDataTableFromOperationMessage(): string {
    if (!this.isMessage()) {
      throw new Error('Command is not a message');
    }

    return this.getEncodedDataTable(AggreGateCommand.INDEX_OPERATION_MESSAGE_DATA_TABLE);
  }

  public getEncodedDataTableFromEventMessage(): string {
    if (!this.isMessage()) {
      throw new Error('Command is not a message');
    }

    return this.getEncodedDataTable(AggreGateCommand.INDEX_EVENT_DATA_TABLE);
  }

  public getQueueName(): string | null {
    if (!this.isMessage() || this.getMessageCode().charAt(0) != AggreGateCommand.MESSAGE_CODE_OPERATION) {
      return null;
    }

    const opcode: string = this.getParameter(AggreGateCommand.INDEX_OPERATION_CODE).charAt(0);
    if (opcode != AggreGateCommand.COMMAND_OPERATION_SET_VAR && opcode != AggreGateCommand.COMMAND_OPERATION_CALL_FUNCTION) {
      return null;
    }

    if (this.hasParameter(AggreGateCommand.INDEX_OPERATION_MESSAGE_QUEUE_NAME)) {
      return TransferEncodingHelper.decode(this.getParameter(AggreGateCommand.INDEX_OPERATION_MESSAGE_QUEUE_NAME));
    }

    return null;
  }

  public getFlags(): string | null {
    if (!this.isMessage() || this.getMessageCode().charAt(0) != AggreGateCommand.MESSAGE_CODE_OPERATION) {
      return null;
    }

    const opcode: string = this.getParameter(AggreGateCommand.INDEX_OPERATION_CODE).charAt(0);
    if (opcode != AggreGateCommand.COMMAND_OPERATION_CALL_FUNCTION) {
      return null;
    }

    if (this.hasParameter(AggreGateCommand.INDEX_OPERATION_MESSAGE_FLAGS)) {
      return TransferEncodingHelper.decode(this.getParameter(AggreGateCommand.INDEX_OPERATION_MESSAGE_FLAGS));
    }

    return null;
  }

  public getId(): string {
    return this.getNumberOfParameters() > AggreGateCommand.INDEX_ID ? this.getParameter(AggreGateCommand.INDEX_ID) : IncomingAggreGateCommand.EMPTY_ID;
  }

  public isAsync(): boolean {
    return this.isMessage();
  }
}
