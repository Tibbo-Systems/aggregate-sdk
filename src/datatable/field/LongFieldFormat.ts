import JSBI from 'jsbi';
import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import Util from '../../util/Util';
import FieldConstants from './FieldConstants';

export default class LongFieldFormat extends FieldFormat<JSBI> {
  constructor(name: string) {
    super(name);
  }

  public valueToString(value: JSBI): string | null {
    return value == null ? null : value.toString();
  }

  public getType(): string {
    return FieldConstants.LONG_FIELD;
  }

  public getNotNullDefault(): JSBI {
    return JSBI.BigInt(0);
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): JSBI | null {
    return Util.convertToLong(value, validate, false);
  }

  public static encodePeriodEditorOptions(minUnit: number, maxUnit: number): string {
    return minUnit + ' ' + maxUnit;
  }

  public convertKeyForSelectionValuesMap(value: any): any {
    return Util.isBigInt(value) ? value.toString() : value;
  }

  protected convertValue(value: any): JSBI | null {
    if (value != null && !Util.isBigInt(value)) {
      value = Util.convertToLong(value, true, false);
    }
    return value;
  }

  public getSuitableEditors(): Array<string> {
    return new Array<string>(FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_PERIOD, FieldConstants.EDITOR_BAR, FieldConstants.EDITOR_BYTES, FieldConstants.EDITOR_FOREIGN_INSTANCE);
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isBigInt(value);
  }

  public hasSelectionValue(value: any): boolean {
    const selectionValues: Map<any, string | null> | null = this.getSelectionValues();
    if ((value != null && !Util.isBigInt(value)) || selectionValues == null) {
      return false;
    }
    return value == null ? selectionValues.has(value) : selectionValues.has(value.toString());
  }
}
