import JObject from '../util/java/JObject';
import TableFormat from './TableFormat';
import DataRecord from './DataRecord';
import DataTable from './DataTable';
export default abstract class AggreGateBean extends JObject {
    private readonly format;
    constructor(format: TableFormat, data?: DataRecord);
    toDataTable(): DataTable;
    toDataRecord(): DataRecord;
    getFormat(): TableFormat;
}
