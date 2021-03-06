import TableFormat from '../datatable/TableFormat';
import DataTable from '../datatable/DataTable';
export default class CsvImportExportUtils {
    private static NULL;
    static CSV_IMPORT_FIELD_DELIMITER: string;
    static CSV_IMPORT_FIELD_USE_QUALIFIER: string;
    static CSV_IMPORT_FIELD_QUALIFIER: string;
    static CSV_IMPORT_FIELD_COMMENT: string;
    static CSV_IMPORT_FIELD_ESCAPE_MODE: string;
    static CSV_IMPORT_FIELD_HEADER: string;
    static CSV_EXPORT_FIELD_DELIMITER: string;
    static CSV_EXPORT_FIELD_USE_QUALIFIER: string;
    static CSV_EXPORT_FIELD_QUALIFIER: string;
    static CSV_EXPORT_FIELD_ESCAPE_MODE: string;
    static CSV_EXPORT_FIELD_HEADER: string;
    static CSV_EXPORT_FIELD_USE_DESCRIPTIONS: string;
    static QUALIFIER_NONE: number;
    static QUALIFIER_NORMAL: number;
    static QUALIFIER_FORCE: number;
    static HEADER_NONE: number;
    static HEADER_NAMES: number;
    static HEADER_DESCRIPTIONS: number;
    static HEADER_SKIP: number;
    static readFormat(original: DataTable | null, reader: any, header: number): TableFormat;
    static fillEmptyHeaders(reader: any): boolean;
    static readCsvRecords(table: DataTable, reader: any, header: number, hasMoreRecords: boolean): void;
}
