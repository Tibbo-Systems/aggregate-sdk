import StringEncodable from './StringEncodable';
import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import FieldFormat from '../datatable/FieldFormat';
import JObject from './java/JObject';
import StringBuilder from './java/StringBuilder';
export default class Element extends JObject implements StringEncodable {
    private name;
    private value;
    private encodable;
    private fieldFormat;
    private fieldValue;
    constructor(name?: string | null, value?: string | null, encodable?: StringEncodable | null, fieldFormat?: FieldFormat<any> | null, fieldValue?: any);
    static createFromStringEncodable(name: string, encodable: StringEncodable): Element;
    static createFromFieldFormat(name: string | null, ff: FieldFormat<any>, fieldValue: JObject | null): Element;
    getName(): string | null;
    getValue(): string | null;
    encode(sb: StringBuilder | null, settings: ClassicEncodingSettings, isTransferEncode?: boolean, encodeLevel?: number): StringBuilder;
}
