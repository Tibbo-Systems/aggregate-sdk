import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import FieldFormat from '../datatable/FieldFormat';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import Cres from '../Cres';
import FieldConstants from '../datatable/field/FieldConstants';
import DataTableBindingProvider from '../datatable/DataTableBindingProvider';
import DefaultReferenceResolver from '../expression/DefaultReferenceResolver';
import Functions from '../expression/functions/Functions';
import DataRecord from '../datatable/DataRecord';

export default class ViewFilterElement extends AggreGateBean {
  public static readonly LOGICAL_OPERATION_NONE: number = 0;
  public static readonly LOGICAL_OPERATION_AND: number = 1;
  public static readonly LOGICAL_OPERATION_OR: number = 2;

  public static readonly TYPE_CONDITION: number = 0;
  public static readonly TYPE_NESTED_CONDITIONS: number = 1;

  public static readonly OPERATION_EQUALS: string = 'EQUALS';
  public static readonly OPERATION_DOES_NOT_EQUAL: string = 'DOES_NOT_EQUAL';
  public static readonly OPERATION_IS_NULL: string = 'IS_NULL';
  public static readonly OPERATION_IS_NOT_NULL: string = 'IS_NOT_NULL';
  public static readonly OPERATION_CONTAINS: string = 'CONTAINS';
  public static readonly OPERATION_DOES_NOT_CONTAIN: string = 'DOES_NOT_CONTAIN';
  public static readonly OPERATION_BEGINS_WITH: string = 'BEGINS_WITH';
  public static readonly OPERATION_DOES_NOT_BEGIN_WITH: string = 'DOES_NOT_BEGIN_WITH';
  public static readonly OPERATION_ENDS_WITH: string = 'ENDS_WITH';
  public static readonly OPERATION_DOES_NOT_END_WITH: string = 'DOES_NOT_END_WITH';
  public static readonly OPERATION_IS_GREATER_THAN: string = 'IS_GREATER_THAN';
  public static readonly OPERATION_IS_GREATER_OR_EQUAL_THAN: string = 'IS_GREATER_OR_EQUAL_THAN';
  public static readonly OPERATION_IS_LESS_THAN: string = 'IS_LESS_THAN';
  public static readonly OPERATION_IS_LESS_OR_EQUAL_THAN: string = 'IS_LESS_OR_EQUAL_THAN';
  public static readonly OPERATION_ON: string = 'ON';
  public static readonly OPERATION_ON_OR_AFTER: string = 'ON_OR_AFTER';
  public static readonly OPERATION_ON_OR_BEFORE: string = 'ON_OR_BEFORE';
  public static readonly OPERATION_LAST_HOUR: string = 'LAST_HOUR';
  public static readonly OPERATION_THIS_HOUR: string = 'THIS_HOUR';
  public static readonly OPERATION_NEXT_HOUR: string = 'NEXT_HOUR';
  public static readonly OPERATION_YESTERDAY: string = 'YESTERDAY';
  public static readonly OPERATION_TODAY: string = 'TODAY';
  public static readonly OPERATION_TOMORROW: string = 'TOMORROW';
  public static readonly OPERATION_LAST_WEEK: string = 'LAST_WEEK';
  public static readonly OPERATION_THIS_WEEK: string = 'THIS_WEEK';
  public static readonly OPERATION_NEXT_WEEK: string = 'NEXT_WEEK';
  public static readonly OPERATION_LAST_MONTH: string = 'LAST_MONTH';
  public static readonly OPERATION_THIS_MONTH: string = 'THIS_MONTH';
  public static readonly OPERATION_NEXT_MONTH: string = 'NEXT_MONTH';
  public static readonly OPERATION_LAST_YEAR: string = 'LAST_YEAR';
  public static readonly OPERATION_THIS_YEAR: string = 'THIS_YEAR';
  public static readonly OPERATION_NEXT_YEAR: string = 'NEXT_YEAR';
  public static readonly OPERATION_LAST_X_HOURS: string = 'LAST_X_HOURS';
  public static readonly OPERATION_NEXT_X_HOURS: string = 'NEXT_X_HOURS';
  public static readonly OPERATION_LAST_X_DAYS: string = 'LAST_X_DAYS';
  public static readonly OPERATION_NEXT_X_DAYS: string = 'NEXT_X_DAYS';
  public static readonly OPERATION_LAST_X_WEEKS: string = 'LAST_X_WEEKS';
  public static readonly OPERATION_NEXT_X_WEEKS: string = 'NEXT_X_WEEKS';
  public static readonly OPERATION_LAST_X_MONTHS: string = 'LAST_X_MONTHS';
  public static readonly OPERATION_NEXT_X_MONTHS: string = 'NEXT_X_MONTHS';
  public static readonly OPERATION_LAST_X_YEARS: string = 'LAST_X_YEARS';
  public static readonly OPERATION_NEXT_X_YEARS: string = 'NEXT_X_YEARS';

