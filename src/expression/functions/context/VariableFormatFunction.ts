import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityFormatFunction from './EntityFormatFunction';

export default class VariableFormatFunction extends EntityFormatFunction {
  constructor() {
    super('String context, String variable [, String schema]', Cres.get().getString('fDescVariableFormat'));
  }

  getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getVariableDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    if (def != null) {
      const format = def.getFormat();
      return format != null ? format.encodeUseSeparator(false) : null;
    } else {
      return null;
    }
  }
}
