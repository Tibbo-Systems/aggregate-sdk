import Functions from '../Functions';
import Cres from '../../../Cres';
import Data from '../../../data/Data';
import TypeConversionFunction from './TypeConversionFunction';

export default class StringFunction extends TypeConversionFunction {
  constructor() {
    super(Functions.STRING, Cres.get().getString('fDescString'));
  }

  convert(parameter: any): any {
    if (parameter == null) {
      return null;
    }
    return parameter instanceof Data ? parameter.toCleanString() : parameter.toString();
  }
}
