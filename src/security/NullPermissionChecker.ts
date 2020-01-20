import PermissionChecker from './PermissionChecker';
import ContextManager from '../context/ContextManager';
import EntityDefinition from '../context/EntityDefinition';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import DefaultPermissionChecker from './DefaultPermissionChecker';
import Permissions from './Permissions';

export default class NullPermissionChecker implements PermissionChecker {
  canActivate(has: Permissions, need: Permissions, cm: ContextManager<any>): string {
    return '';
  }

  canSee(perms: Permissions, context: string, cm: ContextManager<any> | null): boolean {
    return false;
  }

  getLevel(permissions: Permissions, accessedContext: string, accessedEntityType: number, accessedEntity: string, accessedEntityGroup: string, cm: ContextManager<any>): string {
    return DefaultPermissionChecker.NULL_PERMISSIONS;
  }

  getPermissionLevels(): Map<string, string> {
    return new Map();
  }

  has(caller: CallerController | null, requiredPermissions: Permissions, accessedContext: Context<any, any>, accessedEntityDefinition: EntityDefinition): boolean {
    return true;
  }

  isValid(permissionLevel: string): boolean {
    return true;
  }
}
