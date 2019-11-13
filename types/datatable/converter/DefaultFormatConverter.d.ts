import TableFormat from '../TableFormat';
import AbstractFormatConverter from './AbstractFormatConverter';
import DataRecord from '../DataRecord';
export default class DefaultFormatConverter<T> extends AbstractFormatConverter<T> {
    private constructorArguments;
    constructor(valueClass: any, format: TableFormat);
    convertToBean(value: any, originalValue: any | null): any;
    convertToTable(value: any, format?: TableFormat | null): any;
    instantiate(source: DataRecord): any;
}
