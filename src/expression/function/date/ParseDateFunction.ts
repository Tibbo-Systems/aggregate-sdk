import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import moment from 'moment';
import TimeHelper from '../../../util/TimeHelper';

export default class ParseDateFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'String source, String pattern [, String timezone]', 'String', Cres.get().getString('fDescParseDate'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, false, parameters);

    const source = parameters[0].toString();
    const pattern = parameters[1].toString().replace('dd', 'DD');
    const ms = moment(source, pattern).valueOf();
    const date = new Date(ms);
    if (parameters.length > 2) {
      return TimeHelper.setTimeZone(date, parameters[2]);
    }
    return date;
  }
}
