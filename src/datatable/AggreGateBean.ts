import JObject from '../util/java/JObject';
import DataTableConversion from './DataTableConversion';
import TableFormat from './TableFormat';
import DataRecord from './DataRecord';
import DataTable from './DataTable';

export default abstract class AggreGateBean extends JObject {
  private readonly format: TableFormat;

  constructor(format: TableFormat, data?: DataRecord) {
    super();
    this.format = format;

    try {
      DataTableConversion.populateBeanFromRecord(this, data ? data : new DataRecord(format), format, true);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public toDataTable(): DataTable {
    try {
      return DataTableConversion.beanToTable(this, this.format, true, true);
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  public toDataRecord(): DataRecord {
    try {
      return DataTableConversion.beanToRecord(this, this.format, true, true);
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  public getFormat(): TableFormat {
    return this.format;
  }
}
