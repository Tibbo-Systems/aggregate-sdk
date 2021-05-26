import BindingProcessor from './BindingProcessor';
import BindingProvider from './BindingProvider';
import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import Cres from '../Cres';
import AsyncRunnable from '../util/java/AsyncRunnable';

export default class EvaluationTimerTask implements AsyncRunnable {
  private processor: BindingProcessor;

  private provider: BindingProvider;

  private binding: Binding;

  private options: EvaluationOptions;

  constructor(processor: BindingProcessor, provider: BindingProvider, binding: Binding, options: EvaluationOptions) {
    this.processor = processor;
    this.binding = binding;
    this.options = options;
    this.provider = provider;
  }

  async run(): Promise<void> {
    try {
      if (this.processor.isStopped() || !this.processor.isEnabled()) {
        return;
      }
      await this.processor.submit(this.createEvaluationTask(), true);
    } catch (ex) {
      this.provider.processError(this.binding, EvaluationOptions.PERIODIC, null, new Error(Cres.get().getString('binBindingQueueOverflow')));
    }
  }

  private createEvaluationTask(): AsyncRunnable {
    const _this = this;
    return new (class extends AsyncRunnable {
      async run(): Promise<void> {
        try {
          return _this.processor.evaluateBindingExpression(EvaluationOptions.PERIODIC, _this.binding, _this.options);
        } catch (e) {
          _this.provider.processError(_this.binding, EvaluationOptions.PERIODIC, null, e);
        }
        return;
      }
    })();
  }
}
