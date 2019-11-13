import EventDefinition from '../context/EventDefinition';
import DataTable from '../datatable/DataTable';
import Permissions from '../security/Permissions';
import TimeHelper from '../util/TimeHelper';
import Enrichment from '../event/Enrichment';
import Acknowledgement from '../event/Acknowledgement';
import DataTableConversion from '../datatable/DataTableConversion';
import JObject from '../util/java/JObject';
import CloneUtils from '../util/CloneUtils';
import FieldFormat from '../datatable/FieldFormat';

export default class Event extends JObject {
  public static readonly DEFAULT_EVENT_EXPIRATION_PERIOD = 100 * TimeHelper.DAY_IN_MS; // Milliseconds

  private id: number = 0;
  private readonly instantiationtime: Date = new Date();
  private creationtime: Date | null = null;
  private expirationtime: Date | null = null;
  private context: string | null = null;
  private name: string | null = null;
  private acknowledgements = new Array<Acknowledgement>();
  private data: DataTable | null = null;
  private listener: number | null = null;
  private level: number = 0;
  private permissions: Permissions | null = null;
  private count: number = 1;
  private enrichments = new Array<Enrichment>();

  private originator: any;
  private deduplicationId: string | null = null;
  private sessionID: number | null = null;

  constructor() {
    super();
    this.setCreationtime(new Date(Date.now()));
  }

  public static createEventWithPermission(
    context: string,
    def: EventDefinition,
    level: number,
    data: DataTable,
    id: number,
    creationtime: Date | null,
    permissions: Permissions | null
  ): Event {
    const event = new Event();
    event.init(context, def.getName(), level, data, id);
    event.name = def.getName();
    event.permissions = permissions;

    if (creationtime != null) {
      event.creationtime = creationtime;
    }

    if (def.getExpirationPeriod() > 0) {
      event.setExpirationtime(new Date(Date.now() + def.getExpirationPeriod()));
    }

    return event;
  }

  public static createEvent(context: string, name: string, level: number, data: DataTable, id: number): Event {
    const event = new Event();
    event.init(context, name, level, data, id);

    return event;
  }

  private init(context: string, name: string, level: number, data: DataTable, id: number): void {
    this.context = context;
    this.name = name;
    this.level = level;
    this.data = data;
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public getInstantiationtime(): Date {
    return this.instantiationtime;
  }

  public getCreationtime(): Date | null {
    return this.creationtime;
  }

  public getContext(): string | null {
    return this.context;
  }

  public getName(): string | null {
    return this.name;
  }

  public getExpirationtime(): Date | null {
    return this.expirationtime;
  }

  public getAcknowledgementsTable(): DataTable {
    return DataTableConversion.beansToTable(this.acknowledgements, Acknowledgement.FORMAT, false);
  }

  public getEnrichmentsTable(): DataTable {
    return DataTableConversion.beansToTable(this.enrichments, Enrichment.FORMAT, false);
  }

  public setAcknowledgementsTable(data: DataTable) {
    this.acknowledgements = DataTableConversion.beansFromTable(data, Acknowledgement, Acknowledgement.FORMAT, false);
  }

  public setEnrichmentsTable(data: DataTable) {
    this.enrichments = DataTableConversion.beansFromTable(data, Enrichment, Enrichment.FORMAT, false);
  }

  public addAcknowledgement(ack: Acknowledgement) {
    this.acknowledgements.push(ack);
  }

  public getAcknowledgements(): Array<Acknowledgement> {
    return this.acknowledgements;
  }

  public addEnrichment(enrichment: Enrichment) {
    this.enrichments.push(enrichment);
  }

  public getEnrichments(): Array<Enrichment> {
    return this.enrichments;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setCreationtime(creationtime: Date) {
    this.creationtime = creationtime;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setContext(context: string) {
    this.context = context;
  }

  public setExpirationtime(expirationtime: Date) {
    this.expirationtime = expirationtime;
  }

  public setData(data: DataTable) {
    this.data = data;
  }

  public setListener(listener: number | null) {
    this.listener = listener;
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public setOriginator(originator: any) {
    this.originator = originator;
  }

  public getData(): DataTable | null {
    return this.data;
  }

  public getListener(): number | null {
    return this.listener;
  }

  public getLevel(): number {
    return this.level;
  }

  public getPermissions(): Permissions | null {
    return this.permissions;
  }

  public setPermissions(permissions: Permissions) {
    this.permissions = permissions;
  }

  public getOriginator(): any {
    return this.originator;
  }

  public getCount(): number {
    return this.count;
  }

  public setCount(count: number) {
    this.count = count;
  }

  public getDeduplicationId(): string | null {
    return this.deduplicationId;
  }

  public setDeduplicationId(deduplicationId: string) {
    this.deduplicationId = deduplicationId;
  }

  public getSessionID(): number | null {
    return this.sessionID;
  }

  public setSessionID(sessionID: number | null) {
    this.sessionID = sessionID;
  }

  clone(): JObject {
    let clone = super.clone() as Event;
    clone.acknowledgements = CloneUtils.deepClone<Acknowledgement[]>(this.acknowledgements) as Acknowledgement[];
    clone.enrichments = CloneUtils.deepClone<Enrichment[]>(this.enrichments) as Enrichment[];
    return clone;
  }

  equals(obj: JObject | null): boolean {
    if (this === obj) return true;
    if (!obj) return false;
    if (!(obj instanceof Event)) return false;
    let other = obj as Event;
    if (this.id == null || other.id == null) {
      return false;
    } else if (this.id !== other.id) return false;
    return true;
  }

  toString(): string {
    let dataSting =
      this.data != null ? (!this.data.isSimple() ? this.data.dataAsString() : this.data.toString()) : 'no data';
    return (
      "Event '" +
      name +
      "' in context '" +
      this.context +
      "' with ID " +
      this.id +
      ': ' +
      dataSting +
      (this.listener != null ? ", for listener '" + this.listener + "'" : '')
    );
  }
}
