import PermissionChecker from './PermissionChecker';
import ContextManager from '../context/ContextManager';
import EntityDefinition from '../context/EntityDefinition';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import Permissions from './Permissions';
import PermissionType from './PermissionType';

//TODO not implemented yet
export default class DefaultPermissionChecker implements PermissionChecker {
  public static readonly NULL_PERMISSIONS: string = '';

  private permissionTypes = new Array<PermissionType>();

  canActivate(has: Permissions, need: Permissions, cm: ContextManager<any>): string {
    return '';
  }

  canSee(perms: Permissions, context: string, cm: ContextManager<any> | null): boolean {
    return false;
  }

  getLevel(permissions: Permissions, accessedContext: string, accessedEntityType: number, accessedEntity: string, accessedEntityGroup: string, cm: ContextManager<any>): string {
    return '';
  }

  getPermissionLevels(): Map<string, string> {
    const pm = new Map<string, string>();
    this.permissionTypes.forEach((p) => pm.set(p.name, p.description));
    return pm;
  }

  protected setPermissionTypes(perms: Array<PermissionType>): void {
    this.permissionTypes = perms;
  }

  has(requiredPermissions: Permissions, accessedContext: Context<any, any>, accessedEntityDefinition: EntityDefinition, caller?: CallerController): boolean {
    return false;
  }

  isValid(permissionLevel: string | null): boolean {
    return false;
  }

  public static getNullPermissions(): Permissions {
    return new Permissions();
  }
}
