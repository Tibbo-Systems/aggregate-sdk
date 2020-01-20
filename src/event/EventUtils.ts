import JConstants from '../util/java/JConstants';
import TableFormat from '../datatable/TableFormat';
import CallerController from '../context/CallerController';
import EventDefinition from '../context/EventDefinition';
import Util from '../util/Util';
import Context from '../context/Context';
import ContextUtilsConstants from '../context/ContextUtilsConstants';

export default class EventUtils {
  public static FIELD_SEVERITY_STATS_COLOR = 'color';

  public static FIELD_SEVERITY_STATS_NUMBER = 'number';

  public static FIELD_SEVERITY_STATS_LEVEL = 'level';

  static SEVERITY_STATS_FORMAT: TableFormat;
  public static ENVIRONMENT_ID = 'id';

  public static ENVIRONMENT_CONTEXT = 'context';

  public static ENVIRONMENT_EVENT = 'event';

  public static ENVIRONMENT_LEVEL = 'level';

  public static ENVIRONMENT_TIME = 'time';

  public static ENVIRONMENT_ACKNOWLEDGEMENTS = 'acknowledgements';

  public static ENVIRONMENT_ENRICHMENTS = 'enrichments';

  public static ENVIRONMENT_VALUE = 'value';

  static generateEventId() {
    return EventUtils.getRandomInt(0, JConstants.INTEGER_MAX_VALUE);
  }

  static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getEvents(context: Context<any, any>, eventsMask: string, callerController: CallerController | null): Array<EventDefinition> {
    const events: Array<EventDefinition> = new Array<EventDefinition>();

    if (eventsMask === ContextUtilsConstants.ENTITY_GROUP_MASK) {
      for (const ed of context.getEventDefinitions(callerController, false)) {
        if (ed.getGroup() != null && ContextUtilsConstants.GROUP_SYSTEM !== ed.getGroup()) {
          events.push(ed);
        }
      }
    } else {
      const ed = context.getEventDefinition(eventsMask, null);
      if (ed != null) {
        events.push(ed);
      }
    }
    return events;
  }

  public static matchesToMask(eventMask: string, ed: EventDefinition): boolean {
    if (ContextUtilsConstants.ENTITY_GROUP_MASK === eventMask) {
      return ed.getGroup() != null && ContextUtilsConstants.GROUP_SYSTEM !== ed.getGroup();
    }
    return ed.getName() === eventMask;
  }

  // Result of this function may differ from the result of mathesToMask(String, EventDefinition)
  // because if doesn't check for the event's group name
  public static matchesToStringMask(eventMask: string, event: string): boolean {
    if (ContextUtilsConstants.ENTITY_GROUP_MASK === eventMask) {
      return true;
    }

    return Util.equals(event, eventMask);
  }
}
