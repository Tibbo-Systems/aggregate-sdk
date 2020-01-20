import DataTable from './DataTable';
import TableFormat from './TableFormat';
import DataRecord from './DataRecord';
import Log from '../Log';
import AggreGateBean from './AggreGateBean';
import FieldFormat from './FieldFormat';
import Util from '../util/Util';
import DataTableFactory from './DataTableFactory';
import FieldFormatFactory from './FieldFormatFactory';
import SimpleDataTable from './SimpleDataTable';
import FieldConstants from './field/FieldConstants';
import FormatConverter from './converter/FormatConverter';
import JObject from '../util/java/JObject';

export default class DataTableConversion {
  private static initDataTableConversion = false;

  static readonly FORMAT_CONVERTERS: Array<FormatConverter<any>> = new Array<FormatConverter<any>>();

  private static initializeDataTableConversion0() {
    const FCSimpleInteger = require('./converter/FCSimpleInteger').default;
    const FCSimpleBoolean = require('./converter/FCSimpleBoolean').default;
    const FCSimpleFloat = require('./converter/FCSimpleFloat').default;
    const FCSimpleDouble = require('./converter/FCSimpleDouble').default;
    const FCSimpleLong = require('./converter/FCSimpleLong').default;
    DataTableConversion.registerFormatConverter(new FCSimpleInteger());
    DataTableConversion.registerFormatConverter(new FCSimpleBoolean());
    DataTableConversion.registerFormatConverter(new FCSimpleFloat());
    DataTableConversion.registerFormatConverter(new FCSimpleDouble());
    DataTableConversion.registerFormatConverter(new FCSimpleLong());
  }

  public static initializeDataTableConversion() {
    if (DataTableConversion.initDataTableConversion) {
      return;
    }

    DataTableConversion.initializeDataTableConversion0();
    DataTableConversion.initDataTableConversion = true;
  }

  public static registerFormatConverter(converter: FormatConverter<any>) {
    DataTableConversion.FORMAT_CONVERTERS.push(converter);
  }

  public static beanFromTable(table: DataTable, beanClass: any, format: TableFormat, setReadOnlyFields: boolean): any {
    const list: Array<any> = DataTableConversion.beansFromTable(table, beanClass, format, setReadOnlyFields);

    if (list.length > 1) {
      Log.DATATABLE.warn('More than one bean generated from data table, returning the first one only', new Error());
    }

    return list[0];
  }

  public static beansFromTable(table: DataTable, valueClass: any, format: TableFormat, setReadOnlyFields = true): Array<any> {
    try {
      const res: Array<any> = new Array<any>();

      if (table == null) {
        return res;
      }

      for (const rec of table) {
        if (Util.isString(valueClass) && FieldFormat.isFieldClass(valueClass)) {
          res.push(rec.getValue(0));
          continue;
        }

        const bean: any = this.beanFromRecord(rec, valueClass, format, setReadOnlyFields);

        res.push(bean);
      }

      return res;
    } catch (ex) {
      throw new Error("Error converting data table to the list of beans of type '" + valueClass + "': " + ex.message);
    }
  }

  public static fillFromTable(table: DataTable, valueClass: any, format: TableFormat, setReadOnlyFields = true): Array<any> {
    try {
      const res: Array<any> = new Array<any>();

      if (table == null) {
        return res;
      }

      for (const rec of table) {
        if (Util.isString(valueClass) && FieldFormat.isFieldClass(valueClass)) {
          res.push(rec.getValue(0));
          continue;
        }

        const bean: any = this.fillFromRecord(rec, valueClass, format, setReadOnlyFields);
        res.push(bean);
      }

      return res;
    } catch (ex) {
      throw new Error("Error converting data table to the list of beans of type '" + valueClass + "': " + ex.message);
    }
  }

  public static fillFromRecord(rec: DataRecord, beanClass: any, format: TableFormat, setReadOnlyFields: boolean): any {
    try {
      let bean: any;
      const fieldCount = rec.getFieldCount();

      // for (let field of rec.getFiel)

      return bean;
    } catch (ex) {
      throw new Error("Error converting data record to the bean of type '" + beanClass.getName() + "': " + ex.message);
    }
  }

