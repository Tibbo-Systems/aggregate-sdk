import EventData from './EventData';
import Event from '../data/Event';

export default class QueuedEvent {
  private readonly eventData: EventData;
  private readonly event: Event;

  constructor(ed: EventData, ev: Event) {
    this.eventData = ed;
    this.event = ev;
  }

  public dispatch(): void {
    this.eventData.dispatch(this.event);
  }

  public getEvent(): Event {
    return this.event;
  }

  public getEventData(): EventData {
    return this.eventData;
  }
}
