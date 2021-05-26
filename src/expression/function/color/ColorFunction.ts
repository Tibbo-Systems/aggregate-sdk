import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Color from 'color';
import Util from '../../../util/Util';
export default class ColorFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_COLOR_PROCESSING, 'Integer red, Integer green, Integer blue', 'Color', Cres.get().getString('fDescColor'));
  }

  public execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    if (parameters.length != 3) {
      throw new Error('Invalid parameter count, need 3 but found ' + parameters.length);
    }
    const r = Util.convertToNumber(parameters[0], true, false);
    const g = Util.convertToNumber(parameters[1], true, false);
    const b = Util.convertToNumber(parameters[2], true, false);
    return Color(`rgb(${r}, ${g}, ${b})`);
  }
}
