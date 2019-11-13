import SortOrder from './SortOrder';

export default class DataTableSorter implements Iterable<SortOrder> {
  readonly orders: Array<SortOrder> = new Array<SortOrder>();

  constructor(...orders: SortOrder[]) {
    this.orders.push(...orders);
  }

  public getOrders() {
    return this.orders;
  }

  public addOrder(order: SortOrder) {
    this.orders.push(order);
  }

  [Symbol.iterator]() {
    return this.orders[Symbol.iterator]();
  }
}
