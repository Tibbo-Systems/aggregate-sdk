import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import Reference from '../expression/Reference';
import ReferenceListener from './ReferenceListener';
import ChangeCache from './ChangeCache';
export default abstract class BindingProvider {
    abstract createBindings(): Array<[Binding, EvaluationOptions]>;
    abstract start(): void;
    abstract stop(): void;
    abstract writeReference(method: number, binding: Binding, value: any, cause?: Reference, cache?: ChangeCache): void;
    abstract addReferenceListener(ref: Reference, listener: ReferenceListener): void;
    abstract processExecution(event: number, binding: Binding, options: EvaluationOptions, result: any, cause?: Reference): void;
    abstract processError(binding: Binding, method: number, cause: Reference | null, error: Error): void;
}
