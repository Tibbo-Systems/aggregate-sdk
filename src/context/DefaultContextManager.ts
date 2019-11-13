import Context from './Context';
import ContextManager from './ContextManager';
import JObject from '../util/java/JObject';
import CallerController from './CallerController';
import UncheckedCallerController from './UncheckedCallerController';
import EventDispatcher from './EventDispatcher';
import ContextEventListenerSet from '../event/ContextEventListenerSet';
import JConstants from '../util/java/JConstants';
import EventDefinition from './EventDefinition';
import FunctionDefinition from './FunctionDefinition';
import EventData from './EventData';
import FireEventRequestController from '../event/FireEventRequestController';
import VariableDefinition from './VariableDefinition';
import EventUtils from '../event/EventUtils';
import DefaultContextEventListener from './DefaultContextEventListener';
import ContextUtils from './ContextUtils';
import Event from '../data/Event';
import DefaultContextVisitor from './DefaultContextVisitor';
import QueuedEvent from './QueuedEvent';
import Log from '../Log';

export default class DefaultContextManager<T extends Context<any, any>> extends JObject implements ContextManager<T> {
  private async: boolean = false;

  private rootContext: T | null = null;

  private readonly callerController: CallerController = new UncheckedCallerController();

  private eventDispatcher: EventDispatcher | null = null;
  private eventDispatcherOwner: boolean = true;

  private readonly eventListeners: Map<string, Map<string, ContextEventListenerSet>> = new Map<
    string,
    Map<string, ContextEventListenerSet>
  >();

  private readonly maskListeners: Map<string, Map<string, ContextEventListenerSet>> = new Map<
    string,
    Map<string, ContextEventListenerSet>
  >();

  private started: boolean = false;

  constructor(
    async: boolean,
    eventQueueLength: number = JConstants.INTEGER_MAX_VALUE,
    concurrentDispatcherCount: number | null = null,
    eventDispatcher: EventDispatcher | null = null
  ) {
    super();
    this.async = async;
    if (eventDispatcher != null) {
      this.eventDispatcher = eventDispatcher;
      this.eventDispatcherOwner = false;
    }

    if (async) {
      this.ensureDispatcher(eventQueueLength, concurrentDispatcherCount);
    }
  }

  isStarted(): boolean {
    return this.started;
  }

  start(): void {
    if (this.async && this.eventDispatcherOwner) {
      this.ensureDispatcher(JConstants.INTEGER_MAX_VALUE, null);
      // this.eventDispatcher.start();
    }
    if (this.rootContext != null) {
      this.rootContext.start();
    }
    this.started = true;
  }

  restart(): void {
    this.stop();
    this.start();
  }

  stop(): void {
    this.started = false;
    if (this.eventDispatcher != null && this.eventDispatcherOwner) {
      //     this.eventDispatcher.interrupt();
      this.eventDispatcher = null;
    }
    if (this.rootContext != null) {
      this.rootContext.stop();
    }
  }

  getRoot(): T | null {
    return this.rootContext;
  }

  public setRoot(newRoot: T): void {
    this.rootContext = newRoot;
    this.rootContext.setup(this);
    this.contextAdded(newRoot);
  }

  get(contextName: string, caller: CallerController | null = null): T | null {
    let root: T | null = this.getRoot();
    return root != null ? (root.get(contextName, caller) as T) : null;
  }

  private addEventListener(
    context: string,
    event: string,
    listener: DefaultContextEventListener,
    mask: boolean,
    weak: boolean
  ): void {
    // Distributed: ok, because remote events will be redirected to this server
    let con = this.get(context, listener.getCallerController());

    if (con != null) {
      let events: Array<EventDefinition> = EventUtils.getEvents(con, event, listener.getCallerController());

      for (let ed of events) {
        this.addListenerToContext(con, ed.getName(), listener, mask, weak);
      }
    } else {
      if (!mask) {
        let eel: ContextEventListenerSet = this.getListeners(context, event);

        if (!eel.contains(listener)) {
          eel.addListener(listener, weak);
        }
      }
    }
  }

  protected addListenerToContext(
    con: T,
    event: string,
    listener: DefaultContextEventListener,
    mask: boolean,
    weak: boolean
  ): void {
    let ed: EventDefinition | null = con.getEventDefinition(event, listener.getCallerController());
    if (ed != null) {
      con.addEventListener(event, listener, weak);
    }
  }

