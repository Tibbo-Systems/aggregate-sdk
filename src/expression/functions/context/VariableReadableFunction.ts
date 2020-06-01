import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityAvailableFunction from './EntityAvailableFunction';
import Cres from '../../../Cres';

export default class VariableReadableFunction extends EntityAvailableFunction {
  constructor(group: string) {
    super(group, 'String context, String variable [, String schema]', Cres.get().getString('fDescVariableReadable'));
  }

  hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getVariableDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    return def != null && def.isReadable();
  }
}
