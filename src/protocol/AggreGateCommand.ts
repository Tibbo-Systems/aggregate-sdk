import Command from '../communication/Command';
import DataTableUtils from '../datatable/DataTableUtils';
import ByteBuffer from 'bytebuffer';

export default abstract class AggreGateCommand extends Command {
  public static readonly START_CHAR: number = 0x02;
  public static readonly END_CHAR: number = 0x0d;

  public static readonly COMMAND_CODE_MESSAGE: string = 'M';
  public static readonly COMMAND_CODE_REPLY: string = 'R';

  public static readonly MESSAGE_CODE_START: string = 'S';
  public static readonly MESSAGE_CODE_OPERATION: string = 'O';
  public static readonly MESSAGE_CODE_EVENT: string = 'E';
  public static readonly MESSAGE_CODE_COMPRESSION: string = 'C';

  public static readonly COMMAND_OPERATION_GET_VAR: string = 'G';
  public static readonly COMMAND_OPERATION_SET_VAR: string = 'S';
  public static readonly COMMAND_OPERATION_CALL_FUNCTION: string = 'C';
  public static readonly COMMAND_OPERATION_ADD_EVENT_LISTENER: string = 'L';
  public static readonly COMMAND_OPERATION_REMOVE_EVENT_LISTENER: string = 'R';

  public static readonly INDEX_COMMAND_CODE: number = 0;
  public static readonly INDEX_ID: number = 1;

  public static readonly INDEX_MESSAGE_CODE: number = 2;

  public static readonly INDEX_START_PROTOCOL_VERSION: number = 3;
  public static readonly INDEX_START_COMPRESSION: number = 4;

  public static readonly INDEX_PROTOCOL_VERSION: number = 3;

  public static readonly INDEX_OPERATION_CODE: number = 3;
  public static readonly INDEX_OPERATION_CONTEXT: number = 4;
  public static readonly INDEX_OPERATION_TARGET: number = 5;

  public static readonly INDEX_OPERATION_MESSAGE_DATA_TABLE: number = 6;
  public static readonly INDEX_OPERATION_MESSAGE_QUEUE_NAME: number = 7;
  public static readonly INDEX_OPERATION_MESSAGE_FLAGS: number = 8;

  public static readonly INDEX_OPERATION_LISTENER_CODE: number = 6;
  public static readonly INDEX_OPERATION_FILTER: number = 7;
  public static readonly INDEX_OPERATION_FINGERPRINT: number = 8;

  public static readonly INDEX_EVENT_CONTEXT: number = 3;
  public static readonly INDEX_EVENT_NAME: number = 4;
  public static readonly INDEX_EVENT_LEVEL: number = 5;
  public static readonly INDEX_EVENT_ID: number = 6;
  public static readonly INDEX_EVENT_LISTENER: number = 7;
  public static readonly INDEX_EVENT_DATA_TABLE: number = 8;
  public static readonly INDEX_EVENT_TIMESTAMP: number = 9;

  public static readonly INDEX_REPLY_CODE: number = 2;
  public static readonly INDEX_REPLY_MESSAGE: number = 3;
  public static readonly INDEX_REPLY_DETAILS: number = 4;
  public static readonly INDEX_DATA_TABLE_IN_REPLY: number = 3;

  public static readonly CLIENT_COMMAND_SEPARATOR: string = '\u0017';

  private static GENERATED_ID = 0;

  private static readonly MAX_PRINTED_LENGTH: number = 10000;

  public toString(): string {
    const b = this.data.clone();
    b.offset = 0;
    let s = b.toUTF8();

    const len = s.length;

    s = s.substring(0, Math.min(AggreGateCommand.MAX_PRINTED_LENGTH, s.length));

    if (s.length >= AggreGateCommand.MAX_PRINTED_LENGTH) {
      s += '... (' + len + ')';
    }

    s = s.replace(AggreGateCommand.convert(AggreGateCommand.CLIENT_COMMAND_SEPARATOR), '/');

    s = s.replace(AggreGateCommand.convert(DataTableUtils.ELEMENT_START), AggreGateCommand.convert(DataTableUtils.ELEMENT_VISIBLE_START));
    s = s.replace(AggreGateCommand.convert(DataTableUtils.ELEMENT_END), AggreGateCommand.convert(DataTableUtils.ELEMENT_VISIBLE_END));
    s = s.replace(AggreGateCommand.convert(DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR), AggreGateCommand.convert(DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR));

    s = s.replace(AggreGateCommand.convert(DataTableUtils.DATA_TABLE_NULL), DataTableUtils.DATA_TABLE_VISIBLE_NULL);

    return s;
  }

  public static generateId(): string {
    return String(++AggreGateCommand.GENERATED_ID);
  }

  public static convert(unicode: string): string {
    return unescape(encodeURIComponent(unicode));
  }
}
