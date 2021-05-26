import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import FieldFormat from '../../../datatable/FieldFormat';
import Expression from '../../Expression';
import FieldFormatFactory from '../../../datatable/FieldFormatFactory';

export default class AddColumnsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATA_TABLE_PROCESSING, 'DataTable table, String format1, String expression1, String format2, String expression2, ...', 'DataTable', Cres.get().getString('fDescAddColumns'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(3, true, parameters);

    this.convertToDataTable(0, parameters[0]);

    const table = parameters[0].clone();

    const clone = table.getFormat().clone();

    const newFields = new Map<FieldFormat<any>, Expression>();

    for (let i = 1; i < parameters.length - 1; i = i + 2) {
      const ff = FieldFormatFactory.create(parameters[i].toString());
      clone.addField(ff);
      newFields.set(ff, new Expression(parameters[i + 1].toString()));
    }

    table.setFormat(clone);

    table.joinFormats();

    for (const [k, v] of newFields) {
      const resolver = evaluator.getDefaultResolver();
      const localEvaluator = new Evaluator(resolver.getContextManager(), resolver.getDefaultContext(), table, resolver.getCallerController());
      localEvaluator.getEnvironmentResolver().setEnvironment(evaluator.getEnvironmentResolver().getEnvironment());

      for (const [key, value] of evaluator.getResolvers()) {
        if (key != null) {
          localEvaluator.setResolver(key, value);
        }
      }

      for (let j = 0; j < table.getRecordCount(); j++) {
        const rec = table.getRecord(j);
        localEvaluator.getDefaultResolver().setDefaultRow(j);

        // AGG-11208 Data Table binding expression is always evaluated for first record
        // it is scary to make changes to the general order of working with strings, so the changes were made only to this function
        const eClone = environment.clone();
        eClone.getCause()?.setRow(null);

        try {
          const value = localEvaluator.evaluate(v, eClone);
          rec.setValue(k.getName(), value);
        } catch (ex) {
          throw new Error(ex);
        }
      }
    }

    return table;
  }
}
