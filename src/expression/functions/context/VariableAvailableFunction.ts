import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityAvailableFunction from './EntityAvailableFunction';

export default class VariableAvailableFunction extends EntityAvailableFunction {
  constructor(group: string) {
    super(group, 'String context, String variable [, String schema]', Cres.get().getString('fDescVariableAvailable'));
  }

  hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getVariableDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    return def != null;
  }
}
