export default interface Tracer {
    trace(value: object, message: string): void;
}
