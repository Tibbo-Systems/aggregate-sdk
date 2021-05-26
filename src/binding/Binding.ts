import Reference from '../expression/Reference';
import Expression from '../expression/Expression';
import Util from '../util/Util';
import JObject from '../util/java/JObject';
import ExpressionUtils from '../expression/ExpressionUtils';

export default class Binding extends JObject {
  private id: number | null = null;

  private target: Reference;

  private expression: Expression;

  private queue: string | null = null;

  constructor(target: Reference | string, expression: Expression | string) {
    super();
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

  equals(obj: JObject | null): boolean {
    if (this === obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof Binding)) {
      return false;
    }
    const other = obj as Binding;
    if (this.expression == null) {
      if (other.expression != null) {
        return false;
      }
    } else if (!this.expression.equals(other.expression)) {
      return false;
    }
    if (this.id == null) {
      if (other.id != null) {
        return false;
      }
    } else if (this.id !== other.id) {
      return false;
    }
    if (this.target == null) {
      if (other.target != null) {
        return false;
      }
    } else if (!this.target.equals(other.target)) {
      return false;
    }
    return true;
  }

  clone(): Binding {
    const clone = super.clone() as Binding;
    clone.target = this.target.clone();
    clone.expression = this.expression.clone();
    clone.id = this.id == null ? null : ExpressionUtils.generateBindingId();
    return clone;
  }

  public toString(): string {
    return this.target + ' = ' + this.expression;
  }
}
