import Evaluator from '../../Evaluator';
import Context from '../../../context/Context';
import Cres from '../../../Cres';
import EntityFormatFunction from './EntityFormatFunction';

export default class FunctionInputFormatFunction extends EntityFormatFunction {
  constructor() {
    super('String context, String function [, String schema]', Cres.get().getString('fDescFunctionInputFormat'));
  }

  getFormat(evaluator: Evaluator, con: Context<any, any>, parameters: Array<any>): any {
    const def = con.getFunctionDefinition(parameters[1].toString(), evaluator.getDefaultResolver().getCallerController());

    if (def != null && def.getInputFormat() != null) {
      const notEncodedFormat = def.getInputFormat()?.encodeUseSeparator(false);
      return notEncodedFormat != null ? notEncodedFormat : null;
    } else {
      return null;
    }
  }
}
