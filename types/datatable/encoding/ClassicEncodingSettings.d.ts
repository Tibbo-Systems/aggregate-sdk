import EncodingSettings from './EncodingSettings';
import KnownFormatCollector from './KnownFormatCollector';
import FormatCache from './FormatCache';
import ProtocolVersion from '../../protocol/ProtocolVersion';
import TableFormat from '../TableFormat';
export default class ClassicEncodingSettings extends EncodingSettings {
    private useVisibleSeparators;
    private formatCache;
    private encodeDefaultValues;
    private knownFormatCollector;
    private encodeFieldNames;
    private protocolVersion;
    constructor(useVisibleSeparators: boolean, format?: TableFormat | null);
    isUseVisibleSeparators(): boolean;
    isEncodeDefaultValues(): boolean;
    getKnownFormatCollector(): KnownFormatCollector | null;
    setKnownFormatCollector(knownFormatCollector: KnownFormatCollector): void;
    getFormatCache(): FormatCache | null;
    setFormatCache(formatCache: FormatCache): void;
    isEncodeFieldNames(): boolean;
    setProtocolVersion(protocolVersion: ProtocolVersion): void;
    getProtocolVersion(): ProtocolVersion | null;
    setEncodeFieldNames(encodeFieldNames: boolean): void;
}