  private removeEventListener(
    context: string,
    event: string,
    listener: DefaultContextEventListener,
    mask: boolean
  ): void {
    let con: T | null = this.get(context, listener.getCallerController());

    if (con != null) {
      if (con.getEventDefinition(event, null) != null) {
        this.removeListenerFromContext(con, event, listener, mask);
      }
    } else {
      if (!mask) {
        let eel: ContextEventListenerSet = this.getListeners(context, event);

        if (eel != null) {
          eel.removeListener(listener);
        }
      }
    }
  }

  protected removeListenerFromContext(
    con: T,
    event: string,
    listener: DefaultContextEventListener,
    mask: boolean
  ): void {
    con.removeEventListener(event, listener);
  }

  addMaskEventListener(
    mask: string,
    event: string,
    listener: DefaultContextEventListener,
    weak: boolean = false
  ): void {
    let contexts: Array<string> = ContextUtils.expandMaskToPaths(mask, this, listener.getCallerController(), false);

    for (let con of contexts) {
      this.addEventListener(con, event, listener, true, weak);
    }

    let listeners: ContextEventListenerSet = this.getMaskListeners(mask, event);

    listeners.addListener(listener, weak);
  }

  removeMaskEventListener(mask: string, event: string, listener: DefaultContextEventListener): void {
    let contexts: Array<Context<any, any>> = ContextUtils.expandMaskToContexts(
      mask,
      this,
      listener.getCallerController()
    );

    for (let con of contexts) {
      if (!con.isInitializedEvents()) {
        continue;
      }

      let events: Array<EventDefinition> = EventUtils.getEvents(con, event, listener.getCallerController());

      for (let ed of events) {
        this.removeEventListener(con.getPath(), ed.getName(), listener, true);
      }
    }

    let listeners: ContextEventListenerSet = this.getMaskListeners(mask, event);

    listeners.removeListener(listener);
  }

  protected getListeners(context: string, event: string): ContextEventListenerSet {
    let cel: Map<String, ContextEventListenerSet> = this.getContextListeners(context);

    let cels = cel.get(event);

    if (!cels) {
      cels = new ContextEventListenerSet(this);
      //@ts-ignore
      cel.set(event, cels);
    }
    //@ts-ignore
    return cels;
  }

  private getContextListeners(context: string): Map<string, ContextEventListenerSet> {
    let cel = this.eventListeners.get(context);

    if (!cel) {
      cel = new Map<string, ContextEventListenerSet>();
      this.eventListeners.set(context, cel);
    }

    return cel;
  }

  private getMaskListeners(mask: string, event: string): ContextEventListenerSet {
    let cel: Map<string, ContextEventListenerSet> = this.getContextMaskListeners(mask);

    let eel = cel.get(event);

    if (!eel) {
      eel = new ContextEventListenerSet(this);
      //@ts-ignore
      cel.set(event, eel);
    }
    //@ts-ignore
    return eel;
  }

  private getContextMaskListeners(mask: string): Map<string, ContextEventListenerSet> {
    let cel = this.maskListeners.get(mask);
    if (!cel) {
      cel = new Map<string, ContextEventListenerSet>();
      this.maskListeners.set(mask, cel);
    }
    return cel;
  }

  contextAdded(con: T): void {
    let cel = this.eventListeners.get(con.getPath());

    if (cel) {
      for (let event of cel.keys()) {
        let cels: ContextEventListenerSet = cel.get(event) as ContextEventListenerSet;
        for (let celi of cels.getListenersInfo()) {
          if (con.getEventData(event) != null) {
            con.addEventListener(event, celi.getListener(), celi.isWeak());
          }
        }
      }
    }
    for (let mask of this.maskListeners.keys()) {
      if (ContextUtils.matchesToMask(mask, con.getPath())) {
        this.addMaskListenerToContext(mask, con);
      }
    }
  }

  public getMaskListenersMasks(): Set<string> {
    return new Set<string>(this.maskListeners.keys());
  }

  public addMaskListenerToContext(mask: string, con: T): void {
    let mcel: Map<string, ContextEventListenerSet> = this.getContextMaskListeners(mask);

    if (ContextUtils.matchesToMask(mask, con.getPath())) {
      for (let event of mcel.keys()) {
        let listeners: ContextEventListenerSet = mcel.get(event) as ContextEventListenerSet;

        for (let li of listeners.getListenersInfo()) {
          let events: Array<EventDefinition> = EventUtils.getEvents(con, event, li.getListener().getCallerController());

          for (let ed of events) {
            this.addListenerToContext(con, ed.getName(), li.getListener(), true, li.isWeak());
          }
        }
      }
    }
  }

