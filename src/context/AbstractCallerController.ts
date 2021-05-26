import CallerController from './CallerController';
import CallerData from './CallerData';
import Context from './Context';
import PermissionCache from '../security/PermissionCache';
import JObject from '../util/java/JObject';
import Permissions from '../security/Permissions';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import Cres from '../Cres';
import FieldConstants from '../datatable/field/FieldConstants';
import AbstractContext from './AbstractContext';
import SimpleDataTable from '../datatable/SimpleDataTable';
import DataTable from '../datatable/DataTable';
import Log from '../Log';
import TableFormat from '../datatable/TableFormat';

export default abstract class AbstractCallerController extends JObject implements CallerController {
  private static readonly CACHE_EXPIRATION_PERIOD = 1000;

  private static sessionIDCounter = 0;

  private sessionID = 0;

  private static readonly CONTROLLERS: WeakSet<CallerController> = new WeakSet();

  private static readonly FIELD_LOCKED_CONTEXTS_CONTEXT_PATH: string = 'contextPath';
  private static readonly FIELD_LOCKED_CONTEXTS_CONTEXT_DESCRIPTION: string = 'contextDescription';
  private static readonly FORMAT_LOCKED_CONTEXTS = new TableFormat();

  private static _init = false;

  private static __static_initializer_0() {
    AbstractCallerController.FORMAT_LOCKED_CONTEXTS.addField(FieldFormatFactory.createWith(AbstractCallerController.FIELD_LOCKED_CONTEXTS_CONTEXT_PATH, FieldConstants.STRING_FIELD, Cres.get().getString('conContextPath')));

    AbstractCallerController.FORMAT_LOCKED_CONTEXTS.addField(
      FieldFormatFactory.createWith(AbstractCallerController.FIELD_LOCKED_CONTEXTS_CONTEXT_DESCRIPTION, FieldConstants.STRING_FIELD, Cres.get().getString('description')).setNullable(true)
    );
  }

  public static initialize() {
    if (AbstractCallerController._init) return;

    AbstractCallerController.__static_initializer_0();
    AbstractCallerController._init = true;
  }

  private username: string | null = null;

  private inheritedUsername: string | null = null;

  private readonly callerData: CallerData | null;

  private loggedIn = false;

  private type: string | null = null;

  private address: string | null = null;

  private readonly creationTime: Date = new Date();

  private readonly properties: Map<string, string> = new Map();

  private lastCacheOperationTime: number | null = null;

  private _cache: Map<string, Context<any, any>> = new Map<string, Context<any, any>>();

  private readonly lockedContexts: Set<Context<any, any>> = new Set<Context<any, any>>();

  constructor(callerData: CallerData | null) {
    super();
    this.callerData = callerData;
    this.resetCache();
    AbstractCallerController.CONTROLLERS.add(this);
    this.sessionID = AbstractCallerController.sessionIDCounter++;
  }

  toString(): string {
    return (this.type != null ? this.type : 'CallerController') + ' (' + (this.loggedIn ? 'logged in' : 'not logged in') + ')';
  }

  getPermissions(): Permissions | null {
    return null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isPermissionCheckingEnabled(): boolean {
    return true;
  }

  getPermissionCache(): PermissionCache | null {
    return null;
  }

  getCallerData(): CallerData | null {
    return this.callerData;
  }

  getProperties(): Map<string, string> {
    return this.properties;
  }

  public setLoggedIn(loggedIn: boolean): void {
    this.loggedIn = loggedIn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendFeedback(level: number, message: string): void {}

  getUsername(): string | null {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  getInheritedUsername(): string | null {
    return this.inheritedUsername;
  }

  public setInheritedUsername(inheritedUsername: string) {
    this.inheritedUsername = inheritedUsername;
  }

  getEffectiveUsername(): string | null {
    const inheritedUsername = this.getInheritedUsername();
    return inheritedUsername != null ? inheritedUsername : this.getUsername();
  }

  getType(): string | null {
    return this.type;
  }

  public setType(type: string) {
    this.type = type;
  }

  getAddress(): string | null {
    return this.address;
  }

  setAddress(address: string) {
    this.address = address;
  }

  getCreationTime(): Date {
    return this.creationTime;
  }

  login(username: string, inheritedUsername: string, permissions: Permissions): void {
    this.setUsername(username);
    this.resetCache();
  }

  logout(): void {
    if (this.callerData != null) {
      this.callerData.cleanup();
    }
    this.resetCache();
  }

  private resetCache(): void {
    this._cache = new Map<string, Context<any, any>>();
    this.lastCacheOperationTime = null;
  }

  getSessionID(): number {
    return this.sessionID;
  }

  lookup(path: string): Context<any, any> | null {
    if (!this.isPermissionCheckingEnabled()) {
      return null;
    }

    const currentTime = Date.now();

    if (this.resetCacheBy(currentTime)) {
      return null;
    }

    if (this.lastCacheOperationTime == null) {
      this.lastCacheOperationTime = currentTime;
    }

    const ref = this._cache.get(path);

    if (!ref) {
      return null;
    }

    if (ref.getContextManager() == null || !ref.hasParent(ref.getContextManager().getRoot())) {
      return null;
    }

    return ref;
  }

  cache(path: string, context: Context<any, any>): void {
    if (!this.isPermissionCheckingEnabled()) {
      return;
    }

    /*if (!WatchDog.isEnoughMemory())
        {
            resetCache();
            return;
        }*/

    const currentTime = Date.now();

    this.resetCacheBy(currentTime);

    this._cache.set(path, context);

    if (this.lastCacheOperationTime == null) {
      this.lastCacheOperationTime = currentTime;
    }
  }

  private resetCacheBy(currentTime: number): boolean {
    if (this.lastCacheOperationTime != null && currentTime - this.lastCacheOperationTime > AbstractCallerController.CACHE_EXPIRATION_PERIOD) {
      this.resetCache();
      return true;
    }

    return false;
  }

  abstract isHeadless(): boolean;

  addLockedContext(context: Context<any, any>): void {
    this.lockedContexts.add(context);
  }

  removeLockedContext(context: Context<any, any>): void {
    this.lockedContexts.delete(context);
  }

  unlockAllContexts(): void {
    const clone: Set<Context<any, any>> = new Set<Context<any, any>>(this.lockedContexts);

    for (const context of clone.values()) {
      try {
        context.callFunction(AbstractContext.F_BREAK_LOCK, [this]);
      } catch (e) {
        Log.CONTEXT.warn("An error occurred when trying to unlock context '" + context + "' locked by caller '" + this + "'");
      }
    }
  }

  createLockedContextsTable(): DataTable {
    const result = new SimpleDataTable(AbstractCallerController.FORMAT_LOCKED_CONTEXTS);
    const clone: Set<Context<any, any>> = new Set<Context<any, any>>(this.lockedContexts);

    for (const context of clone.values()) {
      result.addRecordWith(context.getPath(), context.getDescription());
    }

    result.sortWithParams(AbstractCallerController.FIELD_LOCKED_CONTEXTS_CONTEXT_PATH, true);

    return result;
  }

  isConnectionTerminatable(): boolean {
    return this.getUsername() != null && !this.isHeadless() && this.isLoggedIn();
  }
}
