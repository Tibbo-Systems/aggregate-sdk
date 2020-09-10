import Tracer from './Tracer';
export default class DefaultTracer implements Tracer {
    trace(value: any, message: string): void;
    static traceToLog(value: any, message: string): void;
}
