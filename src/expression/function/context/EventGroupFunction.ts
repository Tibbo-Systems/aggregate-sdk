import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import Functions from '../Functions';
import EntityGroupFunction from './EntityGroupFunction';

export default class EventGroupFunction extends EntityGroupFunction {
  constructor() {
    super(Functions.GROUP_CONTEXT_RELATED, 'String context, String event [, String schema]', '');
  }

  getGroup(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): string | null {
    const def = con.getEventDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    if (def != null) {
      return def.getGroup();
    } else {
      return null;
    }
  }
}
