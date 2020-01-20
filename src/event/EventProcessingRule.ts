import Expression from '../expression/Expression';
import TableFormat from '../datatable/TableFormat';
import DataTableConversion from '../datatable/DataTableConversion';
import SimpleDataTable from '../datatable/SimpleDataTable';
import TableKeyFieldsValidator from '../datatable/validator/TableKeyFieldsValidator';
import FieldFormat from '../datatable/FieldFormat';
import Cres from '../Cres';
import LongFieldFormat from '../datatable/field/LongFieldFormat';
import TimeHelper from '../util/TimeHelper';
import Event from '../data/Event';
import DataTableBindingProvider from '../datatable/DataTableBindingProvider';
import EventEnrichmentRule from './EventEnrichmentRule';
import Contexts from '../context/Contexts';
import UtilitiesContextConstants from '../server/UtilitiesContextConstants';
import Functions from '../expression/functions/Functions';
import DefaultFormatConverter from '../datatable/converter/DefaultFormatConverter';
import JObject from '../util/java/JObject';
import Binding from '../binding/Binding';
import FieldConstants from '../datatable/field/FieldConstants';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import ContextUtilsConstants from '../context/ContextUtilsConstants';

export default class EventProcessingRule extends JObject {
  static __static_initialized = false;

  static FIELD_MASK = 'mask';

  static FIELD_EVENT = 'event';

  static FIELD_PREFILTER = 'prefilter';

  static FIELD_DEDUPLICATOR = 'deduplicator';

  static FIELD_QUEUE = 'queue';

  static FIELD_DUPLICATE_DISPATCHING = 'duplicateDispatching';

  static FIELD_PERIOD = 'period';

  static FIELD_ENRICHMENTS = 'enrichments';

  public static FORMAT: TableFormat = new TableFormat();

  static __static_initializer() {
    if (EventProcessingRule.__static_initialized) return;
    EventProcessingRule.FORMAT.addTableValidator(new TableKeyFieldsValidator());
    EventProcessingRule.FORMAT.addField(
      FieldFormatFactory.create('<' + EventProcessingRule.FIELD_MASK + '><S><F=NK><D=' + Cres.get().getString('conContextMask') + '><H=' + Cres.get().getString('eventProcessingRulesContextMask') + '><E=contextmask>')
    );
    EventProcessingRule.FORMAT.addField(
      FieldFormatFactory.create('<' + EventProcessingRule.FIELD_EVENT + '><S><F=EK><V=<L=1 ' + 2147483647 + '>><D=' + Cres.get().getString('efEventName') + '><H=' + Cres.get().getString('eventProcessingRulesEventName') + '>')
    );
    EventProcessingRule.FORMAT.addField(
      FieldFormatFactory.create('<' + EventProcessingRule.FIELD_PREFILTER + '><S><D=' + Cres.get().getString('efPrefilter') + '><H=' + Cres.get().getString('efPrefilterHelp') + '><E=' + FieldConstants.EDITOR_EXPRESSION + '>')
    );
    EventProcessingRule.FORMAT.addField(
      FieldFormatFactory.create(
        '<' + EventProcessingRule.FIELD_DEDUPLICATOR + '><S><D=' + Cres.get().getString('efDeduplicator') + '><H=' + Cres.get().getString('eventProcessingRulesDeduplicator') + '><E=' + FieldConstants.EDITOR_EXPRESSION + '>'
      )
    );
    EventProcessingRule.FORMAT.addField(FieldFormatFactory.create('<' + EventProcessingRule.FIELD_QUEUE + '><I><A=100><D=' + Cres.get().getString('efMemoryQueue') + '><H=' + Cres.get().getString('eventProcessingRulesRam') + '>'));
    EventProcessingRule.FORMAT.addField(
      FieldFormatFactory.create('<' + EventProcessingRule.FIELD_DUPLICATE_DISPATCHING + '><B><D=' + Cres.get().getString('efDuplicateDispatching') + '><H=' + Cres.get().getString('eventProcessingRulesDeduplicationDispatching') + '>')
    );
    EventProcessingRule.FORMAT.addField(
      FieldFormatFactory.create(
        '<' +
          EventProcessingRule.FIELD_PERIOD +
          '><L><A=' +
          Event.DEFAULT_EVENT_EXPIRATION_PERIOD +
          '><D=' +
          Cres.get().getString('confExpirationPeriod') +
          '><H=' +
          Cres.get().getString('eventProcessingRulesExpPeriod') +
          '><E=' +
          FieldConstants.EDITOR_PERIOD +
          '><O=' +
          LongFieldFormat.encodePeriodEditorOptions(TimeHelper.HOUR, TimeHelper.YEAR) +
          '>'
      )
    );
    const ff: FieldFormat<any> = FieldFormatFactory.create('<' + EventProcessingRule.FIELD_ENRICHMENTS + '><T><D=' + Cres.get().getString('enrichments') + '><H=' + Cres.get().getString('eventProcessingRulesEnrichments') + '>');
    ff.setDefault(new SimpleDataTable(EventEnrichmentRule.FORMAT));
    EventProcessingRule.FORMAT.addField(ff);
    let ref: string = EventProcessingRule.FIELD_EVENT + '#' + DataTableBindingProvider.PROPERTY_CHOICES;
    let exp: string = '{' + Contexts.CTX_UTILITIES + ':' + UtilitiesContextConstants.F_EVENTS_BY_MASK + "('{" + EventProcessingRule.FIELD_MASK + "}')}";
    EventProcessingRule.FORMAT.addBinding(new Binding(ref, exp));
    ref = EventProcessingRule.FIELD_PREFILTER + '#' + DataTableBindingProvider.PROPERTY_OPTIONS;
    exp = Functions.EXPRESSION_EDITOR_OPTIONS + '({' + EventProcessingRule.FIELD_MASK + '}, {' + EventProcessingRule.FIELD_EVENT + '}, ' + ContextUtilsConstants.ENTITY_EVENT + ')';
    EventProcessingRule.FORMAT.addBinding(new Binding(ref, exp));
    ref = EventProcessingRule.FIELD_DEDUPLICATOR + '#' + DataTableBindingProvider.PROPERTY_OPTIONS;
    exp = Functions.EXPRESSION_EDITOR_OPTIONS + '({' + EventProcessingRule.FIELD_MASK + '}, {' + EventProcessingRule.FIELD_EVENT + '}, ' + ContextUtilsConstants.ENTITY_EVENT + ')';
    EventProcessingRule.FORMAT.addBinding(new Binding(ref, exp));
    ref = EventProcessingRule.FIELD_QUEUE + '#' + DataTableBindingProvider.PROPERTY_ENABLED;
    exp = 'length({' + EventProcessingRule.FIELD_DEDUPLICATOR + '}) > 0';
    EventProcessingRule.FORMAT.addBinding(new Binding(ref, exp));
    EventProcessingRule.FORMAT.setReorderable(true);
    DataTableConversion.registerFormatConverter(new DefaultFormatConverter(EventProcessingRule, EventProcessingRule.FORMAT));
    EventProcessingRule.__static_initialized = true;
  }