  contextRemoved(con: T): void {
    let _this = this;
    con.accept(
      new (class Visitor extends DefaultContextVisitor {
        visit(vc: Context<any, any>): void {
          for (let mask of _this.maskListeners.keys()) {
            if (ContextUtils.matchesToMask(mask, vc.getPath())) {
              let contextMaskListeners = _this.getContextMaskListeners(mask);

              let contextMaskListenersCopy: Map<string, ContextEventListenerSet>;

              contextMaskListenersCopy = new Map<string, ContextEventListenerSet>(contextMaskListeners);

              for (let event of contextMaskListenersCopy.keys()) {
                let cels: ContextEventListenerSet = _this.getMaskListeners(mask, event);
                for (let li of cels.getListenersInfo()) {
                  let events: Array<EventDefinition> = EventUtils.getEvents(
                    vc,
                    event,
                    li.getListener().getCallerController()
                  );

                  for (let ed of events) {
                    vc.removeEventListener(ed.getName(), li.getListener());
                  }
                }
              }
            }
          }
        }
      })()
    );

    con.accept(
      new (class Visitor extends DefaultContextVisitor {
        visit(vc: Context<any, any>): void {
          let cel: Map<string, ContextEventListenerSet> = _this.getContextListeners(vc.getPath());
          const eventDefinitions: Array<EventDefinition> = vc.getEventDefinitions(_this.callerController, false);
          for (let ed of eventDefinitions) {
            let edata: EventData = vc.getEventData(ed.getName());
            let listeners = cel.get(ed.getName());
            if (listeners) {
              for (let celi of edata.getListenersInfo()) {
                listeners.addListener(celi.getListener(), celi.isWeak());
              }
            }
          }
        }
      })()
    );
  }

  contextInfoChanged(con: T): void {}

  eventAdded(con: T, ed: EventDefinition): void {
    for (let mask of this.maskListeners.keys()) {
      if (ContextUtils.matchesToMask(mask, con.getPath())) {
        let cel: Map<string, ContextEventListenerSet> = this.getContextMaskListeners(mask);

        for (let event of cel.keys()) {
          if (EventUtils.matchesToMask(event, ed)) {
            let listeners = cel.get(event) as ContextEventListenerSet;

            for (let li of listeners.getListenersInfo()) {
              this.addListenerToContext(con, ed.getName(), li.getListener(), true, li.isWeak());
            }
          }
        }
      }
    }
  }

  eventRemoved(con: T, ed: EventDefinition): void {}

  functionAdded(con: T, fd: FunctionDefinition): void {}

  functionRemoved(con: T, fd: FunctionDefinition): void {}

  getCallerController(): CallerController {
    return this.callerController;
  }

  getEventQueueLength(): number {
    return this.eventDispatcher != null ? this.eventDispatcher.getQueueLength() : 0;
  }

  getEventQueueStatistics(): Map<string, number> {
    //@ts-ignore
    return this.eventDispatcher.getEventQueueStatistics();
  }

  getEventsProcessed(): number {
    return this.eventDispatcher != null ? this.eventDispatcher.getEventsProcessed() : 0;
  }

  getEventsScheduled(): number {
    return 0;
  }

  queue(ed: EventData, ev: Event, request: FireEventRequestController | null): void {
    let dispatcher: EventDispatcher | null = this.eventDispatcher;

    if (dispatcher != null) {
      dispatcher.registerIncomingEvent();
    }

    if (!this.async || ed.getDefinition().getConcurrency() == EventDefinition.CONCURRENCY_SYNCHRONOUS) {
      ed.dispatch(ev);
      if (dispatcher != null) {
        dispatcher.registerProcessedEvent();
      }
    } else {
      let qe = new QueuedEvent(ed, ev);

      try {
        //@ts-ignore
        dispatcher.queue(qe, request);
      } catch (ex1) {
        Log.CONTEXT_EVENTS.debug('Interrupted while queueing event: ' + ev);
      }
    }
  }

  variableAdded(con: T, vd: VariableDefinition): void {}

  variableRemoved(con: T, vd: VariableDefinition): void {}

  private ensureDispatcher(eventQueueLength: number, concurrentDispatcherCount: number | null) {
    if (this.eventDispatcher == null) {
      this.eventDispatcher = new EventDispatcher(eventQueueLength, concurrentDispatcherCount);
    }
  }

  initialize(): void {}
}
