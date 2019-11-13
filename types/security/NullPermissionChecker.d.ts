import PermissionChecker from './PermissionChecker';
import ContextManager from '../context/ContextManager';
import EntityDefinition from '../context/EntityDefinition';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import Permissions from './Permissions';
export default class NullPermissionChecker implements PermissionChecker {
    canActivate(has: Permissions, need: Permissions, cm: ContextManager<any>): string;
    canSee(perms: Permissions, context: string, cm: ContextManager<any> | null): boolean;
    getLevel(permissions: Permissions, accessedContext: string, accessedEntityType: number, accessedEntity: string, accessedEntityGroup: string, cm: ContextManager<any>): string;
    getPermissionLevels(): Map<string, string>;
    has(caller: CallerController | null, requiredPermissions: Permissions, accessedContext: Context<any, any>, accessedEntityDefinition: EntityDefinition): boolean;
    isValid(permissionLevel: string): boolean;
}