  // TODO Class implementation
  public static beanFromRecord(rec: DataRecord, beanClass: any, format: TableFormat, setReadOnlyFields: boolean): any {
    try {
      let bean: any;
      const fc: FormatConverter<any> | null = this.getFormatConverter(beanClass, null);
      if (fc == null) {
        bean = Reflect.construct(beanClass, []);
        this.populateBeanFromRecord(bean, rec, format, setReadOnlyFields);
      } else {
        bean = fc.instantiate(rec);
      }
      return bean;
    } catch (ex) {
      throw new Error("Error converting data record to the bean of type '" + beanClass.getName() + "': " + ex.message);
    }
  }

  public static getFormatConverter(valueClass: any, fieldType: string | null = null): FormatConverter<JObject> | null {
    if (valueClass == null) {
      return null;
    }

    if (valueClass instanceof AggreGateBean) {
      return null; // AggreGateBean's cannot have additional converters
    }

    if (Util.isString(valueClass) && FieldFormat.isFieldClass(valueClass)) {
      return null;
    }

    for (const fc of DataTableConversion.FORMAT_CONVERTERS) {
      if (fieldType == null) {
        return null;
      }
      if (fc.getValueClass() === fieldType) {
        return fc;
      }
    }

    return null;
  }

  // TODO Class implementation
  public static populateBeanFromRecord(bean: any, rec: DataRecord, format: TableFormat, setReadOnlyFields: boolean, fieldsToSkip: Array<string> = new Array<string>()): void {
    try {
      for (const ff of format) {
        if (fieldsToSkip.filter(el => el === ff.getName()).length > 1) {
          continue;
        }

        if (ff.isReadonly() && !setReadOnlyFields) {
          continue;
        }

        let value: any;
        if (rec.getFormat().hasField(ff.getName())) {
          value = rec.getValue(ff.getName());
        } else {
          value = ff.getDefaultValueCopy();
        }

        try {
          if (value != null) {
            // List and Array creation in Java
            if (bean instanceof Array) {
              value = DataTableConversion.createList(bean, rec, setReadOnlyFields, ff);

              if (value == null) {
                continue;
              }
            } else {
              // TODO Class implementation. Check logic
              const fc: FormatConverter<any> | null = DataTableConversion.getFormatConverter(bean, ff.getType());

              if (fc != null) {
                const originalValue: any = bean[ff.getName()];
                value = fc.convertToBean(value, originalValue);
              }
              // } else if (bean instanceof AggreGateBean && value instanceof AbstractDataTable) {
              //     value = this.createAggreGateBean(value);
              // }
            }
          }

          DataTableConversion.setValue(bean, value, ff.getName());
        } catch (ex1) {
          throw new Error("Error setting property '" + ff.getName() + "' to '" + value + "' (" + (value != null ? value : 'null') + '): ' + ex1.message);
        }
      }
    } catch (ex) {
      throw new Error("Error populating bean of type '" + bean + "' from data table: " + ex.message);
    }
  }

  private static createList(bean: any, rec: DataRecord, setReadOnlyFields: boolean, ff: FieldFormat<any>): Array<any> | null {
    if (!ff.getType()) {
      Log.DATATABLE.error('Cannot determine list element class for ' + ff.getName());
      return null;
    }

    const recType = rec.getFieldFormat(ff.getName()).getType();
    if (recType != FieldConstants.DATATABLE_FIELD) {
      Log.DATATABLE.error('Not a data table field ' + ff.getName());
      return null;
    }

    const data: DataTable = rec.getDataTable(ff.getName());

    return DataTableConversion.beansFromTable(data, recType, data.getFormat(), setReadOnlyFields);
  }

  // TODO Class implementation
  public static beanToTable(bean: any, format: TableFormat, setReadOnlyFields = true, ignoreErrors = false): DataTable {
    return DataTableConversion.beanToRecord(bean, format, setReadOnlyFields, ignoreErrors).wrap();
  }

