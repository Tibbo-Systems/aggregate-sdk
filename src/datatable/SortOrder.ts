import JObject from '../util/java/JObject';

export default class SortOrder extends JObject {
  private field: string;
  private ascending = false;

  constructor(field: string, ascending: boolean) {
    super();
    this.field = field;
    this.ascending = ascending;
  }

  public getField(): string {
    return this.field;
  }

  public setField(field: string) {
    this.field = field;
  }

  public isAscending(): boolean {
    return this.ascending;
  }

  public setAscending(ascending: boolean) {
    this.ascending = ascending;
  }
}
