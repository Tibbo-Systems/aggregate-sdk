import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Cres from '../../../Cres';

export default class NewDateFunction extends AbstractFunction {
  constructor() {
    super(Functions.GROUP_DATE_TIME_PROCESSING, 'Date date', 'Date', Cres.get().getString('fDescNow'));
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Date {
    return new Date();
  }
}
