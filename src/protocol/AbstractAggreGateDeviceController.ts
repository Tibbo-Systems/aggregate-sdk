import AbstractDeviceController from '../communication/AbstractDeviceController';
import IncomingAggreGateCommand from './IncomingAggreGateCommand';
import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import TableFormat from '../datatable/TableFormat';
import DataTable from '../datatable/DataTable';
import SimpleDataTable from '../datatable/SimpleDataTable';
import AggreGateDeviceController from './AggreGateDeviceController';
import ProtocolVersion from './ProtocolVersion';
import ProtocolCommandBuilder from './ProcotolCommandBuilder';
import FormatCache from '../datatable/encoding/FormatCache';
import DataTableFactory from '../datatable/DataTableFactory';
import ClassicEncodingSettings from '../datatable/encoding/ClassicEncodingSettings';
import AggreGateDevice from './AggreGateDevice';
import ContextManager from '../context/ContextManager';
import CallerController from '../context/CallerController';
import CompressedCommandWriter from './CompressedCommandWriter';
import UserSettings from '../util/UserSettings';
import AggreGateCommandParser from './AggreGateCommandParser';
import AggreGateCodes from './AggreGateCodes';
import Cres from '../Cres';
import AggreGateCommand from './AggreGateCommand';
import ProxyContext from './ProxyContext';
import TransferEncodingHelper from '../datatable/encoding/TransferEncodingHelper';
import Log from '../Log';
import Runnable from '../util/java/Runnable';
import FireEventRequestController from '../event/FireEventRequestController';
import Context from '../context/Context';
import EventDefinition from '../context/EventDefinition';
import StringBuilder from '../util/java/StringBuilder';
import ServerContextConstants from '../server/ServerContextConstants';
import FieldConstants from '../datatable/field/FieldConstants';
import ProtocolHandler from '../action/ProtocolHandler';
import StringUtils from '../util/StringUtils';
import ElementList from '../util/ElementList';
import Event from '../data/Event';
import LoggerAdapter from '../util/logger/LoggerAdapter';

