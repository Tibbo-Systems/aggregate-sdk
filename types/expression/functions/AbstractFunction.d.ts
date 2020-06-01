import Function from './Function';
import Evaluator from '../Evaluator';
import EvaluationEnvironment from '../EvaluationEnvironment';
import AttributedObject from '../AttributedObject';
import DataTable from '../../datatable/DataTable';
export default abstract class AbstractFunction implements Function {
    private readonly parametersFootprint;
    private readonly category;
    private returnValue;
    private description;
    constructor(category: string, parametersFootprint: string, returnValue: string, description?: string);
    asyncExecute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): Promise<any>;
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    executeAttributed(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<AttributedObject>): AttributedObject;
    asyncExecuteAttributed(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<AttributedObject>): Promise<AttributedObject>;
    isAsync(): boolean;
    getCategory(): string;
    getParametersFootprint(): string;
    getReturnValue(): string;
    protected checkParameters(minimalCount: number, allowNulls: boolean, parameters: Array<any>): void;
    protected convertToDataTable(num: number, value: any): DataTable;
    protected convertToString(num: number, value: any): string;
    protected convertToInteger(num: number, value: any): number;
    protected convertToBoolean(num: number, value: any): boolean;
}
