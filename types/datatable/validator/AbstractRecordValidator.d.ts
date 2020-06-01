import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import JObject from '../../util/java/JObject';
export default abstract class AbstractRecordValidator extends JObject {
    abstract encode(): string;
    abstract getType(): string;
    abstract validate(table: DataTable, record: DataRecord): void;
    equals(obj: JObject): boolean;
    clone(): AbstractRecordValidator;
}
