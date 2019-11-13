import StringEncodable from './StringEncodable';
import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import DataTableUtils from '../datatable/DataTableUtils';
import TransferEncodingHelper from '../datatable/encoding/TransferEncodingHelper';
import FieldFormat from '../datatable/FieldFormat';
import JObject from './java/JObject';
import StringBuilder from './java/StringBuilder';

export default class Element extends JObject implements StringEncodable {
  private name: string | null;
  private value: string | null;
  private encodable: StringEncodable | null;
  private fieldFormat: FieldFormat<any> | null;
  private fieldValue: object | null = null;

  constructor(
    name: string | null = null,
    value: string | null = null,
    encodable: StringEncodable | null = null,
    fieldFormat: FieldFormat<any> | null = null,
    fieldValue: object | null = null
  ) {
    super();
    this.name = name;
    this.value = value;
    this.encodable = encodable;
    this.fieldFormat = fieldFormat;
    this.fieldValue = fieldValue;
  }

  public static createFromStringEncodable(name: string, encodable: StringEncodable): Element {
    return new Element(name, null, encodable, null, null);
  }

  public static createFromFieldFormat(name: string | null, ff: FieldFormat<any>, fieldValue: JObject | null): Element {
    return new Element(name, null, null, ff, fieldValue);
  }

  public getName(): string | null {
    return this.name;
  }

  public getValue(): string | null {
    return this.value;
  }

  public encode(
    sb: StringBuilder | null,
    settings: ClassicEncodingSettings,
    isTransferEncode: boolean = false,
    encodeLevel: number = 0
  ): StringBuilder {
    if (sb === null) {
      sb = new StringBuilder();
    }

    let useVisibleSeparators: boolean = false;

    if (settings) useVisibleSeparators = settings.isUseVisibleSeparators();

    const elStart: string = useVisibleSeparators ? DataTableUtils.ELEMENT_VISIBLE_START : DataTableUtils.ELEMENT_START;
    const elEnd: string = useVisibleSeparators ? DataTableUtils.ELEMENT_VISIBLE_END : DataTableUtils.ELEMENT_END;
    const elNameValSep: string = useVisibleSeparators
      ? DataTableUtils.ELEMENT_VISIBLE_NAME_VALUE_SEPARATOR
      : DataTableUtils.ELEMENT_NAME_VALUE_SEPARATOR;

    if (isTransferEncode) {
      TransferEncodingHelper.encodeChar(elStart, sb);

      if (this.name != null) {
        TransferEncodingHelper.encode(this.name, sb, 0);
        TransferEncodingHelper.encodeChar(elNameValSep, sb);
      }
    } else {
      sb.append(elStart);
      if (this.name != null) {
        sb.append(this.name);
        sb.append(elNameValSep);
      }
    }

    if (this.encodable != null) {
      this.encodable.encode(sb, settings, isTransferEncode, encodeLevel);
    } else if (this.fieldFormat) {
      this.fieldFormat.valueToEncodedString(this.fieldValue, settings, sb, encodeLevel);
    } else {
      if (isTransferEncode) TransferEncodingHelper.encode(this.value, sb, encodeLevel);
      else sb.append(this.value);
    }

    if (isTransferEncode) TransferEncodingHelper.encodeChar(elEnd, sb);
    else sb.append(elEnd);

    return sb;
  }
}
