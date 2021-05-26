import BindingProvider from './BindingProvider';
import Evaluator from '../expression/Evaluator';
import Reference from '../expression/Reference';
import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import ChangeCache from './ChangeCache';
import EvaluationEnvironment from '../expression/EvaluationEnvironment';
import Log from '../Log';
import BindingProcessor from './BindingProcessor';
import ExpressionUtils from '../expression/ExpressionUtils';
import Util from '../util/Util';
import BindingReferenceListener from './BindingReferenceListener';
import ThreadPoolExecutor from '../util/java/ThreadPoolExecutor';
import Cres from '../Cres';
import TimerExecutor from '../util/java/TimerExecutor';
import EvaluationTimerTask from './EvaluationTimerTask';
import AsyncRunnable from '../util/java/AsyncRunnable';

export default class DefaultBindingProcessor implements BindingProcessor {
  private provider: BindingProvider;
  private evaluator: Evaluator;
  private stopped = false;
  private enabled = true;
  private disableStartupConcurrency = false;
  private executionService: ThreadPoolExecutor;
  private timerExecutor: TimerExecutor;

  constructor(provider: BindingProvider, evaluator: Evaluator, queueLength = 100, corePoolSize = 0, maximumPoolSize = 0) {
    this.provider = provider;
    this.evaluator = evaluator;
    this.executionService = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, queueLength);
    this.timerExecutor = new TimerExecutor();
  }

  async start(): Promise<boolean> {
    if (this.stopped) {
      throw new Error('Cannot reuse binding processor');
    }

    const _this = this;
    await this.submit(
      new (class extends AsyncRunnable {
        run(): Promise<void> {
          return _this.startImpl();
        }
      })(),
      !this.disableStartupConcurrency
    );

    return !this.stopped;
  }

  protected async startImpl(): Promise<void> {
    const bindings = this.provider.createBindings();
    await this.initBindings(bindings);

    if (this.stopped) {
      return;
    }

    this.provider.start();
  }

  stop(): void {
    this.stopped = true;
    this.timerExecutor.shutdown();
    this.executionService.shutdown();
    this.provider.stop();
  }

  public async evaluateBindingExpression(method: number, binding: Binding, options: EvaluationOptions, evaluationEnvironment?: EvaluationEnvironment, cause?: Reference, cache?: ChangeCache): Promise<void> {
    if (await this.checkCondition(options, this.evaluator, evaluationEnvironment)) {
      const result = await this.evaluator.evaluate(binding.getExpression(), evaluationEnvironment);
      this.provider.processExecution(method, binding, options, result, cause);
      this.writeReference(method, binding, result, cause, cache);
    } else if (method == EvaluationOptions.STARTUP) {
      Log.BINDINGS.debug("Condition '" + options.getCondition() + "' is false for binding: " + binding);
    }
  }

  private initBinding(binding: Binding, options: EvaluationOptions): void {
    try {
      if (this.stopped) {
        return;
      }

      Log.BINDINGS.debug('Adding binding: ' + binding + ', evaluation options: ' + options);
      if ((options.getPattern() & EvaluationOptions.EVENT) != 0) {
        const activator = options.getActivator();
        if (activator != null) {
          try {
            this.addReferenceListener(binding, options, activator);
          } catch (ex) {
            this.provider.processError(binding, EvaluationOptions.EVENT, options.getActivator(), ex);
          }
        } else {
          const identifiers = ExpressionUtils.findReferences(binding.getExpression());
          const added = new Array<Reference>();

          for (const ref of identifiers) {
            try {
              if (!added.includes(ref)) {
                this.addReferenceListener(binding, options, ref);
                added.push(ref);
              } else {
                Log.BINDINGS.debug('Adding reference listener was skipped; reference: ' + ref + '; binding: ' + binding);
              }
            } catch (ex) {
              this.provider.processError(binding, EvaluationOptions.EVENT, ref, ex);
            }
          }
        }
      }
      if ((options.getPattern() & EvaluationOptions.PERIODIC) != 0 && options.getPeriod() > 0) {
        if (!this.stopped) {
          const task = new EvaluationTimerTask(this, this.provider, binding, options);
          this.timerExecutor.schedule(task, options.getPeriod(), options.getPeriod());
        }
      }
    } catch (e) {
      Log.BINDINGS.warn('Error initializing binding: ' + binding, e);
    }
  }

  private initBindings(bindings: Array<[Binding, EvaluationOptions]>): Promise<void> {
    for (const bin of bindings) {
      this.initBinding(bin[0], bin[1]);
    }

    return this.evaluateStartupBindings(bindings);
  }

  private async evaluateStartupBindings(bindings: Array<[Binding, EvaluationOptions]>): Promise<void> {
    for (const binding of bindings) {
      const options = binding[1];
      if (this.enabled && (options.getPattern() & EvaluationOptions.STARTUP) != 0) {
        const _this = this;
        try {
          await this.submit(
            new (class extends AsyncRunnable {
              run(): Promise<void> {
                return _this.evaluateStartupBinding(binding[0], options);
              }
            })(),
            !this.disableStartupConcurrency
          );
        } catch (e) {
          this.provider.processError(binding[0], EvaluationOptions.STARTUP, null, new Error(Cres.get().getString('binBindingQueueOverflow')));
        }
      }
    }
  }

  private evaluateStartupBinding(binding: Binding, options: EvaluationOptions): Promise<void> {
    return this.evaluateBindingExpression(EvaluationOptions.STARTUP, binding, options).catch((e) => {
      this.provider.processError(binding, EvaluationOptions.STARTUP, null, e);
    });
  }

  private addReferenceListener(binding: Binding, options: EvaluationOptions, reference: Reference): void {
    if (this.stopped) {
      return;
    }

    if (Reference.SCHEMA_ENVIRONMENT === reference.getSchema()) return;

    const listener = new BindingReferenceListener(this, this.provider, binding, options);
    this.provider.addReferenceListener(reference, listener);
  }

  writeReference(method: number, binding: Binding, value: any, cause?: Reference, cache?: ChangeCache): void {
    if (this.stopped || !this.enabled) {
      return;
    }

    this.provider.writeReference(method, binding, value, cause, cache);
  }

  protected async checkCondition(options: EvaluationOptions, evaluator: Evaluator, evaluationEnvironment?: EvaluationEnvironment): Promise<boolean> {
    const conditionIsAbsent = options == null || options.getCondition()?.getText() == null || options.getCondition()?.getText().length === 0;

    if (conditionIsAbsent) {
      return true;
    }

    const condition = await evaluator.evaluate(options.getCondition(), evaluationEnvironment);

    return condition != null ? (Util.convertToBoolean(condition, true, false) as boolean) : true;
  }

  public isStopped(): boolean {
    return this.stopped;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  public isDisableStartupConcurrency(): boolean {
    return this.disableStartupConcurrency;
  }

  public setDisableStartupConcurrency(value: boolean): void {
    this.disableStartupConcurrency = value;
  }

  public async submit(task: AsyncRunnable, executeInThreadPool = true): Promise<void> {
    if (!this.stopped && this.enabled) {
      if (executeInThreadPool && !this.executionService.isShutdown()) {
        return this.executionService.submit(task);
      } else {
        return task.run();
      }
    }
  }
}
