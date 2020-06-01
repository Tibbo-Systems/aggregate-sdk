import Functions from '../Functions';
import Util from '../../../util/Util';
import TypeConversionFunction from './TypeConversionFunction';

export default class FloatFunction extends TypeConversionFunction {
  constructor() {
    super(Functions.GROUP_TYPE_CONVERSION, 'Float');
  }

  convert(parameter: any): any {
    return Util.convertToNumber(parameter, true, false);
  }
}
