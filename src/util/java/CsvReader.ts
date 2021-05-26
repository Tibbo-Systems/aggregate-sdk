import csvParser from 'papaparse';
export default class CsvReader {
  private data = new Array<Array<string>>();
  private headers: Array<string> | null = null;
  private columns: Array<string> | null = null;
  constructor(data: string, delimiter: string) {
    this.data = this.CSVToArray(data, delimiter);
  }

  private CSVToArray(strData: string, delimiter: string) {
    const parsedData = csvParser.parse(strData, {
      delimiter: delimiter,
    }).data;
    const result = parsedData.map((arr: any) => {
      let data = '';
      const array = new Array<string>();
      arr.forEach((el: string) => {
        if (el.charAt(el.length - 1) === '\\') {
          data += el.replace('\\', delimiter);
        } else {
          data += el;
          array.push(data);
          data = '';
        }
      });
      return array;
    });
    return result;
  }
  setData(data: string, delimiter: string): void {
    this.clear();
    this.data = this.CSVToArray(data, delimiter);
  }
  getData(): Array<Array<string>> | null {
    return this.data;
  }

  skipRecord(): void {
    if (this.data.length) this.data.shift();
  }

  readHeaders(): void {
    if (!this.data.length) return;
    this.headers = this.data[0];
    this.data.shift();
  }
  getHeaderCount(): number | null {
    if (this.headers) return this.headers.length;
    return null;
  }
  getColumnCount(): number | null {
    if (this.columns) return this.columns.length;
    if (!this.headers && this.data) return this.data.length;
    return null;
  }
  getHeader(i: number): string | null {
    if (this.headers) return this.headers[i];
    return null;
  }
  getHeaders(): Array<string> | null {
    if (this.headers) return this.headers;
    return null;
  }
  readRecord(): boolean {
    if (this.data.length) {
      this.columns = this.data[0];
      this.data.shift();
      if (this.data.length) return true;
      return false;
    }
    return false;
  }
  get(i: number): string | null {
    if (this.columns) return this.columns[i];
    return null;
  }
  clear(): void {
    this.data = new Array<Array<string>>();
    this.columns = null;
    this.headers = null;
  }
}
