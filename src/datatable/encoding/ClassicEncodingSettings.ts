import EncodingSettings from './EncodingSettings';
import KnownFormatCollector from './KnownFormatCollector';
import FormatCache from './FormatCache';
import ProtocolVersion from '../../protocol/ProtocolVersion';
import TableFormat from '../TableFormat';

export default class ClassicEncodingSettings extends EncodingSettings {
  private useVisibleSeparators: boolean;
  private formatCache: FormatCache | null = null;
  private encodeDefaultValues = true;
  private knownFormatCollector: KnownFormatCollector | null = null;
  private encodeFieldNames = false;

  private protocolVersion: ProtocolVersion | null = null;

  constructor(useVisibleSeparators: boolean, format: TableFormat | null = null) {
    super(useVisibleSeparators, format);
    this.setEncodeFormat(true);
    this.useVisibleSeparators = useVisibleSeparators;
  }

  public isUseVisibleSeparators(): boolean {
    return this.useVisibleSeparators;
  }

  public isEncodeDefaultValues(): boolean {
    return this.encodeDefaultValues;
  }

  public getKnownFormatCollector(): KnownFormatCollector | null {
    return this.knownFormatCollector;
  }

  public setKnownFormatCollector(knownFormatCollector: KnownFormatCollector): void {
    this.knownFormatCollector = knownFormatCollector;
  }

  public getFormatCache(): FormatCache | null {
    return this.formatCache;
  }

  public setFormatCache(formatCache: FormatCache): void {
    this.formatCache = formatCache;
  }

  public isEncodeFieldNames(): boolean {
    return this.encodeFieldNames;
  }

  public setProtocolVersion(protocolVersion: ProtocolVersion): void {
    this.protocolVersion = protocolVersion;
  }

  public getProtocolVersion(): ProtocolVersion | null {
    return this.protocolVersion;
  }

  public setEncodeFieldNames(encodeFieldNames: boolean): void {
    this.encodeFieldNames = encodeFieldNames;
  }
}
