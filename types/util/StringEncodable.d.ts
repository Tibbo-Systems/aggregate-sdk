import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import StringBuilder from './java/StringBuilder';
export default interface StringEncodable {
    encode(sb: StringBuilder, settings: ClassicEncodingSettings, isTransferEncode: boolean, encodeLevel: number): StringBuilder | null;
}
