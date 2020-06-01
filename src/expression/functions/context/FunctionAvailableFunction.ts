import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EntityAvailableFunction from './EntityAvailableFunction';
import Context from '../../../context/Context';

export default class FunctionAvailableFunction extends EntityAvailableFunction {
  constructor(group: string) {
    super(group, 'String context, String function [, String schema]', Cres.get().getString('fDescFunctionAvailable'));
  }

  hasEntity(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): boolean {
    const def = con.getFunctionDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    return def != null;
  }
}
