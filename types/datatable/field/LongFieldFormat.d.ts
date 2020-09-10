import JSBI from 'jsbi';
import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class LongFieldFormat extends FieldFormat<JSBI> {
    constructor(name: string);
    valueToString(value: JSBI): string | null;
    getType(): string;
    getNotNullDefault(): JSBI;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): JSBI | null;
    static encodePeriodEditorOptions(minUnit: number, maxUnit: number): string;
    convertKeyForSelectionValuesMap(value: any): any;
    protected convertValue(value: any): JSBI | null;
    getSuitableEditors(): Array<string>;
    isAssignableFrom(value: any): boolean;
    hasSelectionValue(value: any): boolean;
}
