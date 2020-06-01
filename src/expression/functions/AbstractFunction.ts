import Function from './Function';
import Evaluator from '../Evaluator';
import EvaluationEnvironment from '../EvaluationEnvironment';
import AttributedObject from '../AttributedObject';
import ExpressionUtils from '../ExpressionUtils';
import Cres from '../../Cres';
import MessageFormat from '../../util/java/MessageFormat';
import Util from '../../util/Util';
import DataTable from '../../datatable/DataTable';

export default abstract class AbstractFunction implements Function {
  private readonly parametersFootprint: string;
  private readonly category: string;
  private returnValue: string;
  private description: string | undefined;

  public constructor(category: string, parametersFootprint: string, returnValue: string, description?: string) {
    this.category = category;
    this.parametersFootprint = parametersFootprint;
    this.returnValue = returnValue;
    this.description = description;
  }

  async asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any> {
    throw Error('unsupported sync execute');
  }

  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    throw Error('unsupported async execute ');
  }

  executeAttributed(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<AttributedObject>): AttributedObject {
    const convertedParameters = [];

    for (let i = 0; i < parameters.length; i++) {
      convertedParameters[i] = ExpressionUtils.getValue(parameters[i]);
    }

    return ExpressionUtils.toAttributed(this.execute(evaluator, environment, convertedParameters));
  }

  async asyncExecuteAttributed(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<AttributedObject>): Promise<AttributedObject> {
    const convertedParameters = [];

    for (let i = 0; i < parameters.length; i++) {
      convertedParameters[i] = ExpressionUtils.getValue(parameters[i]);
    }

    return ExpressionUtils.toAttributed(await this.asyncExecute(evaluator, environment, convertedParameters));
  }

  isAsync(): boolean {
    return false;
  }

  getCategory(): string {
    return this.category;
  }

  getParametersFootprint(): string {
    return this.parametersFootprint;
  }

  getReturnValue(): string {
    return this.returnValue;
  }

  protected checkParameters(minimalCount: number, allowNulls: boolean, parameters: Array<any>): void {
    if (parameters.length < minimalCount) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprInvalidParamCount'), minimalCount, parameters.length));
    }

    if (!allowNulls) {
      for (let i = 0; i < minimalCount; i++) {
        if (parameters[i] == null) {
          throw new Error(MessageFormat.format(Cres.get().getString('exprParamCantBeNull'), i));
        }
      }
    }
  }

  // Use this function instead of checkParameterType
  protected convertToDataTable(num: number, value: any): DataTable {
    if (!(value instanceof DataTable)) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprInvalidParameterType'), num, 'DataTable', typeof value));
    }
    return value as DataTable;
  }

  protected convertToString(num: number, value: any): string {
    if (!Util.isString(value)) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprInvalidParameterType'), num, 'String', typeof value));
    }
    return value as string;
  }

  protected convertToInteger(num: number, value: any): number {
    if (!Util.isNumber(value)) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprInvalidParameterType'), num, 'Integer', typeof value));
    }
    return value as number;
  }

  protected convertToBoolean(num: number, value: any): boolean {
    if (!Util.isBoolean(value)) {
      throw new Error(MessageFormat.format(Cres.get().getString('exprInvalidParameterType'), num, 'Boolean', typeof value));
    }
    return value as boolean;
  }
}
