import Functions from '../Functions';
import Cres from '../../../Cres';
import Util from '../../../util/Util';
import TypeConversionFunction from './TypeConversionFunction';

export default class DoubleFunction extends TypeConversionFunction {
  constructor() {
    super(Functions.DOUBLE, Cres.get().getString('fDescDouble'));
  }

  convert(parameter: any): any {
    return Util.convertToNumber(parameter, true, false);
  }
}
