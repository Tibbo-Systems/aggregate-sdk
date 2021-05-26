import DataTable from '../DataTable';
import SimpleDataTable from '../SimpleDataTable';
import TableFormat from '../TableFormat';
import FieldFormatFactory from '../FieldFormatFactory';
import FieldConstants from '../field/FieldConstants';
import DateFieldFormat from '../field/DateFieldFormat';
import DataTableFieldFormat from '../field/DataTableFieldFormat';
import FieldFormat from '../FieldFormat';
import FieldFormatDefiner from './FieldFormatDefiner';
import Util from '../../util/Util';

export default class JsonEncodingHelper {
  private static WRAPPER_FIELD = 'wrapper';
  private static VALUE_FIELD = 'value';
  public static tableFromJson(payload: string, convertUnequalFieldTypesToString: boolean): DataTable {
    const jsonText = '{"' + JsonEncodingHelper.WRAPPER_FIELD + '":' + payload + '}'; // wrap initial text to make sure outer element is always JSONObject

    const json = JSON.parse(jsonText);

    return JsonEncodingHelper.processJSONObject(json, convertUnequalFieldTypesToString);
  }

  private static processJSONObject(jsonObject: any, convertUnequalFieldTypesToString: boolean): DataTable {
    const tableFormat = JsonEncodingHelper.calculateTableFormat(jsonObject, convertUnequalFieldTypesToString);
    const result = new SimpleDataTable(tableFormat);

    JsonEncodingHelper.fillDataTableWithObject(jsonObject, result);

    return result;
  }
  public static calculateTableFormat(jsonObject: any, convertUnequalFieldTypesToString: boolean): TableFormat {
    const result = new TableFormat(1, 1);

    for (const [keyObject, valueObject] of Object.entries(jsonObject)) {
      const fieldFormat = JsonEncodingHelper.extractFieldFormatFromNode(keyObject as string, valueObject, convertUnequalFieldTypesToString);
      result.addField(fieldFormat);
    }

    return result;
  }

  public static fillDataTableWithObject(jsonObject: any, dataTable: DataTable): void {
    const dataRecord = dataTable.addRecord();

    for (const keyObject of Object.keys(jsonObject)) {
      const key = keyObject;
      const value = jsonObject[keyObject];

      if (Array.isArray(value)) {
        const table = dataRecord.getDataTable(key);
        JsonEncodingHelper.fillDataTableWithArray(value, table);
        dataRecord.setValue(key, table);
      } else if (Util.isString(value)) {
        const date = JsonEncodingHelper.getDateIfDateFormat(value);
        if (date != null) {
          dataRecord.setValue(key, date);
        } else {
          dataRecord.setValue(key, value);
        }
      } else if (Util.isPrimitive(value)) {
        dataRecord.setValue(key, value);
      } else {
        const table = dataRecord.getDataTable(key);
        JsonEncodingHelper.fillDataTableWithObject(value, table);
        dataRecord.setValue(key, table);
      }
    }
  }
  public static fillDataTableWithArray(jsonArray: any, dataTable: DataTable): void {
    for (const arrayObject of jsonArray) {
      const dataRecord = dataTable.addRecord();
      if (Array.isArray(arrayObject)) {
        const table = dataRecord.getDataTable(JsonEncodingHelper.VALUE_FIELD);
        JsonEncodingHelper.fillDataTableWithArray(arrayObject, table);
        dataRecord.setValue(JsonEncodingHelper.VALUE_FIELD, table);
      } else if (Util.isPrimitive(arrayObject)) {
        dataRecord.setValue(JsonEncodingHelper.VALUE_FIELD, arrayObject);
      } else {
        const table = dataRecord.getDataTable(JsonEncodingHelper.VALUE_FIELD);
        JsonEncodingHelper.fillDataTableWithObject(arrayObject, table);
        dataRecord.setValue(JsonEncodingHelper.VALUE_FIELD, table);
      }
    }
  }
  private static extractFieldFormatFromNode(key: string, node: any, convertUnequalFieldTypesToString: boolean): FieldFormat<any> {
    let result = null;

    if (Util.isString(node)) {
      const date = JsonEncodingHelper.getDateIfDateFormat(node);
      if (date != null) {
        result = FieldFormatFactory.createType(key, FieldConstants.DATE_FIELD);
      } else {
        result = FieldFormatFactory.createType(key, FieldConstants.STRING_FIELD);
      }
    } else if (Util.isNumber(node)) {
      if (Number.isInteger(node)) result = FieldFormatFactory.createType(key, FieldConstants.LONG_FIELD);
      else result = FieldFormatFactory.createType(key, FieldConstants.DOUBLE_FIELD);
    } else if (Util.isBoolean(node)) {
      result = FieldFormatFactory.createType(key, FieldConstants.BOOLEAN_FIELD);
    } else if (Array.isArray(node)) {
      result = FieldFormatFactory.createType(key, FieldConstants.DATATABLE_FIELD);

      const jsonArray = node;
      const results = [];

      for (let i = 0; i < jsonArray.length; i++) {
        results.push(JsonEncodingHelper.extractFieldFormatFromNode(JsonEncodingHelper.VALUE_FIELD, jsonArray[i], convertUnequalFieldTypesToString));
      }

      const innerField = JsonEncodingHelper.mergeFormats(results, JsonEncodingHelper.VALUE_FIELD, convertUnequalFieldTypesToString);
      const innerFormat = TableFormat.createWithFormat(innerField);
      const innerTable = new SimpleDataTable(innerFormat);

      result.setDefault(innerTable);
    } else if (Util.isPrimitive(node)) {
      result = JsonEncodingHelper.createDefaultFieldFormat(key);
    } else {
      result = FieldFormatFactory.createType(key, FieldConstants.DATATABLE_FIELD);

      const innerFormat = JsonEncodingHelper.calculateTableFormat(node, convertUnequalFieldTypesToString);
      const innerTable = new SimpleDataTable(innerFormat);

      result.setDefault(innerTable);
    }

    result.setNullable(true);

    return result;
  }

