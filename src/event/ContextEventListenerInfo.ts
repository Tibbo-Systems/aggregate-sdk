import DefaultContextEventListener from '../context/DefaultContextEventListener';

export default class ContextEventListenerInfo {
  private readonly listener: DefaultContextEventListener;

  private readonly weak: boolean;

  constructor(listener: DefaultContextEventListener, weak: boolean) {
    this.listener = listener;
    this.weak = weak;
  }

  public getListener(): DefaultContextEventListener {
    return this.listener;
  }

  public isWeak(): boolean {
    return this.weak;
  }
}
