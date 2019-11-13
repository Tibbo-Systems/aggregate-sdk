import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class IntFieldFormat extends FieldFormat<number> {
    constructor(name: string);
    valueToString(value: number): string | null;
    getType(): string;
    getNotNullDefault(): number;
    protected convertValue(value: any): number | null;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): number | null;
    getSuitableEditors(): Array<string>;
    isAssignableFrom(value: any): boolean;
}
