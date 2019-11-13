import SortOrder from './SortOrder';
export default class DataTableSorter implements Iterable<SortOrder> {
    readonly orders: Array<SortOrder>;
    constructor(...orders: SortOrder[]);
    getOrders(): SortOrder[];
    addOrder(order: SortOrder): void;
    [Symbol.iterator](): IterableIterator<SortOrder>;
}
