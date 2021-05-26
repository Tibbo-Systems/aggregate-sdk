import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class DateFieldFormat extends FieldFormat<Date> {
    constructor(name: string);
    getType(): string;
    getNotNullDefault(): Date;
    valueFromString(value: string, settings: ClassicEncodingSettings, validate: boolean): Date | null;
    valueToString(value: Date): string | null;
    static dateFromString(value: string): Date;
    static dateToString(value: Date): string;
    getSuitableEditors(): Array<string>;
    isAssignableFrom(value: Date): boolean;
}
