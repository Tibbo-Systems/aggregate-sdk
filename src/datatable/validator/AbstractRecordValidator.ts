import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import JObject from '../../util/java/JObject';
import Util from '../../util/Util';

export default abstract class AbstractRecordValidator extends JObject {
  abstract encode(): string;

  abstract getType(): string;

  abstract validate(table: DataTable, record: DataRecord): void;

  public equals(obj: JObject): boolean {
    if (obj == null) {
      return false;
    }

    if (!(obj instanceof AbstractRecordValidator)) {
      return false;
    }

    const other: AbstractRecordValidator = obj as AbstractRecordValidator;

    if (!Util.equals(this.getType(), other.getType())) {
      return false;
    }

    if (!Util.equals(this.encode(), other.encode())) {
      return false;
    }

    return true;
  }

  public clone(): AbstractRecordValidator {
    return super.clone() as AbstractRecordValidator;
  }
}
