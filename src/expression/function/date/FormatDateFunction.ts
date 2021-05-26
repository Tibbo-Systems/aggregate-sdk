import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import TimeHelper from '../../../util/TimeHelper';
import Cres from '../../../Cres';
import moment from 'moment';

export default class FormatDateFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Date date, String pattern [, String timezone]', 'String', Cres.get().getString('fDescFormatDate'));
  }
  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    let date = Util.convertToDate(parameters[0], true, false);
    const pattern = parameters[1].toString().replace('dd', 'DD');

    if (date === null) {
      return '';
    }

    if (parameters.length > 2) {
      date = TimeHelper.setTimeZone(date, parameters[2]);
    }

    return pattern ? moment(date).format(pattern) : '';
  }
}
