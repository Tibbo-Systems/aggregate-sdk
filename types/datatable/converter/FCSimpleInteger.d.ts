import SimpleFormatConverter from './SimpleFormatConverter';
import TableFormat from '../TableFormat';
import FieldFormat from '../FieldFormat';
export default class FCSimpleInteger extends SimpleFormatConverter<any> {
    constructor();
    createFieldFormat(name: string): FieldFormat<any>;
    protected simpleToBean(value: any): any;
    convertToTable(value: any, format: TableFormat | null): any;
}
