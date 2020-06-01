import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';

export default abstract class TypeConversionFunction extends AbstractFunction {
  protected constructor(returnValue: string, description: string) {
    super(Functions.GROUP_TYPE_CONVERSION, 'Object value', returnValue, description);
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(1, true, parameters);

    return this.convert(parameters[0]);
  }

  public abstract convert(parameter: any): any;
}
