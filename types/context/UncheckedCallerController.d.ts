import AbstractCallerController from './AbstractCallerController';
import Permissions from '../security/Permissions';
export default class UncheckedCallerController extends AbstractCallerController {
    private readonly permissions;
    constructor(username?: string);
    isHeadless(): boolean;
    getPermissions(): Permissions | null;
    isPermissionCheckingEnabled(): boolean;
    isLoggedIn(): boolean;
}
