import SimpleFormatConverter from './SimpleFormatConverter';
import TableFormat from '../TableFormat';
import FieldConstants from '../field/FieldConstants';
import FieldFormat from '../FieldFormat';
import FieldFormatFactory from '../FieldFormatFactory';

export default class FCSimpleInteger extends SimpleFormatConverter<any> {
  constructor() {
    super(FieldConstants.INTEGER_FIELD);
  }

  createFieldFormat(name: string): FieldFormat<any> {
    return FieldFormatFactory.createType(name, FieldConstants.INTEGER_FIELD);
  }

  protected simpleToBean(value: any): any {
    return value;
  }

  convertToTable(value: any, format: TableFormat | null): any {
    return value;
  }
}
