import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import EntityFormatFunction from './EntityFormatFunction';

export default class EventFormatFunction extends EntityFormatFunction {
  constructor() {
    super('String context, String event [, String schema]', Cres.get().getString('fDescEventFormat'));
  }

  getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): string | null {
    const def = con.getEventDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());
    if (def != null) {
      const defFormat = def.getFormat();
      if (defFormat != null) {
        return defFormat.encodeUseSeparator(false);
      }
    }
    return null;
  }
}
