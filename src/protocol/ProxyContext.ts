import Context from '../context/Context';
import ContextManager from '../context/ContextManager';
import AbstractContext from '../context/AbstractContext';
import DefaultContextEventListener from '../context/DefaultContextEventListener';
import Runnable from '../util/java/Runnable';
import AbstractAggreGateDeviceController from './AbstractAggreGateDeviceController';
import CachedVariableValue from './CachedVariableValue';
import ServerContextConstants from '../server/ServerContextConstants';
import Event from '../data/Event';
import BasicActionDefinition from '../action/BasicActionDefinition';
import FunctionDefinition from '../context/FunctionDefinition';
import TableFormat from '../datatable/TableFormat';
import CallerController from '../context/CallerController';
import StringBuilder from '../util/java/StringBuilder';
import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import DefaultContextVisitor from '../context/DefaultContextVisitor';
import DataTable from '../datatable/DataTable';
import ActionConstants from '../context/ActionConstants';
import Log from '../Log';
import ContextUtils from '../context/ContextUtils';
import VariableDefinition from '../context/VariableDefinition';
import EventData from '../context/EventData';
import ActionDefinition from '../action/ActionDefinition';
import EventDefinition from '../context/EventDefinition';
import ContextStatus from '../context/ContextStatus';
import IncomingAggreGateCommand from './IncomingAggreGateCommand';
import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import RequestController from '../context/RequestController';
import DataTableFactory from '../datatable/DataTableFactory';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import FireEventRequestController from '../event/FireEventRequestController';
import Permissions from '../security/Permissions';
import Contexts from '../context/Contexts';
import Util from '../util/Util';
import AggreGateDevice from './AggreGateDevice';
import LevelAdapter from '../util/logger/LevelAdapter';

export default class ProxyContext<C extends Context<C, M>, M extends ContextManager<any>> extends AbstractContext<C, M> {
  private static readonly DEFERRED_TASKS: Map<string, Array<Runnable>> = new Map<string, Array<Runnable>>();

  private static readonly METADATA_READ_TIMEOUT = 120000;

  private static readonly LISTENER_OPERATIONS_TIMEOUT = 120000;

  public static readonly DURABLE_OPERATIONS_TIMEOUT = 600000;

  public static readonly F_LOCAL_REINITIALIZE = 'localReinitialize';

  private readonly controller: AbstractAggreGateDeviceController<AggreGateDevice, M>;

  private notManageRemoteListeners = false;

  private localInitComplete = false;

  private initializingInfo = false;

  private initializedInfo = false;

  private initializingChildren = false;

  private initializedChildren = false;

  private initializingVariables = false;

  private initializedVariables = false;

  private initializingFunctions = false;

  private initializedFunctions = false;

  private initializingEvents = false;

  private initializedEvents = false;

  private initializingContext = false;

  private initializedContext = false;

  private initializingActions = false;

  private initializedActions = false;

  private initializingStatus = false;

  private initializedStatus = false;

  private initializingVisibleChildren = false;

  private visibleChildren: Array<string> | null = null;

  private localRoot: string | null = null;

  private peerRoot: string | null = null;

  private peerPrimaryRoot: string | null = null;

  private remoteRoot: string | null = null;

  private remotePath: string | null = null;

  private mapped = false;

  private variableCache: Map<string, CachedVariableValue> = new Map<string, CachedVariableValue>();

  private loadingContext: Promise<Context<any, any>> | null = null;

  private static initProxyContext = false;
  private static AUTO_LISTENED_EVENTS: Array<string> = new Array<string>();

