import FieldFormat from '../FieldFormat';
import ClassicEncodingSettings from '../encoding/ClassicEncodingSettings';
import TableFormat from '../TableFormat';
import Cres from '../../Cres';
import Util from '../../util/Util';
import Reference from '../../expression/Reference';
import Context from '../../context/Context';
import DataTable from '../DataTable';
import DataRecord from '../DataRecord';
import ContextMaskConverter, { Options } from '../converter/editor/ContextMaskConverter';
import DataTableUtils from '../DataTableUtils';
import StringUtils from '../../util/StringUtils';
import DataTableFactory from '../DataTableFactory';
import FieldConstants from './FieldConstants';
import ContextUtils from '../../context/ContextUtils';
import ContextUtilsConstants from '../../context/ContextUtilsConstants';
import Contexts from '../../context/Contexts';
import FieldFormatFactory from '../FieldFormatFactory';
import EditorOptionsUtils from '../converter/editor/EditorOptionsUtils';

export default class StringFieldFormat extends FieldFormat<string> {
  public static readonly ADDITIONAL_REFERENCES_FORMAT: TableFormat = new TableFormat();

  private static staticStringFormatInitializer0() {
    this.ADDITIONAL_REFERENCES_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_ADDITIONAL_REFERENCES_REFERENCE, FieldConstants.STRING_FIELD, Cres.get().getString('reference')));
    this.ADDITIONAL_REFERENCES_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_ADDITIONAL_REFERENCES_DESCRIPTION, FieldConstants.STRING_FIELD, Cres.get().getString('description')));
  }

  public static readonly EXPRESSION_BUILDER_OPTIONS_FORMAT: TableFormat = new TableFormat(1, 1);

  private static staticStringFormatInitializer1() {
    this.EXPRESSION_BUILDER_OPTIONS_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_DEFAULT_CONTEXT, FieldConstants.STRING_FIELD, Cres.get().getString('conDefaultContext')).setNullable(true));
    this.EXPRESSION_BUILDER_OPTIONS_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_DEFAULT_TABLE, FieldConstants.DATATABLE_FIELD, Cres.get().getString('defaultTable')).setNullable(true));
    this.EXPRESSION_BUILDER_OPTIONS_FORMAT.addField(
      FieldFormatFactory.createWith(FieldConstants.FIELD_REFERENCES, FieldConstants.DATATABLE_FIELD, Cres.get().getString('references')).setNullable(true).setDefault(DataTableFactory.of(this.ADDITIONAL_REFERENCES_FORMAT))
    );
    this.EXPRESSION_BUILDER_OPTIONS_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_EXPECTED_RESULT, FieldConstants.STRING_FIELD, Cres.get().getString('expectedResultType')).setNullable(true));
    this.EXPRESSION_BUILDER_OPTIONS_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_DEFAULT_CONTEXT_DESCRIPTION, FieldConstants.STRING_FIELD, Cres.get().getString('defaultContextDesc')).setNullable(true));
    this.EXPRESSION_BUILDER_OPTIONS_FORMAT.addField(FieldFormatFactory.createWith(FieldConstants.FIELD_DEFAULT_TABLE_DESCRIPTION, FieldConstants.STRING_FIELD, Cres.get().getString('defaultTableDesc')).setNullable(true));
  }

  private static initStringFormat = false;

  public static initializeStringFormat() {
    if (StringFieldFormat.initStringFormat) return;

    StringFieldFormat.staticStringFormatInitializer0();
    StringFieldFormat.staticStringFormatInitializer1();

    StringFieldFormat.initStringFormat = true;
  }

  constructor(name: string) {
    super(name);
    super.setTransferEncode(true);
  }

  public valueToString(value: string): string | null {
    return value == null ? null : value;
  }

  public getType(): string {
    return FieldConstants.STRING_FIELD;
  }

  public getNotNullDefault(): string {
    return '';
  }

  valueFromString(value: string | null, settings: ClassicEncodingSettings | null, validate: boolean): string | null {
    return value;
  }

  protected convertValue(value: any): string {
    if (value != null && !Util.isString(value)) {
      value = value.toString();
    }

    return value;
  }

  public static encodeExpressionEditorOptions(
    defaultContext: Context<any, any> | null,
    defaultTable: DataTable | null,
    references: Map<Reference, string>,
    expectedResult?: string | null,
    defaultContextDescription?: string | null,
    defaultTableDescription?: string | null
  ): string | null {
    const op: DataRecord = new DataRecord(StringFieldFormat.EXPRESSION_BUILDER_OPTIONS_FORMAT);

    op.addValue(defaultContext != null ? defaultContext.getPath() : null);

    op.addValue(defaultTable);

    if (references != null) {
      const refs: DataTable = DataTableFactory.of(StringFieldFormat.ADDITIONAL_REFERENCES_FORMAT);
      for (const entry of references.entries()) {
        (refs.addRecord() as DataRecord).addString(entry[0].getImage()).addString(entry[1] != null ? entry[1] : entry[0].getImage());
      }
      op.addValue(refs);
    }

    op.addValue(expectedResult);

    op.addValue(defaultContextDescription);

    op.addValue(defaultTableDescription);

    return op.wrap().encodeDataTable(false);
  }

  public static encodeMaskEditorOptionsFromStrings(contextType: string, containerName: string): string {
    const masks: Array<string> = new Array<string>();
    masks.push(ContextUtils.createName(Contexts.CTX_USERS, ContextUtilsConstants.CONTEXT_GROUP_MASK, containerName, ContextUtilsConstants.CONTEXT_GROUP_MASK, ContextUtilsConstants.CONTEXT_GROUP_MASK));
    masks.push(
      ContextUtils.createName(
        Contexts.CTX_USERS,
        ContextUtilsConstants.CONTEXT_GROUP_MASK,
        ContextUtils.groupsContextName(containerName),
        ContextUtilsConstants.CONTEXT_GROUP_MASK,
        ContextUtilsConstants.CONTEXT_GROUP_MASK,
        ContextUtilsConstants.CONTEXT_GROUP_MASK
      )
    );

    return StringFieldFormat.encodeMaskEditorOptions(null, [contextType], masks);
  }

  public static encodeMaskEditorOptions(rootContext: string | null = null, contextTypes: Array<string>, contextMasks: Array<string>): string {
    const options: DataTable = EditorOptionsUtils.createEditorOptionsTable(FieldConstants.STRING_FIELD, FieldConstants.EDITOR_CONTEXT_MASK);

    options.addRecord();
    options.rec().setValue(ContextMaskConverter.FIELD_ROOT_CONTEXT, rootContext);

    if (contextTypes != null) {
      const typesTable: DataTable = options.rec().getDataTable(ContextMaskConverter.FIELD_CONTEXT_TYPES).clone();
      for (const contextType of contextTypes) {
        typesTable.addRecordWith(contextType);
      }
      options.rec().setValue(ContextMaskConverter.FIELD_CONTEXT_TYPES, typesTable);
    }

    if (contextMasks != null) {
      const masksTable: DataTable = options.rec().getDataTable(ContextMaskConverter.FIELD_CONTEXT_MASKS).clone();
      for (const contextMask of contextMasks) {
        masksTable.addRecordWith(contextMask);
      }
      options.rec().setValue(ContextMaskConverter.FIELD_CONTEXT_MASKS, masksTable);
    }

    return options.encodeToString();
  }

  // public static encodeMaskEditorOptionsClass(contextClass: Class, containerName: string): string {
  //     return StringFieldFormat.encodeMaskEditorOptionsType(ContextUtils.getTypeForClass(contextClass), containerName);
  // }
  //
  // public static encodeMaskEditorOptionsType(contextType: string, containerName: string): string {
  //
  //     const masks: Array<string> = new Array<string>(
  //         ContextUtils.createName(Contexts.CTX_USERS, ContextUtils.CONTEXT_GROUP_MASK, containerName, ContextUtils.CONTEXT_GROUP_MASK, ContextUtils.CONTEXT_GROUP_MASK),
  //         ContextUtils.createName(Contexts.CTX_USERS, ContextUtils.CONTEXT_GROUP_MASK, ContextUtils.groupsContextName(containerName), ContextUtils.CONTEXT_GROUP_MASK, ContextUtils.CONTEXT_GROUP_MASK,
  //             ContextUtils.CONTEXT_GROUP_MASK)
  //     );
  //
  //     return StringFieldFormat.encodeMaskEditorOptions(null, [contextType], masks);
  // }

  public getSuitableEditors(): Array<string> {
    return new Array<string>(
      FieldConstants.EDITOR_LIST,
      FieldConstants.EDITOR_LIST,
      FieldConstants.EDITOR_CONTEXT_MASK,
      FieldConstants.EDITOR_CONTEXT,
      FieldConstants.EDITOR_TEXT_AREA,
      FieldConstants.EDITOR_EMBEDDED_TEXT_AREA,
      FieldConstants.EDITOR_TEXT,
      FieldConstants.EDITOR_CODE,
      FieldConstants.EDITOR_REFERENCE,
      FieldConstants.EDITOR_EXPRESSION,
      FieldConstants.EDITOR_TARGET,
      FieldConstants.EDITOR_ACTIVATOR,
      FieldConstants.EDITOR_PASSWORD,
      FieldConstants.EDITOR_BAR,
      FieldConstants.EDITOR_BYTES,
      FieldConstants.EDITOR_FONT,
      FieldConstants.EDITOR_IP,
      FieldConstants.EDITOR_HTML,
      FieldConstants.EDITOR_FUNCTION_SELECTOR,
      FieldConstants.EDITOR_INSTANCE,
      FieldConstants.EDITOR_FOREIGN_INSTANCE
    );
  }

  public static decodeMaskEditorOptions(options: string): Options {
    if (options != null && DataTableUtils.isEncodedTable(options)) {
      let optionsTable: DataTable;
      try {
        optionsTable = DataTableFactory.createAndDecode(options);
        return new Options(optionsTable.rec());
      } catch (ex) {
        // Ignore
      }
    } else if (options != null) {
      const contextTypes: Array<string> = StringUtils.split(options, FieldConstants.CONTEXT_EDITOR_TYPES_SEPARATOR.charAt(0));
      const editorOptions: Options = new Options();
      editorOptions.setContextTypes(contextTypes);
      return editorOptions;
    }
    return new Options();
  }

  public isAssignableFrom(value: any): boolean {
    return Util.isString(value);
  }
}

StringFieldFormat.initializeStringFormat();
