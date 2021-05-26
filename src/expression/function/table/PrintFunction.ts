import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Expression from '../../Expression';
import StringBuilder from '../../../util/java/StringBuilder';
import DefaultReferenceResolver from '../../DefaultReferenceResolver';

export default class PrintFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String expression, String separator', 'String', Cres.get().getString('fDescPrint'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(3, false, parameters);

    const table = this.convertToDataTable(0, parameters[0]);

    const expression = new Expression(parameters[1].toString());

    const separator = parameters[2].toString();

    const sb = new StringBuilder();

    const localEvaluator = new Evaluator(evaluator.getDefaultResolver().getContextManager());

    localEvaluator.init(new DefaultReferenceResolver());

    localEvaluator.getDefaultResolver().setDefaultTable(table);

    let result;
    let added = false;

    for (let i = 0; i < table.getRecordCount(); i++) {
      try {
        localEvaluator.getDefaultResolver().setDefaultRow(i);

        result = await localEvaluator.evaluate(expression);

        if (result == null) {
          continue;
        }

        if (added && result != null) {
          sb.append(separator);
        }

        sb.append(result != null ? result.toString() : '');

        added = true;
      } catch (ex) {
        throw new Error(ex);
      }
    }

    return sb.toString();
  }
  isAsync(): boolean {
    return true;
  }
}
