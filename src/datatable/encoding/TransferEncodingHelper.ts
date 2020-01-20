import AggreGateCommand from '../../protocol/AggreGateCommand';
import JObject from '../../util/java/JObject';
import StringBuilder from '../../util/java/StringBuilder';
import DataTableUtils from '../DataTableUtils';

export default class TransferEncodingHelper extends JObject {
  public static readonly ESCAPE_CHAR: string = '%';
  public static readonly SEPARATOR_CHAR: string = '/';
  public static readonly START_CHAR: string = '^';
  public static readonly END_CHAR: string = '$';

  public static readonly KILO: number = 1024;
  public static readonly KB: number = TransferEncodingHelper.KILO;
  public static readonly MB: number = TransferEncodingHelper.KB * TransferEncodingHelper.KILO;
  public static readonly GB: number = TransferEncodingHelper.MB * TransferEncodingHelper.KILO;
  public static readonly TB: number = TransferEncodingHelper.GB * TransferEncodingHelper.KILO;

  public static readonly LARGE_DATA_SIZE: number = TransferEncodingHelper.MB * 50;

  private static readonly DIRECT: Map<string, string> = new Map<string, string>();
  private static readonly REVERSE: Map<string, string> = new Map<string, string>();

  private static init = false;

  private static initialize() {
    if (TransferEncodingHelper.init) return;
    TransferEncodingHelper.DIRECT.set(TransferEncodingHelper.ESCAPE_CHAR, TransferEncodingHelper.ESCAPE_CHAR);
    TransferEncodingHelper.DIRECT.set(AggreGateCommand.CLIENT_COMMAND_SEPARATOR.charAt(0), TransferEncodingHelper.SEPARATOR_CHAR);
    TransferEncodingHelper.DIRECT.set(DataTableUtils.ELEMENT_START, DataTableUtils.ELEMENT_VISIBLE_START);
    TransferEncodingHelper.DIRECT.set(DataTableUtils.ELEMENT_END, DataTableUtils.ELEMENT_VISIBLE_END);
    TransferEncodingHelper.DIRECT.set(DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR, DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR);
    TransferEncodingHelper.DIRECT.set(String.fromCharCode(AggreGateCommand.START_CHAR), TransferEncodingHelper.START_CHAR);
    TransferEncodingHelper.DIRECT.set(String.fromCharCode(AggreGateCommand.END_CHAR), TransferEncodingHelper.END_CHAR);

    TransferEncodingHelper.REVERSE.set(TransferEncodingHelper.ESCAPE_CHAR, TransferEncodingHelper.ESCAPE_CHAR);
    TransferEncodingHelper.REVERSE.set(TransferEncodingHelper.SEPARATOR_CHAR, AggreGateCommand.CLIENT_COMMAND_SEPARATOR.charAt(0));
    TransferEncodingHelper.REVERSE.set(DataTableUtils.ELEMENT_VISIBLE_START, DataTableUtils.ELEMENT_START);
    TransferEncodingHelper.REVERSE.set(DataTableUtils.ELEMENT_VISIBLE_END, DataTableUtils.ELEMENT_END);
    TransferEncodingHelper.REVERSE.set(DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR, DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR);
    TransferEncodingHelper.REVERSE.set(TransferEncodingHelper.START_CHAR, String.fromCharCode(AggreGateCommand.START_CHAR));
    TransferEncodingHelper.REVERSE.set(TransferEncodingHelper.END_CHAR, String.fromCharCode(AggreGateCommand.END_CHAR));
    TransferEncodingHelper.init = true;
  }

  private static getDirect(): Map<string, string> {
    TransferEncodingHelper.initialize();
    return TransferEncodingHelper.DIRECT;
  }

  private static getReverse(): Map<string, string> {
    TransferEncodingHelper.initialize();
    return TransferEncodingHelper.REVERSE;
  }

  public static encodeFromString(strVal: string | null, encodeLevel = 1): string | null {
    const encodedBuilder = TransferEncodingHelper.encodeWithMappings(strVal, null, TransferEncodingHelper.DIRECT, encodeLevel);
    return encodedBuilder ? encodedBuilder.toString() : null;
  }

  public static encodeWithMappings(source: string | null, result: StringBuilder | null, mapping: Map<string, string>, encodeLevel: number): StringBuilder | null {
    if (source == null) {
      //TODO check this
      return null;
    }

    if (result == null) result = new StringBuilder();

    for (const c of source) {
      this.encodeCharWithMapping(mapping, c, result, encodeLevel);
    }

    return result;
  }

  public static encodeChar(c: string, sb: StringBuilder): void {
    this.encodeCharWithMapping(TransferEncodingHelper.getDirect(), c, sb, 0);
  }

  public static encodeCharWithMapping(mapping: Map<string, string>, c: string, sb: StringBuilder, encodeLevel: number): void {
    if (mapping.has(c)) {
      let recalcedEncode = 0;

      if (c == TransferEncodingHelper.ESCAPE_CHAR) recalcedEncode = Math.pow(2, encodeLevel) - 1;
      else recalcedEncode = Math.pow(2, encodeLevel - 1);

      for (let i = 0; i < recalcedEncode; i++) {
        sb.append(TransferEncodingHelper.ESCAPE_CHAR);
      }
      sb.append(mapping.get(c) as string);
    } else {
      sb.append(c);
    }
  }

  public static encode(strFrom: string | null, strTo: StringBuilder | null = null, encodeLevel = 1): StringBuilder | null {
    return this.encodeWithMappings(strFrom, strTo, TransferEncodingHelper.getDirect(), encodeLevel);
  }

  public static decode(s: string | null, mapping: Map<string, string> = TransferEncodingHelper.getReverse()): string {
    if (s == null) {
      //TODO check this
      return '';
    }

    const len = s.length;

    const out = new StringBuilder();

    for (let i = 0; i < len; i++) {
      const c = s.charAt(i);

      if (c === TransferEncodingHelper.ESCAPE_CHAR && i < len - 1) {
        const next = s.charAt(i + 1);

        const orig = mapping.get(next);

        if (orig) {
          out.append(orig);
          i += 1;
        } else {
          // Failover code
          out.append(c);
          out.append(next);
        }
      } else {
        out.append(c);
      }
    }

    return out.toString();
  }
}
