import AbstractEntityDefinition from './AbstractEntityDefinition';
import PersistenceOptions from '../event/PersistenceOptions';
import TableFormat from '../datatable/TableFormat';
import Permissions from '../security/Permissions';
import Comparable from '../util/java/Comparable';
import Util from '../util/Util';
import ContextUtilsConstants from './ContextUtilsConstants';
import JObject from '../util/java/JObject';

export default class EventDefinition extends AbstractEntityDefinition implements Comparable<EventDefinition> {
  public static readonly CONCURRENCY_SYNCHRONOUS = 0;
  public static readonly CONCURRENCY_SEQUENTIAL = 1;
  public static readonly CONCURRENCY_CONCURRENT = 2;

  private permissions: Permissions | null = null;

  private format: TableFormat | null = null;

  private hidden: boolean = false;

  private expirationPeriod: number = 0;

  private level: number = 0;

  private firePermissions: Permissions | null = null;

  private queueLength: number = 0;

  private concurrency: number = 0;

  private persistenceOptions: PersistenceOptions = new PersistenceOptions();

  private memoryStorageSize: number = 0;

  private sessionBound: boolean = false;

  private fingerprintExpression: string | null = null;

  constructor(name: string, tableFormat: TableFormat | null, description?: string, group?: string) {
    super();
    this.init(name, tableFormat, description, group);
  }

  private init(name: string, tableFormat: TableFormat | null, description?: string, group?: string): void {
    this.setName(name);

    this.setFormat(tableFormat);

    if (description) this.setDescription(description);
    if (group) this.setGroup(group);
  }

  public setFormat(format: TableFormat | null) {
    if (format != null) {
      format.makeImmutable(null);
    }
    this.format = format;
  }

  public setHidden(hidden: boolean) {
    this.hidden = hidden;
  }

  public setPermissions(permissions: Permissions) {
    this.permissions = permissions;
  }

  public setExpirationPeriod(expirationPeriod: number) {
    this.expirationPeriod = expirationPeriod;
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public getFormat(): TableFormat | null {
    return this.format;
  }

  public isHidden(): boolean {
    return this.hidden;
  }

  public getPermissions(): Permissions | null {
    return this.permissions;
  }

  public getExpirationPeriod(): number {
    return this.expirationPeriod;
  }

  public getLevel(): number {
    return this.level;
  }

  public getFirePermissions(): Permissions | null {
    return this.firePermissions;
  }

  public setFirePermissions(firePermissions: Permissions) {
    this.firePermissions = firePermissions;
  }

  public getPersistenceOptions(): PersistenceOptions {
    return this.persistenceOptions;
  }

  public getMemoryStorageSize(): number {
    return this.memoryStorageSize;
  }

  public setMemoryStorageSize(memoryStorageSize: number) {
    this.memoryStorageSize = memoryStorageSize;
  }

  public getConcurrency(): number {
    return this.concurrency;
  }

  public setConcurrency(concurrency: number) {
    this.concurrency = concurrency;
  }

  public setSessionBound(sessionBound: boolean) {
    this.sessionBound = sessionBound;
  }

  public isSessionBound(): boolean {
    return this.sessionBound;
  }

  compareTo(d: EventDefinition): number {
    if (this.getIndex() != null || d.getIndex() != null) {
      let my = this.getIndex() != null ? this.getIndex() : 0;
      let other = d.getIndex() != null ? d.getIndex() : 0;
      return Util.compare(other as number, my as number);
    }

    return 0;
  }

  clone(): EventDefinition {
    let clone = super.clone() as EventDefinition;
    clone.persistenceOptions = this.persistenceOptions.clone();
    return clone;
  }

  public getFingerprintExpression(): string | null {
    return this.fingerprintExpression;
  }

  public setFingerprintExpression(expression: string) {
    this.fingerprintExpression = expression;
  }

  public getEntityType(): number {
    return ContextUtilsConstants.ENTITY_EVENT;
  }

  public getQueueLength(): number {
    return this.queueLength;
  }

  public setQueueLength(queueLength: number) {
    this.queueLength = queueLength;
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) return true;
    if (obj == null) return false;
    if (!(obj instanceof EventDefinition)) return false;
    let other = obj as EventDefinition;
    if (this.getDescription() == null) {
      if (other.getDescription() != null) return false;
    } else if (this.getDescription() !== other.getDescription()) return false;
    if (this.expirationPeriod != other.expirationPeriod) return false;
    if (this.format == null) {
      if (other.format != null) return false;
    } else if (!this.format.equals(other.format)) return false;
    if (this.getGroup() == null) {
      if (other.getGroup() != null) return false;
    } else if (this.getGroup() !== other.getGroup()) return false;
    if (this.getHelp() == null) {
      if (other.getHelp() != null) return false;
    } else if (this.getHelp() !== other.getHelp()) return false;
    if (this.hidden != other.hidden) return false;
    if (this.getIconId() == null) {
      if (other.getIconId() != null) return false;
    } else if (this.getIconId() !== other.getIconId()) return false;
    if (this.getIndex() == null) {
      if (other.getIndex() != null) return false;
    } else if (this.getIndex() !== other.getIndex()) return false;
    if (this.level != other.level) return false;
    if (this.getName() == null) {
      if (other.getName() != null) return false;
    } else if (this.getName() !== other.getName()) return false;
    if (this.permissions == null) {
      if (other.permissions != null) return false;
    } else if (!this.permissions.equals(other.permissions)) return false;
    if (this.firePermissions == null) {
      if (other.firePermissions != null) return false;
    } else if (!this.firePermissions.equals(other.firePermissions)) return false;
    else if (this.sessionBound != other.sessionBound) return false;
    if (this.fingerprintExpression == null) {
      return other.fingerprintExpression == null;
    } else return this.fingerprintExpression === other.fingerprintExpression;
  }
}
