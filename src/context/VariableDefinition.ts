import AbstractEntityDefinition from './AbstractEntityDefinition';
import TableFormat from '../datatable/TableFormat';
import Context from './Context';
import CallerController from './CallerController';
import RequestController from './RequestController';
import DataTable from '../datatable/DataTable';
import CompatibilityConverter from './CompatibilityConverter';
import Comparable from '../util/java/Comparable';
import Util from '../util/Util';
import JObject from '../util/java/JObject';
import Permissions from '../security/Permissions';
import ContextUtilsConstants from './ContextUtilsConstants';
import JSBI from 'jsbi';

export default class VariableDefinition extends AbstractEntityDefinition implements Comparable<VariableDefinition> {
  public static readonly HISTORY_RATE_CHANGES: number = -1;

  public static readonly HISTORY_RATE_ALL: number = 0;

  public static readonly CACHING_NONE: number = 0;

  public static readonly CACHING_HARD: number = 1;

  public static readonly CACHING_SOFT: number = 2;

  private format: TableFormat | null = null;

  private readable = false;

  private writable = false;

  private hidden = false;

  private readPermissions: Permissions | null = null;

  private writePermissions: Permissions | null = null;

  private helpId: string | null = null;

  private getter: ((con: Context<any, any>, def: VariableDefinition, caller?: CallerController, request?: RequestController) => DataTable) | null = null;

  private setter: ((con: Context<any, any>, def: VariableDefinition, value: DataTable, caller?: CallerController, request?: RequestController) => boolean) | null = null;

  private allowUpdateEvents = false;

  private changeEventsExpirationPeriod = 0;

  private localCachingMode: number = VariableDefinition.CACHING_HARD;

  private remoteCacheTime = JSBI.BigInt(0);

  private valueClass: any;

  private compatibilityConverters: Array<CompatibilityConverter> = new Array<CompatibilityConverter>();

  private persistent = true;

  private defaultValue: DataTable | null = null;

  private historyRate: number = VariableDefinition.HISTORY_RATE_ALL;

  constructor(name: string, format: TableFormat | null, readable: boolean, writable: boolean, description?: string, group?: string) {
    super();
    this.setFormat(format);
    this.init(name, readable, writable, description);
    if (group) this.setGroup(group);
  }

  private init(name: string, readable: boolean, writable: boolean, description?: string): void {
    this.setName(name);

    this.readable = readable;
    this.writable = writable;
    if (description) this.setDescription(description);
    else this.setDescription(name);
  }

  public setFormat(format: TableFormat | null) {
    if (format != null) {
      format.makeImmutable(null);
    }
    this.format = format;
  }

  public setReadable(readable: boolean) {
    this.readable = readable;
  }

  public setWritable(writable: boolean) {
    this.writable = writable;
  }

  setHidden(hidden: boolean) {
    this.hidden = hidden;
  }

  public setGroup(group: string) {
    super.setGroup(group);
    if (group != null) {
      this.allowUpdateEvents = true;
    }
  }

  setReadPermissions(readPermissions: Permissions) {
    this.readPermissions = readPermissions;
  }

  public setWritePermissions(writePermissions: Permissions) {
    this.writePermissions = writePermissions;
  }

  public setSetter(setter: (con: Context<any, any>, def: VariableDefinition, value: DataTable, caller?: CallerController, request?: RequestController) => boolean) {
    this.setter = setter;
  }

  public setGetter(getter: (con: Context<any, any>, def: VariableDefinition, caller?: CallerController, request?: RequestController) => DataTable): void {
    this.getter = getter;
  }

  public getFormat(): TableFormat | null {
    return this.format;
  }

  public isReadable(): boolean {
    return this.readable;
  }

  public isWritable(): boolean {
    return this.writable;
  }

  isHidden(): boolean {
    return false;
  }

  public getReadPermissions(): Permissions | null {
    return this.readPermissions;
  }

  public getWritePermissions(): Permissions | null {
    return this.writePermissions;
  }

  public getSetter(): ((con: Context<any, any>, def: VariableDefinition, value: DataTable, caller?: CallerController, request?: RequestController) => boolean) | null {
    return this.setter;
  }

  public getGetter(): ((con: Context<any, any>, def: VariableDefinition, caller?: CallerController, request?: RequestController) => DataTable) | null {
    return this.getter;
  }

  public getHelpId(): string | null {
    return this.helpId;
  }

  public setHelpId(helpId: string) {
    this.helpId = helpId;
  }

  public getValueClass(): any {
    return this.valueClass;
  }

  public setValueClass(valueClass: any) {
    this.valueClass = valueClass;
  }

  public getChangeEventsExpirationPeriod(): number {
    return this.changeEventsExpirationPeriod;
  }

