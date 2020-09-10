import PermissionChecker from './PermissionChecker';
import ContextManager from '../context/ContextManager';
import EntityDefinition from '../context/EntityDefinition';
import Context from '../context/Context';
import CallerController from '../context/CallerController';
import Permissions from './Permissions';
import PermissionType from './PermissionType';
export default class DefaultPermissionChecker implements PermissionChecker {
    static readonly NULL_PERMISSIONS: string;
    private permissionTypes;
    canActivate(has: Permissions, need: Permissions, cm: ContextManager<any>): string;
    canSee(perms: Permissions, context: string, cm: ContextManager<any> | null): boolean;
    getLevel(permissions: Permissions, accessedContext: string, accessedEntityType: number, accessedEntity: string, accessedEntityGroup: string, cm: ContextManager<any>): string;
    getPermissionLevels(): Map<string, string>;
    protected setPermissionTypes(perms: Array<PermissionType>): void;
    has(requiredPermissions: Permissions, accessedContext: Context<any, any>, accessedEntityDefinition: EntityDefinition, caller?: CallerController): boolean;
    isValid(permissionLevel: string | null): boolean;
    static getNullPermissions(): Permissions;
}
