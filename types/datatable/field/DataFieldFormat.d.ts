import FieldFormat from '../FieldFormat';
import Data from '../../data/Data';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import TableFormat from '../TableFormat';
import StringBuilder from '../../util/java/StringBuilder';
export default class DataFieldFormat extends FieldFormat<Data> {
    static readonly EDITOR_REPORT: string;
    static readonly EXTENSIONS_DESCR_FIELD: string;
    static readonly MODE_FIELD: string;
    static readonly EXTENSIONS_FIELD: string;
    static readonly EXTENSION_FIELD: string;
    static readonly FOLDER_FIELD: string;
    constructor(name: string);
    static EXTENSIONS_FORMAT: TableFormat;
    static DATA_EDITOR_OPTIONS_FORMAT: TableFormat;
    static staticDataFormatInitializer0(): void;
    static initDataField: boolean;
    static initializeDataField(): void;
    valueToString(value: Data): string | null;
    getType(): string;
    getNotNullDefault(): Data;
    valueFromString(value: string, settings: ClassicEncodingSettings | null, validate: boolean): Data;
    getSuitableEditors(): Array<string>;
    static encodeTextEditorOptions(mode: string, extensionsDescription: string, folder: string, extensions: Array<string>): string;
    valueToEncodedString(value: Data, settings: ClassicEncodingSettings, sb?: StringBuilder, encodeLevel?: number): StringBuilder | null;
    isAssignableFrom(value: any): boolean;
}
