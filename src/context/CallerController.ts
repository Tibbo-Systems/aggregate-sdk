import Context from './Context';
import PermissionCache from '../security/PermissionCache';
import CallerData from './CallerData';
import Permissions from '../security/Permissions';
import DataTable from '../datatable/DataTable';

export default interface CallerController {
  getUsername(): string | null;

  getInheritedUsername(): string | null;

  getEffectiveUsername(): string | null;

  isPermissionCheckingEnabled(): boolean;

  getPermissions(): Permissions | null;

  getPermissionCache(): PermissionCache | null;

  isLoggedIn(): boolean;

  login(username: string, inheritedUsername: string, permissions: Permissions): void;

  logout(): void;

  isHeadless(): boolean;

  getType(): string | null;

  getAddress(): string | null;

  getCreationTime(): Date;

  getCallerData(): CallerData | null;

  getProperties(): Map<string, string>;

  sendFeedback(level: number, message: string): void;

  getSessionID(): number;

  lookup(path: string): Context<any, any> | null;

  cache(path: string, context: Context<any, any>): void;

  addLockedContext(context: Context<any, any>): void;

  removeLockedContext(context: Context<any, any>): void;

  unlockAllContexts(): void;

  createLockedContextsTable(): DataTable;

  isConnectionTerminatable(): boolean;
}
