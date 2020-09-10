import DefaultPermissionChecker from './DefaultPermissionChecker';
import Cres from '../Cres';
import PermissionType from './PermissionType';
import Permissions from './Permissions';

export default class ServerPermissionChecker extends DefaultPermissionChecker {
  public static readonly OBSERVER_PERMISSIONS = 'observer';
  public static readonly OPERATOR_PERMISSIONS = 'operator';
  public static readonly MANAGER_PERMISSIONS = 'manager';
  public static readonly ENGINEER_PERMISSIONS = 'engineer';
  public static readonly ADMIN_PERMISSIONS = 'admin';

  constructor() {
    super();
    const nullType = new PermissionType(parseInt('00000000', 2), ServerPermissionChecker.NULL_PERMISSIONS, Cres.get().getString('secNoPerms'));
    const observerType = new PermissionType(parseInt('00000001', 2), ServerPermissionChecker.OBSERVER_PERMISSIONS, Cres.get().getString('secObserverPerms'));
    const operatorType = new PermissionType(parseInt('00000011', 2), ServerPermissionChecker.OPERATOR_PERMISSIONS, Cres.get().getString('secOperatorPerms'));
    const managerType = new PermissionType(parseInt('00000111', 2), ServerPermissionChecker.MANAGER_PERMISSIONS, Cres.get().getString('secManagerPerms'));
    const engineerType = new PermissionType(parseInt('00001111', 2), ServerPermissionChecker.ENGINEER_PERMISSIONS, Cres.get().getString('secEngineerPerms'));
    const adminType = new PermissionType(parseInt('00011111', 2), ServerPermissionChecker.ADMIN_PERMISSIONS, Cres.get().getString('secAdminPerms'));
    this.setPermissionTypes([nullType, observerType, operatorType, managerType, engineerType, adminType]);
  }

  public static getObserverPermissions(): Permissions {
    return Permissions.createWithContext(null, ServerPermissionChecker.OBSERVER_PERMISSIONS);
  }

  public static getOperatorPermissions(): Permissions {
    return Permissions.createWithContext(null, ServerPermissionChecker.OPERATOR_PERMISSIONS);
  }

  public static getManagerPermissions(): Permissions {
    return Permissions.createWithContext(null, ServerPermissionChecker.MANAGER_PERMISSIONS);
  }

  public static getEngineerPermissions(): Permissions {
    return Permissions.createWithContext(null, ServerPermissionChecker.ENGINEER_PERMISSIONS);
  }

  public static getAdminPermissions(): Permissions {
    return Permissions.createWithContext(null, ServerPermissionChecker.ADMIN_PERMISSIONS);
  }
}
