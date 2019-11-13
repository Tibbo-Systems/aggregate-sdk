import EventData from './EventData';
import Event from '../data/Event';
export default class QueuedEvent {
    private readonly eventData;
    private readonly event;
    constructor(ed: EventData, ev: Event);
    dispatch(): void;
    getEvent(): Event;
    getEventData(): EventData;
}
