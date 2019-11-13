import Reference from '../expression/Reference';
import Expression from '../expression/Expression';
import Util from '../util/Util';

export default class Binding {
  private id: number | null = null;

  private target: Reference;

  private expression: Expression;

  private queue: string | null = null;

  constructor(target: Reference | string, expression: Expression | string) {
    if (Util.isString(target) && Util.isString(expression)) {
      this.target = new Reference(target as string);
      this.expression = new Expression(expression as string);
    } else {
      this.target = target as Reference;
      this.expression = expression as Expression;
    }
  }

  public getExpression(): Expression {
    return this.expression;
  }

  public getTarget(): Reference {
    return this.target;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getQueue(): string | null {
    return this.queue;
  }

  public setQueue(queue: string) {
    this.queue = queue;
  }
}
