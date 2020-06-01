import FireEventRequestController from '../event/FireEventRequestController';
import QueuedEvent from './QueuedEvent';
export default class EventDispatcher {
    static readonly CONCURRENT_DISPATCHER_KEEP_ALIVE_SECONDS = 10;
    private eventsScheduled;
    private eventsProcessed;
    private readonly undispatchedEvents;
    private concurrentDispatcherCount;
    constructor(queueLength: number, concurrentDispatcherCount: number | null);
    queue(ev: QueuedEvent, request?: FireEventRequestController): void;
    private queueInternal;
    private run;
    getQueueLength(): number;
    getEventQueueStatistics(): Map<string, number>;
    registerIncomingEvent(): void;
    registerProcessedEvent(): void;
    getEventsProcessed(): number;
    getEventsScheduled(): number;
}
