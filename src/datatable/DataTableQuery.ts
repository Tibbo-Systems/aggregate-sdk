import QueryCondition from './QueryCondition';

export default class DataTableQuery {
  private readonly conditions: Array<QueryCondition> = new Array<QueryCondition>();

  constructor(...conditions: QueryCondition[]) {
    this.conditions.push(...conditions);
  }

  public getConditions(): Array<QueryCondition> {
    return this.conditions;
  }

  public addCondition(condition: QueryCondition) {
    this.conditions.push(condition);
  }
}
