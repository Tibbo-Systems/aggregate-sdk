import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class BooleanFieldFormat extends FieldFormat<boolean> {
    private readonly type;
    constructor(name: string);
    valueToString(value: boolean): string | null;
    getType(): string;
    getNotNullDefault(): boolean;
    protected convertValue(value: any): boolean;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): boolean | null;
    isAssignableFrom(value: any): boolean;
}
