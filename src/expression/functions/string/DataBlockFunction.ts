import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Cres from '../../../Cres';
import Data from '../../../data/Data';
import StringBuilder from '../../../util/java/StringBuilder';
import ByteBuffer from 'bytebuffer';

export default class DataBlockFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_TYPE_CONVERSION, 'Object value[, String charset]', 'String', Cres.get().getString('fDescDataBlock'));
  }

  execute(evaluator: Evaluator | null, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    const source = parameters[0].toString();
    const encoding = parameters.length > 1 ? parameters[1].toString() : 'utf8';

    if (encoding !== 'utf8') throw new Error(`unsupported charset: ${encoding}`);

    const data = new Data();

    data.setData(ByteBuffer.fromUTF8(source));
    return data.encode(new StringBuilder(), null, false, 0).toString();
  }
}
