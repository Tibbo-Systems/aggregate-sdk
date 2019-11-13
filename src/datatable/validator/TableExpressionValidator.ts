import AbstractTableValidator from './AbstractTableValidator';
import DataTable from '../DataTable';
import Expression from '../../expression/Expression';
import TableFormat from '../TableFormat';
import JObject from '../../util/java/JObject';
import Log from '../../Log';
import Evaluator from '../../expression/Evaluator';

export default class TableExpressionValidator extends AbstractTableValidator {
  private readonly expression: Expression;

  constructor(expression: string) {
    super();
    this.expression = new Expression(expression);
  }

  public encode(): string {
    return this.expression.getText();
  }

  public getType(): string {
    return TableFormat.TABLE_VALIDATOR_EXPRESSION;
  }

  public validate(table: DataTable): void {
    const evaluator: Evaluator = new Evaluator(null, null, table, null);

    try {
      const result: JObject = evaluator.evaluate(this.expression);
      if (result != null) {
        throw new Error(result.toString());
      }
    } catch (ex) {
      Log.DATATABLE.warn(
        "Error evaluating data table validator's expression '" + this.expression + "': " + ex.message,
        ex
      );
    }
  }
}
