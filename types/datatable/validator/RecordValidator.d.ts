import DataRecord from '../DataRecord';
import DataTable from '../DataTable';
export default interface RecordValidator {
    getType(): string;
    encode(): string;
    validate(table: DataTable, record: DataRecord): void;
}
