import BindingProvider from './BindingProvider';
//TODO AbstractBindingProvider
export default abstract class AbstractBindingProvider<T> implements BindingProvider<T> {
  start(): void {}

  stop(): void {}
}
