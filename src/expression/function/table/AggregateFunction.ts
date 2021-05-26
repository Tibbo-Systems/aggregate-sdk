import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import MessageFormat from '../../../util/java/MessageFormat';
import Expression from '../../Expression';
import DataTable from '../../../datatable/DataTable';
import ContextUtils from '../../../context/ContextUtils';

export default class AggregateFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable|String source, String expression, Object initialValue', 'Object', Cres.get().getString('fDescAggregate'));
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(2, false, parameters);
    for (let i = 0; i < 2; i++) {
      if (parameters[i] == null) {
        throw new Error(MessageFormat.format(Cres.get().getString('exprParamCantBeNull'), i));
      }
    }

    const source = parameters[0];

    const expression = new Expression(parameters[1].toString());

    let aggregate = parameters[2];

    const resolver = evaluator.getDefaultResolver();

    const localEvaluator = new Evaluator(resolver.getContextManager(), resolver.getDefaultContext(), resolver.getDefaultTable(), resolver.getCallerController());
    localEvaluator.getEnvironmentResolver().setEnvironment(evaluator.getEnvironmentResolver().getEnvironment());
    localEvaluator.setTracer(evaluator.getTracer() != null ? evaluator.getTracer() : null);
    localEvaluator.setPreviousResult(aggregate);

    try {
      if (source instanceof DataTable) {
        const table = source;

        localEvaluator.getDefaultResolver().setDefaultTable(table);

        for (let i = 0; i < table.getRecordCount(); i++) {
          localEvaluator.getDefaultResolver().setDefaultRow(i);

          aggregate = await localEvaluator.evaluate(expression, environment);
        }
      } else {
        const mask = source.toString();
        const cm = resolver.getContextManager();
        if (cm == null) {
          return null;
        }
        const contexts = await ContextUtils.expandMaskToContexts(mask, cm, false, resolver.getCallerController());

        for (const context of contexts) {
          localEvaluator.getDefaultResolver().setDefaultContext(context);

          aggregate = localEvaluator.evaluate(expression);
        }
      }
    } catch (ex) {
      throw new Error(ex);
    }

    return aggregate;
  }

  isAsync(): boolean {
    return true;
  }
}
