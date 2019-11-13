import TableFormat from '../TableFormat';
import JObject from '../../util/java/JObject';
export default class EncodingSettings extends JObject {
    private encodeFormat;
    private format;
    constructor(encodeFormat: boolean, format?: TableFormat | null);
    getFormat(): TableFormat | null;
    setFormat(format: TableFormat | null): void;
    isEncodeFormat(): boolean;
    setEncodeFormat(encodeFormat: boolean): void;
}
