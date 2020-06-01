import ContextManager from './ContextManager';
import CallerController from './CallerController';
import VariableDefinition from './VariableDefinition';
import FunctionDefinition from './FunctionDefinition';
import EventDefinition from './EventDefinition';
import DataTable from '../datatable/DataTable';
import ActionDefinition from '../action/ActionDefinition';
import ContextStatus from './ContextStatus';
import VariableData from './VariableData';
import FunctionData from './FunctionData';
import EventData from './EventData';
import RequestController from './RequestController';
import Event from '../data/Event';
import FireEventRequestController from '../event/FireEventRequestController';
import DefaultContextVisitor from './DefaultContextVisitor';
import Permissions from '../security/Permissions';
import DefaultContextEventListener from './DefaultContextEventListener';
import JObject from '../util/java/JObject';
/**
 * Context interface is used to provide a unified way to access any object in AggreGate. It may be some server object (e.g. alert or event filters storage), hardware device or widget component. When
 * server contexts are accessed remotely, so-called proxy contexts are created for operating server-side objects through the same interface.
 */
export default abstract class Context<C extends Context<any, any>, M extends ContextManager<any>> extends JObject {
    /**
     * This method is called after the context has been added to a context tree and it became aware of its full path. Note, that default implementation of this method in AbstractContext calls tree
     * methods: setupPermissions(), setupMyself() and setupChildren(). These methods should provide initialization logic in inherited classes instead of overridden setup() method.
     *
     * @param contextManager
     *          ContextManager heading current context tree
     */
    abstract setup(contextManager: M | null): void;
    /**
     * This method is called when the context is being removed from context tree..
     *
     * @param contextManager
     *          ContextManager heading current context tree
     */
    abstract teardown(): void;
    /**
     * This method should return true if the context has already been initialized and setupMyself() finished execution. Its default implementation in AbstractContext should not be overridden.
     *
     * @return true if setupMyself() has already been completed.
     */
    abstract isSetupComplete(): boolean;
    /**
     * This method should return true if the context status has already been initialized.
     *
     * @return true if basic context status has been initialized.
     */
    abstract isInitializedStatus(): boolean;
    /**
     * This method should return true if the context has already been initialized its basic information (description, type, etc).
     *
     * @return true if basic context information has been initialized.
     */
    abstract isInitializedInfo(): boolean;
    /**
     * This method should return true if the context has already been initialized its children.
     *
     * @return true if context children have been initialized.
     */
    abstract isInitializedChildren(): boolean;
    /**
     * This method should return true if the context has already been initialized its variables.
     *
     * @return true if context variables have been initialized.
     */
    abstract isInitializedVariables(): boolean;
    /**
     * This method should return true if the context has already been initialized its functions.
     *
     * @return true if context functions have been initialized.
     */
    abstract isInitializedFunctions(): boolean;
    /**
     * This method should return true if the context has already been initialized its events.
     *
     * @return true if context events have been initialized.
     */
    abstract isInitializedEvents(): boolean;
    /**
     * This method is called when context tree is being started after its initialization. All contexts in the tree should be available at the moment of call.
     */
    abstract start(): void;
    /**
     * This method is called when context tree is being stopped before its de-initialization. All contexts in the tree should be available at the moment of call.
     */
    abstract stop(): void;
    /**
     * Returns true if context was started but not yet stopped.
     */
    abstract isStarted(): boolean;
    /**
     * Returns context name.
     */
    abstract getName(): string;
    /**
     * Returns context path (full name).
     */
    abstract getPath(): string;
    /**
     * Returns path of the root context. In distributed environment, returns path of the root context in remote (mounted) subtree.
     */
    abstract getLocalRoot(withParent: boolean): string | null;
    /**
     * In distributed environment, returns path of the context on the server immediately connected to current server (current server's peer).
     */
    abstract getPeerPath(): string;
    /**
     * When a certain context subtree from one server is connected to another server, this method will return the remote path of this subtree's root context. If current context doesn't have a remote
     * peer, this method returns null.
     */
    abstract getPeerRoot(): string | null;
    /**
     * In distributed environment, returns path of the context on the server where it's actually defined.
     */
    abstract getRemotePath(): string | null;
    /**
     * Returns path of remote server's root context within a distributed connection.
     */
    abstract getRemoteRoot(): string | null;
    /**
     * In distributed environment, returns path of the primary mount context in local tree.
     */
    abstract getLocalPrimaryRoot(): string | null;
    /**
     * Returns true if context is a remote context's proxy.
     */
    abstract isProxy(): boolean;
    /**
     * Returns true if context has a remote peer in the distributed architecture.
     */
    abstract isDistributed(): boolean;
    /**
     * Returns context detailed description that includes description and path.
     */
    abstract toDetailedString(): string;
    /**
     * Returns context description.
     */
    abstract getDescription(): string | null;
    /**
     * Returns context type.
     */
    abstract getType(): string | null;
    /**
     * Returns context group name of NULL if context does not belong to a group.
     */
    abstract getGroup(): string | null;
    /**
     * Returns context comparison index or NULL if index is not defined.
     */
    abstract getIndex(): number | null;
    /**
     * Returns context icon ID.
     */
    abstract getIconId(): string | null;
    /**
     * Returns context status or null if status is not enabled;
     */
    abstract getStatus(): ContextStatus | null;
    /**
     * Returns context manager those context tree contains this context.
     */
    abstract getContextManager(): M | null;
    /**
     * Returns list of children contexts that are accessible by the specified <code>CallerController</code>.
     */
    abstract getChildren(caller?: CallerController): Array<Context<C, M>>;
    /**
     * Returns list of visible children contexts.
     */
    abstract getVisibleChildren(caller?: CallerController): Array<Context<C, M>>;
    /**
     * Returns true if context's visible children are mapped (e.g. for group and aggregation contexts).
     */
    abstract isMapped(): boolean;
    /**
     * Returns list of mapped children contexts.
     */
    abstract getMappedChildren(caller?: CallerController): Array<Context<C, M>>;
    /**
     * Returns root context of the context tree containing this context.
     */
    abstract getRoot(): Context<C, M>;
    /**
     * Returns context with the selected path.
     *
     * <code>path</code> argument may be absolute of relative to this context.
     *
     * Note: if this Context is a part of distributed context tree and path argument is not relative, the method will return local context matching its remote "peer" with given path. To get the local
     */
    abstract get(path: string | null, caller?: CallerController): Context<C, M> | null;
    /**
     * Returns child of this context with the specified name.
     *
     * <code>path</code> argument may be absolute of relative to this context.
     *
     * Note: if this Context is a part of distributed context tree and path argument is not relative, the method will return local context matching its remote "peer" with given path. To get the local
     * context with the given path, use {@link ContextManager#get(String, CallerController)} instead.
     *
     * This method uses provided <code>CallerController</code> for permission checking.
     */
    abstract getChild(name: string, caller?: CallerController): Context<C, M> | null;
    /**
     * Adds new child to the current context.
     */
    abstract addChild(child: Context<C, M>, index: number | null): void;
    /**
     * Removes child with specified name.
     */
    abstract removeChild(child: string | Context<C, M>): void;
    /**
     * Permanently destroys child of current context.
     */
    abstract destroyChild(child: Context<C, M>, moving: boolean): void;
    /**
     * Permanently destroys this context.
     */
    abstract destroy(moving: boolean): void;
    /**
     * Prepare context to update.
     */
    abstract updatePrepare(): void;
    /**
     * Moves and/or renames the context.
     */
    abstract move(newParent: Context<C, M>, newName: string): void;
    abstract setParent(parent: Context<C, M> | null): void;
    /**
     * Returns parent of this context.
     */
    abstract getParent(): Context<C, M> | null;
    /**
     * Returns true if parentContext is a parent of this context or some of its parents.
     */
    abstract hasParent(parentContext: Context<C, M>): boolean;
    /**
     * Adds variable definition to this context.
     */
    abstract addVariableDefinition(def: VariableDefinition): void;
    /**
     * Removes variable definition from this context.
     */
    abstract removeVariableDefinition(name: string): void;
    /**
     * Returns data of variable with specified name.
     */
    abstract getVariableData(name: string): VariableData;
    /**
     * Returns definition of variable with specified name if it's accessible by caller controller.
     */
    abstract getVariableDefinition(name: string, caller?: CallerController): VariableDefinition | null;
    /**
     * Returns list of variables belonging to <code>group</code> that are available for specified <code>CallerController</code>.
     */
    abstract getVariableDefinitionsByGroup(group: string, caller?: CallerController): Array<VariableDefinition>;
    /**
     * Returns list of variables.
     */
    abstract getVariableDefinitions(includeHidden: boolean, caller?: CallerController): Array<VariableDefinition>;
    /**
     * Adds function definition to this context.
     */
    abstract addFunctionDefinition(def: FunctionDefinition): void;
    /**
     * Removes function definition from this context.
     */
    abstract removeFunctionDefinition(name: string): void;
    /**
     * Returns data of function with specified name.
     */
    abstract getFunctionData(name: string): FunctionData;
    /**
     * Returns definition of function with specified name if it's accessible by caller controller.
     */
    abstract getFunctionDefinition(name: string, caller?: CallerController): FunctionDefinition | null;
    /**
     * Returns list of functions belonging to <code>group</code> that are available for specified <code>CallerController</code>.
     */
    abstract getFunctionDefinitionsByGroup(group: string, caller?: CallerController): Array<FunctionDefinition>;
    /**
     * Returns list of functions.
     */
    abstract getFunctionDefinitions(includeHidden: boolean, caller?: CallerController): Array<FunctionDefinition>;
    /**
     * Adds event definition to this context.
     */
    abstract addEventDefinition(def: EventDefinition): void;
    /**
     * Removes event definition from this context.
     */
    abstract removeEventDefinition(name: string): void;
    /**
     * Returns definition of event with specified name if it's accessible by caller controller.
     */
    abstract getEventDefinition(name: string, caller?: CallerController): EventDefinition | null;
    /**
     * Returns <code>EventData</code> of event with specified name.
     */
    abstract getEventData(name: string): EventData;
    /**
     * Returns list of events belonging to <code>group</code> that are available for specified <code>CallerController</code>.
     */
    abstract getEventDefinitionsByGroup(group: string, caller?: CallerController): Array<EventDefinition>;
    /**
     * Returns list of events.
     */
    abstract getEventDefinitions(includeHidden: boolean, caller?: CallerController): Array<EventDefinition>;
    /**
     * Gets variable from context and returns its value. The value is immutable and will generate {@link IllegalStateException} on every change.
     */
    abstract getVariable(name: string, caller?: CallerController, request?: RequestController): Promise<DataTable>;
    /**
     * Gets variable from context and returns its value. The value is mutable. Method has lower performance comparing to 'getVariable'.
     */
    abstract getVariableClone(name: string, caller?: CallerController): Promise<DataTable>;
    /**
     * Returns value of variable as bean or list of beans.
     */
    abstract getVariableObject(name: string, caller?: CallerController): Promise<any>;
    /**
     * Sets context variable to specified <code>value</code>.
     */
    abstract setVariable(name: string, value: DataTable, caller?: CallerController | null, request?: RequestController | null): Promise<void>;
    abstract loadContext(): Promise<Context<C, M>>;
    /**
     * Gets variable, updates field value in the specified record, and sets variable.
     */
    abstract setVariableField(variable: string, field: string, record: number, value: any, cc?: CallerController): Promise<boolean>;
    /**
     * Executes context function with specified <code>parameters</code> and returns its output.
     */
    abstract callFunction(name: string, parameters: DataTable | Array<any> | null, caller?: CallerController, request?: RequestController): Promise<DataTable>;
    /**
     * Fires context event.
     *
     * @return Event object or null if event was suppressed by context.
     */
    abstract fireEvent(name: string, data: DataTable | null, level: number, id: number | null, creationtime: Date | null, listener: number | null, caller?: CallerController, request?: FireEventRequestController): Event | null;
    /**
     * Add a new action definition to the context.
     *
     * @param def
     *          ActionDefinition to add
     */
    abstract addActionDefinition(def: ActionDefinition): void;
    /**
     * Remove an action definition from the context.
     *
     * @param name
     *          Name of action to remove
     */
    abstract removeActionDefinition(name: string): void;
    /**
     * Returns action definition by name.
     *
     * @param name
     *          Name of action
     * @param caller
     *          Caller controller
     */
    abstract getActionDefinition(name: string, caller?: CallerController): ActionDefinition | null;
    /**
     * Returns default action definition or NULL if there is no default action or it's not available to the caller.
     *
     * @param caller
     *          Caller controller
     */
    abstract getDefaultActionDefinition(caller: CallerController): ActionDefinition | null;
    abstract getActionDefinitions(includeHidden: boolean, caller?: CallerController): Array<ActionDefinition>;
    /**
     * Returns context permissions.
     */
    abstract getPermissions(): Permissions;
    /**
     * Returns permissions required to access children of this context.
     */
    abstract getChildrenViewPermissions(): Permissions;
    /**
     * Adds listener of event with specified name. This method allows to add auto-cleaned listeners by setting weak flag to true.
     */
    abstract addEventListener(name: string, listener: DefaultContextEventListener, weak: boolean): boolean;
    /**
     * Removes listener of event with specified name.
     */
    abstract removeEventListener(name: string, listener: DefaultContextEventListener): boolean;
    /**
     * Returns in-memory event history.
     */
    abstract getEventHistory(name: string): Array<Event>;
    /**
     * Accepts context visitor, i.e. calls visitor.visit(this).
     */
    abstract accept(visitor: DefaultContextVisitor): void;
}