  private mask: string;

  private event: string;

  private prefilter = '';

  private deduplicator = '';

  private queue = 0;

  private duplicateDispatching = false;

  private period = 0;

  private enrichments: Array<EventEnrichmentRule> = new Array<EventEnrichmentRule>();

  private prefilterExpression: Expression | null = null;

  private deduplicatorExpression: Expression | null = null;

  private filtered = 0;

  private saved = 0;

  private duplicates = 0;

  constructor(mask: string, event: string) {
    super();
    this.mask = mask;
    this.event = event;
  }

  public getEvent(): string {
    return this.event;
  }

  public getMask(): string {
    return this.mask;
  }

  public getPeriod(): number {
    return this.period;
  }

  public setEvent(event: string) {
    this.event = event;
  }

  public setMask(mask: string) {
    this.mask = mask;
  }

  public setPeriod(period: number) {
    this.period = period;
  }

  public getPrefilter(): string {
    return this.prefilter;
  }

  public setPrefilter(prefilter: string) {
    this.prefilter = prefilter;
    this.prefilterExpression = null;
  }

  public getPrefilterExpression(): Expression | null {
    if (this.prefilterExpression == null) {
      this.prefilterExpression = this.prefilter != null && this.prefilter.length > 0 ? new Expression(this.prefilter) : null;
    }
    return this.prefilterExpression;
  }

  public getDeduplicator(): string {
    return this.deduplicator;
  }

  public setDeduplicator(deduplicator: string) {
    this.deduplicator = deduplicator;
    this.deduplicatorExpression = null;
  }

  public getDeduplicatorExpression(): Expression | null {
    if (this.deduplicatorExpression == null) {
      this.deduplicatorExpression = this.deduplicator != null && this.deduplicator.length > 0 ? new Expression(this.deduplicator) : null;
    }
    return this.deduplicatorExpression;
  }

  public getEnrichments(): Array<EventEnrichmentRule> {
    return this.enrichments;
  }

  public setEnrichments(enrichments: Array<EventEnrichmentRule>) {
    this.enrichments = enrichments;
  }

  public getQueue(): number {
    return this.queue;
  }

  public setQueue(queue: number) {
    this.queue = queue;
  }

  public isDuplicateDispatching(): boolean {
    return this.duplicateDispatching;
  }

  public setDuplicateDispatching(duplicateDispatching: boolean) {
    this.duplicateDispatching = duplicateDispatching;
  }

  public addFiltered() {
    this.filtered++;
  }

  public addSaved() {
    this.saved++;
  }

  public addDuplicate() {
    this.duplicates++;
  }

  public getFiltered(): number {
    return this.filtered;
  }

  public getSaved(): number {
    return this.saved;
  }

  public getDuplicates(): number {
    return this.duplicates;
  }

  public toString(): string {
    return 'EventProcessingRule [event=' + this.event + ', mask=' + this.mask + ']';
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) return true;
    if (obj == null) return false;
    if (!(obj instanceof EventProcessingRule)) return false;
    const other: EventProcessingRule = obj as EventProcessingRule;
    if (this.event == null) {
      if (other.event != null) return false;
    } else if (this.event !== other.event) return false;
    if (this.mask == null) {
      if (other.mask != null) return false;
    } else if (this.mask !== other.mask) return false;
    return true;
  }
}

EventProcessingRule.__static_initializer();
