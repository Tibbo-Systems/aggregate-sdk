import Functions from '../Functions';
import Cres from '../../../Cres';
import Util from '../../../util/Util';
import TypeConversionFunction from './TypeConversionFunction';

export default class BooleanFunction extends TypeConversionFunction {
  constructor() {
    super(Functions.BOOLEAN, Cres.get().getString('fDescBoolean'));
  }

  convert(parameter: any): any {
    return Util.convertToBoolean(parameter, true, false);
  }
}
