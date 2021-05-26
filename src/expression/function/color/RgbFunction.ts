import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Color from 'color';

export default abstract class RgbFunction extends AbstractFunction {
  constructor(description: string) {
    super(Functions.GROUP_COLOR_PROCESSING, 'Color color', 'Integer', description);
  }

  protected color(parameters: Array<any>) {
    this.checkParameters(1, false, parameters);
    const color = Color(parameters[0]);
    return color;
  }
}
