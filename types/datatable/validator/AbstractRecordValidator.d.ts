import RecordValidator from './RecordValidator';
import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import JObject from '../../util/java/JObject';
export default abstract class AbstractRecordValidator extends JObject implements RecordValidator {
    abstract encode(): string;
    abstract getType(): string;
    abstract validate(table: DataTable, record: DataRecord): void;
    equals(obj: JObject): boolean;
    clone(): JObject;
}
