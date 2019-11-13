import DataRecord from './DataRecord';
import TableFormat from './TableFormat';
import ElementList from '../util/ElementList';
import ClassicEncodingSettings from './encoding/ClassicEncodingSettings';
import DataTable from './DataTable';
export default class DataTableFactory {
    static of(format?: TableFormat | null, emptyRecords?: number | boolean): DataTable;
    static createFromDataRecord(record: DataRecord | null): DataTable;
    static createWithFirstRecord(format: TableFormat | null, ...firstRowData: Array<any>): DataTable;
    static createAndDecode(data: string | ElementList, settings?: ClassicEncodingSettings, validate?: boolean): DataTable;
}
