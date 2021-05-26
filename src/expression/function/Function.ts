import EvaluationEnvironment from '../EvaluationEnvironment';
import Evaluator from '../Evaluator';
import AttributedObject from '../AttributedObject';

export default interface Function {
  getCategory(): string;

  getReturnValue(): string;

  getParametersFootprint(): string;

  asyncExecuteAttributed(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<AttributedObject>): Promise<AttributedObject>;

  asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any>;

  executeAttributed(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<AttributedObject>): AttributedObject;

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;

  isAsync(): boolean;
}
