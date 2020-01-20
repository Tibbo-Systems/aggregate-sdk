import BindingProvider from './BindingProvider';
export default abstract class AbstractBindingProvider<T> implements BindingProvider<T> {
    start(): void;
    stop(): void;
}
