import Tracer from './Tracer';
import Log from '../../Log';

export default class DefaultTracer implements Tracer {
  public trace(value: any, message: string): void {
    DefaultTracer.traceToLog(value, message);
  }

  public static traceToLog(value: any, message: string) {
    Log.EXPRESSIONS.info('Trace: ' + value + (message != null ? ' (' + message + ')' : ''));
  }
}
