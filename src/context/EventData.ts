import Comparable from '../util/java/Comparable';
import ContextEventListenerSet from '../event/ContextEventListenerSet';
import EventDefinition from './EventDefinition';
import ContextEventListener from '../event/ContextEventListener';
import Event from '../data/Event';
import QueuedEvent from './QueuedEvent';
import ContextEventListenerInfo from '../event/ContextEventListenerInfo';
import Util from '../util/Util';
import Log from '../Log';
import JObject from '../util/java/JObject';
import EventDispatcher from './EventDispatcher';
import DefaultContextEventListener from './DefaultContextEventListener';
import Context from './Context';

export default class EventData extends JObject implements Comparable<EventData> {
  public static readonly UNDISPATCHED_EVENTS_QUEUE_LENGTH = 10000;

  private listeners: ContextEventListenerSet;

  private definition: EventDefinition;

  private history: Array<Event> = new Array<Event>();

  private fireCount = 0;

  private undispatchedEvents: Array<QueuedEvent> | null = null;

  private dispatching = false;
  private handleOffers = 0;
  private handleExecutions = 0;

  constructor(definition: EventDefinition, source: Context<any, any>) {
    super();
    this.definition = definition;
    this.listeners = ContextEventListenerSet.fromContext(source);
  }

  public registerFiredEvent() {
    this.fireCount++;
  }

  public registerHandleOffer() {
    this.handleOffers++;
  }

  public registerHandleExecution() {
    this.handleExecutions++;
  }

  public getDefinition(): EventDefinition {
    return this.definition;
  }

  public getListeners(): Set<DefaultContextEventListener> {
    return this.listeners.getListeners();
  }

  public getListenersInfo(): Set<ContextEventListenerInfo> {
    return this.listeners.getListenersInfo();
  }

  public getFireCount(): number {
    return this.fireCount;
  }

  public addListener(listener: ContextEventListener, weak: boolean): boolean {
    return this.listeners.addListener(listener as DefaultContextEventListener, weak);
  }

  public removeListener(listener: ContextEventListener): boolean {
    return this.listeners.removeListener(listener as DefaultContextEventListener);
  }

  public clearListeners() {
    this.listeners.clear();
  }

  public hasListeners(): boolean {
    return this.listeners.size() > 0;
  }

  public dispatch(event: Event) {
    this.listeners.dispatch(event, this.getDefinition(), this);
  }

  public store(event: Event, customMemoryStorageSize: number | null): Event | null {
    const memoryStorateSize: number = customMemoryStorageSize != null ? customMemoryStorageSize : this.definition.getMemoryStorageSize();

    if (memoryStorateSize == null) {
      return null;
    }
    this.history = this.history.filter((cur) => {
      // Removing if expired
      const exprTime = cur.getExpirationtime();
      if (exprTime != null && exprTime.getTime() < Date.now()) {
        return false;
      }
      // Adding for persistent storage if in-memory history size exceeded
      return this.history.length <= memoryStorateSize;
    });
    let duplicate = null;
    for (const cur of this.history) {
      if (event.getDeduplicationId() != null && Util.equals(event.getDeduplicationId(), cur.getDeduplicationId())) {
        if (duplicate != null) {
          Log.CONTEXT_EVENTS.warn('Event history of event ' + event + ' contains more than one duplicate with ID: ' + event.getDeduplicationId());
        }
        duplicate = cur;
      }
    }

    if (duplicate == null) {
      this.history.push(event);
      return null;
    } else {
      Log.CONTEXT_EVENTS.debug('Found duplicate of event ' + event + ' (duplicate ID: ' + event.getDeduplicationId() + '): ' + duplicate);

      duplicate.setCreationtime(event.getCreationtime());
      duplicate.setCount(duplicate.getCount() + 1);
      return duplicate;
    }
  }

  public getHistory(): Array<Event> {
    return Array.from(this.history);
  }

  toString(): string {
    return this.definition + ' - ' + this.listeners.size() + ' listeners';
  }

  compareTo(o: EventData): number {
    return this.definition.compareTo(o.getDefinition());
  }

  public queue(ev: QueuedEvent): void {
    if (this.undispatchedEvents == null) {
      this.undispatchedEvents = new Array<QueuedEvent>(this.definition.getQueueLength());
    }

    this.undispatchedEvents.unshift(ev);
  }

  public dispatchAll(ed: EventDispatcher): void {
    try {
      // Prevent multiple dispatch processing, syncing on EventData can cause a deadlock, so using undispatchedEvents here

      do {
        if (this.undispatchedEvents != null && this.undispatchedEvents.length <= 1) {
          this.dispatching = false;
        }

        const ev = this.undispatchedEvents?.pop();

        if (!ev) {
          return;
        }

        ev.dispatch();
        ed.registerProcessedEvent();
      } while (true);
    } finally {
      this.dispatching = false;
    }
  }

  public isDispatching(): boolean {
    return this.dispatching;
  }

  public setDispatching(dispatching: boolean) {
    this.dispatching = dispatching;
  }

  public setDefinition(eventDefinition: EventDefinition) {
    this.definition = eventDefinition;
  }

  public getHandleOffers(): number {
    return this.handleOffers;
  }

  public getHandleExecutions(): number {
    return this.handleExecutions;
  }

  public getListenersCount(): number {
    return this.listeners.size();
  }

  public getQueueLength(): number {
    return this.undispatchedEvents == null ? 0 : this.undispatchedEvents.length;
  }
}
