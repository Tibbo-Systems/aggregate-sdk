export default class CsvReader {
    private data;
    private headers;
    private columns;
    constructor(data: string, delimiter: string);
    private CSVToArray;
    setData(data: string, delimiter: string): void;
    getData(): Array<Array<string>> | null;
    skipRecord(): void;
    readHeaders(): void;
    getHeaderCount(): number | null;
    getColumnCount(): number | null;
    getHeader(i: number): string | null;
    getHeaders(): Array<string> | null;
    readRecord(): boolean;
    get(i: number): string | null;
    clear(): void;
}
