import DefaultPermissionChecker from './DefaultPermissionChecker';
import Permissions from './Permissions';
export default class ServerPermissionChecker extends DefaultPermissionChecker {
    static readonly OBSERVER_PERMISSIONS = "observer";
    static readonly OPERATOR_PERMISSIONS = "operator";
    static readonly MANAGER_PERMISSIONS = "manager";
    static readonly ENGINEER_PERMISSIONS = "engineer";
    static readonly ADMIN_PERMISSIONS = "admin";
    constructor();
    static getObserverPermissions(): Permissions;
    static getOperatorPermissions(): Permissions;
    static getManagerPermissions(): Permissions;
    static getEngineerPermissions(): Permissions;
    static getAdminPermissions(): Permissions;
}
