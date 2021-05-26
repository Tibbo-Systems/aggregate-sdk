import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import TimeHelper from '../../../util/TimeHelper';

export default abstract class DateFunction extends AbstractFunction {
  constructor(returnValue: string, description: string | null) {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Date date [, String timezone]', returnValue, description);
  }
  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, false, parameters);

    const date = Util.convertToDate(parameters[0], true, false);
    if (date) {
      if (parameters.length > 1) {
        return this.executeDate(TimeHelper.setTimeZone(date, parameters[1]), parameters);
      }
      return this.executeDate(date, parameters);
    }
  }

  public abstract executeDate(calendar: Date, parameters: Array<any>): any;
}
