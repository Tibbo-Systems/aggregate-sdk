import EventSortDirective from './EventSortDirective';
import Util from '../util/Util';

export default class EventListSorter {}

export class DataTableComparator {
  private sortDirectives: Array<EventSortDirective>;

  constructor(sortDirectives: Array<EventSortDirective>) {
    this.sortDirectives = sortDirectives;
  }

  public compareObjects(o1: any, o2: any, ascending: boolean): number {
    let comparison = 0;

    if (o1 == null) {
      comparison = -1;
    } else if (o2 == null) {
      comparison = 1;
    } else {
      comparison = Util.compareTo(o1, o2);
    }

    return ascending ? comparison : -comparison;
  }
}
