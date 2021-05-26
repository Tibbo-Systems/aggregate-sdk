import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Util from '../../../util/Util';
import Expression from '../../Expression';
import Context from '../../../context/Context';

export default class EvaluateFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_OTHER, 'String expression [, String defaultContext [, DataTable defaultTable [, Integer defaultRow]]]', 'Object', Cres.get().getString('fDescEvaluate'));
  }
  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    this.checkParameters(1, false, parameters);

    const previousBackup = evaluator.getPreviousResult();
    const defaultContextBackup: Context<any, any> | null = evaluator.getDefaultResolver().getDefaultContext();
    const defaultTableBackup = evaluator.getDefaultResolver().getDefaultTable();
    const defaultRowBackup = evaluator.getDefaultResolver().getDefaultRow();

    try {
      if (parameters.length >= 2 && parameters[1] != null && evaluator.getDefaultResolver().getContextManager() != null) {
        const defaultContext = await evaluator.getDefaultResolver().getContextManager()?.get(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());
        evaluator.getDefaultResolver().setDefaultContext(defaultContext);
      }
      if (parameters.length >= 3) {
        const dataTable = this.convertToDataTable(2, parameters[2]);
        evaluator.getDefaultResolver().setDefaultTable(dataTable);
      }
      if (parameters.length >= 4) {
        const number = Util.convertToNumber(parameters[3], false, false);
        if (number !== null) evaluator.getDefaultResolver().setDefaultRow(number);
      }
      return evaluator.evaluate(new Expression(parameters[0].toString()));
    } finally {
      if (defaultRowBackup !== null) evaluator.getDefaultResolver().setDefaultRow(defaultRowBackup);

      evaluator.getDefaultResolver().setDefaultTable(defaultTableBackup);
      if (defaultContextBackup != null) {
        evaluator.getDefaultResolver().setDefaultContext(defaultContextBackup);
      }
      evaluator.restorePreviousResult(previousBackup);
    }
  }

  isAsync(): boolean {
    return true;
  }
}
