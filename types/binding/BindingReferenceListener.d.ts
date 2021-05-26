import ReferenceListener from './ReferenceListener';
import Binding from './Binding';
import BindingProcessor from './BindingProcessor';
import EvaluationOptions from './EvaluationOptions';
import Reference from '../expression/Reference';
import ChangeCache from './ChangeCache';
import BindingProvider from './BindingProvider';
export default class BindingReferenceListener implements ReferenceListener {
    private processor;
    private provider;
    private binding;
    private content;
    private options;
    constructor(processor: BindingProcessor, provider: BindingProvider, binding: Binding, options: EvaluationOptions);
    getBinding(): Binding;
    getBindingProcessor(): BindingProcessor;
    getContent(): any;
    getEvaluationOptions(): EvaluationOptions;
    referenceChanged(cause: Reference, asynchronousProcessing: boolean, environment?: Map<string, any>, cache?: ChangeCache): void;
    setContent(content: any): void;
    toString(): string;
}
