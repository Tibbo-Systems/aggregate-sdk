import Tracer from './Tracer';
export default class DefaultTracer implements Tracer {
    trace(value: object, message: string): void;
    static traceToLog(value: object, message: string): void;
}
