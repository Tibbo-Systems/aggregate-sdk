import EntityGroupMember from './EntityGroupMember';
import DataTable from '../../datatable/DataTable';
import Context from '../../context/Context';
export default interface Operation extends EntityGroupMember {
    /**
     * Name of the operation which plays like unique operation id inside an operation container. For example contexts that have operations check their uniqueness by name.
     */
    getName(): string;
    /**
     * User visible operation name. This string is shown in context menus, taskpanes, etc.
     */
    getDescription(): string;
    /**
     * Detailed description of an operation. This string is shown in tooltips, etc.
     */
    getHelp(): string;
    /**
     * ResourceManager identifier of the operation icon.
     */
    getIconId(): string;
    /**
     * Action group.
     */
    getGroup(): string;
    /**
     * Execution group is used to group actions when doing batch operations. Batch operation is the operation performed on two or more objects simultaneously. When a user selects more than one objects
     * he should see only operations that are applicable for all this objects.
     */
    getExecutionGroup(): number;
    /**
     * Returns whether the action is the context's default one.
     */
    isDefault(): boolean;
    /**
     * Returns whether the operation is available for execution right now. Operations may check their availability themselves or using some external procedure like events.
     */
    isEnabled(): boolean;
    getDefaultParameters(): DataTable | null;
    checkAvailability(): void;
    execute(params?: DataTable): void;
    /**
     * Interrupts this operation without server-side action notification. Should be invoked in case of server context destruction for example.
     */
    interrupt(): void;
    getContext(): Context<any, any>;
    getInvokerContext(): Context<any, any>;
}
