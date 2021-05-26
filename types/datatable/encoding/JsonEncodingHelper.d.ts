import DataTable from '../DataTable';
import TableFormat from '../TableFormat';
import FieldFormat from '../FieldFormat';
export default class JsonEncodingHelper {
    private static WRAPPER_FIELD;
    private static VALUE_FIELD;
    static tableFromJson(payload: string, convertUnequalFieldTypesToString: boolean): DataTable;
    private static processJSONObject;
    static calculateTableFormat(jsonObject: any, convertUnequalFieldTypesToString: boolean): TableFormat;
    static fillDataTableWithObject(jsonObject: any, dataTable: DataTable): void;
    static fillDataTableWithArray(jsonArray: any, dataTable: DataTable): void;
    private static extractFieldFormatFromNode;
    private static getDateIfDateFormat;
    private static mergeFormats;
    private static chooseFormat;
    private static isEqualFieldTypes;
    static tableToJson(payload: DataTable): string;
    private static encodeToJson;
    private static encodeFieldValueToJSON;
    static createDefaultFieldFormat(fieldName: string): FieldFormat<any>;
    static looksLikeDefaultField(ff: FieldFormat<any>): boolean;
}
