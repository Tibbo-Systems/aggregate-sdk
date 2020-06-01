import DefaultTracer from './DefaultTracer';
import Tracer from './Tracer';

export default class TracerManager {
  private static DEFAULT_TRACER = new DefaultTracer();

  public static getDefaultTracer(): DefaultTracer {
    return TracerManager.DEFAULT_TRACER;
  }

  public static setDefaultTracer(tracer: Tracer) {
    if (tracer == null) {
      throw new Error('Default tracer cannot be NULL');
    }

    TracerManager.DEFAULT_TRACER = tracer;
  }
}
