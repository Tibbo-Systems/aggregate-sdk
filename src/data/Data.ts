import JSBI from 'jsbi';
import ByteBuffer from "bytebuffer";
import StringEncodable from "../util/StringEncodable";
import StringBuilder from "../util/java/StringBuilder";
import ClassicEncodingSettings from "../datatable/encoding/ClassicEncodingSettings";
import JObject from '../util/java/JObject';
import StringUtils from '../util/StringUtils';
import DataTableUtils from '../datatable/DataTableUtils';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import Contexts from '../context/Contexts';
import UtilitiesContextConstants from '../server/UtilitiesContextConstants';
import Util from '../util/Util';
import TransferEncodingHelper from '../datatable/encoding/TransferEncodingHelper';

// TODO check ASCII_CHARSET
export default class Data extends JObject implements StringEncodable {
  private static readonly TRANSCODER_VERSION: string = '0';
  public static readonly BUFFER_MULTIPLIER: number = 1.15;

  private static readonly SEPARATOR: string = '/';

  private id: JSBI | null = null;
  private name: string | null = null;
  private preview: ByteBuffer | null = null;
  private data: ByteBuffer | null;
  private shallowCopy = false;

  private attachments: Map<string, JObject> = new Map();

  constructor(data: ByteBuffer | null = null) {
    super();
    this.name = null;
    this.data = data;
  }

  public static fromString(value: string): Data {
    const res = new Data();
    if (value.length == 0) {
      return res;
    }
    const parts: Array<string> = StringUtils.split(value, Data.SEPARATOR, 5);

    // parts.get(0) will return transcoder version, currently ignored

    if (parts[1] !== DataTableUtils.DATA_TABLE_NULL) {
      res.setId(JSBI.BigInt(parts[1]));
    }

    if (parts[2] !== DataTableUtils.DATA_TABLE_NULL) {
      res.setName(parts[2]);
    }

    const previewLen = Number(parts[3]);

    if (previewLen != -1) {
      res.setPreview(ByteBuffer.wrap(parts[5].substring(0, previewLen), StringUtils.UTF8_CHARSET));
    }

    const dataLen = Number(parts[4]);

    if (dataLen != -1) {
      res.setData(ByteBuffer.wrap(parts[5].substring(previewLen <= 0 ? 0 : previewLen), StringUtils.UTF8_CHARSET));
    }
    return res;
  }

  public setPreview(preview: ByteBuffer): void {
    this.preview = preview;
  }

  public setId(id: JSBI): void {
    this.id = id;
  }

  public setData(data: ByteBuffer | null): void {
    this.data = data;
  }

