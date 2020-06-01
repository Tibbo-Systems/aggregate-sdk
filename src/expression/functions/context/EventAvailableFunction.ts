import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EntityAvailableFunction from './EntityAvailableFunction';
import Context from '../../../context/Context';

export default class EventAvailableFunction extends EntityAvailableFunction {
  constructor(group: string) {
    super(group, 'String context, String event [, String schema]', Cres.get().getString('fDescEventAvailable'));
  }

  hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): boolean {
    const def = con.getEventDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    return def != null;
  }
}
