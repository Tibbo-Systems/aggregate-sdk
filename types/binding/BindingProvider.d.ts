export default interface BindingProvider<T> {
    start(): void;
    stop(): void;
}
