import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Color from 'color';
export default class DarkerFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_COLOR_PROCESSING, 'Color color', 'Color', Cres.get().getString('fDescDarker'));
  }

  public execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);
    const FACTOR = 0.7;
    const r = parameters[0].red();
    const g = parameters[0].green();
    const b = parameters[0].blue();
    const darkerRed = Math.round(Math.max(r * FACTOR, 0));
    const darkerGreen = Math.round(Math.max(g * FACTOR, 0));
    const darkerBlue = Math.round(Math.max(b * FACTOR, 0));
    return Color([darkerRed, darkerGreen, darkerBlue]);
  }
}
