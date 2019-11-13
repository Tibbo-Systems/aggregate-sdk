import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class LongFieldFormat extends FieldFormat<number> {
    constructor(name: string);
    valueToString(value: number): string | null;
    getType(): string;
    getNotNullDefault(): number;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null;
    static encodePeriodEditorOptions(minUnit: number, maxUnit: number): string;
    protected convertValue(value: any): any;
    getSuitableEditors(): Array<string>;
    isAssignableFrom(value: any): boolean;
}
