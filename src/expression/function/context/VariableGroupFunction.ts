import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityGroupFunction from './EntityGroupFunction';
import Functions from '../Functions';

export default class VariableGroupFunction extends EntityGroupFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String variable [, String schema]', '');
  }

  getGroup(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getVariableDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    return def != null ? def.getGroup() : null;
  }
}
