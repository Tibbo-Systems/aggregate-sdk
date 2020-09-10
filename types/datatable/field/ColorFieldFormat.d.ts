import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class ColorFieldFormat extends FieldFormat<string> {
    constructor(name: string);
    getNotNullDefault(): string;
    getType(): string;
    isAssignableFrom(value: any): boolean;
    valueFromString(value: string | null, settings?: ClassicEncodingSettings | null, validate?: boolean): string | null;
    valueToString(value: string | null, settings?: ClassicEncodingSettings): string | null;
    getSuitableEditors(): Array<string>;
}
