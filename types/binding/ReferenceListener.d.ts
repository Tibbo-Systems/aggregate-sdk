import Reference from '../expression/Reference';
import EvaluationOptions from './EvaluationOptions';
import Binding from './Binding';
import BindingProcessor from './BindingProcessor';
import ChangeCache from './ChangeCache';
export default interface ReferenceListener {
    referenceChanged(cause: Reference, asynchronousProcessing: boolean, environment?: Map<string, any>, cache?: ChangeCache): void;
    getBindingProcessor(): BindingProcessor;
    getBinding(): Binding;
    getEvaluationOptions(): EvaluationOptions;
    setContent(content: any): void;
    getContent(): any;
}
