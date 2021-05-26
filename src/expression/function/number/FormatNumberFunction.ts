import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import numeral from 'numeral';

export default class FormatNumberFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_NUMBER_PROCESSING, 'Number number, String pattern', 'String', Cres.get().getString('fDescFormatNumber'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): string {
    // TODO: add number format by pattern
    this.checkParameters(2, true, parameters);
    const number = Util.convertToNumber(parameters[0], true, true);
    const pattern = parameters[1].toString();
    if (number == null) return '';

    return numeral(number).format(pattern);
  }
}
