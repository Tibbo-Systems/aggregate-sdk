import TableFormat from '../TableFormat';
import JObject from '../../util/java/JObject';

export default class EncodingSettings extends JObject {
  private encodeFormat: boolean = true;
  private format: TableFormat | null = null;

  constructor(encodeFormat: boolean, format: TableFormat | null = null) {
    super();
    this.encodeFormat = encodeFormat;
    this.format = format;
  }

  public getFormat(): TableFormat | null {
    return this.format;
  }

  public setFormat(format: TableFormat | null) {
    this.format = format;
  }

  public isEncodeFormat(): boolean {
    return this.encodeFormat;
  }

  public setEncodeFormat(encodeFormat: boolean) {
    this.encodeFormat = encodeFormat;
  }
}
