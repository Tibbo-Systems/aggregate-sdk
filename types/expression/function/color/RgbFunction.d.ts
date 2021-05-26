import AbstractFunction from '../AbstractFunction';
import Color from 'color';
export default abstract class RgbFunction extends AbstractFunction {
    constructor(description: string);
    protected color(parameters: Array<any>): Color<any>;
}
