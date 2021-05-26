import CallerController from '../context/CallerController';
import Expression from '../expression/Expression';
import Event from '../data/Event';
import EventDefinition from '../context/EventDefinition';
export default interface ContextEventListener {
    /**
     * Should return true if event should be handled.
     */
    shouldHandle(ev: Event): boolean;
    /**
     * Handles the event
     */
    handle(event: Event, ed: EventDefinition): void;
    getCallerController(): CallerController | undefined;
    getListenerCode(): number | undefined;
    getFilter(): Expression | undefined;
    getFingerprint(): string | undefined;
    isAsync(): boolean;
}
