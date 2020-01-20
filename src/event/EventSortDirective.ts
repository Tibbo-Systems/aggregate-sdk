export default class EventSortDirective {
  private field: string | null = null;
  private tablefield = false;
  private ascending = false;

  public EventSortDirective(column: string, tablefield: boolean, ascending: boolean) {
    this.field = column;
    this.tablefield = tablefield;
    this.ascending = ascending;
  }

  public getField(): string | null {
    return this.field;
  }

  public isAscending(): boolean {
    return this.ascending;
  }

  public isTablefield(): boolean {
    return this.tablefield;
  }

  public setAscending(ascending: boolean): void {
    this.ascending = ascending;
  }
}
