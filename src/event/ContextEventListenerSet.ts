import ContextManager from '../context/ContextManager';
import JObject from '../util/java/JObject';
import DefaultContextEventListener from '../context/DefaultContextEventListener';
import ContextEventListenerInfo from './ContextEventListenerInfo';
import Evaluator from '../expression/Evaluator';
import EventDefinition from '../context/EventDefinition';
import EventData from '../context/EventData';
import Log from '../Log';
import Expression from '../expression/Expression';
import Event from '../data/Event';
import Context from '../context/Context';

export default class ContextEventListenerSet extends JObject {
  // Cannot use Collections.newSetFromMap(WeakHashMap) here since filterListeners order must be preserved!
  private readonly filterListeners = new Array<DefaultContextEventListener>();
  private evaluator: Evaluator | null = null;
  private _fingerprintListeners = new Map<string, Array<DefaultContextEventListener>>();

  private contextManager: ContextManager<any> | null = null;
  // 'ContextManager' can be available also via 'context' (this avoid problems when contexts are [de]attached)
  private context: Context<any, any> | null = null;

  constructor() {
    super();
  }

  public static fromContextManager(value: ContextManager<any>): ContextEventListenerSet {
    const set = new ContextEventListenerSet();
    set.contextManager = value;
    return set;
  }

  public static fromContext(value: Context<any, any>): ContextEventListenerSet {
    const set = new ContextEventListenerSet();
    set.context = value;
    return set;
  }

  public getListeners(): Set<DefaultContextEventListener> {
    const localListeners = new Set<DefaultContextEventListener>();

    for (const listeners of this.allListenerQueues()) {
      const set = this.getListenersFrom(listeners);
      for (const item of set) {
        localListeners.add(item);
      }
    }

    return localListeners;
  }

