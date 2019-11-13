import TableValidator from './TableValidator';
import JObject from '../../util/java/JObject';
import DataTable from '../DataTable';
export default abstract class AbstractTableValidator extends JObject implements TableValidator {
    equals(obj: JObject): boolean;
    abstract getType(): string;
    abstract encode(): string;
    abstract validate(table: DataTable): void;
    clone(): JObject;
}
