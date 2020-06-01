import TableFormat from '../TableFormat';
import FieldFormat from '../FieldFormat';
import DataRecord from '../DataRecord';
import FormatConverter from './FormatConverter';
import DataTableConversion from '../DataTableConversion';

export default abstract class AbstractFormatConverter<T> implements FormatConverter<T> {
  public static readonly VF_IS_NULL: string = 'isNull';

  private format: TableFormat | null = null;
  private readonly valueClass: string;

  constructor(valueClass: string, format: TableFormat | null = null) {
    this.valueClass = valueClass;
    this.format = format;
  }

  abstract convertToBean(value: any, originalValue: T | null): T;

  abstract convertToTable(value: T, format?: TableFormat | null): any;

  clone(value: T, useConversion: boolean): T | null {
    if (useConversion) {
      const fieldValue: any = this.convertToTable(value);
      return this.convertToBean(fieldValue, null);
    } else {
      return null;
    }
  }

  createFieldFormat(name: string): FieldFormat<any> {
    return DataTableConversion.createTableField(name, this.format);
  }

  getFormat(): TableFormat | null {
    return this.format;
  }

  instantiate(source: DataRecord): any {
    try {
      return this.convertToBean(source.wrap(), null);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  getValueClass(): string {
    return this.valueClass;
  }
}
