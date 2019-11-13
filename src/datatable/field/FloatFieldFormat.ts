import FieldFormat from '../FieldFormat';
import Util from '../../util/Util';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import FieldConstants from './FieldConstants';

export default class FloatFieldFormat extends FieldFormat<number> {
  constructor(name: string) {
    super(name);
  }

  public valueToString(value: number): string | null {
    if (value === 0) return '0.0';
    return value == null ? null : value.toString();
  }

  public getType(): string {
    return FieldConstants.FLOAT_FIELD;
  }

  public getNotNullDefault(): number {
    return 0.0;
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null {
    if (value === null) {
      return Util.convertToNumber(value, validate, false);
    } else if (value.length == 0) {
      return 0.0;
    } else {
      const parseResult = parseFloat(value);
      return isNaN(parseResult) ? Util.convertToNumber(value, validate, false) : parseResult;
    }
  }

  protected convertValue(value: any): number {
    if (value != null && !Util.isNumber(value)) {
      value = Util.convertToNumber(value, true, false);
    }

    return value;
  }

  public getSuitableEditors(): Array<string> {
    return new Array<string>(
      FieldConstants.EDITOR_LIST,
      FieldConstants.EDITOR_BAR,
      FieldConstants.EDITOR_BYTES,
      FieldConstants.EDITOR_INSTANCE
    );
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isNumber(value);
  }
}