  static staticInitializerProxyContext() {
    if (ProxyContext.initProxyContext) return;
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_CHILD_ADDED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_CHILD_REMOVED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_VARIABLE_ADDED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_VARIABLE_REMOVED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_FUNCTION_ADDED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_FUNCTION_REMOVED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_EVENT_ADDED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_EVENT_REMOVED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_INFO_CHANGED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_DESTROYED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_ACTION_ADDED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_ACTION_REMOVED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(AbstractContext.E_ACTION_STATE_CHANGED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(ServerContextConstants.E_VISIBLE_INFO_CHANGED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(ServerContextConstants.E_VISIBLE_CHILD_ADDED);
    ProxyContext.AUTO_LISTENED_EVENTS.push(ServerContextConstants.E_VISIBLE_CHILD_REMOVED);
    ProxyContext.initProxyContext = true;
  }

  constructor(name: string, controller: AbstractAggreGateDeviceController<AggreGateDevice, M>) {
    super(name);
    this.controller = controller;
    this.clear();
  }

  async loadContext(): Promise<Context<any, any>> {
    if (this.initializedContext) return this;

    let resolver: any;
    if (!this.loadingContext) {
      this.loadingContext = new Promise<Context<any, any>>((resolve) => {
        resolver = resolve;
      });
    }
    if (this.initializingContext) {
      return this.loadingContext;
    }

    this.initializingContext = true;
    //TODO  Promise.all should be used
    await this.initVariablesLoggingErrors();
    // await Promise.all([this.initActionsLoggingErrors(),this.initFunctionsLoggingErrors(),this.initEventsLoggingErrors()]);
    await this.initActionsLoggingErrors();
    await this.initFunctionsLoggingErrors();
    await this.initEventsLoggingErrors();

    await this.initChildren();
    await this.initStatusLoggingErrors();
    await this.initVisibleChildren();
    await this.initInfo();
    this.initializingContext = false;
    this.initializedContext = true;
    resolver(this);
    return this;
  }

  setupMyself(): void {
    super.setupMyself();

    this.setFireUpdateEvents(false);
    this.setPermissionCheckingEnabled(false);
    this.setChildrenSortingEnabled(false);
    this.addLocalFunctionDefinitions();

    const _this = this;

    this.addEventListener(
      ProxyContext.E_CHILD_ADDED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedChildren) {
            return;
          }
          const child = event.getData().rec().getString(ProxyContext.EF_CHILD_ADDED_CHILD);
          if (_this.getChild(child) == null) {
            const childProxy = _this.createChildContextProxy(child);
            _this.addChild(childProxy);
            _this.executeDeferredTasks(childProxy.getPath());
          }
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_CHILD_REMOVED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedChildren) {
            return;
          }
          const child = event.getData()?.rec().getString(ProxyContext.EF_CHILD_REMOVED_CHILD);
          if (child != null) {
            _this.removeChild(child);
          }
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_VARIABLE_ADDED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedVariables) {
            return;
          }

          const def = _this.varDefFromDataRecord(event.getData().rec(), null);
          const vd = _this.getVariableDefinition(def.getName());
          if (vd == null || !vd.equals(def)) {
            _this.addVariableDefinition(def);
          }
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_VARIABLE_REMOVED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedVariables) {
            return;
          }
          const data = event.getData();
          _this.removeVariableDefinition(data.rec().getString(ProxyContext.EF_VARIABLE_REMOVED_NAME));
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_FUNCTION_ADDED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedFunctions) {
            return;
          }
          const data = event.getData();
          const def = _this.funcDefFromDataRecord(data.rec(), null);
          const funcDef = _this.getFunctionDefinition(def.getName());
          if (funcDef == null || !funcDef.equals(def)) {
            _this.addFunctionDefinition(def);
          }
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_FUNCTION_REMOVED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedFunctions) {
            return;
          }
          const data = event.getData();
          _this.removeFunctionDefinition(data.rec().getString(ProxyContext.EF_FUNCTION_REMOVED_NAME));
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_EVENT_ADDED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedEvents) {
            return;
          }
          const data = event.getData();
          const def = _this.evtDefFromDataRecord(data.rec(), null);
          const eDef = _this.getEventDefinition(def.getName());
          if (eDef == null || !eDef.equals(def)) {
            _this.addEventDefinition(def);
          }
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_EVENT_REMOVED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedEvents) {
            return;
          }
          const data = event.getData();
          _this.removeEventDefinition(data.rec().getString(ProxyContext.EF_EVENT_REMOVED_NAME));
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_ACTION_ADDED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedActions) {
            return;
          }
          const data = event.getData();
          const def = _this.actDefFromDataRecord(data.rec());
          const actionDef = _this.getActionDefinition(def.getName());
          if (actionDef === null) _this.addActionDefinition(def);
          else if (!(actionDef as BasicActionDefinition).equals(def)) _this.addActionDefinition(def);
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_ACTION_REMOVED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedActions) {
            return;
          }
          const data = event.getData();
          _this.removeActionDefinition(data.rec().getString(ProxyContext.EF_EVENT_REMOVED_NAME));
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_ACTION_STATE_CHANGED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          if (!_this.initializedActions) {
            return;
          }
          const data = event.getData();
          const def = _this.actDefFromDataRecord(data.rec());
          _this.removeActionDefinition(def.getName());
          _this.addActionDefinition(def);
        }
      })()
    );

    this.addEventListener(
      ProxyContext.E_INFO_CHANGED,
      new (class extends DefaultContextEventListener {
        handle(event: Event): void {
          const data = event.getData();
          _this.initInfoImpl(data);
        }
      })()
    );
    this.localInitComplete = true;
  }

  protected addLocalFunctionDefinitions(): void {
    this.addFunctionDefinition(new FunctionDefinition(ProxyContext.F_LOCAL_REINITIALIZE, TableFormat.EMPTY_FORMAT, TableFormat.EMPTY_FORMAT));
  }

  private isDigitCode(char: string): boolean {
    const code = char.charCodeAt(0);
    const charCodeZero = '0'.charCodeAt(0);
    const charCodeNine = '9'.charCodeAt(0);
    return code >= charCodeZero && code <= charCodeNine;
  }

  protected decodeFormat(source: string, caller: CallerController | null): TableFormat | null {
    if (source == null) {
      return null;
    }
    const idSourceBuilder = new StringBuilder();

    let i;
    for (i = 0; i < source.length; i++) {
      const c = source.charAt(i);
      if (this.isDigitCode(c)) {
        idSourceBuilder.append(c);
      } else {
        break;
      }
    }

    source = source.substring(i);

    const idSource = idSourceBuilder.toString();

    const formatId = idSource.length > 0 ? Number.parseInt(idSource) : null;

    const format = source.length > 0 ? TableFormat.createWithFormatAndSettings(source, new ClassicEncodingSettings(false)) : null;

    if (formatId == null) {
      return format;
    } else {
      if (format == null) {
        const cached = this.controller.getFormatCache().get(formatId);

        if (cached == null) {
          throw new Error('Unknown format ID: ' + formatId);
        }

        return cached;
      } else {
        this.controller.getFormatCache().put(formatId, format);
        return format;
      }
    }
  }

  protected clear(): void {
    const _this = this;

    this.accept(
      new (class extends DefaultContextVisitor {
        public visit(context: Context<C, M>): void {
          _this.initializedInfo = false;
          _this.initializingInfo = false;

          _this.initializedChildren = false;
          _this.initializingChildren = false;

          _this.initializedVariables = false;
          _this.initializingVariables = false;

          _this.initializedFunctions = false;
          _this.initializingFunctions = false;

          _this.initializedEvents = false;
          _this.initializingEvents = false;

          _this.initializedActions = false;
          _this.initializingActions = false;

          _this.initializedStatus = false;
          _this.initializingStatus = false;

          _this.initializingVisibleChildren = false;
          _this.visibleChildren = null;
        }
      })()
    );
  }

  public async initInfo(): Promise<void> {
    if (this.initializedInfo) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }
    if (!this.localInitComplete || this.initializingInfo) {
      return;
    }

    this.initializingInfo = true;

    try {
      const value = await this.getRemoteVariable(ProxyContext.INFO_DEFINITION_FORMAT, ProxyContext.V_INFO, ProxyContext.METADATA_READ_TIMEOUT);
      this.initInfoImpl(value);
      this.initializedInfo = true;
    } finally {
      this.initializingInfo = false;
    }
  }

  public async initChildren(): Promise<void> {
    if (this.initializedChildren) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }

    if (!this.localInitComplete || this.initializingChildren) {
      return;
    }

    this.initializingChildren = true;

    try {
      const value = await this.getRemoteVariable(ProxyContext.VFT_CHILDREN, ProxyContext.V_CHILDREN, ProxyContext.METADATA_READ_TIMEOUT);
      this.initChildrenImpl(value);

      this.initializedChildren = true;
    } finally {
      this.initializingChildren = false;
    }
  }

  private async initVariables(): Promise<void> {
    if (this.initializedVariables) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }
    if (!this.localInitComplete || this.initializingVariables) {
      return;
    }

    this.initializingVariables = true;

    try {
      const value = await this.getRemoteVariable(ProxyContext.VARIABLE_DEFINITION_FORMAT, ProxyContext.V_VARIABLES, ProxyContext.METADATA_READ_TIMEOUT);

      await this.initVariablesImpl(value);
      this.initializedVariables = true;
    } finally {
      this.initializingVariables = false;
    }
  }

  private async initFunctions(): Promise<void> {
    if (this.initializedFunctions) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }
    if (!this.localInitComplete || this.initializingFunctions) {
      return;
    }

    this.initializingFunctions = true;

    try {
      const value = await this.getRemoteVariable(ProxyContext.FUNCTION_DEFINITION_FORMAT, ProxyContext.V_FUNCTIONS, ProxyContext.METADATA_READ_TIMEOUT);

      await this.initFunctionsImpl(value);
      this.initializedFunctions = true;
    } finally {
      this.initializingFunctions = false;
    }
  }

  private async initEvents(): Promise<void> {
    if (this.initializedEvents) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }

    if (!this.localInitComplete || this.initializingEvents) {
      return;
    }

    this.initializingEvents = true;

    try {
      const value = await this.getRemoteVariable(ProxyContext.EVENT_DEFINITION_FORMAT, ProxyContext.V_EVENTS, ProxyContext.METADATA_READ_TIMEOUT);

      await this.initEventsImpl(value);
      this.initializedEvents = true;
    } finally {
      this.initializingEvents = false;
    }
  }

  private async initActions(): Promise<void> {
    if (this.initializedActions) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }
    if (!this.localInitComplete || this.initializingActions) {
      return;
    }

    this.initializingActions = true;

    try {
      const value = await this.getRemoteVariable(ProxyContext.ACTION_DEF_FORMAT, AbstractContext.V_ACTIONS, ProxyContext.METADATA_READ_TIMEOUT);

      this.initActionsImpl(value);
      this.initializedActions = true;
    } catch (e) {
      Log.CONTEXT_ACTIONS.error(e.message);
    } finally {
      this.initializingActions = false;
    }
  }

  public async initVisibleChildren(): Promise<void> {
    if (this.visibleChildren != null) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }
    if (!this.localInitComplete || this.initializingVisibleChildren) {
      return;
    }

    try {
      this.initializingVisibleChildren = true;

      await this.initVisibleChildrenImpl();
    } finally {
      this.initializingVisibleChildren = false;
    }
  }

  private async initStatus(): Promise<void> {
    if (this.initializedStatus) {
      return;
    }
    const cm = this.controller.getContextManager();
    if (cm != null) {
      cm.initialize();
    }
    if (!this.localInitComplete || this.initializingStatus) {
      return;
    }

    try {
      this.initializingStatus = true;

      await this.initStatusImpl();

      this.initializedStatus = true;
    } finally {
      this.initializingStatus = false;
    }
  }

  private initInfoImpl(info: DataTable) {
    this.setDescription(this.convertRemoteDescription(info.rec().getString(ProxyContext.VF_INFO_DESCRIPTION)));
    this.setType(info.rec().getString(ProxyContext.VF_INFO_TYPE));

    if (info.getFormat().hasField(ProxyContext.VF_INFO_GROUP)) {
      this.setGroup(info.rec().getString(ProxyContext.VF_INFO_GROUP));
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_ICON)) {
      this.setIconId(info.rec().getString(ProxyContext.VF_INFO_ICON));
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_LOCAL_ROOT)) {
      this.localRoot = info.rec().getString(ProxyContext.VF_INFO_LOCAL_ROOT);
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_PEER_ROOT)) {
      this.peerRoot = info.rec().getString(ProxyContext.VF_INFO_PEER_ROOT);
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_PEER_PRIMARY_ROOT)) {
      this.peerPrimaryRoot = info.rec().getString(ProxyContext.VF_INFO_PEER_PRIMARY_ROOT);
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_REMOTE_ROOT)) {
      this.remoteRoot = info.rec().getString(ProxyContext.VF_INFO_REMOTE_ROOT);
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_REMOTE_PATH)) {
      this.remotePath = info.rec().getString(ProxyContext.VF_INFO_REMOTE_PATH);
    }

    if (info.getFormat().hasField(ProxyContext.VF_INFO_MAPPED) && info.rec().getBoolean(ProxyContext.VF_INFO_MAPPED) != null) {
      this.mapped = info.rec().getBoolean(ProxyContext.VF_INFO_MAPPED);
    }
  }

  protected convertRemoteDescription(remoteDescription: string): string {
    return remoteDescription;
  }

  private initChildrenImpl(children: DataTable): void {
    for (const child of this.getChildren(this.getContextManager()?.getCallerController())) {
      if (children.select(ProxyContext.VF_CHILDREN_NAME, child.getName()) == null) {
        this.removeChild(child);
      }
    }

    for (const rec of children) {
      const cn = rec.getString(ProxyContext.VF_CHILDREN_NAME);
      if (this.getChild(cn) == null) {
        this.addChild(this.createChildContextProxy(cn));
      }
    }
  }

  private async initVisibleChildrenImpl(): Promise<void> {
    this.visibleChildren = new Array<string>();

    const _this = this;

    this.addEventListener(
      ServerContextConstants.E_VISIBLE_CHILD_ADDED,
      new (class extends DefaultContextEventListener {
        public handle(event: Event): void {
          const path = event.getData().rec().getString(ServerContextConstants.EF_VISIBLE_CHILD_ADDED_PATH);
          if (_this.visibleChildren != null) {
            _this.addVisibleChild(path);
          }
        }
      })()
    );

    this.addEventListener(
      ServerContextConstants.E_VISIBLE_CHILD_REMOVED,
      new (class extends DefaultContextEventListener {
        public handle(event: Event): void {
          const path = event.getData().rec().getString(ServerContextConstants.EF_VISIBLE_CHILD_REMOVED_PATH);
          if (_this.visibleChildren != null) {
            _this.removeVisibleChild(path);
          }
        }
      })()
    );

    const visibleChildrenData = await this.getRemoteVariableByDef(this.getVariableDefinition(ServerContextConstants.V_VISIBLE_CHILDREN) as VariableDefinition);

    for (const rec of visibleChildrenData) {
      const localVisiblePath: string = this.getLocalVisiblePath(rec.getString(ServerContextConstants.VF_VISIBLE_CHILDREN_PATH));
      if (localVisiblePath != null) {
        this.visibleChildren.push(localVisiblePath);
      }
    }
  }

  protected createChildContextProxy(name: string): ProxyContext<C, M> {
    const proxy: ProxyContext<C, M> = new ProxyContext(name, this.controller);
    proxy.setNotManageRemoteListeners(this.isNotManageRemoteListeners());
    return proxy;
  }

  private async initVariablesImpl(variables: DataTable): Promise<void> {
    for (const def of this.getVariableDefinitions()) {
      if (variables.select(ProxyContext.FIELD_VD_NAME, def.getName()) == null) {
        this.removeVariableDefinition(def.getName());
      }
    }

    for (const rec of variables) {
      await this.loadFormatToCacheIfNeeded(rec.getString(AbstractContext.FIELD_VD_FORMAT));
      const def = this.varDefFromDataRecord(rec);
      const existing = this.getVariableDefinition(def.getName());
      if (existing == null || !existing.equals(def)) {
        if (existing != null) {
          this.removeVariableDefinition(existing.getName());
        }
        this.addVariableDefinition(def);
      }
    }
  }

  private async loadFormatToCacheIfNeeded(source: string | null): Promise<void> {
    if (source == null) {
      return;
    }
    for (let i = 0; i < source.length; i++) {
      const c = source.charAt(i);
      if (!this.isDigitCode(c)) {
        return;
      }
    }
    const id = Number.parseInt(source);
    if (Number.isInteger(id) && !this.controller.getFormatCache().hasFormat(id)) {
      await this.controller.getFormatCache().getFormatFromServer(id);
    }
  }

  private async initFunctionsImpl(functions: DataTable): Promise<void> {
    for (const def of this.getFunctionDefinitions()) {
      if (functions.select(ProxyContext.FIELD_FD_NAME, def.getName()) == null) {
        this.removeFunctionDefinition(def.getName());
      }
    }

    this.addLocalFunctionDefinitions();

    for (const rec of functions) {
      await this.loadFormatToCacheIfNeeded(rec.getString(AbstractContext.FIELD_FD_INPUTFORMAT));
      await this.loadFormatToCacheIfNeeded(rec.getString(AbstractContext.FIELD_FD_OUTPUTFORMAT));
      const def = this.funcDefFromDataRecord(rec);
      def.setConcurrent(true); // Concurrency is controlled by the server

      const existing = this.getFunctionDefinition(def.getName());
      if (existing == null || !existing.equals(def)) {
        if (existing != null) {
          this.removeFunctionDefinition(existing.getName());
        }
        this.addFunctionDefinition(def);
      }
    }
  }

  private async initEventsImpl(events: DataTable): Promise<void> {
    for (const def of this.getEventDefinitions()) {
      if (events.select(ProxyContext.FIELD_ED_NAME, def.getName()) == null) {
        this.removeEventDefinition(def.getName());
      }
    }

    for (const rec of events) {
      await this.loadFormatToCacheIfNeeded(rec.getString(AbstractContext.FIELD_ED_FORMAT));
      const def = this.evtDefFromDataRecord(rec);
      const existing = this.getEventDefinition(def.getName());
      if (existing == null || !existing.equals(def)) {
        if (existing != null) {
          this.removeEventDefinition(existing.getName());
        }
        this.addEventDefinition(def);
      }
    }
  }

  private initActionsImpl(actions: DataTable): void {
    for (const ad of this.getActionDefinitions()) {
      if (actions.select(ActionConstants.FIELD_AD_NAME, ad.getName()) == null) {
        this.removeActionDefinition(ad.getName());
      }
    }

    for (const rec of actions) {
      const def = this.actDefFromDataRecord(rec);
      const existing = this.getActionDefinition(def.getName());
      if (existing == null || !(existing as BasicActionDefinition).equals(def)) {
        if (existing != null) {
          this.removeActionDefinition(existing.getName());
        }
        this.addActionDefinition(def);
      }
    }
  }

  private async initStatusImpl(): Promise<void> {
    //TODO unnecessary in loadContext
    //await this.initVariables();

    const statusVariable = this.getVariableDefinition(ServerContextConstants.V_CONTEXT_STATUS);

    if (statusVariable == null) {
      return;
    }

    this.enableStatus();

    const _this = this;

    this.addEventListener(
      ServerContextConstants.E_CONTEXT_STATUS_CHANGED,
      new (class extends DefaultContextEventListener {
        public handle(event: Event): void {
          const statusRec = event.getData().rec();
          _this.setStatus(statusRec.getInt(ServerContextConstants.VF_CONTEXT_STATUS_STATUS), statusRec.getString(ServerContextConstants.VF_CONTEXT_STATUS_COMMENT));
        }
      })()
    );

    const contextStatus = await this.getRemoteVariableByDef(statusVariable);

    this.setStatus(contextStatus.rec().getInt(ServerContextConstants.VF_CONTEXT_STATUS_STATUS), contextStatus.rec().getString(ServerContextConstants.VF_CONTEXT_STATUS_COMMENT));
  }

  private checkInfo() {
    if (!this.initializedInfo) Log.CONTEXT_VARIABLES.debug('Error getting description of remote context');
  }

  getDescription(): string | null {
    this.checkInfo();
    return super.getDescription();
  }

  getType(): string | null {
    this.checkInfo();
    return super.getType();
  }

  getLocalRoot(withParent: boolean): string | null {
    this.checkInfo();
    return this.localRoot;
  }

  getRemoteRoot(): string | null {
    this.checkInfo();
    return this.remoteRoot;
  }

  getPeerRoot(): string | null {
    this.checkInfo();
    return this.peerRoot;
  }

  isMapped(): boolean {
    this.checkInfo();
    return this.mapped;
  }

  get(contextPath: string, caller?: CallerController): Context<C, M> | null {
    if (contextPath == null) {
      return null;
    }

    if (ContextUtils.isRelative(contextPath)) {
      return super.get(contextPath, caller);
    }

    const localPath = this.getLocalPath(contextPath, false);

    if (localPath == null) {
      return null;
    }
    return super.get(localPath, caller);
  }

  getIconId(): string | null {
    this.checkInfo();
    return super.getIconId();
  }

  getChild(name: string, caller?: CallerController): C | null {
    if (super.getChild(name, caller) == null) {
      if (!this.initializedChildren && this.localInitComplete && !this.initializingChildren) Log.CONTEXT_CHILDREN.warn('Error initializing children of remote context');
    }
    return super.getChild(name, caller);
  }

  getVariableDefinition(name: string, caller?: CallerController): VariableDefinition | null {
    const sup = super.getVariableDefinition(name);
    if (sup == null && this.isSetupComplete()) {
      //Promise
      // this.initVariablesLoggingErrors();
      return super.getVariableDefinition(name);
    } else {
      return sup;
    }
  }

  getFunctionDefinition(name: string, caller?: CallerController): FunctionDefinition | null {
    const sup = super.getFunctionDefinition(name);
    if (sup == null && this.isSetupComplete()) {
      //TODO promise
      //this.initFunctionsLoggingErrors();
      return super.getFunctionDefinition(name);
    } else {
      return sup;
    }
  }

  getEventData(name: string): EventData {
    const sup = super.getEventData(name);
    if (sup == null && this.isSetupComplete()) {
      //TODO promise
      //this.initEventsLoggingErrors();
      return super.getEventData(name);
    } else {
      return sup;
    }
  }

  getActionDefinition(name: string, caller?: CallerController): ActionDefinition | null {
    //TODO promise
    // this.initActionsLoggingErrors();
    return super.getActionDefinition(name, caller);
  }

  getVariableDefinitions(includeHidden = false, caller?: CallerController): Array<VariableDefinition> {
    //TODO Promise
    // this.initVariablesLoggingErrors();
    return super.getVariableDefinitions(includeHidden, caller);
  }

  getFunctionDefinitions(includeHidden = false, caller?: CallerController): Array<FunctionDefinition> {
    //TODO promise
    // this.initFunctionsLoggingErrors();
    return super.getFunctionDefinitions(includeHidden, caller);
  }

  getEventDefinitions(includeHidden = false, caller?: CallerController): Array<EventDefinition> {
    //TODO promise
    //this.initEventsLoggingErrors();
    return super.getEventDefinitions(includeHidden, caller);
  }

  getActionDefinitions(includeHidden = false, caller?: CallerController): Array<ActionDefinition> {
    //TODO promise
    //this.initActionsLoggingErrors();
    return super.getActionDefinitions(includeHidden, caller);
  }

  getStatus(): ContextStatus | null {
    //TODO promise
    //this.initStatusLoggingErrors();
    return super.getStatus();
  }

  public async initVariablesLoggingErrors(): Promise<void> {
    try {
      await this.initVariables();
    } catch (ex) {
      const message = "Error initializing variables of remote context '" + this.getPathDescription() + "': " + ex.message;
      Log.CONTEXT_VARIABLES.warn(message, ex);
      throw new Error(message);
    }
  }

  public async initFunctionsLoggingErrors(): Promise<void> {
    try {
      await this.initFunctions();
    } catch (ex) {
      const message = "Error initializing functions of remote context '" + this.getPathDescription() + "': " + ex.message;
      Log.CONTEXT_FUNCTIONS.warn(message, ex);
      throw new Error(message);
    }
  }

  public async initEventsLoggingErrors(): Promise<void> {
    try {
      await this.initEvents();
    } catch (ex) {
      const message = "Error initializing events of remote context '" + this.getPathDescription() + "': " + ex.message;
      Log.CONTEXT_EVENTS.warn(message, ex);
      throw new Error(message);
    }
  }

  public async initActionsLoggingErrors(): Promise<void> {
    try {
      await this.initActions();
    } catch (ex) {
      const message = "Error initializing actions of remote context'" + this.getPathDescription() + "': " + ex.mesasge;
      Log.CONTEXT_ACTIONS.warn(message, ex);
      throw new Error(message);
    }
  }

  public async initStatusLoggingErrors(): Promise<void> {
    try {
      await this.initStatus();
    } catch (ex) {
      const message = "Error initializing status of remote context'" + this.getPathDescription() + "': " + ex.mesasge;
      Log.CONTEXT.warn(message, ex);
      throw new Error(message);
    }
  }

  private async sendGetVariable(name: string, timeout: number | null): Promise<IncomingAggreGateCommand | null> {
    const cmd: OutgoingAggreGateCommand = this.controller.getCommandBuilder().getVariableOperation(this.getPeerPath(), name);
    cmd.setTimeout(timeout);
    return await this.controller.sendCommandAndCheckReplyCode(cmd);
  }

  async getRemoteVariable(format: TableFormat, name: string, timeout: number): Promise<DataTable> {
    const reply = await this.sendGetVariable(name, timeout);
    if (reply == null) throw new Error("Error parsing variable '" + name);
    const encodedReply = reply.getEncodedDataTableFromReply();
    try {
      return this.controller.decodeRemoteDataTable(format, encodedReply);
    } catch (ex) {
      throw new Error("Error parsing encoded data table '" + encodedReply + "': " + ex.message);
    }
  }

  public getController(): AbstractAggreGateDeviceController<AggreGateDevice, M> {
    return this.controller;
  }

  protected setupVariables(): void {
    //TODO promise
    // this.initVariables();
    super.setupVariables();
  }

  protected async getVariableImpl(def: VariableDefinition, caller?: CallerController, request?: RequestController): Promise<DataTable | null> {
    //TODO promise
    return await this.getRemoteVariableByDef(def);
  }

  private async getRemoteVariableByDef(def: VariableDefinition): Promise<DataTable> {
    try {
      let cleanup = false;

      if (def.getRemoteCacheTime() != null) {
        const ref = this.variableCache.get(def.getName());
        if (ref) {
          const cachedValue: CachedVariableValue = ref;
          if (cachedValue != null) {
            if (Date.now() - cachedValue.getTimestamp().getTime() < def.getRemoteCacheTime()) {
              return cachedValue.getValue();
            } else {
              cleanup = true;
            }
          } else {
            cleanup = true;
          }
        }

        if (cleanup) {
          this.variableCache.delete(def.getName());
        }
      }

      const ans: IncomingAggreGateCommand | null = await this.sendGetVariable(def.getName(), null);
      if (ans == null) throw new Error('NPE');

      const value = this.controller.decodeRemoteDataTable(def.getFormat(), ans.getEncodedDataTableFromReply());

      if (def.getRemoteCacheTime() != null) {
        this.cacheVariableValue(def.getName(), value);
      }

      return value;
    } catch (ex) {
      Log.CONTEXT_VARIABLES.debug("Error getting variable '" + def.getName() + "' from context '" + this.getPathDescription() + "'", ex);
      throw ex;
    }
  }

  protected async setVariableImpl(def: VariableDefinition, value: DataTable, caller?: CallerController, request?: RequestController): Promise<boolean> {
    try {
      const encoded = value.getEncodedDataFromEncodingSettings(this.controller.createClassicEncodingSettings(true));
      const operation: OutgoingAggreGateCommand = this.controller.getCommandBuilder().setVariableOperation(this.getPeerPath(), def.getName(), encoded, request != null ? request.getQueue() : null);
      await this.controller.sendCommandAndCheckReplyCode(operation);
      return true;
    } catch (ex) {
      Log.CONTEXT_VARIABLES.debug("Error setting variable '" + def.getName() + "' of context '" + this.getPathDescription() + "'", ex);
      throw new Error(ex.message);
    }
  }

  protected setupFunctions(): void {
    //TODO promise
    // this.initFunctions();
    super.setupFunctions();
  }

  protected async callFunctionImpl(def: FunctionDefinition, parameters: DataTable, caller?: CallerController, request?: RequestController): Promise<DataTable | null> {
    if (def.getName() === ProxyContext.F_LOCAL_REINITIALIZE) {
      this.reinitialize();
      return DataTableFactory.of(def.getOutputFormat(), true);
    }
    return await this.callRemoteFunction(def.getName(), def.getOutputFormat(), parameters, request != null ? request.getQueue() : null, request != null ? request.isReplyRequired() : true);
  }

  protected async callRemoteFunction(name: string, outputFormat: TableFormat | null, parameters: DataTable, queueName: string | null, isReplyRequired: boolean): Promise<DataTable> {
    try {
      return await this.controller.callRemoteFunction(this.getPeerPath(), name, outputFormat, parameters, queueName, isReplyRequired);
    } catch (ex) {
      Log.CONTEXT_FUNCTIONS.debug("Error calling function '" + name + "' of context '" + this.getPathDescription() + "'", ex);
      throw ex;
    }
  }

  addEventListener(name: string, listener: DefaultContextEventListener, weak = false): boolean {
    return this.addEventListenerToProxy(name, listener, weak, true);
  }

  addEventListenerToProxy(name: string, contextEventListener: DefaultContextEventListener, weak: boolean, sendRemoteCommand: boolean): boolean {
    try {
      //TODO promise
      //this.initEvents();

      const ed = this.getEventData(name);
      if (ed == null) {
        Log.CONTEXT_EVENTS.debug('Context: ' + this.getPath() + 'is loaded events - ' + this.initializedEvents + ' is loading events ' + this.initializingEvents);
        throw new Error(Cres.get().getString('conEvtNotAvail') + name);
      }

      if (sendRemoteCommand) {
        this.addRemoteListener(ed.getDefinition().getName(), contextEventListener);
      }

      return super.addEventListener(name, contextEventListener, weak);
    } catch (ex) {
      const msg = MessageFormat.format(Cres.get().getString('conErrAddingListener'), name, this.getPathDescription());
      throw new Error(msg + ': ' + ex.message);
    }
  }

  removeEventListener(name: string, listener: DefaultContextEventListener): boolean {
    return this.removeEventListenerToProxy(name, listener, true);
  }

  removeEventListenerToProxy(name: string, listener: DefaultContextEventListener, sendRemoteCommand: boolean): boolean {
    try {
      if (!this.isInitializedEvents()) {
        return false;
      }

      Log.CONTEXT_EVENTS.debug("Removing listener for event '" + name + "' from context '" + this.getPathDescription() + "'");

      const res = super.removeEventListener(name, listener);

      const ed = this.getEventData(name);

      if (sendRemoteCommand && this.getController().isConnected() && ed != null && ed.getListeners().size == 0) {
        const protocolVersion = this.getController().getProtocolVersion();
        if (!this.notManageRemoteListeners) {
          const hashCode = listener.getListenerCode();

          const f = listener.getFilter();
          const filter = f != null ? f.getText() : null;
          const fingerprint = listener.getFingerprint();
          const cmd = this.controller.getCommandBuilder().removeEventListenerOperation(this.getPeerPath(), name, hashCode, filter, fingerprint);
          cmd.setTimeout(ProxyContext.LISTENER_OPERATIONS_TIMEOUT);
          this.controller.sendCommandAndCheckReplyCode(cmd);
        }
      }

      return res;
    } catch (ex) {
      const msg = MessageFormat.format(Cres.get().getString('conErrRemovingListener'), name, this.getPathDescription());
      throw new Error(msg + ': ' + ex.message);
    }
  }

  private addRemoteListener(ename: string, contextEventListener: DefaultContextEventListener): void {
    const hashCode = contextEventListener.getListenerCode();

    if (hashCode == null && ProxyContext.AUTO_LISTENED_EVENTS.indexOf(ename) != -1) {
      return;
    }

    const protocolVersion = this.getController().getProtocolVersion();
    if (!this.notManageRemoteListeners /*&& protocolVersion != null && protocolVersion >= ProtocolVersion.V3*/) {
      const f = contextEventListener.getFilter();
      const filterText = f != null ? f.getText() : null;
      const fingerprint = contextEventListener.getFingerprint();
      const cmd = this.controller.getCommandBuilder().addEventListenerOperation(this.getPeerPath(), ename, hashCode, filterText, fingerprint);
      cmd.setTimeout(ProxyContext.LISTENER_OPERATIONS_TIMEOUT);
      this.controller.sendCommandAndCheckReplyCode(cmd);
    }
  }

  getChildren(caller?: CallerController): Array<Context<C, M>> {
    if (!this.initializedChildren && this.localInitComplete && !this.initializingChildren) Log.CONTEXT_CHILDREN.warn('Error initializing children of remote context');
    return super.getChildren(caller);
  }

  getVisibleChildren(caller?: CallerController): Array<Context<C, M>> {
    if (!this.visibleChildren) {
      Log.CONTEXT_CHILDREN.warn('Error initializing visible children of remote context');
      return new Array<Context<C, M>>();
    }

    const res = new Array<Context<C, M>>();

    for (const path of this.visibleChildren) {
      const con = this.getRoot().get(path, caller);
      if (con != null) {
        res.push(con);
      }
    }

    return res;
  }

  getVisibleChildrenPaths(): Array<string> {
    return this.visibleChildren ?? [];
  }

  public addVisibleChild(localVisiblePath: string): void {
    this.visibleChildren?.push(localVisiblePath);
  }

  public removeVisibleChild(localVisiblePath: string): void {
    const index = this.visibleChildren?.indexOf(localVisiblePath);
    if (index && index != -1) this.visibleChildren?.splice(index, 1);
  }

  public hasVisibleChild(path: string): boolean {
    return this.visibleChildren != null && this.visibleChildren.indexOf(path) != -1;
  }

  private restoreEventListeners(): void {
    for (const ed of super.getEventDefinitions()) {
      // Calling method of superclass directly to avoid fetching remote events info
      const edata = this.getEventData(ed.getName());

      for (const listener of edata.getListeners()) {
        try {
          this.addRemoteListener(ed.getName(), listener);
        } catch (ex) {
          Log.CONTEXT_EVENTS.warn("Error restoring listener for event '" + ed.getName() + "'", ex);
        }
      }
    }
  }

  public reinitialize(): void {
    this.clear();
    this.restoreEventListeners();
  }

  protected _fireEvent(
    ed: EventDefinition,
    data: DataTable,
    level: number,
    id: number | null,
    creationtime: Date | null,
    listener: number | null,
    caller?: CallerController,
    request?: FireEventRequestController,
    permissions?: Permissions
  ): Event | null {
    const event = super._fireEvent(ed, data, level, id, creationtime, listener, caller, request, permissions);
    if (ed.getName() === AbstractContext.E_UPDATED && this.isInitializedVariables() && event != null) {
      const variable = event.getData().rec().getString(AbstractContext.EF_UPDATED_VARIABLE);

      const value = event.getData().rec().getDataTable(AbstractContext.EF_UPDATED_VALUE);

      const vd = this.getVariableDefinition(variable);

      if (vd != null && vd.getRemoteCacheTime() != null) {
        this.cacheVariableValue(variable, value);
      }
    }

    return event;
  }

  private cacheVariableValue(variable: string, value: DataTable): void {
    this.variableCache.set(variable, new CachedVariableValue(new Date(), value));
  }

  protected getPathDescription(): string {
    return this.getPath();
  }

  isProxy(): boolean {
    return true;
  }

  isDistributed(): boolean {
    return this.getPeerRoot() != null;
  }

  getRemotePath(): string | null {
    this.checkInfo();

    return this.remotePath;
  }

  getLocalPrimaryRoot(): string | null {
    return this.peerPrimaryRoot;
  }

  getPeerPath(): string {
    return this.getPath();
  }

  public getLocalPath(remoteFullPath: string, visible: boolean): string | null {
    const remoteRoot = visible ? this.getPeerRoot() : this.getRemoteRoot();

    if (remoteRoot == null) {
      return remoteFullPath;
    }

    let remoteConverted;
    if (remoteRoot === Contexts.CTX_ROOT) {
      remoteConverted = remoteFullPath;
    } else if (remoteFullPath === remoteRoot) {
      remoteConverted = '';
    } else {
      return this.getLocalPrimaryPath(remoteFullPath);
    }

    const localRoot = this.getLocalRoot(!visible);

    const converted = remoteConverted.length > 0 ? ContextUtils.createName(localRoot as string, remoteConverted) : localRoot;

    if (Log.CONTEXT.isDebugEnabled()) {
      Log.CONTEXT.debug("Converted remote path '" + remoteFullPath + "' to '" + converted + "' with visible option set to " + (visible ? 'true' : 'false'));
    }

    return converted;
  }

  private getLocalPrimaryPath(remoteFullPath: string): string | null {
    const primaryMount = this.getLocalPrimaryRoot();

    if (primaryMount == null) {
      return null;
    }

    if (Util.equals(Contexts.CTX_ROOT, remoteFullPath)) {
      return primaryMount;
    } else {
      return ContextUtils.createName(primaryMount, remoteFullPath);
    }
  }

  public static addDeferredTask(path: string, task: Runnable): void {
    let deferredTasks = ProxyContext.DEFERRED_TASKS.get(path);

    if (deferredTasks == null) {
      deferredTasks = new Array<Runnable>();
    }

    deferredTasks.push(task);

    ProxyContext.DEFERRED_TASKS.set(path, deferredTasks);
  }

  private executeDeferredTasks(path: string): void {
    if (ProxyContext.DEFERRED_TASKS.has(path)) {
      for (const task of ProxyContext.DEFERRED_TASKS.get(path) as Array<Runnable>) {
        task.run();
      }

      ProxyContext.DEFERRED_TASKS.delete(path);
    }
  }

  protected getLocalVisiblePath(peerVisiblePath: string): string {
    return peerVisiblePath;
  }

  isInitializedStatus(): boolean {
    return this.initializedStatus;
  }

  isInitializedInfo(): boolean {
    return this.initializedInfo;
  }

  isInitializedChildren(): boolean {
    return this.initializedChildren;
  }

  isInitializedVariables(): boolean {
    return this.initializedVariables;
  }

  isInitializedFunctions(): boolean {
    return this.initializedFunctions;
  }

  isInitializedEvents(): boolean {
    return this.initializedEvents;
  }

  public isNotManageRemoteListeners(): boolean {
    return this.notManageRemoteListeners;
  }

  public setNotManageRemoteListeners(notManageRemoteListeners: boolean): void {
    this.notManageRemoteListeners = notManageRemoteListeners;
  }
}
