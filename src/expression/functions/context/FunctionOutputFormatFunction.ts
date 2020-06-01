import EntityFormatFunction from './EntityFormatFunction';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';

export default class FunctionOutputFormatFunction extends EntityFormatFunction {
  constructor() {
    super('String context, String function [, String schema]', Cres.get().getString('fDescFunctionOutputFormat'));
  }

  getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getFunctionDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    if (def != null && def.getOutputFormat() != null) {
      const notEncodedFormat = def.getOutputFormat()?.encodeUseSeparator(false);
      return notEncodedFormat != null ? notEncodedFormat : null;
    } else {
      return null;
    }
  }
}
