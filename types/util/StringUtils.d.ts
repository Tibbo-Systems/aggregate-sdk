import ElementList from './ElementList';
import JObject from './java/JObject';
export default class StringUtils extends JObject {
    static readonly UTF8_CHARSET = "utf8";
    static readonly ASCII_CHARSET = "ISO-8859-1";
    static readonly WINDOWS_1251_CHARSET = "windows-1251";
    static elements(source: string, useVisibleSeparators: boolean): ElementList;
    static createMaskedPasswordString(length: number): string;
    static split(str: string, ch: string, limit?: number): Array<string>;
    static print(col: Array<any> | null, separator?: string, escaper?: string, skipNullElements?: boolean): string;
    static isEmpty(text: string): boolean;
}
