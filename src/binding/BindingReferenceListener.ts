import ReferenceListener from './ReferenceListener';
import Binding from './Binding';
import BindingProcessor from './BindingProcessor';
import EvaluationOptions from './EvaluationOptions';
import Reference from '../expression/Reference';
import ChangeCache from './ChangeCache';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import BindingProvider from './BindingProvider';
import Cres from '../Cres';
import AsyncRunnable from '../util/java/AsyncRunnable';

export default class BindingReferenceListener implements ReferenceListener {
  private processor: BindingProcessor;

  private provider: BindingProvider;

  private binding: Binding;

  private content: any;

  private options: EvaluationOptions;

  constructor(processor: BindingProcessor, provider: BindingProvider, binding: Binding, options: EvaluationOptions) {
    this.processor = processor;
    this.binding = binding;
    this.options = options;
    this.provider = provider;
  }
  getBinding(): Binding {
    return this.binding;
  }

  getBindingProcessor(): BindingProcessor {
    return this.processor;
  }

  getContent(): any {
    return this.content;
  }

  getEvaluationOptions(): EvaluationOptions {
    return this.options;
  }

  referenceChanged(cause: Reference, asynchronousProcessing: boolean, environment?: Map<string, any>, cache?: ChangeCache): void {
    if (this.getBindingProcessor().isStopped() || !this.getBindingProcessor().isEnabled()) {
      return;
    }

    const _this = this;
    try {
      this.getBindingProcessor().submit(
        new (class extends AsyncRunnable {
          async run(): Promise<void> {
            if (_this.getBindingProcessor().isStopped() || !_this.getBindingProcessor().isEnabled()) {
              return;
            }
            try {
              const evaluationEnvironment = new EvaluationEnvironment(cause, environment);
              return _this.getBindingProcessor().evaluateBindingExpression(EvaluationOptions.EVENT, _this.binding, _this.options, evaluationEnvironment, cause, cache);
            } catch (e) {
              _this.provider.processError(_this.binding, EvaluationOptions.EVENT, cause, e);
            }
          }
        })(),
        asynchronousProcessing
      );
    } catch (e) {
      this.provider.processError(this.binding, EvaluationOptions.EVENT, null, new Error(Cres.get().getString('binBindingQueueOverflow')));
    }
  }

  setContent(content: any): void {
    this.content = content;
  }

  public toString(): string {
    return '[binding: ' + this.binding + ', options: ' + this.options + ']';
  }
}
