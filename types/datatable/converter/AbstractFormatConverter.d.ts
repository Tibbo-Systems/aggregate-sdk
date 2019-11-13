import TableFormat from '../TableFormat';
import FieldFormat from '../FieldFormat';
import DataRecord from '../DataRecord';
import FormatConverter from './FormatConverter';
export default abstract class AbstractFormatConverter<T> implements FormatConverter<T> {
    static readonly VF_IS_NULL: string;
    private format;
    private readonly valueClass;
    constructor(valueClass: string, format?: TableFormat | null);
    abstract convertToBean(value: any, originalValue: T | null): T;
    abstract convertToTable(value: T, format?: TableFormat | null): any;
    clone(value: T, useConversion: boolean): T | null;
    createFieldFormat(name: string): FieldFormat<any>;
    getFormat(): TableFormat | null;
    instantiate(source: DataRecord): any;
    getValueClass(): string;
}
