import JObject from '../util/java/JObject';

export default class QueryCondition {
  //Operators
  public static readonly EQ: number = 1; // =
  public static readonly GT: number = 2; // >
  public static readonly LT: number = 4; // <
  public static readonly NE: number = 8; // !=
  public static readonly GE: number = QueryCondition.GT | QueryCondition.EQ; // >=
  public static readonly LE: number = QueryCondition.LT | QueryCondition.EQ; // <=

  private field: string;
  private value: any;
  private operator: number = QueryCondition.EQ;

  constructor(field: string, value: any, operator: number = QueryCondition.EQ) {
    this.field = field;
    this.value = value;
    this.operator = operator;
  }

  public getField(): string {
    return this.field;
  }

  public getValue(): any {
    return this.value;
  }

  public getOperator(): number {
    return this.operator;
  }
}
