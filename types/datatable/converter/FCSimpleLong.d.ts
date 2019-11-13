import SimpleFormatConverter from './SimpleFormatConverter';
import FieldFormat from '../FieldFormat';
import TableFormat from '../TableFormat';
export default class FCSimpleLong extends SimpleFormatConverter<any> {
    constructor();
    createFieldFormat(name: string): FieldFormat<any>;
    protected simpleToBean(value: any): any;
    convertToTable(value: any, format: TableFormat | null): any;
}
