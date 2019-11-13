import TableFormat from '../datatable/TableFormat';
import JObject from '../util/java/JObject';
export default class Enrichment extends JObject {
    private static __static_initialized;
    static FIELD_NAME: string;
    static FIELD_VALUE: string;
    static FIELD_DATE: string;
    static FIELD_AUTHOR: string;
    static FORMAT: TableFormat;
    static __static_initializer_0(): void;
    private name;
    private value;
    private date;
    private author;
    constructor(name: string | null, value: string, date: Date, author: string | null);
    getName(): string;
    setName(name: string): void;
    getValue(): string;
    setValue(value: string): void;
    getDate(): Date;
    setDate(date: Date): void;
    getAuthor(): string | null;
    setAuthor(author: string): void;
}