  private static getDateIfDateFormat(node: any): Date | null {
    const date = DateFieldFormat.dateFromString(node.toString());
    if (date instanceof Date && !isNaN(date.getTime())) return date;
    return null;
  }

  private static mergeFormats(formats: Array<any>, fieldName: string, convertUnequalFieldTypesToString: boolean): FieldFormat<any> {
    if (formats.length === 0) {
      return FieldFormatFactory.createType(fieldName, FieldConstants.DATATABLE_FIELD);
    }

    if (!(formats[0].getDefaultValue() instanceof DataTable)) return JsonEncodingHelper.chooseFormat(formats, convertUnequalFieldTypesToString, fieldName);

    const fieldFormatDefiner = new FieldFormatDefiner(convertUnequalFieldTypesToString);

    const fieldsMergeMap = new Map();

    for (const format of formats) {
      const def = format.getDefaultValue();
      if (def instanceof DataTable) {
        const tableFormat = def.getFormat();
        for (const ff of tableFormat.getFields()) {
          const key = ff.getName();
          if (ff instanceof DataTableFieldFormat) {
            if (!fieldsMergeMap.has(key)) fieldsMergeMap.set(key, []);

            const mergeList = fieldsMergeMap.get(key);
            mergeList.push(ff);
          } else fieldFormatDefiner.put(key, ff);
        }
      }
    }
    for (const [key, value] of fieldsMergeMap.entries()) {
      fieldFormatDefiner.put(key, JsonEncodingHelper.mergeFormats(value, key, convertUnequalFieldTypesToString));
    }

    const mergedFormat = new TableFormat();
    fieldFormatDefiner.getFieldNames().forEach((key: string) => mergedFormat.addField(fieldFormatDefiner.get(key)));

    const format = FieldFormatFactory.createType(fieldName, FieldConstants.DATATABLE_FIELD);
    format.setDefault(new SimpleDataTable(mergedFormat));
    format.setNullable(true);
    return format;
  }
  private static chooseFormat(fieldFormats: Array<any>, convertUnequalFieldTypesToString: boolean, fieldName: string): FieldFormat<any> {
    if (convertUnequalFieldTypesToString && !JsonEncodingHelper.isEqualFieldTypes(fieldFormats)) {
      const ff = FieldFormatFactory.createType(fieldName, FieldConstants.STRING_FIELD);
      ff.setNullable(true);
      return ff;
    }

    for (const ff of fieldFormats) {
      if (!JsonEncodingHelper.looksLikeDefaultField(ff)) return ff;
    }

    return fieldFormats[0];
  }
  private static isEqualFieldTypes(fieldFormats: Array<any>): boolean {
    const type = fieldFormats[0].getType();
    for (const ff of fieldFormats) {
      if (ff.getType() != type) return false;
    }
    return true;
  }

  static tableToJson(payload: DataTable): string {
    return JSON.stringify(JsonEncodingHelper.encodeToJson(payload));
  }

  private static encodeToJson(payload: DataTable): Array<any> {
    if (payload == null) return [];
    const records = [];
    for (const dr of payload) {
      const record: { [index: string]: any } = {};
      for (let i = 0; i < dr.getFieldCount(); i++) {
        record[dr.getFieldFormat(i).getName()] = JsonEncodingHelper.encodeFieldValueToJSON(dr.getFieldFormat(i), dr.getValue(i));
      }
      records.push(record);
    }

    return records;
  }
  private static encodeFieldValueToJSON(ff: FieldFormat<any>, value: any): any {
    switch (ff.getType()) {
      case FieldConstants.DATATABLE_FIELD:
        return JsonEncodingHelper.encodeToJson(value as DataTable);

      case FieldConstants.DATE_FIELD:
      case FieldConstants.COLOR_FIELD:
      case FieldConstants.LONG_FIELD:
        return ff.valueToString(value);

      // TODO: Attention! Change this if the encode to json has been broken!
      case FieldConstants.DATA_FIELD:
        return value != null ? JSON.stringify(value) : '';

      case FieldConstants.STRING_FIELD:
        return value;

      default:
        return value;
    }
  }
  static createDefaultFieldFormat(fieldName: string): FieldFormat<any> {
    return FieldFormatFactory.createType(fieldName, FieldConstants.STRING_FIELD).setNullable(true).setDefault(null);
  }
  static looksLikeDefaultField(ff: FieldFormat<any>): boolean {
    return ff.getType() == FieldConstants.STRING_FIELD && ff.isNullable() && ff.getDefaultValue() == null;
  }
}