  // TODO Class implementation
  public static beanToRecord(bean: any, format: TableFormat, setReadOnlyFields: boolean, ignoreErrors: boolean, fieldsToSkip: Array<string> = Array<string>()): DataRecord {
    try {
      if (format == null) {
        throw new Error('No format found for ' + bean);
      }

      const rec: DataRecord = new DataRecord(format.isImmutable() ? format : format.clone());

      // TODO check if bean class is DataTable, String, Boolean and etc.
      // if (bean != null && FieldFormat.isFieldClass(bean.getClass()))
      // {
      //     rec.addValue(bean);
      //     return rec;
      // }

      for (const ff of format) {
        if (fieldsToSkip.filter(el => el === ff.getName()).length > 1 || (!setReadOnlyFields && ff.isReadonly())) {
          continue;
        }

        let value: any = null;
        try {
          if (bean != null) {
            value = DataTableConversion.getValue(bean, ff.getName());
          }
        } catch (e) {
          Log.DATATABLE.debug('Error getting property');
          continue;
        }

        const fc: FormatConverter<any> | null = bean == null ? null : DataTableConversion.getFormatConverter(bean, ff.getType());

        if (fc != null) {
          value = fc.convertToTable(value, DataTableConversion.getFormatFromDefaultValue(ff));
        }

        if (value != null) {
          // List and Array creation in Java
          if (bean instanceof Array) {
            value = DataTableConversion.convertList(bean, rec, setReadOnlyFields, ff);

            if (value == null) {
              continue;
            }
          } else if (value instanceof AggreGateBean) {
            value = value.toDataTable();
          }
        }

        try {
          rec.setValue(ff.getName(), value);
        } catch (e) {
          if (!ignoreErrors) {
            throw new e();
          }
        }
      }
      return rec;
    } catch (e) {
      throw new Error("Error converting bean of type '" + bean == null ? 'null' : bean + "' to data record: " + e.message);
    }
  }

  static beansToTable(beans: Array<any>, format: TableFormat, setReadOnlyFields = true): DataTable {
    const table: DataTable = DataTableFactory.of(format);

    beans.forEach(bean => {
      table.addRecordFromRecord(DataTableConversion.beanToRecord(bean, format, setReadOnlyFields, false));
    });

    return table;
  }

  public static createTableField(name: string, format: TableFormat | null): FieldFormat<any> {
    const ff: FieldFormat<any> = FieldFormatFactory.createType(name, FieldConstants.DATATABLE_FIELD);
    ff.setDefault(new SimpleDataTable(format, true));
    return ff;
  }

  /*  public static createFieldFormat(name: string, value: object): FieldFormat<any> {
    let ff: FieldFormat<any> = FieldFormatFactory.createType(name, FieldConstants.STRING_FIELD);
    if (value == null) {
      ff.setNullable(true);
    } else {
      try {
        ff = this.createFieldFormatOfClass(name, Reflection.getClass(value));
      } catch (ex) {
        Log.DATATABLE.debug('Error constructing field format for value', ex);
      }
    }
    return ff;
  }

  public static createFieldFormatOfClass(name: string, valueClass: Class): FieldFormat<any> {
    // TODO need make
    //FORMAT_CONVERTERS_LOCK.readLock().lock();

    try {
      for (let converter of this.FORMAT_CONVERTERS) {
        if (valueClass.getName() === converter.getValueClass()) {
          return converter.createFieldFormat(name);
        }
      }
    } finally {
      // TODO need make
      //FORMAT_CONVERTERS_LOCK.readLock().unlock();
    }

    return FieldFormat.create(name, valueClass);
  }*/

  private static getFormatFromDefaultValue(ff: FieldFormat<any>): TableFormat | null {
    let frmt = null;
    if (ff.getDefaultValue() instanceof DataTable) {
      frmt = (ff.getDefaultValue() as DataTable).getFormat();
    }
    return frmt;
  }

  public static createAggreGateBean(value: any): DataTable {
    const table: DataTable = value as DataTable;
    table.addRecord();
    return table;
  }

  private static convertList(bean: any, value: any, setReadOnlyFields: boolean, ff: FieldFormat<any>): DataTable | null {
    throw new Error('Not implemented');
  }

  private static setValue(bean: any, value: any, fieldName: string) {
    if (bean[fieldName] === undefined) {
      let setter = bean[`set${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`];
      if (setter === undefined) {
        throw new Error(`Cannot find field '${fieldName}'`);
      } else {
        setter = setter.bind(bean);
        setter(value);
      }
    } else {
      bean[fieldName] = value;
    }
  }

  private static getValue(bean: any, fieldName: string): any {
    if (bean[fieldName] === undefined) {
      let getter = bean[`get${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`];
      if (getter === undefined) {
        throw new Error(`Cannot find getter for field '${fieldName}'`);
      } else {
        getter = getter.bind(bean);
        return getter();
      }
    } else {
      return bean[fieldName];
    }
  }
}

DataTableConversion.initializeDataTableConversion();
