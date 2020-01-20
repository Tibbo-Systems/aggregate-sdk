import AggreGateCommand from './AggreGateCommand';
import Log from '../Log';
import ByteBuffer from 'bytebuffer';
import TransferEncodingHelper from '../datatable/encoding/TransferEncodingHelper';

export default class OutgoingAggreGateCommand extends AggreGateCommand {
  private static readonly COMMAND_SEPARATOR = ByteBuffer.fromUTF8(AggreGateCommand.CLIENT_COMMAND_SEPARATOR).readByte();

  protected id: string | null = null;

  protected async = false;

  protected paramCount = 0;

  header(): string | null {
    return String.fromCharCode(AggreGateCommand.START_CHAR);
  }

  footer(): string | null {
    return String.fromCharCode(AggreGateCommand.END_CHAR);
  }

  getId(): string | null {
    return this.id;
  }

  isAsync(): boolean {
    return this.async;
  }

  setAsync(async: boolean) {
    this.async = async;
  }

  addParam(param: string): OutgoingAggreGateCommand {
    try {
      if (this.paramCount != 0) {
        this.data.writeByte(OutgoingAggreGateCommand.COMMAND_SEPARATOR);
      }
      if (this.paramCount == AggreGateCommand.INDEX_ID) {
        this.id = param;
      }
      if (param.length > TransferEncodingHelper.LARGE_DATA_SIZE) {
        //TODO not implemented yet
        throw new Error('TODO not implemented yet');
      } else {
        const paramBytes = ByteBuffer.fromUTF8(param);
        this.data.append(paramBytes);
      }
    } catch (e) {
      Log.COMMANDS.warn(e);
    }
    this.paramCount++;
    return this;
  }

  public constructReply(id: string, code: string, message?: string, details?: string): void {
    if (this.paramCount > 0) {
      throw new Error("Can't construct reply - parameters already added to command");
    }

    this.addParam(AggreGateCommand.COMMAND_CODE_REPLY);
    this.addParam(id);
    this.addParam(code);

    if (message) this.addParam(TransferEncodingHelper.encodeFromString(message) as string);

    if (details) this.addParam(TransferEncodingHelper.encodeFromString(details) as string);
  }

  public constructEvent(context: string, name: string, level: number, encodedDataTable: string, eventId: number, creationtime: Date, listener: number): void {
    this.id = '';

    this.setAsync(true);

    this.addParam(AggreGateCommand.COMMAND_CODE_MESSAGE);
    this.addParam(this.id);
    this.addParam(AggreGateCommand.MESSAGE_CODE_EVENT);
    this.addParam(context);
    this.addParam(name);
    this.addParam(String(level));
    this.addParam(eventId != null ? eventId.toString() : '');
    this.addParam(listener != null ? listener.toString() : '');
    this.addParam(encodedDataTable);
    this.addParam(creationtime != null ? String(creationtime.getTime()) : '');
  }
}
