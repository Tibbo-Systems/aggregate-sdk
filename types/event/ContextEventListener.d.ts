import CallerController from '../context/CallerController';
import Expression from '../expression/Expression';
import Event from '../data/Event';
export default interface ContextEventListener {
    /**
     * Should return true if event should be handled.
     */
    shouldHandle(ev: Event): boolean;
    /**
     * Handles the event
     */
    handle(event: Event): void;
    getCallerController(): CallerController | null;
    getListenerCode(): number | null;
    getFilter(): Expression | null;
    getFingerprint(): string | null;
    isAsync(): boolean;
}
