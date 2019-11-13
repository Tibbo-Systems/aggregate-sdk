import TableValidator from './TableValidator';
import JObject from '../../util/java/JObject';
import Util from '../../util/Util';
import DataTable from '../DataTable';

export default abstract class AbstractTableValidator extends JObject implements TableValidator {
  public equals(obj: JObject): boolean {
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof AbstractTableValidator)) {
      return false;
    }

    const other: AbstractTableValidator = obj as AbstractTableValidator;

    if (!Util.equals(this.getType(), other.getType())) {
      return false;
    }
    if (!Util.equals(this.encode(), other.encode())) {
      return false;
    }

    return true;
  }

  public abstract getType(): string;

  public abstract encode(): string;

  public abstract validate(table: DataTable): void;

  public clone(): JObject {
    try {
      return super.clone();
    } catch (e) {
      throw new Error(e);
    }
  }
}
