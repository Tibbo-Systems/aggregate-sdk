import DataTable from '../datatable/DataTable';
import ActionDefinition from '../action/ActionDefinition';
import ServerActionInput from '../action/ServerActionInput';
import ActionExecutionMode from '../action/ActionExecutionMode';
import ActionIdentifier from '../action/ActionIdentifier';
import EntityDefinition from '../context/EntityDefinition';
import Context from '../context/Context';
import VariableDefinition from '../context/VariableDefinition';
import CallerController from '../context/CallerController';
import GroupContext from './GroupContext';
import ServerContextManager from './ServerContextManager';
export default interface ServerContext extends Context<any, ServerContextManager> {
    /**
     * Add new visible child to the context.
     *
     * @param path
     *          Full name of the context to add as visible child of the current one.
     */
    addVisibleChild(path: string): void;
    /**
     * Remove visible child from the context.
     *
     * @param path
     *          Full name of the visible child to remove.
     */
    removeVisibleChild(path: string): void;
    get(path: string | null, caller?: CallerController): ServerContext | null;
    /**
     * Returns true if the context has a visible child with specified path.
     *
     * @param path
     *          Path to check.
     */
    hasVisibleChild(path: string): boolean;
    /**
     * Returns default value of the variable. If it's not directly specified in the variable definition, an empty data table in the variable's format is created and returned.
     *
     * @param vd
     *          Definition of the variable those default value to return
     * @return Default value of the variable
     */
    getDefaultValue(vd: VariableDefinition): DataTable;
    /**
     * Permanently deletes variable value from the database. This method should be used only before variable definition is going to be removed from the context.
     *
     * @param name
     *          Name of variable those value should be removed.
     */
    removeVariableValue(name: string): void;
    initAction(def: ActionDefinition, actionInput: ServerActionInput, mode: ActionExecutionMode, caller: CallerController): ActionIdentifier;
    checkPermissions(needPermissions: Permissions, caller: CallerController, accessedContext: Context<any, any>, accessedEntityDefinition: EntityDefinition): boolean;
    getMembers(includeSubgroups: boolean, cc: CallerController): Array<string>;
    getMembers(includeSubgroups: boolean, detectNestedLoop: boolean, cc: CallerController): Array<string>;
    addedToGroup(groupContext: GroupContext<any, any>, caller: CallerController): void;
    removedFromGroup(groupContext: GroupContext<any, any>, caller: CallerController): void;
    getGroups(): Array<GroupContext<any, any>>;
    alertActivated(alert: Event, type: number): void;
    alertDeactivated(alert: Event): void;
    shouldBeHidden(callerController: CallerController): boolean;
    setIndex(index: number): void;
    createDefaultStatisticsChannels(vd: VariableDefinition): void;
    getShortDescription(): string;
    eventAcknowledged(ev: Event, date: Date, author: string, comment: string): void;
}
