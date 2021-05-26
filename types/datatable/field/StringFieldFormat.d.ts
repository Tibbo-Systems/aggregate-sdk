import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import TableFormat from '../TableFormat';
import DataTable from '../DataTable';
import { Options } from '../converter/editor/ContextMaskConverter';
export default class StringFieldFormat extends FieldFormat<string> {
    static readonly ADDITIONAL_REFERENCES_FORMAT: TableFormat;
    private static staticStringFormatInitializer0;
    static readonly EXPRESSION_BUILDER_OPTIONS_FORMAT: TableFormat;
    private static staticStringFormatInitializer1;
    private static initStringFormat;
    static initializeStringFormat(): void;
    constructor(name: string);
    valueToString(value: string): string | null;
    getType(): string;
    getNotNullDefault(): string;
    valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): string | null;
    protected convertValue(value: any): string;
    static encodeExpressionEditorOptions(defaultContext: string | null, defaultTable: DataTable | null, references: Map<string, string>): string;
    static encodeMaskEditorOptionsFromStrings(contextType: string, containerName: string): string;
    static encodeMaskEditorOptions(rootContext: string | null | undefined, contextTypes: Array<string>, contextMasks: Array<string>): string;
    getSuitableEditors(): Array<string>;
    static decodeMaskEditorOptions(options: string): Options;
    isAssignableFrom(value: any): boolean;
}
