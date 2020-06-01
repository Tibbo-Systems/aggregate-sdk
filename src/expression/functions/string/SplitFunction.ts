import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Cres from '../../../Cres';
import Util from '../../../util/Util';
import SimpleDataTable from '../../../datatable/SimpleDataTable';

export default class SplitFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String string, String regex[, String fieldName [, Integer limit ]]', 'DataTable', Cres.get().getString('fDescSplit'));
  }

  execute(evaluator: Evaluator | null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const source: string = parameters[0].toString();
    const regexp = parameters[1].toString();
    const number = parameters[3] != null ? parameters[3] : 0;

    const fieldName = parameters.length > 2 ? parameters[2].toString() : 'element';

    const limit = parameters.length > 3 ? Util.convertToNumber(number, true, false) : 0;

    let data;
    if (limit != null && limit > 0) {
      data = source.split(regexp, limit);
    } else {
      data = source.split(regexp);
    }

    //const ff = FieldFormat.create(fieldName, FieldFormat.STRING_FIELD);

    const res = new SimpleDataTable(/*ff.wrap()*/);

    for (let i = 0; i < data.length; i++) {
      const element: any = data[i];
      res.addRecordWith(element);
    }

    return res;
  }
}
