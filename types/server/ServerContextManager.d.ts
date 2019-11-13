import ServerContext from './ServerContext';
import ContextManager from '../context/ContextManager';
import EntityRelatedActionDescriptor from '../action/EntityRelatedActionDescriptor';
import PermissionChecker from '../security/PermissionChecker';
export default interface ServerContextManager extends ContextManager<ServerContext> {
    addVariableAction(action: EntityRelatedActionDescriptor): void;
    addEventAction(action: EntityRelatedActionDescriptor): void;
    getVariableActions(): Array<EntityRelatedActionDescriptor>;
    getEventActions(): Array<EntityRelatedActionDescriptor>;
    getPermissionChecker(): PermissionChecker;
}
