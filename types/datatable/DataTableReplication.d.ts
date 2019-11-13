import DataTable from './DataTable';
import DataRecord from './DataRecord';
export default class DataTableReplication {
    static copy(source: DataTable, target: DataTable, copyReadOnlyFields?: boolean, copyNonReplicatableFields?: boolean, removeRecordsFromTarget?: boolean, addRecordsToTarget?: boolean, ignoreUnresizable?: boolean, fields?: Array<string> | null): Set<string>;
    static copyWithKeyFields(source: DataTable, target: DataTable, copyReadOnlyFields: boolean, copyNonReplicatableFields: boolean, removeRecordsFromTarget: boolean, addRecordsToTarget: boolean, ignoreUnresizable: boolean, fields: Array<string> | null): Set<string>;
    static copyWithoutKeyFields(source: DataTable, target: DataTable, copyReadOnlyFields: boolean, copyNonReplicatableFields: boolean, removeRecordsFromTarget: boolean, addRecordsToTarget: boolean, ignoreUnresizable: boolean, fields: Array<string> | null): Set<string>;
    static copyTimestampAndQuality(source: DataTable, target: DataTable): void;
    static copyRecord(source: DataRecord, target: DataRecord, copyReadOnlyFields?: boolean, copyNonReplicatableFields?: boolean, removeRecordsFromTarget?: boolean, addRecordsToTarget?: boolean, fields?: Array<string> | null): Set<string>;
}
