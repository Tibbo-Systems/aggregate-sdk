import FieldFormat from '../FieldFormat';
import JsonEncodingHelper from './JsonEncodingHelper';

export default class FieldFormatDefiner {
  private convertDifferentTypesToString: boolean;
  private fieldFormatsByName = new Map<string, Array<FieldFormat<any>>>();

  constructor(convertDifferentTypesToString: boolean) {
    this.convertDifferentTypesToString = convertDifferentTypesToString;
  }

  put(fieldName: string, ff: FieldFormat<any>): void {
    const fieldFormats = this.computeIfAbsent(fieldName);
    if (fieldFormats?.length == 1) {
      const currentFieldFormat = fieldFormats[0];
      if (JsonEncodingHelper.looksLikeDefaultField(currentFieldFormat)) fieldFormats.length = 0;
    }
    if (this.fieldFormatsByName.has(fieldName) && this.fieldFormatsByName.get(fieldName)?.length !== 0) {
      const fieldFormat = this.fieldFormatsByName.get(fieldName);
      if (fieldFormat) {
        const oldParams = fieldFormat.filter((fieldFormat: any) => fieldFormat.getType() !== ff.getType());
        this.fieldFormatsByName.set(fieldName, [ff, ...oldParams]);
        return;
      }
    }
    this.fieldFormatsByName.set(fieldName, [ff]);
  }
  get(fieldName: string): FieldFormat<any> {
    const fieldFormats = this.fieldFormatsByName.get(fieldName);

    if (fieldFormats == null || fieldFormats.length == 0) return JsonEncodingHelper.createDefaultFieldFormat(fieldName);

    const numFieldFormats = fieldFormats.length;

    if (numFieldFormats == 1 || !this.convertDifferentTypesToString) return fieldFormats[0];

    return JsonEncodingHelper.createDefaultFieldFormat(fieldName);
  }
  getFieldNames(): Array<string> {
    return Array.from(this.fieldFormatsByName.keys());
  }
  private computeIfAbsent(key: string) {
    if (this.fieldFormatsByName.get(key) === null) {
      const newValue: Array<FieldFormat<any>> = [];
      this.fieldFormatsByName.set(key, newValue);
      return newValue;
    }
    return this.fieldFormatsByName.get(key);
  }
}
