import TableFormat from '../TableFormat';
import AbstractFormatConverter from './AbstractFormatConverter';
import DataRecord from '../DataRecord';
import DataTable from '../DataTable';
import Log from '../../Log';
import DataTableConversion from '../DataTableConversion';
import DataTableFactory from '../DataTableFactory';

export default class DefaultFormatConverter<T> extends AbstractFormatConverter<T> {
  private constructorArguments: Array<string> = new Array<string>();

  constructor(valueClass: any, format: TableFormat) {
    super(valueClass, format);
  }

  convertToBean(value: any, originalValue: any | null): any {
    try {
      const rec: DataRecord = (value as DataTable).rec();
      if (rec.hasField(AbstractFormatConverter.VF_IS_NULL) && rec.getBoolean(AbstractFormatConverter.VF_IS_NULL)) return null;

      if (originalValue != null) {
        let bean = this.clone(originalValue, false);
        if (bean == null) {
          bean = this.instantiate(rec);
        }

        DataTableConversion.populateBeanFromRecord(bean, rec, this.getFormat() as TableFormat, true, [AbstractFormatConverter.VF_IS_NULL]);
        return bean;
      } else {
        if (this.constructorArguments.length === 0) {
          return DataTableConversion.beanFromTable(value, this.getValueClass(), this.getFormat() as TableFormat, true);
        } else {
          const bean = this.instantiate(rec);
          if (bean != null) {
            DataTableConversion.populateBeanFromRecord(bean, rec, this.getFormat() as TableFormat, true);
            return bean;
          }
          return bean;
        }
      }
    } catch (ex) {
      throw new Error(ex);
    }
  }

  convertToTable(value: any, format?: TableFormat | null): any {
    try {
      if (value == null && format) {
        if (format.hasField(AbstractFormatConverter.VF_IS_NULL)) {
          const dataTable: DataTable = DataTableFactory.of(format, true);
          dataTable.rec().setValue(AbstractFormatConverter.VF_IS_NULL, true);
          return dataTable;
        }
      }

      return DataTableConversion.beanToRecord(value, this.getFormat() as TableFormat, true, false, [AbstractFormatConverter.VF_IS_NULL]).wrap();
    } catch (ex) {
      throw new Error(ex);
    }
  }

  instantiate(source: DataRecord): any {
    Log.CORE.warn('Not implemented', new Error());
    return null;
  }
}
