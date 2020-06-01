import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EntityGroupFunction from './EntityGroupFunction';
import Context from '../../../context/Context';

export default class FunctionGroupFunction extends EntityGroupFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String function [, String schema]', '');
  }

  getGroup(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getFunctionDefinition(parameters[1], evaluator.getDefaultResolver().getCallerController());

    return def != null ? def.getGroup() : null;
  }
}