  public dispatch(event: Event, eventDefinition: EventDefinition, eventData: EventData): void {
    try {
      if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
        Log.CONTEXT_EVENTS.debug('Dispatching event: ' + event);
      }

      const fingerprintListeners = this.fingerprintListeners(event, eventDefinition);

      if (fingerprintListeners != null) {
        this.dispatchEventToListeners(event, eventDefinition, eventData, fingerprintListeners);
      }

      this.dispatchEventToListeners(event, eventDefinition, eventData, this.filterListeners);
    } catch (ex) {
      Log.CONTEXT_EVENTS.error("Unexpected error occurred while dispatching event '" + event + "'", ex);
    }
  }

  private dispatchEventToListeners(event: Event, eventDefinition: EventDefinition, eventData: EventData, listeners: Array<DefaultContextEventListener>): void {
    for (let i = 0; i < listeners.length; i++) {
      const ref = listeners[i];
      const li: ContextEventListenerInfo = ContextEventListenerSet.getListenerInfo(ref);
      if (li == null) {
        listeners.splice(i, 1);
        continue;
      }
      const eventListener: DefaultContextEventListener = li.getListener();
      const contextManager: ContextManager<any> = this.getContextManager();
      if (eventListener.isAsync() && contextManager != null) {
        new Promise((resolve, reject) => {
          this.handleInListener(event, eventDefinition, eventListener, eventData);
          resolve();
        });
      } else {
        this.handleInListener(event, eventDefinition, eventListener, eventData);
      }
    }
  }

  private fingerprintListeners(event: Event, eventDefinition: EventDefinition): Array<DefaultContextEventListener> | null {
    const fingerprintExpression = eventDefinition.getFingerprintExpression();
    if (fingerprintExpression != null) {
      const contextManager: ContextManager<any> = this.getContextManager();
      if (contextManager != null) {
        if (this.evaluator == null) {
          this.evaluator = new Evaluator(contextManager, null, null, contextManager.getCallerController());
        }

        this.evaluator.setDefaultTable(event.getData());
        const fingerprint = this.evaluator.evaluateToString(new Expression(fingerprintExpression));
        this.evaluator.setDefaultTable(null);

        const res = this._fingerprintListeners.get(fingerprint);

        if (!res) return null;
        return res;
      } else {
        Log.CONTEXT_EVENTS.warn("Can't handle event with fingerprint because of no ContextManager: '" + event + "' ");
      }
    }
    return null;
  }

  private handleInListener(event: Event, eventDefinition: EventDefinition, eventListener: DefaultContextEventListener, eventData: EventData): void {
    try {
      eventData.registerHandleOffer();

      if (!eventListener.shouldHandle(event)) {
        if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
          Log.CONTEXT_EVENTS.debug("Listener '" + eventListener + "' does not want to handle event: " + event);
        }
        return;
      }

      eventData.registerHandleExecution();

      if (eventDefinition.isSessionBound()) {
        const eventSessionId = event.getSessionID();
        const caller = eventListener.getCallerController();
        const listenerSessionID = caller != null && caller.getSessionID() != null ? caller.getSessionID() : -1;
        if (eventSessionId != null && eventSessionId !== listenerSessionID) {
          if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
            Log.CONTEXT_EVENTS.debug("Listener '" + eventListener + "' should not handle a session bound event: " + event);
          }
          return;
        }
      }
      if (Log.CONTEXT_EVENTS.isDebugEnabled()) {
        Log.CONTEXT_EVENTS.debug("Listener '" + eventListener + "' is going to handle event: " + event);
      }

      eventListener.handle(event);
    } catch (e) {
      Log.CONTEXT_EVENTS.warn("Error handling event '" + event.toString() + "'", e);
    }
  }

  getListenersInfo(): Set<ContextEventListenerInfo> {
    const localListeners = new Set<ContextEventListenerInfo>();

    for (const listeners of this.allListenerQueues()) {
      const set = this.getListenersInfoFrom(listeners);
      for (const item of set) {
        localListeners.add(item);
      }
    }

    return localListeners;
  }

  public addListener(listener: DefaultContextEventListener, weak = false) {
    if (this.contains(listener)) {
      return false;
    }

    const fingerprint = listener.getFingerprint();

    let listeners: Array<DefaultContextEventListener> | undefined = this.filterListeners;

    if (fingerprint != null) {
      listeners = this._fingerprintListeners.get(fingerprint);
      if (!listeners) {
        listeners = new Array<DefaultContextEventListener>();
        this._fingerprintListeners.set(fingerprint, listeners);
      }
    }

    listeners.push(listener);

    return true;
  }

  public removeListener(listener: DefaultContextEventListener) {
    for (const listeners of this.allListenerQueues()) {
      if (this.removeFrom(listener, listeners)) {
        return true;
      }
    }

    return false;
  }

  public contains(listener: DefaultContextEventListener): boolean {
    for (const listeners of this.allListenerQueues()) {
      if (this.containsIn(listener, listeners)) {
        return true;
      }
    }
    return false;
  }

  clear() {
    for (const listeners of this.allListenerQueues()) {
      listeners.splice(0);
    }
  }

  public size(): number {
    let size = 0;

    for (const listeners of this.allListenerQueues()) {
      size += listeners.length;
    }

    return size;
  }

  private getListenersFrom(listeners: Array<DefaultContextEventListener>): Set<DefaultContextEventListener> {
    const result: Set<DefaultContextEventListener> = new Set();
    for (let i = 0; i < listeners.length; i++) {
      const li: ContextEventListenerInfo = ContextEventListenerSet.getListenerInfo(listeners[i]);
      if (li == null) {
        listeners.splice(i, 1);
        continue;
      }
      result.add(li.getListener());
    }
    return result;
  }

  private getListenersInfoFrom(listeners: Array<DefaultContextEventListener>): Set<ContextEventListenerInfo> {
    const result: Set<ContextEventListenerInfo> = new Set();
    for (let i = 0; i < listeners.length; i++) {
      const li: ContextEventListenerInfo = ContextEventListenerSet.getListenerInfo(listeners[i]);
      if (li == null) {
        listeners.splice(i, 1);
        continue;
      }
      result.add(li);
    }
    return result;
  }

  private removeFrom(listener: DefaultContextEventListener, listeners: Array<DefaultContextEventListener>): boolean {
    for (let i = 0; i < listeners.length; i++) {
      const li: ContextEventListenerInfo = ContextEventListenerSet.getListenerInfo(listeners[i]);
      if (li == null) {
        listeners.splice(i, 1);
        continue;
      }
      if (li.getListener().equals(listener)) {
        listeners.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  private containsIn(listener: DefaultContextEventListener, listeners: Array<DefaultContextEventListener>): boolean {
    for (let i = 0; i < listeners.length; i++) {
      const li: ContextEventListenerInfo = ContextEventListenerSet.getListenerInfo(listeners[i]);
      if (li == null) {
        listeners.splice(i, 1);
        continue;
      }
      if (li.getListener().equals(listener)) {
        return true;
      }
    }
    return false;
  }

  private allListenerQueues(): Set<Array<DefaultContextEventListener>> {
    const queues = new Set<Array<DefaultContextEventListener>>();
    queues.add(this.filterListeners);
    for (const queue of this._fingerprintListeners.values()) {
      queues.add(queue);
    }
    return queues;
  }

  private static getListenerInfo(ref: DefaultContextEventListener): ContextEventListenerInfo {
    return new ContextEventListenerInfo(ref, false);
  }

  public getContextManager(): ContextManager<any> {
    return this.context != null ? this.context.getContextManager() : this.contextManager;
  }
}
