import Functions from '../Functions';
import Cres from '../../../Cres';
import Util from '../../../util/Util';
import TypeConversionFunction from './TypeConversionFunction';

export default class TimestampFunction extends TypeConversionFunction {
  constructor() {
    super(Functions.DATE, Cres.get().getString('fDescTimestamp'));
  }

  convert(parameter: any): any {
    return parameter != null ? Util.convertToDate(parameter, false, false) : null;
  }
}
