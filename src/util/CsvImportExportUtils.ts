import TableFormat from '../datatable/TableFormat';
import DataTable from '../datatable/DataTable';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import FieldConstants from '../datatable/field/FieldConstants';
import Log from '../Log';
import Util from './Util';

export default class CsvImportExportUtils {
  private static NULL = 'NULL';

  public static CSV_IMPORT_FIELD_DELIMITER = 'delimiter';
  public static CSV_IMPORT_FIELD_USE_QUALIFIER = 'useQualifier';
  public static CSV_IMPORT_FIELD_QUALIFIER = 'qualifier';
  public static CSV_IMPORT_FIELD_COMMENT = 'comment';
  public static CSV_IMPORT_FIELD_ESCAPE_MODE = 'escapeMode';
  public static CSV_IMPORT_FIELD_HEADER = 'header';

  public static CSV_EXPORT_FIELD_DELIMITER = 'delimiter';
  public static CSV_EXPORT_FIELD_USE_QUALIFIER = 'useQualifier';
  public static CSV_EXPORT_FIELD_QUALIFIER = 'qualifier';
  public static CSV_EXPORT_FIELD_ESCAPE_MODE = 'escapeMode';
  public static CSV_EXPORT_FIELD_HEADER = 'header';
  public static CSV_EXPORT_FIELD_USE_DESCRIPTIONS = 'useDescriptions';

  public static QUALIFIER_NONE = 0;
  public static QUALIFIER_NORMAL = 1;
  public static QUALIFIER_FORCE = 2;

  public static HEADER_NONE = 0;
  public static HEADER_NAMES = 1;
  public static HEADER_DESCRIPTIONS = 2;
  public static HEADER_SKIP = 3;

  public static readFormat(original: DataTable | null, reader: any, header: number) {
    let format = original != null ? original.getFormat().clone() : null;

    if (format == null) {
      format = new TableFormat();

      const numberOfColumns = reader.getHeaders() != null ? reader.getHeaderCount() : reader.getColumnCount();
      for (let i = 0; i < numberOfColumns; i++) {
        if (header == CsvImportExportUtils.HEADER_NAMES) {
          CsvImportExportUtils.fillEmptyHeaders(reader);
          format.addField(FieldFormatFactory.createType(reader.getHeader(i), FieldConstants.STRING_FIELD));
        } else if (header == CsvImportExportUtils.HEADER_DESCRIPTIONS) {
          format.addField(FieldFormatFactory.createWith(i.toString(), FieldConstants.STRING_FIELD, reader.getHeader(i)));
        } else {
          format.addField(FieldFormatFactory.createType(i.toString(), FieldConstants.STRING_FIELD));
        }
      }
    }
    return format;
  }
  public static fillEmptyHeaders(reader: any) {
    if (reader.getHeaders() == null) {
      return false;
    }

    let isModified = false;

    for (let i = 0; i < reader.getHeaders().length; i++) {
      if (reader.getHeader(i) == null || reader.getHeader(i).length === 0) {
        const headers = reader.getHeaders();
        headers[i] = i.toString();
        reader.setHeaders(headers);

        isModified = true;
      }
    }

    return isModified;
  }
  public static readCsvRecords(table: DataTable, reader: any, header: number, hasMoreRecords: boolean) {
    while (hasMoreRecords) {
      const record = table.addRecord();
      for (let i = 0; i < reader.getColumnCount(); i++) {
        let ff = null;

        if (header == CsvImportExportUtils.HEADER_NONE || header == CsvImportExportUtils.HEADER_SKIP) {
          if (record.getFormat().getFieldCount() > i) {
            ff = record.getFormat().getField(i);
          }
        }

        const headerString = reader.getHeader(i);

        if (header == CsvImportExportUtils.HEADER_NAMES) {
          ff = record.getFormat().getField(headerString);
        } else if (header == CsvImportExportUtils.HEADER_DESCRIPTIONS) {
          if (headerString != null) {
            for (let j = 0; j < table.getFieldCount(); j++) {
              const cur = record.getFormat().getField(j);
              if (headerString == cur.getDescription()) {
                ff = cur;
                break;
              }
            }
          }
        } else {
          ff = record.getFormat().getField(i);
        }

        if (ff == null) {
          Log.DATATABLE.warn('Data table field not found for column ' + i + ' (' + reader.getHeader(i) + ')');
          continue;
        }

        const stringValue = reader.get(i);

        try {
          let value;

          if (stringValue != null && this.NULL == stringValue.toUpperCase()) {
            value = null;
          } else {
            value = ff.valueFromString(stringValue);
          }

          record.setValue(ff.getName(), value);
        } catch (ex) {
          if (stringValue == null || !ff.hasSelectionValues()) {
            throw new Error(ex.getMessage());
          }
          let found = false;
          const sv = ff.getSelectionValues();
          if (sv == null) return;
          for (const [key, value] of sv.entries()) {
            if (Util.equals(stringValue, value)) {
              record.setValue(ff.getName(), key);
              found = true;
              break;
            }
          }
          if (!found) {
            throw new Error(ex.getMessage());
          }
        }
      }

      hasMoreRecords = reader.readRecord();
    }
  }
}
