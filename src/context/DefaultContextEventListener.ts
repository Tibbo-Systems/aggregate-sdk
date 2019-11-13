import ContextEventListener from '../event/ContextEventListener';
import JObject from '../util/java/JObject';
import CallerController from './CallerController';
import Expression from '../expression/Expression';
import Event from '../data/Event';
import ContextManager from './ContextManager';
import Evaluator from '../expression/Evaluator';
import Reference from '../expression/Reference';
import EventEnvironmentResolver from './EventEnvironmentResolver';

export default abstract class DefaultContextEventListener extends JObject implements ContextEventListener {
  private callerController: CallerController | null;
  private contextManager: ContextManager<any> | null;

  private listenerCode: number | null;
  private filter: Expression | null;
  private acceptEventsWithoutListenerCode: boolean = false;

  private evaluator: Evaluator | null = null;
  private fingerprint: string | null;

  constructor(
    callerController: CallerController | null = null,
    contextManager: ContextManager<any> | null = null,
    listenerCode: number | null = null,
    filter: Expression | null = null,
    fingerprint: string | null = null
  ) {
    super();
    this.callerController = callerController;
    this.contextManager = contextManager;
    this.listenerCode = listenerCode;
    this.filter = filter;
    this.fingerprint = fingerprint;
  }

  getCallerController(): CallerController | null {
    return this.callerController;
  }

  getFilter(): Expression | null {
    return this.filter;
  }

  getFingerprint(): string | null {
    return this.fingerprint;
  }

  getListenerCode(): number | null {
    return this.listenerCode;
  }

  isAsync(): boolean {
    return false;
  }

  abstract handle(event: Event): void;

  shouldHandle(ev: Event): boolean {
    try {
      if (this.filter != null) {
        if (this.evaluator == null) {
          this.evaluator = new Evaluator(this.getLocalContextManager(), null, null, null);
        }

        this.prepareEvaluator(ev);

        if (!this.evaluator.evaluateToBoolean(this.filter)) {
          return false;
        }
      }

      if (this.listenerCode != null) {
        if (ev.getListener() != null && this.listenerCode !== ev.getListener()) {
          return false;
        }

        return ev.getListener() != null || this.acceptEventsWithoutListenerCode;
      } else {
        return ev.getListener() == null || this.acceptEventsWithoutListenerCode;
      }
    } finally {
      this.cleanEvaluator();
    }
  }

  /**
   * We need this since we've got issues with memory consumption because listener's evaluator was hardly referring some large DataTables after handling an event
   */
  private cleanEvaluator(): void {
    if (this.evaluator != null) {
      this.evaluator.getDefaultResolver().setDefaultTable(null);
      this.evaluator.getDefaultResolver().setCallerController(null);
      this.evaluator.setResolver(Reference.SCHEMA_ENVIRONMENT, null);
    }
  }

  private prepareEvaluator(ev: Event): void {
    const evaluator = this.evaluator as Evaluator;
    let resolver: EventEnvironmentResolver = new EventEnvironmentResolver(evaluator.getEnvironmentResolver(), ev);

    evaluator.setResolver(Reference.SCHEMA_ENVIRONMENT, resolver);
    evaluator.getDefaultResolver().setDefaultTable(ev.getData());
    evaluator.getDefaultResolver().setCallerController(this.getCallerController());
  }

  public getLocalContextManager(): ContextManager<any> | null {
    return this.contextManager;
  }

  public setCallerController(callerController: CallerController) {
    this.callerController = callerController;
  }

  public setAcceptEventsWithoutListenerCode(acceptEventsWithoutListenerCode: boolean) {
    this.acceptEventsWithoutListenerCode = acceptEventsWithoutListenerCode;
  }

  public setFilter(filter: Expression) {
    this.filter = filter;
  }

  public setFingerprint(fingerprint: string) {
    this.fingerprint = fingerprint;
  }

  public setContextManager(contextManager: ContextManager<any>): void {
    this.contextManager = contextManager;
    if (this.evaluator != null) {
      this.evaluator.getDefaultResolver().setContextManager(contextManager);
    }
  }
}
