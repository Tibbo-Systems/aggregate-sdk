import ContextEventListener from '../event/ContextEventListener';
import JObject from '../util/java/JObject';
import CallerController from './CallerController';
import Expression from '../expression/Expression';
import Event from '../data/Event';
import ContextManager from './ContextManager';
export default abstract class DefaultContextEventListener extends JObject implements ContextEventListener {
    private callerController;
    private contextManager;
    private listenerCode;
    private filter;
    private acceptEventsWithoutListenerCode;
    private evaluator;
    private fingerprint;
    constructor(callerController?: CallerController | null, contextManager?: ContextManager<any> | null, listenerCode?: number | null, filter?: Expression | null, fingerprint?: string | null);
    getCallerController(): CallerController | null;
    getFilter(): Expression | null;
    getFingerprint(): string | null;
    getListenerCode(): number | null;
    isAsync(): boolean;
    abstract handle(event: Event): void;
    shouldHandle(ev: Event): boolean;
    /**
     * We need this since we've got issues with memory consumption because listener's evaluator was hardly referring some large DataTables after handling an event
     */
    private cleanEvaluator;
    private prepareEvaluator;
    getLocalContextManager(): ContextManager<any> | null;
    setCallerController(callerController: CallerController): void;
    setAcceptEventsWithoutListenerCode(acceptEventsWithoutListenerCode: boolean): void;
    setFilter(filter: Expression): void;
    setFingerprint(fingerprint: string): void;
    setContextManager(contextManager: ContextManager<any>): void;
}
