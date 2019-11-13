import SimpleFormatConverter from './SimpleFormatConverter';
import FieldConstants from '../field/FieldConstants';
import FieldFormat from '../FieldFormat';
import FieldFormatFactory from '../FieldFormatFactory';
import TableFormat from '../TableFormat';

export default class FCSimpleBoolean extends SimpleFormatConverter<any> {
  constructor() {
    super(FieldConstants.BOOLEAN_FIELD);
  }

  createFieldFormat(name: string): FieldFormat<any> {
    return FieldFormatFactory.createType(name, FieldConstants.BOOLEAN_FIELD);
  }

  protected simpleToBean(value: any): any {
    return value;
  }

  convertToTable(value: any, format: TableFormat | null): any {
    return value;
  }
}
