import DataTable from '../datatable/DataTable';

export default class CachedVariableValue {
  private timestamp: Date;

  private value: DataTable;

  public constructor(timestamp: Date, value: DataTable) {
    this.timestamp = timestamp;
    this.value = value;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  public setTimestamp(timestamp: Date) {
    this.timestamp = timestamp;
  }

  public getValue(): DataTable {
    return this.value;
  }

  public setValue(value: DataTable) {
    this.value = value;
  }
}
