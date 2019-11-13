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
import ContextEventListener from '../event/ContextEventListener';
import FireEventRequestController from '../event/FireEventRequestController';
import DefaultContextVisitor from './DefaultContextVisitor';
import Permissions from '../security/Permissions';
import DefaultContextEventListener from './DefaultContextEventListener';

/**
 * Context interface is used to provide a unified way to access any object in AggreGate. It may be some server object (e.g. alert or event filters storage), hardware device or widget component. When
 * server contexts are accessed remotely, so-called proxy contexts are created for operating server-side objects through the same interface.
 */
export default interface Context<C extends Context<any, any>, M extends ContextManager<any>> {
  /**
   * This method is called after the context has been added to a context tree and it became aware of its full path. Note, that default implementation of this method in AbstractContext calls tree
   * methods: setupPermissions(), setupMyself() and setupChildren(). These methods should provide initialization logic in inherited classes instead of overridden setup() method.
   *
   * @param contextManager
   *          ContextManager heading current context tree
   */
  setup(contextManager: M | null): void;

  /**
   * This method is called when the context is being removed from context tree..
   *
   * @param contextManager
   *          ContextManager heading current context tree
   */
  teardown(): void;

  /**
   * This method should return true if the context has already been initialized and setupMyself() finished execution. Its default implementation in AbstractContext should not be overridden.
   *
   * @return true if setupMyself() has already been completed.
   */
  isSetupComplete(): boolean;

  /**
   * This method should return true if the context status has already been initialized.
   *
   * @return true if basic context status has been initialized.
   */

  isInitializedStatus(): boolean;

  /**
   * This method should return true if the context has already been initialized its basic information (description, type, etc).
   *
   * @return true if basic context information has been initialized.
   */
  isInitializedInfo(): boolean;

  /**
   * This method should return true if the context has already been initialized its children.
   *
   * @return true if context children have been initialized.
   */
  isInitializedChildren(): boolean;

  /**
   * This method should return true if the context has already been initialized its variables.
   *
   * @return true if context variables have been initialized.
   */
  isInitializedVariables(): boolean;

  /**
   * This method should return true if the context has already been initialized its functions.
   *
   * @return true if context functions have been initialized.
   */
  isInitializedFunctions(): boolean;

  /**
   * This method should return true if the context has already been initialized its events.
   *
   * @return true if context events have been initialized.
   */
  isInitializedEvents(): boolean;

  /**
   * This method is called when context tree is being started after its initialization. All contexts in the tree should be available at the moment of call.
   */
  start(): void;

  /**
   * This method is called when context tree is being stopped before its de-initialization. All contexts in the tree should be available at the moment of call.
   */
  stop(): void;

  /**
   * Returns true if context was started but not yet stopped.
   */
  isStarted(): boolean;

  /**
   * Returns context name.
   */
  getName(): string;

  /**
   * Returns context path (full name).
   */
  getPath(): string;

  /**
   * Returns path of the root context. In distributed environment, returns path of the root context in remote (mounted) subtree.
   */
  getLocalRoot(withParent: boolean): string | null;

  /**
   * In distributed environment, returns path of the context on the server immediately connected to current server (current server's peer).
   */
  getPeerPath(): string;

  /**
   * When a certain context subtree from one server is connected to another server, this method will return the remote path of this subtree's root context. If current context doesn't have a remote
   * peer, this method returns null.
   */
  getPeerRoot(): string | null;

  /**
   * In distributed environment, returns path of the context on the server where it's actually defined.
   */
  getRemotePath(): string | null;

  /**
   * Returns path of remote server's root context within a distributed connection.
   */
  getRemoteRoot(): string | null;

  /**
   * In distributed environment, returns path of the primary mount context in local tree.
   */
  getLocalPrimaryRoot(): string | null;

  /**
   * Returns true if context is a remote context's proxy.
   */
  isProxy(): boolean;

  /**
   * Returns true if context has a remote peer in the distributed architecture.
   */
  isDistributed(): boolean;

  /**
   * Returns context detailed description that includes description and path.
   */
  toDetailedString(): string;

  /**
   * Returns context description.
   */
  getDescription(): string | null;

