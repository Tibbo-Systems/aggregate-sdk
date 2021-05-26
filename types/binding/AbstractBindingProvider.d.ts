import BindingProvider from './BindingProvider';
import Reference from '../expression/Reference';
import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import ErrorCollector from '../util/ErrorCollector';
export default abstract class AbstractBindingProvider extends BindingProvider {
    private static readonly LOGGER;
    private errorCollector?;
    protected constructor(errorCollector?: ErrorCollector);
    processExecution(method: number, binding: Binding, options: EvaluationOptions, result: any, cause?: Reference): void;
    protected buildExecutionMessage(method: number, binding: Binding, options: EvaluationOptions, result: any, cause?: Reference): string;
    protected buildErrorMessage(binding: Binding, method: number, cause: Reference | null, error: Error): string;
    processError(binding: Binding, method: number, cause: Reference | null, error: Error): void;
}
