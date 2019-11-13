import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class FloatFieldFormat extends FieldFormat<number> {
    constructor(name: string);
    valueToString(value: number): string | null;
    getType(): string;
    getNotNullDefault(): number;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null;
    protected convertValue(value: any): number;
    getSuitableEditors(): Array<string>;
    isAssignableFrom(value: any): boolean;
}