  public setBlob(blob: ByteBuffer): void {
    this.data = blob;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPreview(): ByteBuffer | null {
    return this.preview;
  }

  public getName(): string | null {
    return this.name;
  }

  public getId(): JSBI | null {
    return this.id;
  }

  public getData(): ByteBuffer | null {
    return this.data;
  }

  public getBlob(): ByteBuffer | null {
    return this.data;
  }

  public getAttachments(): Map<string, JObject> {
    return this.attachments;
  }

  public setAttachments(attachments: Map<string, JObject>): void {
    this.attachments = attachments;
  }

  public setShallowCopy(shallowCopy: boolean): void {
    this.shallowCopy = shallowCopy;
  }

  public isShallowCopy(): boolean {
    return this.shallowCopy;
  }

  public async fetchData(cm: ContextManager<Context<any, any>> | null, cc: CallerController): Promise<ByteBuffer | null> {
    if (this.getData() != null) {
      return this.getData();
    }

    if (this.getId() == null) {
      return null;
    }

    if (cm == null) {
      return null;
    }

    const context = await cm.get(Contexts.CTX_UTILITIES, cc);
    if (!context) throw new Error(`${Contexts.CTX_UTILITIES} not found`);
    const parameters = new Array<JSBI | null>();
    parameters.push(this.getId());
    const dt = await context.callFunction(UtilitiesContextConstants.F_GET_DATA, parameters, cc);

    const data = dt.rec().getData(UtilitiesContextConstants.FOF_GET_DATA_DATA);
    const receivedData = data ? (data as Data).getData() : null;

    this.setData(receivedData);

    return receivedData;
  }

  private checksum(bytes: ByteBuffer): number {
    bytes.mark();
    let sum = 0;
    for (let i = 0; i < bytes.limit; i++) sum += bytes.readByte();

    bytes.reset();

    return sum;
  }

  public toDetailedString(): string {
    return (
      'Data [id: ' +
      (this.id != null ? this.id : 'null') +
      ', name: ' +
      (this.name != null ? this.id : 'null') +
      ', preview: ' +
      (this.preview != null ? `len=${this.preview.limit} checksum=${this.checksum(this.preview)}` : "null") +
      ', data: ' +
      (this.data != null ? `len=${this.data.limit} checksum=${this.checksum(this.data)}` : "null") +
      ']'
    );
  }

  public toString(): string {
    return (
      'Data [id: ' +
      (this.id != null ? this.id : 'null') +
      ', name: ' +
      (this.name != null ? this.name : 'null') +
      ', preview: ' +
      (this.preview != null ? `len=${this.preview.limit}` : "null") +
      ', data: ' +
      (this.data != null ? `len=${this.data.limit}` : `${"null" + ", shallow copy: "}${this.shallowCopy}`) +
      ']'
    );
  }

  public toJsonString(): string {
    const data = this.data;
    const data64 = data ? btoa(data.toUTF8()) : 'null';
    const newData = {
      id: this.id ? this.id.toString() : 'null',
      name: this.name ? this.name : 'null',
      preview: this.preview ? `len=${this.preview.buffer.length}` : 'null',
      data: data64,
      'shallow copy': this.shallowCopy,
    };

    return JSON.stringify(newData);
  }

  public toCleanString(): string {
    return this.data != null ? this.data.toString(StringUtils.UTF8_CHARSET) : 'null';
  }

  public clone(): Data {
    const cl = super.clone() as Data;

    if (!this.isShallowCopy()) {
      if (this.preview != null) cl.preview = this.preview.copy();
      if (this.data != null) cl.data = this.data.copy();
    }
    return cl;
  }

  public equals(obj: JObject | null): boolean {
    if (obj === null) return false;
    if (obj instanceof Data) {
      const od = obj as Data;

      return (
        ((this.id === null && od.id === null) || (this.id !== null && od.id !== null && JSBI.equal(this.id, od.id))) && this.name === od.name && Util.byteBufferEquals(od.preview, this.preview) && Util.byteBufferEquals(this.data, od.data)
      );
    }
    return false;
  }

  public getEncodedDataFromEncodingSettings(): string {
    return this.encode(new StringBuilder(), new ClassicEncodingSettings(false), false, 0).toString();
  }

  public encodeToString(): string {
    return this.encode(new StringBuilder(), null, false, 0).toString();
  }

  public encode(sb: StringBuilder, settings: ClassicEncodingSettings | null, isTransferEncode: boolean, encodeLevel: number): StringBuilder {
    const tempSB = new StringBuilder();

    tempSB.append(Data.TRANSCODER_VERSION);

    tempSB.append(Data.SEPARATOR);

    const id = this.getId();
    tempSB.append(id != null ? id.toString() : DataTableUtils.DATA_TABLE_NULL);

    tempSB.append(Data.SEPARATOR);

    tempSB.append(this.getName() ?? DataTableUtils.DATA_TABLE_NULL);

    tempSB.append(Data.SEPARATOR);

    const preview = this.getPreview();
    tempSB.append(preview != null ? preview.limit.toString() : '-1');

    tempSB.append(Data.SEPARATOR);

    const data = this.getData();
    tempSB.append(data != null ? data.limit.toString() : '-1');

    tempSB.append(Data.SEPARATOR);

    if (isTransferEncode) sb.append(DataTableUtils.transferEncode(tempSB.toString()));
    else sb.append(tempSB.toString());

    this.appendBytes(sb, preview, isTransferEncode, encodeLevel);
    this.appendBytes(sb, data, isTransferEncode, encodeLevel);

    return sb;
  }

  private appendBytes(sb: StringBuilder, data: ByteBuffer | null, isTransferEncode: boolean, encodeLevel: number): void {
    if (data != null) {
      for (let i = 0; i <= data.limit; i += TransferEncodingHelper.LARGE_DATA_SIZE) {
        let end = i + TransferEncodingHelper.LARGE_DATA_SIZE;
        if (end > data.limit) end = data.limit;

        const tempString = data.copy(i, end).toString(StringUtils.UTF8_CHARSET);
        if (isTransferEncode) TransferEncodingHelper.encode(tempString, sb, encodeLevel);
        else sb.append(tempString);
      }
    }
  }

  public releaseData(): void {
    this.data = null;
    this.preview = null;
  }
}
