import TableFormat from '../datatable/TableFormat';
import JObject from '../util/java/JObject';
export default class Acknowledgement extends JObject {
    static readonly FIELD_AUTHOR: string;
    static readonly FIELD_TIME: string;
    static readonly FIELD_TEXT: string;
    static readonly FORMAT: TableFormat;
    private static __static_initialized;
    static __static_initializer_0(): void;
    private author;
    private time;
    private text;
    constructor(author: string, time: Date, text: string);
    getAuthor(): string;
    getText(): string;
    getTime(): Date;
    setAuthor(author: string): void;
    setText(text: string): void;
    setTime(time: Date): void;
    getFormat(): TableFormat;
    clone(): Acknowledgement;
}
