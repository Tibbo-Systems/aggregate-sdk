import AbstractFieldValidator from './AbstractFieldValidator';
import JObject from '../../util/java/JObject';
import Context from '../../context/Context';
import ContextManager from '../../context/ContextManager';
import CallerController from '../../context/CallerController';
import Util from '../../util/Util';
import MessageFormat from '../../util/java/MessageFormat';
import Cres from '../../Cres';
import Evaluator from '../../expression/Evaluator';
import Expression from '../../expression/Expression';
import FieldConstants from '../field/FieldConstants';

export default class ExpressionValidator extends AbstractFieldValidator<any> {
  private static readonly SEPARATOR_REGEX: string = '\\^\\^';
  private static readonly SEPARATOR: string = '^^';

  private expression: string;
  private message: string | null = null;

  constructor(source: string) {
    super();
    const parts: Array<string> = source.split(ExpressionValidator.SEPARATOR_REGEX);

    this.expression = parts[0];

    if (parts.length > 1) {
      this.message = parts[1];
    }
  }

  public validate(
    context: Context<any, any>,
    contextManager: ContextManager<Context<any, any>>,
    caller: CallerController,
    value: any
  ): any {
    let evaluationResult: boolean = false;
    try {
      evaluationResult = this.evaluateExpression(context, contextManager, caller, value);
      if (!evaluationResult) {
        throw new Error(
          this.message != null
            ? this.message
            : MessageFormat.format(Cres.get().getString('dtValueDoesNotMatchExpression'), value, this.expression)
        );
      }
    } catch (ex) {
      throw new Error(ex.message);
    }

    return value;
  }

  public encode(): string {
    return this.expression + (this.message != null ? ExpressionValidator.SEPARATOR + this.message : '');
  }

  public evaluateExpression(
    context: Context<any, any>,
    contextManager: ContextManager<Context<any, any>>,
    caller: CallerController,
    value: any
  ): boolean {
    let result = false;
    const evaluator: Evaluator = new Evaluator(contextManager, context, null, caller);
    evaluator
      .getEnvironmentResolver()
      .getEnvironment()
      .set('value', value);

    if (this.expression != null && this.expression.length !== 0) {
      try {
        result = evaluator.evaluateToBooleanOrNull(new Expression(this.expression)) ? true : false;
        if (result == null) {
          result = false;
        }
      } catch (ex) {
        throw new Error(ex.message);
      }
    }

    return result;
  }

  public shouldEncode(): boolean {
    return true;
  }

  public getType(): string | null {
    return FieldConstants.VALIDATOR_EXPRESSION;
  }

  public equals(obj: any): boolean {
    if (this == obj) {
      return true;
    }

    if (!super.equals(obj)) {
      return false;
    }

    if (!(obj instanceof AbstractFieldValidator)) {
      return false;
    }

    const other: ExpressionValidator = obj as ExpressionValidator;
    if (this.message === null) {
      if (other.message != null) {
        return false;
      }
    } else if (this.message !== other.message) {
      return false;
    }

    if (this.expression === null) {
      if (other.expression != null) {
        return false;
      }
    } else if (this.expression !== other.expression) {
      return false;
    }
    return true;
  }
}
