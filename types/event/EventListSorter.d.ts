import EventSortDirective from './EventSortDirective';
export default class EventListSorter {
}
export declare class DataTableComparator {
    constructor(sortDirectives: Array<EventSortDirective>);
    compareObjects(o1: any, o2: any, ascending: boolean): number;
}
