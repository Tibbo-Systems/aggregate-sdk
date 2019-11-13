import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import Util from '../../util/Util';
import FieldConstants from './FieldConstants';

export default class LongFieldFormat extends FieldFormat<number> {
  constructor(name: string) {
    super(name);
  }

  public valueToString(value: number): string | null {
    return value == null ? null : value.toString();
  }

  public getType(): string {
    return FieldConstants.LONG_FIELD;
  }

  public getNotNullDefault(): number {
    return 0;
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null {
    if (value === null) {
      return Util.convertToNumber(value, validate, false);
    } else {
      const parseResult = parseInt(value);
      return isNaN(parseResult) ? Util.convertToNumber(value, validate, false) : parseResult;
    }
  }

  public static encodePeriodEditorOptions(minUnit: number, maxUnit: number): string {
    return minUnit + ' ' + maxUnit;
  }

  protected convertValue(value: any) {
    if (value != null && !Util.isNumber(value)) {
      value = Util.convertToNumber(value, true, false);
    }

    return value;
  }

  public getSuitableEditors(): Array<string> {
    return new Array<string>(
      FieldConstants.EDITOR_LIST,
      FieldConstants.EDITOR_PERIOD,
      FieldConstants.EDITOR_BAR,
      FieldConstants.EDITOR_BYTES,
      FieldConstants.EDITOR_FOREIGN_INSTANCE
    );
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isNumber(value);
  }
}
