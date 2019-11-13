import FireEventRequestController from '../event/FireEventRequestController';
import Log from '../Log';
import EventDefinition from './EventDefinition';
import QueuedEvent from './QueuedEvent';

export default class EventDispatcher {
  public static readonly CONCURRENT_DISPATCHER_KEEP_ALIVE_SECONDS = 10;

  private eventsScheduled = 0;
  private eventsProcessed = 0;

  private readonly undispatchedEvents: Array<QueuedEvent>;
  private concurrentDispatcherCount = 50;

  constructor(queueLength: number, concurrentDispatcherCount: number | null) {
    //TODO  size should be 0
    this.undispatchedEvents = new Array<QueuedEvent>(0);
    if (concurrentDispatcherCount != null) {
      this.concurrentDispatcherCount = concurrentDispatcherCount;
    }
  }

  public queue(ev: QueuedEvent, request: FireEventRequestController | null) {
    this.queueInternal(ev, request);
  }

  private queueInternal(ev: QueuedEvent, request: FireEventRequestController | null): void {
    this.undispatchedEvents.unshift(ev);

    new Promise((resolve, reject) => {
      this.run();
      resolve();
    }).catch(ex => {
      Log.CONTEXT_EVENTS.fatal('Unexpected critical error in event dispatcher', ex);
    });
  }

  private run(): void {
    const ev: QueuedEvent = this.undispatchedEvents.pop() as QueuedEvent;
    let concurrency = ev
      .getEventData()
      .getDefinition()
      .getConcurrency();

    if (concurrency == EventDefinition.CONCURRENCY_SEQUENTIAL) {
      ev.dispatch();
      this.registerProcessedEvent();
    } else {
      ev.getEventData().queue(ev);

      if (!ev.getEventData().isDispatching()) {
        ev.getEventData().setDispatching(true);

        new Promise((resolve, reject) => {
          ev.getEventData().dispatchAll(this);
          resolve();
        });
      }
    }
  }

  public getQueueLength(): number {
    return this.undispatchedEvents.length;
  }

  public getEventQueueStatistics(): Map<string, number> {
    const result: Map<string, number> = new Map<string, number>();

    for (let event of this.undispatchedEvents) {
      const context: string | null = event.getEvent().getContext();
      if (context === null)
        throw new Error("Error in EventDispatcher, getEventQueueStatistics function. `context` shouldn't be null");

      let count = result.get(context);

      if (count == null) {
        count = 1;
      } else {
        count++;
      }

      result.set(context, count);
    }

    return result;
  }

  public registerIncomingEvent(): void {
    this.eventsScheduled++;
  }

  public registerProcessedEvent(): void {
    this.eventsProcessed++;
  }

  public getEventsProcessed(): number {
    return this.eventsProcessed;
  }

  public getEventsScheduled(): number {
    return this.eventsScheduled;
  }
}
