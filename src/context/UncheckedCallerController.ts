import AbstractCallerController from './AbstractCallerController';
import DefaultPermissionChecker from '../security/DefaultPermissionChecker';
import Permissions from '../security/Permissions';

export default class UncheckedCallerController extends AbstractCallerController {
  private readonly permissions: Permissions = DefaultPermissionChecker.getNullPermissions();

  constructor(username?: string) {
    super(null);
    if (username) this.setUsername(username);
  }

  isHeadless(): boolean {
    return true;
  }

  getPermissions(): Permissions | null {
    return this.permissions;
  }

  isPermissionCheckingEnabled(): boolean {
    return false;
  }

  isLoggedIn(): boolean {
    return true;
  }
}
