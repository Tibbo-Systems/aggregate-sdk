/**
 * The <code>PermissionChecker</code> is responsible for granting/denying access of various callers to different contexts.
 */
import CallerController from '../context/CallerController';
import Context from '../context/Context';
import EntityDefinition from '../context/EntityDefinition';
import ContextManager from '../context/ContextManager';
import Permissions from './Permissions';
export default interface PermissionChecker {
    /**
     * Returns a map of all permission levels supported by the checker. Each level is defined by a name string and description string.
     */
    getPermissionLevels(): Map<string, string>;
    /**
     * Returns true if permission level {@code permissionLevel} is supported by the checker.
     */
    isValid(permissionLevel: string | null): boolean;
    /**
     * Returns true if {@code caller} is allowed to access an entity those permissions are {@code requiredPermissions}.
     */
    has(caller: CallerController | null, requiredPermissions: Permissions | null, accessedContext: Context<any, any>, accessedEntityDefinition: EntityDefinition | null): boolean;
    /**
     * Returns the effective permission level of the calling party (those permissions are identified by {@code permissions}) for the entity.
     */
    getLevel(permissions: Permissions, accessedContext: string, accessedEntityType: number, accessedEntity: string, accessedEntityGroup: string, cm: ContextManager<any>): string;
    /**
     * Returns true if the calling party (those permissions are identified by {@code perms}) can see {@code context} among children of its parent context because it has non-null permissions for one or
     * more direct/nested children of {@code context}.
     */
    canSee(perms: Permissions | null, context: string, cm: ContextManager<any> | null): boolean;
    /**
     * Checks whether the calling party (those permissions are identified by {@code has}) can set permissions of some other party to {@code need}.
     */
    canActivate(has: Permissions, need: Permissions, cm: ContextManager<any>): string;
}