  /**
   * Returns context type.
   */
  getType(): string | null;

  /**
   * Returns context group name of NULL if context does not belong to a group.
   */
  getGroup(): string | null;

  /**
   * Returns context comparison index or NULL if index is not defined.
   */
  getIndex(): number | null;

  /**
   * Returns context icon ID.
   */
  getIconId(): string | null;

  /**
   * Returns context status or null if status is not enabled;
   */
  getStatus(): ContextStatus | null;

  /**
   * Returns context manager those context tree contains this context.
   */
  getContextManager(): M | null;

  /**
   * Returns list of children contexts that are accessible by the specified <code>CallerController</code>.
   */
  getChildren(caller: CallerController | null): Array<Context<C, M>>;

  /**
   * Returns list of visible children contexts.
   */
  getVisibleChildren(caller: CallerController | null): Array<Context<C, M>>;

  /**
   * Returns true if context's visible children are mapped (e.g. for group and aggregation contexts).
   */
  isMapped(): boolean;

  /**
   * Returns list of mapped children contexts.
   */
  getMappedChildren(caller: CallerController | null): Array<Context<C, M>>;

  /**
   * Returns root context of the context tree containing this context.
   */
  getRoot(): Context<C, M>;

  /**
   * Returns context with the selected path.
   *
   * <code>path</code> argument may be absolute of relative to this context.
   *
   * Note: if this Context is a part of distributed context tree and path argument is not relative, the method will return local context matching its remote "peer" with given path. To get the local
   */
  get(path: string | null, caller: CallerController | null): Context<C, M> | null;

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
  getChild(name: string, caller: CallerController | null): Context<C, M> | null;

  /**
   * Adds new child to the current context.
   */
  addChild(child: Context<C, M>, index: number | null): void;

  /**
   * Removes child with specified name.
   */
  removeChild(child: string | Context<C, M>): void;

  /**
   * Permanently destroys child of current context.
   */
  destroyChild(child: Context<C, M>, moving: boolean): void;

  /**
   * Permanently destroys this context.
   */
  destroy(moving: boolean): void;

  /**
   * Prepare context to update.
   */
  updatePrepare(): void;

  /**
   * Moves and/or renames the context.
   */
  move(newParent: Context<C, M>, newName: string): void;

  setParent(parent: Context<C, M> | null): void;

  /**
   * Returns parent of this context.
   */
  getParent(): Context<C, M> | null;

  /**
   * Returns true if parentContext is a parent of this context or some of its parents.
   */
  hasParent(parentContext: Context<C, M>): boolean;

  /**
   * Adds variable definition to this context.
   */
  addVariableDefinition(def: VariableDefinition): void;

  /**
   * Removes variable definition from this context.
   */
  removeVariableDefinition(name: string): void;

  /**
   * Returns data of variable with specified name.
   */
  getVariableData(name: string): VariableData;

  /**
   * Returns definition of variable with specified name if it's accessible by caller controller.
   */
  getVariableDefinition(name: string, caller: CallerController | null): VariableDefinition | null;

  /**
   * Returns list of variables belonging to <code>group</code> that are available for specified <code>CallerController</code>.
   */
  getVariableDefinitionsByGroup(group: string, caller: CallerController | null): Array<VariableDefinition>;

  /**
   * Returns list of variables.
   */
  getVariableDefinitions(caller: CallerController | null, includeHidden: boolean): Array<VariableDefinition>;

  /**
   * Adds function definition to this context.
   */
  addFunctionDefinition(def: FunctionDefinition): void;

  /**
   * Removes function definition from this context.
   */
  removeFunctionDefinition(name: string): void;

  /**
   * Returns data of function with specified name.
   */
  getFunctionData(name: string): FunctionData;

  /**
   * Returns definition of function with specified name if it's accessible by caller controller.
   */
  getFunctionDefinition(name: string, caller: CallerController | null): FunctionDefinition | null;

  /**
   * Returns list of functions belonging to <code>group</code> that are available for specified <code>CallerController</code>.
   */
  getFunctionDefinitionsByGroup(group: string, caller: CallerController): Array<FunctionDefinition>;

