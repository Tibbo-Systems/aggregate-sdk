import AbstractEditorOptionsConverter from './AbstractEditorOptionsConverter';
import DataTable from '../../DataTable';
import TableFormat from '../../TableFormat';
import FieldConstants from '../../field/FieldConstants';
import FieldFormat from '../../FieldFormat';
import Cres from '../../../Cres';
import Reference from '../../../expression/Reference';
import DataTableBindingProvider from '../../DataTableBindingProvider';
import Functions from '../../../expression/functions/Functions';
import Contexts from '../../../context/Contexts';
import UtilitiesContextConstants from '../../../server/UtilitiesContextConstants';
import SimpleDataTable from '../../SimpleDataTable';
import StringBuilder from '../../../util/java/StringBuilder';
import FieldFormatFactory from '../../FieldFormatFactory';
import ContextUtilsConstants from '../../../context/ContextUtilsConstants';

export default class ReferenceConverter extends AbstractEditorOptionsConverter {
  public static readonly FIELD_ENTITY_PARAMETERS_VALUE: string = 'value';
  public static readonly FIELD_APPEARANCE: string = 'appearance';
  public static readonly FIELD_CONTEXT_TYPE: string = 'contextType';
  public static readonly FIELD_REFERENCE_TYPE: string = 'referenceType';
  public static readonly FIELD_CONTEXT: string = 'context';
  public static readonly FIELD_CONTEXT_EXPRESSION: string = 'contextExpression';
  public static readonly FIELD_ENTITY: string = 'entity';
  public static readonly FIELD_ENTITY_EXPRESSION: string = 'entityExpression';
  public static readonly FIELD_ENTITY_TYPE: string = 'entityType';
  public static readonly FIELD_ENTITY_PARAMETERS: string = 'entityParameters';
  public static readonly FIELD_ICON: string = 'icon';

  public static readonly STATIC: string = 'static';
  public static readonly DYNAMIC: string = 'dynamic';

  public static readonly FORMAT: TableFormat = new TableFormat(1, 1);

  public static readonly VFT_ENTITY_PARAMETERS: TableFormat = new TableFormat(0, Number.MAX_VALUE);

  private static __static_initializer_0() {
    ReferenceConverter.VFT_ENTITY_PARAMETERS.addField(FieldFormatFactory.createWith(ReferenceConverter.FIELD_ENTITY_PARAMETERS_VALUE, FieldConstants.STRING_FIELD, Cres.get().getString('value')));
  }

