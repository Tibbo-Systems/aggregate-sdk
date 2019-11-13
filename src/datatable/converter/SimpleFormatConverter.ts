import AbstractFormatConverter from './AbstractFormatConverter';
import DataTable from '../DataTable';

export default abstract class SimpleFormatConverter<T> extends AbstractFormatConverter<T> {
  constructor(valueClass: string) {
    super(valueClass);
  }

  convertToBean(value: any, originalValue: T | null): T {
    const AbstractDataTable = require('../AbstractDataTable').default;
    if (value instanceof AbstractDataTable) {
      value = value.get() as DataTable;
    }

    return this.simpleToBean(value);
  }

  protected abstract simpleToBean(value: any): T;
}