export default abstract class AbstractAggreGateDeviceController<D extends AggreGateDevice, C extends ContextManager<any>> extends AbstractDeviceController<IncomingAggreGateCommand, OutgoingAggreGateCommand>
  implements AggreGateDeviceController<IncomingAggreGateCommand, OutgoingAggreGateCommand> {
  public static readonly FLAG_NO_REPLY: string = 'N';

  private device: D | null = null;

  private _contextManager: C | null = null;

  private callerController: CallerController | null = null;

  private readonly userSettings = new UserSettings();

  private avoidSendingFormats = false;

  private readonly formatCache: FormatCache;

  private readonly maxEventQueueLength: number;

  private usesCompression = false;

  protected readonly commandWriter = new CompressedCommandWriter<OutgoingAggreGateCommand>();

  private protocolVersion: ProtocolVersion = ProtocolVersion.V2;

  private rejectedEvents = 0;

  private readonly commandBuilder: ProtocolCommandBuilder;

  constructor(device: D, logger: LoggerAdapter, maxEventQueueLength: number, json = false) {
    super(device.getCommandTimeout(), logger);
    this.formatCache = new FormatCache(device.toString(), this);
    this.commandBuilder = new ProtocolCommandBuilder(json);

    this.device = device;
    this.maxEventQueueLength = maxEventQueueLength;
  }

  public getContextManager(): ContextManager<Context<any, any>> {
    return this._contextManager as ContextManager<Context<any, any>>;
  }

  public setContextManager(contextManager: C): void {
    this._contextManager = contextManager;
  }

  public setDevice(device: D): void {
    this.device = device;
  }

  getDevice(): D | null {
    return this.device;
  }

  getCallerController(): CallerController | null {
    return this.callerController;
  }

  protected setCallerController(callerController: CallerController): void {
    this.callerController = callerController;
  }

  getFormatCache(): FormatCache {
    return this.formatCache;
  }

  getSettings(): UserSettings {
    return this.userSettings;
  }

  createClassicEncodingSettings(forSending: boolean): ClassicEncodingSettings {
    const es = new ClassicEncodingSettings(false);
    es.setProtocolVersion(this.protocolVersion);

    if (!forSending) {
      es.setFormatCache(this.formatCache);
    }
    es.setEncodeFormat(!this.avoidSendingFormats);
    return es;
  }

  protected setAvoidSendingFormats(avoidSendingFormats: boolean): void {
    this.avoidSendingFormats = avoidSendingFormats;
  }

  public isAvoidSendingFormats(): boolean {
    return this.avoidSendingFormats;
  }

  protected async connectImpl(): Promise<boolean> {
    // Set compatibility mode for the first messages
    this.commandWriter.setVersion(ProtocolVersion.V2);

    const aggreGateCommandParser = this.getCommandParser() as AggreGateCommandParser;

    aggreGateCommandParser.setVersion(ProtocolVersion.V2);

    let lastReplyIsOk = false;

    const versions: ProtocolVersion[] = [ProtocolVersion.V2, ProtocolVersion.V3, ProtocolVersion.V4];
    let ans: IncomingAggreGateCommand | null = null;

    // Starting from higher version to lower
    //TODO start from V2, because we support only V2
    for (let i = 0; i < versions.length; i++) {
      const version: ProtocolVersion = versions[i];
      ans = await this.sendCommand(this.commandBuilder.startMessage(version));
      lastReplyIsOk = ans?.getReplyCode() === AggreGateCodes.REPLY_CODE_OK;

      if (lastReplyIsOk) break;
    }
    if (!lastReplyIsOk) throw new Error(Cres.get().getString('devUncompatibleVersion'));

    const answer = ans as IncomingAggreGateCommand;
    if (answer.hasParameter(AggreGateCommand.INDEX_START_PROTOCOL_VERSION)) {
      const replyVersion = answer.getParameter(AggreGateCommand.INDEX_START_PROTOCOL_VERSION);

      switch (replyVersion) {
        case '2':
          this.protocolVersion = ProtocolVersion.V2;
          break;
        case '3':
          this.protocolVersion = ProtocolVersion.V3;
          break;
        case '4':
          this.protocolVersion = ProtocolVersion.V4;
          break;
      }

      this.commandWriter.setVersion(this.protocolVersion);
      aggreGateCommandParser.setVersion(this.protocolVersion);

      if (answer.hasParameter(AggreGateCommand.INDEX_START_COMPRESSION) && answer.getParameter(AggreGateCommand.INDEX_START_COMPRESSION) == AggreGateCommand.MESSAGE_CODE_COMPRESSION) {
        this.setUsesCompression(true);
      }
    }

    this.formatCache.clear();

    return true;
  }

  abstract start(): void;

  public destroy(): void {}

  disconnectImpl(): void {
    if (this._contextManager != null) {
      this._contextManager.stop();
    }

    this.formatCache.clear();
  }

  protected getProxyContexts(path: string): Array<ProxyContext<any, any>> {
    // Distributed: internal distributed architecture call
    const con = this.getContextManager().get(path, null) as ProxyContext<any, any>;
    return con != null ? new Array(con) : [];
  }

  async sendCommandAndCheckReplyCode(cmd: OutgoingAggreGateCommand): Promise<IncomingAggreGateCommand | null> {
    const ans = await this.sendCommand(cmd);

    if (ans == null) return null;

    if (ans.getReplyCode() === AggreGateCodes.REPLY_CODE_DENIED) {
      const message = ans.getNumberOfParameters() > AggreGateCommand.INDEX_REPLY_MESSAGE ? ': ' + TransferEncodingHelper.decode(ans.getParameter(AggreGateCommand.INDEX_REPLY_MESSAGE)) : '';
      throw new Error(Cres.get().getString('devAccessDeniedReply') + message);
    }

    if (ans.getReplyCode() === AggreGateCodes.REPLY_CODE_PASSWORD_EXPIRED) {
      const message = ans.getNumberOfParameters() > AggreGateCommand.INDEX_REPLY_MESSAGE ? ': ' + TransferEncodingHelper.decode(ans.getParameter(AggreGateCommand.INDEX_REPLY_MESSAGE)) : '';
      const details = ans.getNumberOfParameters() > AggreGateCommand.INDEX_REPLY_DETAILS ? TransferEncodingHelper.decode(ans.getParameter(AggreGateCommand.INDEX_REPLY_DETAILS)) : null;
      throw new Error(Cres.get().getString('devServerReturnedError') + message + details + AggreGateCodes.REPLY_CODE_PASSWORD_EXPIRED);
    }

    if (ans.getReplyCode() !== AggreGateCodes.REPLY_CODE_OK) {
      const message = ans.getNumberOfParameters() > AggreGateCommand.INDEX_REPLY_MESSAGE ? ': ' + TransferEncodingHelper.decode(ans.getParameter(AggreGateCommand.INDEX_REPLY_MESSAGE)) : '';
      const details = ans.getNumberOfParameters() > AggreGateCommand.INDEX_REPLY_DETAILS ? TransferEncodingHelper.decode(ans.getParameter(AggreGateCommand.INDEX_REPLY_DETAILS)) : null;
      throw new Error(Cres.get().getString('devServerReturnedError') + message + " (error code: '" + ans.getReplyCode() + "')" + details);
    }

    return ans;
  }

  processAsyncCommand(cmd: IncomingAggreGateCommand) {
    if (Log.COMMANDS.isDebugEnabled()) {
      Log.COMMANDS.debug('Async command received from server: ' + cmd);
    }

    if (cmd.getMessageCode().charAt(0) == AggreGateCommand.MESSAGE_CODE_EVENT) {
      this.processEvent(cmd);
    }
  }

  private processEvent(cmd: IncomingAggreGateCommand): void {
    const _this = this;
    const task = new (class extends Runnable {
      run(): void {
        if (!_this.isConnected()) {
          return;
        }

        try {
          const contextPath = cmd.getParameter(AggreGateCommand.INDEX_EVENT_CONTEXT);
          const eventName = cmd.getParameter(AggreGateCommand.INDEX_EVENT_NAME);

          const level = Number.parseInt(cmd.getParameter(AggreGateCommand.INDEX_EVENT_LEVEL));

          const idstr = cmd.getParameter(AggreGateCommand.INDEX_EVENT_ID);
          const id = idstr.length > 0 ? Number.parseInt(idstr) : null;

          const listenerstr = cmd.getParameter(AggreGateCommand.INDEX_EVENT_LISTENER);
          const listener = listenerstr.length > 0 ? Number.parseInt(listenerstr) : null;

          const contexts = _this.getProxyContexts(contextPath);

          if (contexts.length == 0) {
            Log.CONTEXT_EVENTS.info("Error firing event '" + eventName + "': context '" + contextPath + "' not found");
            return;
          }

          for (const con of contexts) {
            const ed = con.getEventDefinition(eventName);

            if (ed == null) {
              Log.CONTEXT_EVENTS.warn("Error firing event: event '" + eventName + "' not available in context '" + contextPath + "'");
              continue;
            }

            const data = _this.decodeRemoteDataTable(ed.getFormat(), cmd.getEncodedDataTableFromEventMessage());

            let timestamp: Date | null = null;
            if (cmd.hasParameter(AggreGateCommand.INDEX_EVENT_TIMESTAMP)) {
              const timestampstr = cmd.getParameter(AggreGateCommand.INDEX_EVENT_TIMESTAMP);
              timestamp = timestampstr.length > 0 ? new Date(Number.parseInt(timestampstr)) : null;
            }

            const event = con.fireEvent(ed.getName(), data, null, level, id, timestamp, listener, FireEventRequestController.valueOf(false));

            _this.confirmEvent(con, ed, event);
          }
        } catch (ex) {
          if (_this.getLogger() != null) {
            const msg = "Error processing async command '" + cmd + "'";

            _this.getLogger().error(msg, ex);
          }
        }
      }
    })();
    new Promise((resolve, reject) => {
      task.run();
      resolve();
    }).catch(reason => {
      this.rejectedEvents++;
      this.getLogger().warn('Error processing asynchronous incoming command since the queue is full. Corresponding event rejected. Total rejected events: ' + this.rejectedEvents + '. Command: ' + cmd + 'reason' + reason);
    });
  }

  protected confirmEvent(con: Context<any, any>, def: EventDefinition, event: Event | null): void {}

  toString(): string {
    return this.getDevice()?.toString() ?? 'device';
  }

  public async callRemoteFunction(context: string, name: string, outputFormat: TableFormat | null, parameters: DataTable, queueName: string | null, isReplyRequired = true): Promise<DataTable> {
    const encodedParameters = parameters.encode(new StringBuilder(), this.createClassicEncodingSettings(true), false, 0);
    const isShallowDataReleased = this.releaseShallowData(parameters);
    const flags = !isReplyRequired ? AbstractAggreGateDeviceController.FLAG_NO_REPLY : null;
    const cmd = this.commandBuilder.callFunctionOperation(context, name, encodedParameters.toString(), queueName, flags);

    cmd.setAsync(!isReplyRequired);

    if (isShallowDataReleased) cmd.setTimeout(ProxyContext.DURABLE_OPERATIONS_TIMEOUT);
    const ans = await this.sendCommandAndCheckReplyCode(cmd);
    return ans != null ? this.decodeRemoteDataTable(outputFormat, ans.getEncodedDataTableFromReply()) : new SimpleDataTable(outputFormat);
  }

  private releaseShallowData(parameters: DataTable): boolean {
    try {
      if (parameters.getRecordCount() == 0) return false;

      if (!parameters.rec().hasField(ServerContextConstants.FIF_STEP_ACTION_ACTION_RESPONSE)) return false;

      const actionResponse: DataTable = parameters.rec().getDataTable(ServerContextConstants.FIF_STEP_ACTION_ACTION_RESPONSE);

      if (actionResponse == null || actionResponse.getRecordCount() < 1) return false;

      const actionParameters: DataTable = actionResponse.rec().getDataTable(ProtocolHandler.FIELD_ACTION_RESPONSE_PARAMETERS);

      if (actionParameters == null || actionParameters.getRecordCount() < 1) return false;

      const params = actionParameters.rec();

      let hasShallow = false;
      for (let i = 0; i < params.getFieldCount(); i++) {
        if (
          params
            .getFormat()
            .getField(i)
            .isShallow()
        ) {
          if (
            params
              .getFormat()
              .getField(i)
              .getType() == FieldConstants.DATA_FIELD
          ) {
            params.getData(i).releaseData();
            hasShallow = true;
          }
        }
      }
      return hasShallow;
    } catch (ex) {
      Log.COMMANDS.debug(ex.message);
    }
    return false;
  }

  decodeRemoteDataTable(format: TableFormat | null, encodedReply: string): DataTable {
    if (this.isAvoidSendingFormats()) {
      const settings = new ClassicEncodingSettings(false, format);
      settings.setProtocolVersion(this.protocolVersion);
      settings.setFormatCache(this.formatCache);

      return this.choseAppropriateDataTable(encodedReply, settings, true);
    }

    try {
      return this.choseAppropriateDataTable(encodedReply, this.createClassicEncodingSettings(false), false);
    } catch (ex) {
      throw new Error("Error parsing encoded data table '" + encodedReply + "': " + ex.message);
    }
  }

  private choseAppropriateDataTable(encodedReply: string, settings: ClassicEncodingSettings, validate: boolean): DataTable {
    const elements: ElementList = StringUtils.elements(encodedReply, settings.isUseVisibleSeparators());
    //const  containsID = elements.getElement(AbstractDataTable.ELEMENT_ID);
    return /*containsID ? new ProxyDataTable(elements, settings, validate, this) : */ DataTableFactory.createAndDecode(elements, settings, validate);
  }

  public isUsesCompression(): boolean {
    return this.usesCompression;
  }

  public setUsesCompression(usesCompression: boolean): void {
    this.usesCompression = usesCompression;
  }

  public getEventQueueLength(): number {
    return 0;
  }

  public getRejectedEvents(): number {
    return this.rejectedEvents;
  }

  getProtocolVersion(): ProtocolVersion {
    return this.protocolVersion;
  }

  getCommandBuilder(): ProtocolCommandBuilder {
    return this.commandBuilder;
  }
}
