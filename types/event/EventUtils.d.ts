import TableFormat from '../datatable/TableFormat';
import CallerController from '../context/CallerController';
import EventDefinition from '../context/EventDefinition';
import Context from '../context/Context';
export default class EventUtils {
    static FIELD_SEVERITY_STATS_COLOR: string;
    static FIELD_SEVERITY_STATS_NUMBER: string;
    static FIELD_SEVERITY_STATS_LEVEL: string;
    static SEVERITY_STATS_FORMAT: TableFormat;
    static ENVIRONMENT_ID: string;
    static ENVIRONMENT_CONTEXT: string;
    static ENVIRONMENT_EVENT: string;
    static ENVIRONMENT_LEVEL: string;
    static ENVIRONMENT_TIME: string;
    static ENVIRONMENT_ACKNOWLEDGEMENTS: string;
    static ENVIRONMENT_ENRICHMENTS: string;
    static ENVIRONMENT_VALUE: string;
    static generateEventId(): number;
    static getRandomInt(min: number, max: number): number;
    static getEvents(context: Context<any, any>, eventsMask: string, callerController: CallerController | null): Array<EventDefinition>;
    static matchesToMask(eventMask: string, ed: EventDefinition): boolean;
    static matchesToStringMask(eventMask: string, event: string): boolean;
}
