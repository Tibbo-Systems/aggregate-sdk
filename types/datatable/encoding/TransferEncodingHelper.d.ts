import JObject from '../../util/java/JObject';
import StringBuilder from '../../util/java/StringBuilder';
export default class TransferEncodingHelper extends JObject {
    static readonly ESCAPE_CHAR: string;
    static readonly SEPARATOR_CHAR: string;
    static readonly START_CHAR: string;
    static readonly END_CHAR: string;
    static readonly KILO: number;
    static readonly KB: number;
    static readonly MB: number;
    static readonly GB: number;
    static readonly TB: number;
    static readonly LARGE_DATA_SIZE: number;
    private static readonly DIRECT;
    private static readonly REVERSE;
    private static init;
    private static initialize;
    private static getDirect;
    private static getReverse;
    static encodeFromString(strVal: string | null, encodeLevel?: number): string | null;
    static encodeWithMappings(source: string | null, result: StringBuilder | null, mapping: Map<string, string>, encodeLevel: number): StringBuilder | null;
    static encodeChar(c: string, sb: StringBuilder): void;
    static encodeCharWithMapping(mapping: Map<string, string>, c: string, sb: StringBuilder, encodeLevel: number): void;
    static encode(strFrom: string | null, strTo?: StringBuilder | null, encodeLevel?: number): StringBuilder | null;
    static decode(s: string | null, mapping?: Map<string, string>): string;
}