  /**
   * Sets duration of update events storage (in milliseconds). Null duration disables update events persistent storage.
   * @param {number} changeEventsExpirationPeriod
   */
  public setChangeEventsExpirationPeriod(changeEventsExpirationPeriod: number) {
    this.changeEventsExpirationPeriod = changeEventsExpirationPeriod;
  }

  public isLocalCachingEnabled(): boolean {
    return this.localCachingMode !== VariableDefinition.CACHING_NONE;
  }

  public getLocalCachingMode(): number {
    return this.localCachingMode;
  }

  public setLocalCachingMode(value: number) {
    this.localCachingMode = value;
  }

  public getRemoteCacheTime(): JSBI {
    return this.remoteCacheTime;
  }

  public setRemoteCacheTime(remoteCacheTime: JSBI) {
    this.remoteCacheTime = remoteCacheTime;
  }

  public getDefaultValue(): DataTable | null {
    return this.defaultValue;
  }

  public setDefaultValue(defaultValue: DataTable) {
    this.defaultValue = defaultValue;
  }

  public isPersistent(): boolean {
    return this.persistent;
  }

  public setPersistent(persistent: boolean) {
    this.persistent = persistent;
  }

  public isAllowUpdateEvents(): boolean {
    return this.allowUpdateEvents;
  }

  public setAllowUpdateEvents(allowUpdateEvents: boolean) {
    this.allowUpdateEvents = allowUpdateEvents;
  }

  public getHistoryRate(): number {
    return this.historyRate;
  }

  public setHistoryRate(historyRate: number) {
    this.historyRate = historyRate;
  }

  public storeChangesOnlyInHistory(): boolean {
    return VariableDefinition.HISTORY_RATE_CHANGES === this.historyRate;
  }

  public addCompatibilityConverter(converter: CompatibilityConverter) {
    this.compatibilityConverters.push(converter);
  }

  public getCompatibilityConverters(): Array<CompatibilityConverter> {
    return this.compatibilityConverters;
  }

  public getEntityType(): number {
    return ContextUtilsConstants.ENTITY_VARIABLE;
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }

    if (!(obj instanceof VariableDefinition)) return false;

    const other: VariableDefinition = obj as VariableDefinition;
    if (other.getDescription() == null) {
      if (other.getDescription() != null) {
        return false;
      }
    } else if (this.getDescription() !== other.getDescription()) {
      return false;
    }
    if (this.format == null) {
      if (other.format != null) {
        return false;
      }
    } else if (!this.format.equals(other.format)) {
      return false;
    }
    if (this.getGroup() == null) {
      if (other.getGroup() != null) {
        return false;
      }
    } else if (this.getGroup() !== other.getGroup()) {
      return false;
    }
    if (this.getHelp() == null) {
      if (other.getHelp() != null) {
        return false;
      }
    } else if (this.getHelp() !== other.getHelp()) {
      return false;
    }
    if (this.hidden != other.hidden) {
      return false;
    }
    if (this.getIconId() == null) {
      if (other.getIconId() != null) {
        return false;
      }
    } else if (this.getIconId() !== other.getIconId()) {
      return false;
    }
    if (this.helpId == null) {
      if (other.helpId != null) {
        return false;
      }
    } else if (this.helpId !== other.helpId) {
      return false;
    }
    if (this.getIndex() == null) {
      if (other.getIndex() != null) {
        return false;
      }
    } else if (this.getIndex() !== other.getIndex()) {
      return false;
    }
    if (this.getName() == null) {
      if (other.getName() != null) {
        return false;
      }
    } else if (this.getName() !== other.getName()) {
      return false;
    }
    if (this.changeEventsExpirationPeriod == null) {
      if (other.changeEventsExpirationPeriod != null) {
        return false;
      }
    } else if (this.changeEventsExpirationPeriod !== other.changeEventsExpirationPeriod) {
      return false;
    }
    if (this.readable != other.readable) {
      return false;
    }
    if (this.writable != other.writable) {
      return false;
    }
    if (this.readPermissions == null) {
      if (other.readPermissions != null) {
        return false;
      }
    } else if (!this.readPermissions.equals(other.readPermissions)) {
      return false;
    }
    if (this.writePermissions == null) {
      if (other.writePermissions != null) {
        return false;
      }
    } else if (!this.writePermissions.equals(other.writePermissions)) {
      return false;
    }
    if (this.persistent != other.persistent) {
      return false;
    }
    if (this.historyRate == null) {
      if (other.historyRate != null) {
        return false;
      }
    } else if (this.historyRate !== other.historyRate) {
      return false;
    }

    return true;
  }

  compareTo(d: VariableDefinition): number {
    if (this.getIndex() != null || d.getIndex() != null) {
      const my = this.getIndex() != null ? this.getIndex() : 0;
      const other = d.getIndex() != null ? d.getIndex() : 0;
      return Util.compare(other as number, my as number);
    }

    return 0;
  }

  clone(): VariableDefinition {
    return super.clone() as VariableDefinition;
  }
}
