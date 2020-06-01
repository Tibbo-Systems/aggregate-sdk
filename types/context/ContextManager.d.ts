import Context from './Context';
import CallerController from './CallerController';
import ContextEventListener from '../event/ContextEventListener';
import VariableDefinition from './VariableDefinition';
import FunctionDefinition from './FunctionDefinition';
import EventDefinition from './EventDefinition';
import EventData from './EventData';
import FireEventRequestController from '../event/FireEventRequestController';
import Event from '../data/Event';
export default interface ContextManager<T extends Context<any, any>> {
    /**
     * Returns true if context manager startup was completed
     * @return {boolean}
     */
    isStarted(): boolean;
    /**
     * Starts event dispatcher thread
     */
    start(): void;
    /**
     * Calls stop() and then start()
     */
    restart(): void;
    /**
     * 1. Stops the event dispatcher<br>
     * 2. Calls stop() of root context
     */
    stop(): void;
    /**
     * Get root context.
     *
     * @return {*} Root context of the managed context tree
     */
    getRoot(): T | null;
    /**
     * Get specified context using specified CallerController for permission checking.
     *
     * Note: getting contexts via context manager should not be used in distributed environment. Use {@link Context#get(String, CallerController)} method of a "reference" context instead to ensure
     * proper paths conversion.
     *
     * @param {*} caller
     * CallerController used for permission checking
     * @param {string} contextName
     * Context full name
     * @return {*} Requested context or null if this context not exist or not available with current permissions
     */
    get(contextName: string, caller?: CallerController): T | null;
    /**
     * Adds event listener to specified event to every context satisfying context mask.
     * @param {string} mask
     * @param {string} event
     * @param {*} listener
     * @param {boolean} weak
     */
    addMaskEventListener(mask: string, event: string, listener: ContextEventListener, weak: boolean): void;
    /**
     * Removes event listener of event 'event' from every context satisfying event mask.
     * @param {string} mask
     * @param {string} event
     * @param {*} listener
     */
    removeMaskEventListener(mask: string, event: string, listener: ContextEventListener): void;
    /**
     * Called when new context is added to the context manager
     * @param {*} con
     */
    contextAdded(con: T): void;
    /**
     * Called when context is removed from the context manager
     * @param {*} con
     */
    contextRemoved(con: T): void;
    /**
     * Called when context basic info is changed
     * @param {*} con
     */
    contextInfoChanged(con: T): void;
    /**
     * Called when new variable definition is added to a context
     * @param {*} con
     * @param {com.tibbo.aggregate.common.context.VariableDefinition} vd
     */
    variableAdded(con: T, vd: VariableDefinition): void;
    /**
     * Called when variable definition is removed from a context
     * @param {*} con
     * @param {com.tibbo.aggregate.common.context.VariableDefinition} vd
     */
    variableRemoved(con: T, vd: VariableDefinition): void;
    /**
     * Called when new function definition is added to a context
     * @param {*} con
     * @param {com.tibbo.aggregate.common.context.FunctionDefinition} fd
     */
    functionAdded(con: T, fd: FunctionDefinition): void;
    /**
     * Called when function definition is removed from a context
     * @param {*} con
     * @param {com.tibbo.aggregate.common.context.FunctionDefinition} fd
     */
    functionRemoved(con: T, fd: FunctionDefinition): void;
    /**
     * Called when new event definition is added to a context
     * @param {*} con
     * @param {com.tibbo.aggregate.common.context.EventDefinition} ed
     */
    eventAdded(con: T, ed: EventDefinition): void;
    /**
     * Called when event definition is removed from a context
     * @param {*} con
     * @param {com.tibbo.aggregate.common.context.EventDefinition} ed
     */
    eventRemoved(con: T, ed: EventDefinition): void;
    /**
     * Called when event if fired in one of the contexts in the tree
     * @param {com.tibbo.aggregate.common.context.EventData} ed
     * @param {com.tibbo.aggregate.common.data.Event} ev
     * @param {com.tibbo.aggregate.common.event.FireEventRequestController} request
     */
    queue(ed: EventData, ev: Event, request?: FireEventRequestController): void;
    /**
     * Returns caller controller used by context manager for internal operations. This controller is unsafe since it doesn't perform any permission checking.
     * @return {*}
     */
    getCallerController(): CallerController;
    /**
     * Returns current length of event queue.
     * @return {number}
     */
    getEventQueueLength(): number;
    /**
     * Returns number of events received since server start.
     * @return {number}
     */
    getEventsScheduled(): number;
    /**
     * Returns number of events processed since server start.
     * @return {number}
     */
    getEventsProcessed(): number;
    /**
     * Returns pending event count per context
     * @return {*}
     */
    getEventQueueStatistics(): Map<string, number>;
    initialize(): void;
}
