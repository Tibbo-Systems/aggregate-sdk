import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
export default class DateFieldFormat extends FieldFormat<Date> {
    private static DEFAULT_DATE;
    private static DATATABLE_DATE_PATTERN;
    private static UTC_TIME_ZONE;
    constructor(name: string);
    valueToString(value: Date): string | null;
    getType(): string;
    getNotNullDefault(): Date;
    static dateToString(value: Date): string;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): Date | null;
    static dateFromString(value: string): Date;
    getSuitableEditors(): Array<string>;
    isAssignableFrom(value: any): boolean;
}
