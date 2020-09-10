import Context from './Context';
import CallerController from './CallerController';
import Log from '../Log';
import AbstractCallerController from './AbstractCallerController';
import MessageFormat from '../util/java/MessageFormat';
import Cres from '../Cres';

export default class PropertiesLock {
  private readonly context: Context<any, any>;
  private readonly lockingPropertiesEditorUUIDs = new Set<string>();

  private _lockedBy: AbstractCallerController | null = null;

  constructor(context: Context<any, any>) {
    this.context = context;
  }

  lockedBy(): string | null {
    return this._lockedBy !== null ? this.getLockOwnerName(this._lockedBy) : null;
  }

  lock(caller: AbstractCallerController, propertiesEditorUUID: string): string | null {
    if (this._lockedBy !== null && !this._lockedBy.equals(caller)) throw new Error(this.getLockedMessage());

    this.lockingPropertiesEditorUUIDs.add(propertiesEditorUUID);

    if (this._lockedBy !== null && this._lockedBy.equals(caller)) return this.getLockOwnerName(this._lockedBy);

    Log.CONTEXT.debug("Lock for context '" + this.context.getPath() + "' was acquired by: '" + caller + "'");

    this._lockedBy = caller;

    caller.addLockedContext(this.context);

    return this.getLockOwnerName(this._lockedBy);
  }

  private getLockedMessage(): string {
    return MessageFormat.format(Cres.get().getString('conPropLockErrLocked'), this.context.getPath(), this._lockedBy);
  }

  unlock(caller: AbstractCallerController, propertiesEditorUUID: string): boolean {
    if (!caller.equals(this._lockedBy)) throw new Error(this.getLockedMessage());

    this.lockingPropertiesEditorUUIDs.delete(propertiesEditorUUID);

    if (this.lockingPropertiesEditorUUIDs.size !== 0) return false;

    Log.CONTEXT.debug("Lock for context '" + this.context.getPath() + "' held by '" + this._lockedBy + "' was released");

    this._lockedBy = null;

    caller.removeLockedContext(this.context);

    return true;
  }

  breakLock(): void {
    if (this._lockedBy !== null) {
      Log.CONTEXT.warn("Lock for context '" + this.context.getPath() + "' held by '" + this._lockedBy + "' was forced");
      this._lockedBy.removeLockedContext(this.context);
    }

    this._lockedBy = null;

    this.lockingPropertiesEditorUUIDs.clear();
  }

  private getLockOwnerName(caller: CallerController): string | null {
    return caller.getUsername();
  }
}
