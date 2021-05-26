import BindingProcessor from './BindingProcessor';
import BindingProvider from './BindingProvider';
import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import AsyncRunnable from '../util/java/AsyncRunnable';
export default class EvaluationTimerTask implements AsyncRunnable {
    private processor;
    private provider;
    private binding;
    private options;
    constructor(processor: BindingProcessor, provider: BindingProvider, binding: Binding, options: EvaluationOptions);
    run(): Promise<void>;
    private createEvaluationTask;
}
