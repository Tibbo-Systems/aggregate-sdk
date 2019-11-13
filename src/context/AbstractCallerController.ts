import CallerController from './CallerController';
import CallerData from './CallerData';
import Context from './Context';
import PermissionCache from '../security/PermissionCache';
import JObject from '../util/java/JObject';
import Permissions from '../security/Permissions';

export default abstract class AbstractCallerController extends JObject implements CallerController {
  private static readonly CACHE_EXPIRATION_PERIOD = 1000;

  private static sessionIDCounter = 0;

  private sessionID = 0;

  private static readonly CONTROLLERS: WeakSet<CallerController> = new WeakSet();

  private username: string | null = null;

  private readonly callerData: CallerData | null;

  private loggedIn: boolean = false;

  private type: string | null = null;

  private address: string | null = null;

  private readonly creationTime: Date = new Date();

  private readonly properties: Map<string, string> = new Map();

  private lastCacheOperationTime: number | null = null;

  private _cache: Map<string, Context<any, any>> = new Map<string, Context<any, any>>();

  constructor(callerData: CallerData | null) {
    super();
    this.callerData = callerData;
    this.resetCache();
    AbstractCallerController.CONTROLLERS.add(this);
    this.sessionID = AbstractCallerController.sessionIDCounter++;
  }

  toString(): string {
    return (
      (this.type != null ? this.type : 'CallerController') +
      ' (' +
      (this.loggedIn ? 'logged in' : 'not logged in') +
      ')'
    );
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

  sendFeedback(level: number, message: string): void {}

  getUsername(): string | null {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  getInheritedUsername(): string | null {
    return null;
  }

  getEffectiveUsername(): string | null {
    let inheritedUsername = this.getInheritedUsername();
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

    let currentTime = Date.now();

    if (this.resetCacheBy(currentTime)) {
      return null;
    }

    if (this.lastCacheOperationTime == null) {
      this.lastCacheOperationTime = currentTime;
    }

    let ref = this._cache.get(path);

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

    let currentTime = Date.now();

    this.resetCacheBy(currentTime);

    this._cache.set(path, context);

    if (this.lastCacheOperationTime == null) {
      this.lastCacheOperationTime = currentTime;
    }
  }

  private resetCacheBy(currentTime: number): boolean {
    if (
      this.lastCacheOperationTime != null &&
      currentTime - this.lastCacheOperationTime > AbstractCallerController.CACHE_EXPIRATION_PERIOD
    ) {
      this.resetCache();
      return true;
    }

    return false;
  }

  abstract isHeadless(): boolean;
}
