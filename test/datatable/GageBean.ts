import DataTable from '../../src/datatable/DataTable';
import Data from '../../src/data/Data';

export default class GageBean {
  private intField: number = 0;
  private str: string | null = null;
  private floatField: number = 0.0;
  private table: DataTable | null = null;
  private booleanField: boolean = false;
  private longField: number = 0;
  private doubleField: number = 0.0;
  private date: Date | null = null;
  // TODO: not implemented
  // private color: Color | null = null;
  private data: Data | null = null;

  public getIntField(): number {
    return this.intField;
  }

  public setIntField(intField: number) {
    this.intField = intField;
  }

  public getString(): string | null {
    return this.str;
  }

  public setString(str: string | null) {
    this.str = str;
  }

  public getFloatField(): number {
    return this.floatField;
  }

  public setFloatField(floatField: number) {
    this.floatField = floatField;
  }

  public getTable(): DataTable | null {
    return this.table;
  }

  public setTable(table: DataTable | null) {
    this.table = table;
  }

  public isBooleanField(): boolean {
    return this.booleanField;
  }

  public setBooleanField(booleanField: boolean) {
    this.booleanField = booleanField;
  }

  public getLongField(): number {
    return this.longField;
  }

  public setLongField(longField: number) {
    this.longField = longField;
  }

  public getDoubleField(): number {
    return this.doubleField;
  }

  public setDoubleField(doubleField: number) {
    this.doubleField = doubleField;
  }

  public getDate(): Date | null {
    return this.date;
  }

  public setDate(date: Date | null) {
    this.date = date;
  }

  public getData(): Data | null {
    return this.data;
  }

  public setData(data: Data | null) {
    this.data = data;
  }
}
