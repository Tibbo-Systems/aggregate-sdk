import ContextEventListener from '../event/ContextEventListener';
import JObject from '../util/java/JObject';
import CallerController from './CallerController';
import Expression from '../expression/Expression';
import Event from '../data/Event';
import ContextManager from './ContextManager';
import EventDefinition from './EventDefinition';
export default abstract class DefaultContextEventListener extends JObject implements ContextEventListener {
    private callerController?;
    private contextManager?;
    private listenerCode?;
    private filter?;
    private acceptEventsWithoutListenerCode;
    private evaluator;
    private fingerprint?;
    constructor(callerController?: CallerController, contextManager?: ContextManager<any>, listenerCode?: number, filter?: Expression, fingerprint?: string);
    getCallerController(): CallerController | undefined;
    getFilter(): Expression | undefined;
    getFingerprint(): string | undefined;
    getListenerCode(): number | undefined;
    isAsync(): boolean;
    abstract handle(event: Event, ed: EventDefinition): void;
    shouldHandle(ev: Event): boolean;
    /**
     * We need this since we've got issues with memory consumption because listener's evaluator was hardly referring some large DataTables after handling an event
     */
    private cleanEvaluator;
    private prepareEvaluator;
    getLocalContextManager(): ContextManager<any> | undefined;
    setCallerController(callerController: CallerController): void;
    setAcceptEventsWithoutListenerCode(acceptEventsWithoutListenerCode: boolean): void;
    setFilter(filter: Expression): void;
    setFingerprint(fingerprint: string): void;
    setContextManager(contextManager: ContextManager<any>): void;
}
