import FieldFormat from '../FieldFormat';
export default class FieldFormatDefiner {
    private convertDifferentTypesToString;
    private fieldFormatsByName;
    constructor(convertDifferentTypesToString: boolean);
    put(fieldName: string, ff: FieldFormat<any>): void;
    get(fieldName: string): FieldFormat<any>;
    getFieldNames(): Array<string>;
    private computeIfAbsent;
}
