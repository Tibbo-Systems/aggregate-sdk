import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import Util from '../../util/Util';
import FieldConstants from './FieldConstants';

export default class IntFieldFormat extends FieldFormat<number> {
  constructor(name: string) {
    super(name);
  }

  public valueToString(value: number): string | null {
    return value == null ? null : value.toString();
  }

  public getType(): string {
    return FieldConstants.INTEGER_FIELD;
  }

  public getNotNullDefault(): number {
    return 0;
  }

  protected convertValue(value: any): number | null {
    if (value !== null && !Util.isNumber(value)) {
      const convertedValue = Util.convertToNumber(value, true, false);
      value = convertedValue !== null ? parseInt(convertedValue.toString()) : null;
    }

    return value;
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null {
    if (value === null || value.length == 0) {
      return 0;
    }
    try {
      return Number(value);
    } catch (ex) {
      const convertResult = Util.convertToNumber(value, validate, false);
      return convertResult !== null ? Number(convertResult) : null;
    }
  }

  public getSuitableEditors(): Array<string> {
    return new Array<string>(FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_BAR, FieldConstants.EDITOR_BYTES, FieldConstants.EDITOR_SPINNER, FieldConstants.EDITOR_EVENT_LEVEL, FieldConstants.EDITOR_INSTANCE);
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isNumber(value);
  }
}
