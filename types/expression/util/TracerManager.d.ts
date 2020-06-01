import DefaultTracer from './DefaultTracer';
import Tracer from './Tracer';
export default class TracerManager {
    private static DEFAULT_TRACER;
    static getDefaultTracer(): DefaultTracer;
    static setDefaultTracer(tracer: Tracer): void;
}