  private static __static_initializer_1() {
    let exp: string, tableExp: string, valueExp: string, descriptionExp;

    let ff: FieldFormat<any> = FieldFormatFactory.createWith(ReferenceConverter.FIELD_APPEARANCE, FieldConstants.INTEGER_FIELD, Cres.get().getString('appearance'));
    ff.addSelectionValue(Reference.APPEARANCE_LINK, Cres.get().getString('link'));
    ff.addSelectionValue(Reference.APPEARANCE_BUTTON, Cres.get().getString('wButton'));
    ff.setDefault(Reference.APPEARANCE_LINK);

    ReferenceConverter.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ReferenceConverter.FIELD_REFERENCE_TYPE + '><I><A=' + ContextUtilsConstants.ENTITY_ACTION + '><D=' + Cres.get().getString('referenceType') + '>');
    ff.addSelectionValue(ContextUtilsConstants.ENTITY_VARIABLE, Cres.get().getString('variable'));
    ff.addSelectionValue(ContextUtilsConstants.ENTITY_FUNCTION, Cres.get().getString('function'));
    ff.addSelectionValue(ContextUtilsConstants.ENTITY_EVENT, Cres.get().getString('event'));
    ff.addSelectionValue(ContextUtilsConstants.ENTITY_ACTION, Cres.get().getString('action'));
    ff.setDefault(ContextUtilsConstants.ENTITY_VARIABLE);
    ReferenceConverter.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ReferenceConverter.FIELD_CONTEXT_TYPE + '><S><D=' + Cres.get().getString('contextType') + '>');
    ff.addSelectionValue(ReferenceConverter.STATIC, Cres.get().getString('static'));
    ff.addSelectionValue(ReferenceConverter.DYNAMIC, Cres.get().getString('dynamic'));
    ff.setDefault(ReferenceConverter.STATIC);
    ReferenceConverter.FORMAT.addField(ff);

    ReferenceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ReferenceConverter.FIELD_CONTEXT + '><S><D=' + Cres.get().getString('context') + '>').setEditor(FieldConstants.EDITOR_CONTEXT));

    ReferenceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ReferenceConverter.FIELD_CONTEXT_EXPRESSION + '><S><D=' + Cres.get().getString('contextExpression') + '>').setEditor(FieldConstants.EDITOR_EXPRESSION));

    ff = FieldFormatFactory.create('<' + ReferenceConverter.FIELD_ENTITY_TYPE + '><S><D=' + Cres.get().getString('entityType') + '>');
    ff.addSelectionValue(ReferenceConverter.STATIC, Cres.get().getString('static'));
    ff.addSelectionValue(ReferenceConverter.DYNAMIC, Cres.get().getString('dynamic'));
    ff.setDefault(ReferenceConverter.STATIC);
    ReferenceConverter.FORMAT.addField(ff);

    ReferenceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ReferenceConverter.FIELD_ENTITY + '><S><D=' + Cres.get().getString('entity') + '>'));
    ReferenceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ReferenceConverter.FIELD_ENTITY_EXPRESSION + '><S><D=' + Cres.get().getString('entityExpression') + '>').setEditor(FieldConstants.EDITOR_EXPRESSION));

    ReferenceConverter.FORMAT.addField(
      FieldFormatFactory.createWith(ReferenceConverter.FIELD_ENTITY_PARAMETERS, FieldConstants.DATATABLE_FIELD, Cres.get().getString('entityParameters')).setDefault(new SimpleDataTable(ReferenceConverter.VFT_ENTITY_PARAMETERS))
    );

    ReferenceConverter.FORMAT.addField(FieldFormatFactory.create('<' + ReferenceConverter.FIELD_ICON + '><S><F=N><D=' + Cres.get().getString('icon') + '>'));

    ReferenceConverter.FORMAT.addBinding(ReferenceConverter.FIELD_CONTEXT + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, '{' + ReferenceConverter.FIELD_CONTEXT_TYPE + "} == '" + 'dynamic' + "'");
    ReferenceConverter.FORMAT.addBinding(ReferenceConverter.FIELD_CONTEXT_EXPRESSION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, '{' + ReferenceConverter.FIELD_CONTEXT_TYPE + "} == '" + 'static' + "'");

    ReferenceConverter.FORMAT.addBinding(ReferenceConverter.FIELD_ENTITY + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, '{' + ReferenceConverter.FIELD_ENTITY_TYPE + "} == '" + 'dynamic' + "'");
    ReferenceConverter.FORMAT.addBinding(ReferenceConverter.FIELD_ENTITY_EXPRESSION + '#' + DataTableBindingProvider.PROPERTY_HIDDEN, '{' + ReferenceConverter.FIELD_ENTITY_TYPE + "} == '" + 'static' + "'");

    let contextTypeExpression = '(' + '{' + ReferenceConverter.FIELD_CONTEXT_TYPE + '} == ' + "'static'" + ' ? {' + ReferenceConverter.FIELD_CONTEXT + '} : {' + ReferenceConverter.FIELD_CONTEXT_EXPRESSION + '}' + ')';
    contextTypeExpression = '{' + ReferenceConverter.FIELD_CONTEXT_TYPE + '} == ' + "'static'" + ' ? {' + ReferenceConverter.FIELD_CONTEXT + '} : evaluate({' + ReferenceConverter.FIELD_CONTEXT_EXPRESSION + '})';
    const ref = ReferenceConverter.FIELD_ENTITY + '#' + DataTableBindingProvider.PROPERTY_CHOICES;

    const exp1: string =
      '{' +
      ReferenceConverter.FIELD_REFERENCE_TYPE +
      '} == ' +
      ContextUtilsConstants.ENTITY_VARIABLE +
      ' ? ' +
      Functions.CALL_FUNCTION +
      "('" +
      Contexts.CTX_UTILITIES +
      "','" +
      UtilitiesContextConstants.F_VARIABLES_BY_MASK +
      "'," +
      contextTypeExpression +
      ')' +
      ':';
    const exp2: string =
      '({' +
      ReferenceConverter.FIELD_REFERENCE_TYPE +
      '} == ' +
      ContextUtilsConstants.ENTITY_EVENT +
      ' ? ' +
      Functions.CALL_FUNCTION +
      "('" +
      Contexts.CTX_UTILITIES +
      "','" +
      UtilitiesContextConstants.F_EVENTS_BY_MASK +
      "'," +
      contextTypeExpression +
      ')' +
      ':';
    const exp3: string =
      '({' +
      ReferenceConverter.FIELD_REFERENCE_TYPE +
      '} == ' +
      ContextUtilsConstants.ENTITY_ACTION +
      ' ? ' +
      Functions.CALL_FUNCTION +
      "('" +
      Contexts.CTX_UTILITIES +
      "','" +
      UtilitiesContextConstants.F_ACTIONS_BY_MASK +
      "'," +
      contextTypeExpression +
      ',true)' +
      ':'; // includeNonHeadless = true
    const exp4: string =
      '({' +
      ReferenceConverter.FIELD_REFERENCE_TYPE +
      '} == ' +
      ContextUtilsConstants.ENTITY_FUNCTION +
      ' ? ' +
      Functions.CALL_FUNCTION +
      "('" +
      Contexts.CTX_UTILITIES +
      "','" +
      UtilitiesContextConstants.F_FUNCTIONS_BY_MASK +
      "'," +
      contextTypeExpression +
      ')' +
      ':';
    const exp5: string = Functions.CALL_FUNCTION + "('" + Contexts.CTX_UTILITIES + "','" + UtilitiesContextConstants.F_VARIABLES_BY_MASK + "'," + contextTypeExpression + ')' + '' + ')))';

    const sb: StringBuilder = new StringBuilder();
    sb.append(exp1)
      .append(exp2)
      .append(exp3)
      .append(exp4)
      .append(exp5);

    ReferenceConverter.FORMAT.addBinding(ref, sb.toString());
  }

  private static _init = false;

  public static initialize() {
    if (ReferenceConverter._init) return;

    ReferenceConverter.__static_initializer_0();
    ReferenceConverter.__static_initializer_1();

    ReferenceConverter._init = true;
  }

  constructor() {
    super();
    ReferenceConverter.initialize();

    this.editors.push(FieldConstants.EDITOR_REFERENCE);
    this.types.push(FieldConstants.STRING_FIELD);
  }

  convertToString(options: DataTable): string | null {
    return options.encodeToString();
  }

  getFormat(): TableFormat {
    return ReferenceConverter.FORMAT;
  }
}
