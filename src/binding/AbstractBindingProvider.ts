import BindingProvider from './BindingProvider';
import Log from '../Log';
import Reference from '../expression/Reference';
import Binding from './Binding';
import EvaluationOptions from './EvaluationOptions';
import ErrorCollector from '../util/ErrorCollector';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';

export default abstract class AbstractBindingProvider extends BindingProvider {
  private static readonly LOGGER = Log.BINDINGS;

  private errorCollector?: ErrorCollector;

  protected constructor(errorCollector?: ErrorCollector) {
    super();
    this.errorCollector = errorCollector;
  }

  processExecution(method: number, binding: Binding, options: EvaluationOptions, result: any, cause?: Reference): void {
    if (AbstractBindingProvider.LOGGER.isDebugEnabled()) {
      AbstractBindingProvider.LOGGER.debug(this.buildExecutionMessage(method, binding, options, cause, result));
    }
  }

  protected buildExecutionMessage(method: number, binding: Binding, options: EvaluationOptions, result: any, cause?: Reference): string {
    let res = '';
    switch (method) {
      case EvaluationOptions.STARTUP:
        res = "Evaluating '" + binding.getExpression() + "' on startup and writing result (" + result + ") into '" + binding.getTarget() + "'";
        break;
      case EvaluationOptions.EVENT:
        res = "Change of '" + cause + "' caused evaluation of '" + binding.getExpression() + "' and writing result (" + result + ") into '" + binding.getTarget() + "'";
        break;
      case EvaluationOptions.PERIODIC:
        res = "Periodical evaluation of '" + binding.getExpression() + "' caused writing result (" + result + ") into '" + binding.getTarget() + "'";
        break;
    }
    return res;
  }

  protected buildErrorMessage(binding: Binding, method: number, cause: Reference | null, error: Error): string {
    return MessageFormat.format(Cres.get().getString('binBindingError'), binding) + error.message;
  }
  public processError(binding: Binding, method: number, cause: Reference | null, error: Error): void {
    const message = this.buildErrorMessage(binding, method, cause, error);

    if (this.errorCollector) {
      this.errorCollector.addError(new Error(message));
    } else {
      AbstractBindingProvider.LOGGER.debug(message, error);
    }
  }
}
