import Tracer from './Tracer';
import Log from '../../Log';

export default class DefaultTracer implements Tracer {
  trace(value: object, message: string): void {
    DefaultTracer.traceToLog(value, message);
  }

  public static traceToLog(value: object, message: string) {
    Log.EXPRESSIONS.info('Trace: ' + value + (message != null ? ' (' + message + ')' : ''));
  }
}
