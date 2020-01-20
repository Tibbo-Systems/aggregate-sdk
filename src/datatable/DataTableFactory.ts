import DataRecord from './DataRecord';
import TableFormat from './TableFormat';
import Log from '../Log';
import ElementList from '../util/ElementList';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import Util from '../util/Util';
import StringUtils from '../util/StringUtils';
import DataTable from './DataTable';

export default class DataTableFactory {
  public static of(format?: TableFormat | null, emptyRecords?: number | boolean): DataTable {
    const SimpleDataTable = require('./SimpleDataTable').default;
    return new SimpleDataTable(format, emptyRecords);
  }

  public static createFromDataRecord(record: DataRecord | null): DataTable {
    const SimpleDataTable = require('./SimpleDataTable').default;
    const simpleDataTable = new SimpleDataTable();
    if (record != null) {
      simpleDataTable.addRecordFromRecord(record);
    }

    return simpleDataTable;
  }

  public static createWithFirstRecord(format: TableFormat | null, ...firstRowData: Array<any>): DataTable {
    const SimpleDataTable = require('./SimpleDataTable').default;
    if (format == null) {
      Log.DATATABLE.warn('Format is null');
      return new SimpleDataTable();
    }
    const simpleTable = new SimpleDataTable(format);
    if (firstRowData.length > 0) {
      simpleTable.addRecordFromRecord(DataRecord.createAndFill(format, ...firstRowData));
    }

    return simpleTable;
  }

  public static createAndDecode(data: string | ElementList, settings?: ClassicEncodingSettings, validate = true): DataTable {
    let elements: ElementList;
    if (Util.isString(data)) {
      elements = StringUtils.elements(data as string, settings != null && settings.isUseVisibleSeparators());
    } else {
      try {
        elements = data as ElementList;
      } catch (err) {
        throw new Error('Error in SimpleDataTable, createAndDecode function. Parameter `data` is not correct ElementList.');
      }
    }

    if (!settings) {
      settings = new ClassicEncodingSettings(false);
    }
    const SimpleDataTable = require('./SimpleDataTable').default;
    const simpleTable = new SimpleDataTable();
    simpleTable.accomplishConstruction(elements, settings, validate);

    return simpleTable;
  }
}
