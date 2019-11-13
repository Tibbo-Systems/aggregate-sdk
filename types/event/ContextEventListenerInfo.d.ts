import DefaultContextEventListener from '../context/DefaultContextEventListener';
export default class ContextEventListenerInfo {
    private readonly listener;
    private readonly weak;
    constructor(listener: DefaultContextEventListener, weak: boolean);
    getListener(): DefaultContextEventListener;
    isWeak(): boolean;
}
