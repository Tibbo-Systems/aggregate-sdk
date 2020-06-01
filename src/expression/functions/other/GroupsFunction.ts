import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default class GroupsFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String source, String regex', 'Object', Cres.get().getString('fDescGroups'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const source = parameters[0].toString();
    const regex = parameters[1].toString();

    const result = source.match(regex);
    //TODO fix
    return result[1];
    //return result.size() == 1 ? result.get(0) : DataTableUtils.wrapToTable(result);
  }
}
