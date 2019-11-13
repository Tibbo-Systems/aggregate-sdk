import DataTable from '../datatable/DataTable';
export default class CachedVariableValue {
    private timestamp;
    private value;
    constructor(timestamp: Date, value: DataTable);
    getTimestamp(): Date;
    setTimestamp(timestamp: Date): void;
    getValue(): DataTable;
    setValue(value: DataTable): void;
}