  public static readonly F_STORAGE_OPERATIONS: string = 'storageOperations';

  public static readonly FORMAT: TableFormat = new TableFormat();

  public static readonly FIELD_LOGICAL: string = 'logical';
  public static readonly FIELD_TYPE: string = 'type';
  public static readonly FIELD_STORAGE: string = 'storage';
  public static readonly FIELD_TABLE: string = 'table';
  public static readonly FIELD_COLUMN: string = 'column';
  public static readonly FIELD_OPERATION: string = 'operation';
  public static readonly FIELD_VALUE: string = 'value';
  public static readonly FIELD_NESTED: string = 'nested';

  public static readonly OPERATIONS: Map<string, string> = new Map();

  static __static_initializer_0() {
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_EQUALS, Cres.get().getString('viewOpEquals'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_DOES_NOT_EQUAL, Cres.get().getString('viewOpDoesNotEqual'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_IS_NULL, Cres.get().getString('viewOpIsNull'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_IS_NOT_NULL, Cres.get().getString('viewOpIsNotNull'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_CONTAINS, Cres.get().getString('viewOpContains'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_DOES_NOT_CONTAIN, Cres.get().getString('viewOpDoesNotContain'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_BEGINS_WITH, Cres.get().getString('viewOpBeginsWith'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_DOES_NOT_BEGIN_WITH, Cres.get().getString('viewOpDoesNotBeginWith'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_ENDS_WITH, Cres.get().getString('viewOpEndsWith'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_DOES_NOT_END_WITH, Cres.get().getString('viewOpDoesNotEndWith'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_IS_GREATER_THAN, Cres.get().getString('viewOpIsGreaterThan'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_IS_GREATER_OR_EQUAL_THAN, Cres.get().getString('viewOpIsGreaterThanOrEqualTo'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_IS_LESS_THAN, Cres.get().getString('viewOpIsLessThan'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_IS_LESS_OR_EQUAL_THAN, Cres.get().getString('viewOpIsLessThanOrEqualTo'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_ON, Cres.get().getString('viewOpOn'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_ON_OR_AFTER, Cres.get().getString('viewOpOnOrAfter'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_ON_OR_BEFORE, Cres.get().getString('viewOpOnOrBefore'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_HOUR, Cres.get().getString('viewOpLastHour'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_THIS_HOUR, Cres.get().getString('viewOpThisHour'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_HOUR, Cres.get().getString('viewOpNextHour'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_YESTERDAY, Cres.get().getString('viewOpYesterday'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_TODAY, Cres.get().getString('viewOpToday'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_TOMORROW, Cres.get().getString('viewOpTomorrow'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_WEEK, Cres.get().getString('viewOpLastWeek'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_THIS_WEEK, Cres.get().getString('viewOpThisWeek'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_WEEK, Cres.get().getString('viewOpNextWeek'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_MONTH, Cres.get().getString('viewOpLastMonth'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_THIS_MONTH, Cres.get().getString('viewOpThisMonth'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_MONTH, Cres.get().getString('viewOpNextMonth'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_YEAR, Cres.get().getString('viewOpLastYear'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_THIS_YEAR, Cres.get().getString('viewOpThisYear'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_YEAR, Cres.get().getString('viewOpNextYear'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_X_HOURS, Cres.get().getString('viewOpLastXHours'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_X_HOURS, Cres.get().getString('viewOpNextXHours'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_X_DAYS, Cres.get().getString('viewOpLastXDays'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_X_DAYS, Cres.get().getString('viewOpNextXDays'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_X_WEEKS, Cres.get().getString('viewOpLastXWeeks'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_X_WEEKS, Cres.get().getString('viewOpNextXWeeks'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_X_MONTHS, Cres.get().getString('viewOpLastXMonths'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_X_MONTHS, Cres.get().getString('viewOpNextXMonths'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_LAST_X_YEARS, Cres.get().getString('viewOpLastXYears'));
    ViewFilterElement.OPERATIONS.set(ViewFilterElement.OPERATION_NEXT_X_YEARS, Cres.get().getString('viewOpNextXYears'));
  }

  static __static_initializer_1() {
    let ff: FieldFormat<any> = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_LOGICAL + '><I><A=' + ViewFilterElement.LOGICAL_OPERATION_AND + '><D=' + Cres.get().getString('viewLogicalOperation') + '>');
    ff.addSelectionValue(ViewFilterElement.LOGICAL_OPERATION_NONE, ' ');
    ff.addSelectionValue(ViewFilterElement.LOGICAL_OPERATION_AND, Cres.get().getString('viewLogicalAnd'));
    ff.addSelectionValue(ViewFilterElement.LOGICAL_OPERATION_OR, Cres.get().getString('viewLogicalOr'));
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_TYPE + '><I><A=' + ViewFilterElement.TYPE_CONDITION + '><D=' + Cres.get().getString('type') + '>');
    ff.addSelectionValue(ViewFilterElement.TYPE_CONDITION, Cres.get().getString('condition'));
    ff.addSelectionValue(ViewFilterElement.TYPE_NESTED_CONDITIONS, Cres.get().getString('viewNestedConditions'));
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_STORAGE + '><S><F=H><D=' + Cres.get().getString('storage') + '>');
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_TABLE + '><S><F=H><D=' + Cres.get().getString('table') + '>');
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_COLUMN + '><S><F=E><D=' + Cres.get().getString('column') + '>');
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_OPERATION + '><S><D=' + Cres.get().getString('operation') + '>');
    ff.setSelectionValues(ViewFilterElement.OPERATIONS);
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_VALUE + '><S><D=' + Cres.get().getString('value') + '>');
    ff.setEditor(FieldConstants.EDITOR_EXPRESSION);
    ViewFilterElement.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + ViewFilterElement.FIELD_NESTED + '><T><F=NI><D=' + Cres.get().getString('viewNestedConditions') + '>');
    ViewFilterElement.FORMAT.addField(ff);

    let ref: string = ViewFilterElement.FIELD_LOGICAL + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    let exp: string = '{' + ViewFilterElement.FIELD_TYPE + '#' + DefaultReferenceResolver.ROW + '} != 0';
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ref = ViewFilterElement.FIELD_LOGICAL;
    exp = '{' + ViewFilterElement.FIELD_TYPE + '#' + DefaultReferenceResolver.ROW + '} != 0 ? {' + ViewFilterElement.FIELD_LOGICAL + '} : ' + Functions.INTEGER + '(' + ViewFilterElement.LOGICAL_OPERATION_NONE + ')';
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ref = ViewFilterElement.FIELD_COLUMN + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + ViewFilterElement.FIELD_TYPE + '} == ' + ViewFilterElement.TYPE_CONDITION;
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ref = ViewFilterElement.FIELD_OPERATION + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + ViewFilterElement.FIELD_TYPE + '} == ' + ViewFilterElement.TYPE_CONDITION;
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ref = ViewFilterElement.FIELD_OPERATION + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    exp = Functions.CALL_FUNCTION + '({' + ViewFilterElement.FIELD_STORAGE + "}, '" + ViewFilterElement.F_STORAGE_OPERATIONS + "', {" + ViewFilterElement.FIELD_TABLE + '}, {' + ViewFilterElement.FIELD_COLUMN + '})';
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ref = ViewFilterElement.FIELD_VALUE + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + ViewFilterElement.FIELD_TYPE + '} == ' + ViewFilterElement.TYPE_CONDITION;
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ref = ViewFilterElement.FIELD_NESTED + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = '{' + ViewFilterElement.FIELD_TYPE + '} == ' + ViewFilterElement.TYPE_NESTED_CONDITIONS;
    ViewFilterElement.FORMAT.addBinding(ref, exp);

    ViewFilterElement.FORMAT.setNamingExpression(
      Functions.PRINT +
        '(' +
        Functions.DT +
        "(), '(" +
        Functions.DR +
        '() > 0 ? ({' +
        ViewFilterElement.FIELD_LOGICAL +
        '} == ' +
        ViewFilterElement.LOGICAL_OPERATION_AND +
        ' ? "AND " : "OR ") : "") + ({' +
        ViewFilterElement.FIELD_TYPE +
        '} == ' +
        ViewFilterElement.TYPE_CONDITION +
        ' ? {' +
        ViewFilterElement.FIELD_COLUMN +
        '} + " " + {' +
        ViewFilterElement.FIELD_OPERATION +
        '#' +
        DefaultReferenceResolver.SELECTION_VALUE_DESCRIPTION +
        '} + " " + {' +
        ViewFilterElement.FIELD_VALUE +
        '} : "(" + {' +
        ViewFilterElement.FIELD_NESTED +
        "} + \")\")', ' ')"
    );
  }

  private logical: number | null = null;
  private type: number | null = null;
  private storage: string | null = null;
  private table: string | null = null;
  private column: string | null = null;
  private operation: string | null = null;
  private value: string | null = null;
  private nested: Array<ViewFilterElement> | null = null;

  private local = false;

  public constructor(data?: DataRecord) {
    super(ViewFilterElement.FORMAT, data);
  }

  public getLogical(): number | null {
    return this.logical;
  }

  public setLogical(logical: number): void {
    this.logical = logical;
  }

  public getType(): number | null {
    return this.type;
  }

  public setType(type: number): void {
    this.type = type;
  }

  public getStorage(): string | null {
    return this.storage;
  }

  public setStorage(storage: string): void {
    this.storage = storage;
  }

  public getTable(): string | null {
    return this.table;
  }

  public setTable(table: string): void {
    this.table = table;
  }

  public getColumn(): string | null {
    return this.column;
  }

  public setColumn(column: string): void {
    this.column = column;
  }

  public getOperation(): string | null {
    return this.operation;
  }

  public setOperation(operation: string): void {
    this.operation = operation;
  }

  public getValue(): string | null {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getNested(): Array<ViewFilterElement> | null {
    return this.nested;
  }

  public setNested(nested: Array<ViewFilterElement>): void {
    this.nested = nested;
  }

  public addNested(nestedElement: ViewFilterElement): void {
    if (this.type != ViewFilterElement.TYPE_NESTED_CONDITIONS) {
      throw new Error('Filter element is not switched into nested conditions mode');
    }
    if (this.nested == null) {
      this.nested = [];
    }
    this.nested.push(nestedElement);
  }

  public isLocal(): boolean {
    return this.local;
  }

  public setLocal(local: boolean): void {
    this.local = local;
  }

  private static _init = false;

  public static initialize() {
    if (ViewFilterElement._init) return;
    ViewFilterElement.__static_initializer_0();
    ViewFilterElement.__static_initializer_1();
    ViewFilterElement._init = true;
  }
}

ViewFilterElement.initialize();