  /**
   * Returns list of functions.
   */
  getFunctionDefinitions(caller: CallerController | null, includeHidden: boolean): Array<FunctionDefinition>;

  /**
   * Adds event definition to this context.
   */
  addEventDefinition(def: EventDefinition): void;

  /**
   * Removes event definition from this context.
   */
  removeEventDefinition(name: string): void;

  /**
   * Returns definition of event with specified name if it's accessible by caller controller.
   */
  getEventDefinition(name: string, caller: CallerController | null): EventDefinition | null;

  /**
   * Returns <code>EventData</code> of event with specified name.
   */
  getEventData(name: string): EventData;

  /**
   * Returns list of events belonging to <code>group</code> that are available for specified <code>CallerController</code>.
   */
  getEventDefinitionsByGroup(group: string, caller: CallerController | null): Array<EventDefinition>;

  /**
   * Returns list of events.
   */
  getEventDefinitions(caller: CallerController | null, includeHidden: boolean): Array<EventDefinition>;

  /**
   * Gets variable from context and returns its value. The value is immutable and will generate {@link IllegalStateException} on every change.
   */
  getVariable(name: string, caller: CallerController | null, request: RequestController | null): Promise<DataTable>;

  /**
   * Gets variable from context and returns its value. The value is mutable. Method has lower performance comparing to 'getVariable'.
   */
  getVariableClone(name: string, caller: CallerController): Promise<DataTable>;

  /**
   * Returns value of variable as bean or list of beans.
   */
  getVariableObject(name: string, caller: CallerController): Promise<any>;

  /**
   * Sets context variable to specified <code>value</code>.
   */
  setVariable(
    name: string,
    value: DataTable,
    caller: CallerController | null,
    request: RequestController | null
  ): Promise<void>;

  loadContext(): Promise<Context<C, M>>;

  /**
   * Gets variable, updates field value in the specified record, and sets variable.
   */
  setVariableField(variable: string, field: string, record: number, value: any, cc: CallerController): Promise<boolean>;

  /**
   * Executes context function with specified <code>parameters</code> and returns its output.
   */
  callFunction(
    name: string,
    parameters: DataTable | Array<any> | null,
    caller: CallerController | null,
    request: RequestController | null
  ): Promise<DataTable>;

  /**
   * Fires context event.
   *
   * @return Event object or null if event was suppressed by context.
   */
  fireEvent(
    name: string,
    data: DataTable | null,
    caller: CallerController,
    level: number,
    id: number | null,
    creationtime: Date | null,
    listener: number | null,
    request: FireEventRequestController | null
  ): Event | null;

  /**
   * Add a new action definition to the context.
   *
   * @param def
   *          ActionDefinition to add
   */
  addActionDefinition(def: ActionDefinition): void;

  /**
   * Remove an action definition from the context.
   *
   * @param name
   *          Name of action to remove
   */
  removeActionDefinition(name: string): void;

  /**
   * Returns action definition by name.
   *
   * @param name
   *          Name of action
   * @param caller
   *          Caller controller
   */
  getActionDefinition(name: string, caller?: CallerController): ActionDefinition | null;

  /**
   * Returns default action definition or NULL if there is no default action or it's not available to the caller.
   *
   * @param caller
   *          Caller controller
   */
  getDefaultActionDefinition(caller: CallerController): ActionDefinition | null;

  getActionDefinitions(caller: CallerController | null, includeHidden: boolean): Array<ActionDefinition>;

  /**
   * Returns context permissions.
   */
  getPermissions(): Permissions;

  /**
   * Returns permissions required to access children of this context.
   */
  getChildrenViewPermissions(): Permissions;

  /**
   * Adds listener of event with specified name. This method allows to add auto-cleaned listeners by setting weak flag to true.
   */
  addEventListener(name: string, listener: DefaultContextEventListener, weak: boolean): boolean;

  /**
   * Removes listener of event with specified name.
   */
  removeEventListener(name: string, listener: DefaultContextEventListener): boolean;

  /**
   * Returns in-memory event history.
   */
  getEventHistory(name: string): Array<Event>;

  /**
   * Accepts context visitor, i.e. calls visitor.visit(this).
   */
  accept(visitor: DefaultContextVisitor): void;
}
