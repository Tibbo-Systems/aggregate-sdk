import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import TableFormat from '../../TableFormat';
import Reference from '../../../expression/Reference';
import DataTable from '../../DataTable';
import FieldConstants from '../../field/FieldConstants';
import StringFieldFormat from '../../field/StringFieldFormat';

export default class ExpressionConverter extends AbstractEditorOptionsConverter {
  public static readonly FIELD_DEFAULT_CONTEXT: string = FieldConstants.FIELD_DEFAULT_CONTEXT;
  public static readonly FIELD_DEFAULT_TABLE: string = FieldConstants.FIELD_DEFAULT_TABLE;
  public static readonly FIELD_REFERENCES: string = FieldConstants.FIELD_REFERENCES;

  public static readonly FIELD_ADDITIONAL_REFERENCES_DESCRIPTION: string = FieldConstants.FIELD_ADDITIONAL_REFERENCES_DESCRIPTION;
  public static readonly FIELD_ADDITIONAL_REFERENCES_REFERENCE: string = FieldConstants.FIELD_ADDITIONAL_REFERENCES_REFERENCE;

  public static FORMAT: TableFormat = StringFieldFormat.EXPRESSION_BUILDER_OPTIONS_FORMAT;
  public static REFERENCES_FORMAT: TableFormat = StringFieldFormat.ADDITIONAL_REFERENCES_FORMAT;

  constructor() {
    super();
    this.editors.push(FieldConstants.EDITOR_EXPRESSION);
    this.types.push(FieldConstants.STRING_FIELD);
  }

  public convertToString(options: DataTable): string | null {
    const StringFieldFormat = require('../../field/StringFieldFormat').default;
    const additionalReferences: Map<Reference, string> = new Map<Reference, string>();

    const defaultContext: string = options.rec().getString(StringFieldFormat.FIELD_DEFAULT_CONTEXT);
    const defaultTable: DataTable = options.rec().getDataTable(StringFieldFormat.FIELD_DEFAULT_TABLE);
    const references: DataTable = options.rec().getDataTable(StringFieldFormat.FIELD_REFERENCES);

    if (references !== null) {
      for (const rec of references) additionalReferences.set(new Reference(rec.getString(StringFieldFormat.FIELD_ADDITIONAL_REFERENCES_REFERENCE)), rec.getString(StringFieldFormat.FIELD_ADDITIONAL_REFERENCES_DESCRIPTION));
    }

    return StringFieldFormat.encodeExpressionEditorOptions(null, null, additionalReferences);
  }

  public getFormat(): TableFormat {
    const StringFieldFormat = require('../../field/StringFieldFormat').default;
    return StringFieldFormat.FORMAT;
  }
}
