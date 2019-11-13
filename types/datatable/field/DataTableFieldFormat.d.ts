import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import DataTable from '../DataTable';
import StringBuilder from '../../util/java/StringBuilder';
export default class DataTableFieldFormat extends FieldFormat<DataTable> {
    constructor(name: string);
    valueToString(value: DataTable, settings: ClassicEncodingSettings): string | null;
    getType(): string;
    getNotNullDefault(): DataTable;
    makeImmutable(): void;
    valueFromEncodedString(source: string, settings: ClassicEncodingSettings, validate: boolean): DataTable | null;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): DataTable | null;
    valueToEncodedString(value: DataTable, settings: ClassicEncodingSettings, sb?: StringBuilder, encodeLevel?: number): StringBuilder | null;
    static encodeEditorOptions(showTableData: boolean): string;
    isAssignableFrom(value: any): boolean;
}
