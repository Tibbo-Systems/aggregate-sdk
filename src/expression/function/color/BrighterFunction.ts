import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Color from 'color';
export default class BrighterFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_COLOR_PROCESSING, 'Color color', 'Color', Cres.get().getString('fDescBrighter'));
  }

  public execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);
    const FACTOR = 0.7;
    let r = parameters[0].red();
    let g = parameters[0].green();
    let b = parameters[0].blue();
    const i = 1.0 / (1.0 - 0.7);
    if (r == 0 && g == 0 && b == 0) {
      return Color([i, i, i]);
    }
    if (r > 0 && r < i) r = i;
    if (g > 0 && g < i) g = i;
    if (b > 0 && b < i) b = i;
    const brighterRed = Math.floor(Math.min(r / FACTOR, 255));
    const brighterGreen = Math.floor(Math.min(g / FACTOR, 255));
    const brighterBlue = Math.floor(Math.min(b / FACTOR, 255));

    return Color([brighterRed, brighterGreen, brighterBlue]);
  }
}
