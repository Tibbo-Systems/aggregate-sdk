import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import Util from '../../util/Util';
import FieldConstants from './FieldConstants';

export default class BooleanFieldFormat extends FieldFormat<boolean> {
  constructor(name: string) {
    super(name);
  }

  public valueToString(value: boolean): string | null {
    return value == null ? null : value ? '1' : '0';
  }

  public getType(): string {
    return FieldConstants.BOOLEAN_FIELD;
  }

  public getNotNullDefault(): boolean {
    return false;
  }

  protected convertValue(value: any): boolean {
    if (value != null && !Util.isBoolean(value)) {
      value = Util.convertToBoolean(value, true, false);
    }

    return value;
  }

  public valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): boolean | null {
    return !!(value !== null && (value === '1' || value.toLowerCase() === 'true'));
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isBoolean(value);
  }
}
