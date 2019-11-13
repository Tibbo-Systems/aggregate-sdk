import FieldFormat from '../FieldFormat';
import TableFormat from '../TableFormat';
import DataRecord from '../DataRecord';

export default interface FormatConverter<T> {
  getFormat(): TableFormat | null;

  createFieldFormat(name: string): FieldFormat<any>;

  instantiate(source: DataRecord): any;

  clone(value: T, useConversion: boolean): T | null;

  convertToTable(value: T, format?: TableFormat | null): any;

  convertToBean(value: any, originalValue: T | null): T;

  getValueClass(): string;
}
