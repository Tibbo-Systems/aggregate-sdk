import TableFormat from '../datatable/TableFormat';
import Expression from '../expression/Expression';
import AggreGateBean from '../datatable/AggreGateBean';
import TableKeyFieldsValidator from '../datatable/validator/TableKeyFieldsValidator';
import FieldFormat from '../datatable/FieldFormat';
import ValidatorHelper from '../datatable/validator/ValidatorHelper';
import Cres from '../Cres';
import FieldConstants from '../datatable/field/FieldConstants';
import FieldFormatFactory from '../datatable/FieldFormatFactory';

export default class EventEnrichmentRule extends AggreGateBean {
  static FIELD_NAME: string = 'name';
  static FIELD_EXPRESSION: string = 'expression';
  public static FORMAT: TableFormat = new TableFormat();

  static __static_initialized: boolean = false;

  static __static_initializer_0() {
    if (EventEnrichmentRule.__static_initialized) return;
    EventEnrichmentRule.FORMAT.addTableValidator(new TableKeyFieldsValidator());
    let ff: FieldFormat<any> = FieldFormatFactory.create(
      '<' + EventEnrichmentRule.FIELD_NAME + '><S><F=K><D=' + Cres.get().getString('name') + '>'
    );
    ff.addValidator(ValidatorHelper.NAME_LENGTH_VALIDATOR);
    ff.addValidator(ValidatorHelper.NAME_SYNTAX_VALIDATOR);
    EventEnrichmentRule.FORMAT.addField(ff);
    EventEnrichmentRule.FORMAT.addField(
      FieldFormatFactory.create(
        '<' +
          EventEnrichmentRule.FIELD_EXPRESSION +
          '><S><D=' +
          Cres.get().getString('expression') +
          '><E=' +
          FieldConstants.EDITOR_EXPRESSION +
          '>'
      )
    );
    EventEnrichmentRule.FORMAT.setNamingExpression('print({}, "{' + EventEnrichmentRule.FIELD_NAME + '}", ", ")');
    EventEnrichmentRule.__static_initialized = true;
  }

  private name: string | null = null;

  private expression: string | null = null;

  private enrichmentExpression: Expression | null = null;

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getExpression(): string | null {
    return this.expression;
  }

  public setExpression(expression: string) {
    this.expression = expression;
    this.enrichmentExpression = null;
  }

  public getEnrichmentExpression(): Expression | null {
    if (this.enrichmentExpression == null) {
      this.enrichmentExpression =
        this.expression != null && this.expression.length > 0 ? new Expression(this.expression) : null;
    }
    return this.enrichmentExpression;
  }
}
EventEnrichmentRule.__static_initializer_0();
