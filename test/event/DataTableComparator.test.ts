import TableFormat from '../../src/datatable/TableFormat';
import SimpleDataTable from '../../src/datatable/SimpleDataTable';
import Event from '../../src/data/Event';
import EventLevel from '../../src/event/EventLevel';
import EventSortDirective from '../../src/event/EventSortDirective';
import { DataTableComparator } from '../../src/event/EventListSorter';

class DataTableComparatorTest {
  private static readonly format: TableFormat = new TableFormat();

  static __static_initializer_0() {
    DataTableComparatorTest.format.addField('<str><S><F=N>');
    DataTableComparatorTest.format.addField('<value><I>');
    DataTableComparatorTest.format.addField('<bool><B>');
  }

  public static first: Event;

  static __static_initializer_1() {
    DataTableComparatorTest.first = Event.createEvent('contexta', 'namea', EventLevel.INFO, SimpleDataTable.createSimpleDataTable(DataTableComparatorTest.format, 'testa', 1, true), 1);
    DataTableComparatorTest.first.setCreationtime(new Date(Date.now() + 1));
    DataTableComparatorTest.first.setAcknowledgementsTable(new SimpleDataTable());
    DataTableComparatorTest.first.setEnrichmentsTable(new SimpleDataTable());
  }

  public static second: Event;

  static __static_initializer_2() {
    DataTableComparatorTest.second = Event.createEvent('contextb', 'nameb', EventLevel.WARNING, SimpleDataTable.createSimpleDataTable(DataTableComparatorTest.format, 'testb', 2, true), 2);

    DataTableComparatorTest.second.setCreationtime(new Date(Date.now() + 2));
    DataTableComparatorTest.second.setAcknowledgementsTable(new SimpleDataTable());
    DataTableComparatorTest.second.setEnrichmentsTable(new SimpleDataTable());
  }

  public static third: Event;

  static __static_initializer_3() {
    DataTableComparatorTest.third = Event.createEvent('contextc', 'namec', EventLevel.ERROR, SimpleDataTable.createSimpleDataTable(DataTableComparatorTest.format, 'testc', 3, true), 3);

    DataTableComparatorTest.third.setCreationtime(new Date(Date.now() + 3));
    DataTableComparatorTest.third.setAcknowledgementsTable(new SimpleDataTable());
    DataTableComparatorTest.third.setEnrichmentsTable(new SimpleDataTable());
  }

  private comparator: DataTableComparator = new DataTableComparator(new Array<EventSortDirective>());

  public getComparator(): DataTableComparator {
    return this.comparator;
  }

  private static _init = false;

  public static initialize() {
    if (DataTableComparatorTest._init) return;

    DataTableComparatorTest.__static_initializer_0();
    DataTableComparatorTest.__static_initializer_1();
    DataTableComparatorTest.__static_initializer_2();
    DataTableComparatorTest.__static_initializer_3();
    DataTableComparatorTest._init = true;
  }

  constructor() {
    DataTableComparatorTest.initialize();
  }
}

describe('DataTableComparatorTest', () => {
  it('compareObjectsContext', () => {
    const dataTableComparatorTest = new DataTableComparatorTest();
    const comparator = dataTableComparatorTest.getComparator();

    expect(
      comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.second.getContext(), true) ==
        -comparator.compareObjects(DataTableComparatorTest.second.getContext(), DataTableComparatorTest.first.getContext(), true)
    ).toBeTruthy();
    expect(
      comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.second.getContext(), false) ==
        -comparator.compareObjects(DataTableComparatorTest.second.getContext(), DataTableComparatorTest.first.getContext(), false)
    ).toBeTruthy();

    expect(
      Math.sign(comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.third.getContext(), true)) ==
        Math.sign(comparator.compareObjects(DataTableComparatorTest.second.getContext(), DataTableComparatorTest.third.getContext(), true))
    ).toBeTruthy();

    expect(comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.second.getContext(), true) <= 0).toBeTruthy();
    expect(comparator.compareObjects(DataTableComparatorTest.second.getContext(), DataTableComparatorTest.third.getContext(), true) <= 0).toBeTruthy();
    expect(comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.third.getContext(), true) <= 0).toBeTruthy();

    expect(DataTableComparatorTest.first.equals(DataTableComparatorTest.first) && comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.first.getContext(), true) == 0).toBeTruthy();
    expect(DataTableComparatorTest.first.equals(DataTableComparatorTest.first) && comparator.compareObjects(DataTableComparatorTest.first.getContext(), DataTableComparatorTest.first.getContext(), false) == 0).toBeTruthy();

    expect(comparator.compareObjects(DataTableComparatorTest.first.getContext(), null, true) == 0).toBeFalsy();
    expect(comparator.compareObjects(null, DataTableComparatorTest.first.getContext(), true) == 0).toBeFalsy();
    expect(comparator.compareObjects(null, null, true) == 0).toBeFalsy();
    expect(comparator.compareObjects(DataTableComparatorTest.first.getContext(), null, false) == 0).toBeFalsy();
    expect(comparator.compareObjects(null, DataTableComparatorTest.first.getContext(), false) == 0).toBeFalsy();
    expect(comparator.compareObjects(null, null, false) == 0).toBeFalsy();
  });
});
