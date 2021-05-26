import FieldFormat from '../FieldFormat';
import Util from '../../util/Util';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import FieldConstants from './FieldConstants';

export default class DoubleFieldFormat extends FieldFormat<number> {
  constructor(name: string) {
    super(name);
  }

  public valueToString(value: number | null): string | null {
    if (value === 0) return '0.0';

    if (value === null) return null;

    const stringValue = value.toString();

    if (stringValue.includes('e+')) {
      return stringValue.replace('e+', 'E');
    } else if (stringValue.includes('e-')) {
      return stringValue.replace('e-', 'E-');
    }

    return stringValue;
  }

  public getType(): string {
    return FieldConstants.DOUBLE_FIELD;
  }

  public getNotNullDefault(): number {
    return 0.0;
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null {
    if (value === null) {
      return Util.convertToNumber(value, validate, false);
    } else if (value.length === 0) {
      return 0.0;
    } else {
      const resultToNumber = Number(value);
      return isNaN(resultToNumber) ? Util.convertToNumber(value, validate, false) : resultToNumber;
    }
  }

  protected convertValue(value: any): number {
    if (value != null && !Util.isNumber(value)) {
      value = Util.convertToNumber(value, true, false);
    }

    return value;
  }

  public getSuitableEditors(): Array<string> {
    return new Array<string>(FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_BAR, FieldConstants.EDITOR_INSTANCE);
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isNumber(value);
  }
}
