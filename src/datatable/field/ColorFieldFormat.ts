import FieldFormat from '../FieldFormat';
import FieldConstants from './FieldConstants';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';

export default class ColorFieldFormat extends FieldFormat<string> {
  constructor(name: string) {
    super(name);
  }

  getNotNullDefault(): string {
    return 'black';
  }

  getType(): string {
    return FieldConstants.COLOR_FIELD;
  }

  isAssignableFrom(value: any): boolean {
    return false;
  }

  valueFromString(value: string | null, settings?: ClassicEncodingSettings | null, validate?: boolean): string | null {
    return value;
  }

  valueToString(value: string | null, settings?: ClassicEncodingSettings): string | null {
    return value;
  }

  getSuitableEditors(): Array<string> {
    return [FieldConstants.EDITOR_LIST, FieldConstants.EDITOR_BOX];
  }
}
