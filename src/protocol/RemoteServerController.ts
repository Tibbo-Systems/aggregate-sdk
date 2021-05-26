import AbstractAggreGateDeviceController from './AbstractAggreGateDeviceController';
import RemoteServer from './RemoteServer';
import RemoteContextManager from './RemoteContextManager';
import OutgoingAggreGateCommand from './OutgoingAggregateCommand';
import JConstants from '../util/java/JConstants';
import Log from '../Log';
import ProxyContext from './ProxyContext';
import Contexts from '../context/Contexts';
import DefaultContextManager from '../context/DefaultContextManager';
import BlockingChannel from '../util/BlockingChannel';
import DataTableFactory from '../datatable/DataTableFactory';
import CommonServerFormats from '../server/CommonServerFormats';
import RootContextConstants from '../server/RootContextConstants';
import WebSocketBlockingChannel from '../util/WebSocketBlockingChannel';
import AggreGateCommandParser from './AggreGateCommandParser';
import LoggerAdapter from '../util/logger/LoggerAdapter';
import WebsocketHandler from './WebsocketHandler';
import MessageFormat from '../util/java/MessageFormat';
import Cres from '../Cres';
import Context from '../context/Context';

export default class RemoteServerController extends AbstractAggreGateDeviceController<RemoteServer, RemoteContextManager> {
  private dataChannel: BlockingChannel | null = null;

  private websocketHandler: WebsocketHandler;

  constructor(
    device: RemoteServer,
    async: boolean,
    useContextManager = true,
    logger: LoggerAdapter = Log.COMMANDS_CLIENT,
    maxEventQueueLength: number = JConstants.INTEGER_MAX_VALUE,
    json = false,
    websocketHandler: WebsocketHandler = new WebsocketHandler()
  ) {
    super(device, logger, maxEventQueueLength, json);
    this.websocketHandler = websocketHandler;
    if (useContextManager) {
      this.setContextManager(new RemoteContextManager(this, async, maxEventQueueLength));
    }
  }

  public setWebsocketHandler(websocketHandler: WebsocketHandler): void {
    this.websocketHandler = websocketHandler;
  }

  public async connectToServer(): Promise<RemoteServerController> {
    await this.connect();
    await this.login();

    const cm = this.getContextManager();
    const rootContext = cm.getRoot() as Context<any, any>;

    await rootContext.init();

    return this;
  }

  protected async connectImpl(): Promise<boolean> {
    await this.prepareDataChannel();
    await super.connectImpl();

    const cm = this.getContextManager() as DefaultContextManager<any>;
    if (cm != null) {
      cm.setRoot(new ProxyContext(Contexts.CTX_ROOT, this));
      cm.restart();
    }
    return true;
  }

  protected async prepareDataChannel(): Promise<void> {
    Log.PROTOCOL.info('Connecting to remote server (' + this.getDevice() + ')');
    const device = this.getDevice() as RemoteServer;

    try {
      await this.createConnection();
    } catch (e) {
      if (device.getReconnectionAttempts() > 0) {
        for (let i = 0; i <= device.getReconnectionAttempts(); i++) {
          try {
            await new Promise((resolve) => setTimeout(resolve, device.getReconnectionDelay()));
            this.websocketHandler.tryReconnect(i, device.getReconnectionAttempts());
            await this.createConnection();
            return;
          } catch (ignored) {
            // eslint-disable-next-line no-empty
          }
        }
      }
      this.websocketHandler.connectionRefused(device.getDescription(), device.getInfo());
      throw new Error(MessageFormat.format(Cres.get().getString('devErrConnecting'), device.getDescription() + ' (' + device.getInfo() + ')'));
    }
  }

  protected async createConnection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const device = this.getDevice() as RemoteServer;

      const wsProtocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
      const requestAddress = device.getRequestAddress();
      const ws = new WebSocket(wsProtocol + device.getAddress() + ':' + device.getPort() + requestAddress);
      ws.binaryType = 'arraybuffer';
      ws.onopen = (ev: Event) => {
        this.websocketHandler.afterConnectionEstablished(ev);
        this.dataChannel = new WebSocketBlockingChannel(ws);
        this.setCommandParser(new AggreGateCommandParser(this.dataChannel));
        resolve();
      };
      ws.onerror = (e: Event) => {
        this.websocketHandler.handleTransportError(e);
        reject(e);
      };
      ws.onclose = (ev: CloseEvent) => {
        this.disconnect();
        this.websocketHandler.afterConnectionClosed(ev);
      };
    });
  }

  protected async loginImpl(): Promise<boolean> {
    const cm = this.getContextManager();
    if (cm != null) {
      cm.restart();
    }
    const loginInput = DataTableFactory.createWithFirstRecord(CommonServerFormats.FIFT_LOGIN, this.getDevice()?.getUsername(), this.getDevice()?.getPassword());

    const result = await this.callRemoteFunction(Contexts.CTX_ROOT, RootContextConstants.F_LOGIN, null, loginInput, null);

    this.getDevice()?.setEffectiveUsername(result.rec().getString(RootContextConstants.FIF_LOGIN_USERNAME));

    if (cm != null) {
      (cm.getRoot() as ProxyContext<any, any>).reinitialize(); // Resets local cache, because root context was already initialized, but its visible entities changed after login
    }

    return true;
  }

  disconnectImpl(): void {
    if (this.dataChannel != null && this.dataChannel.isOpen()) {
      try {
        this.dataChannel.close();
      } catch (ex) {
        Log.PROTOCOL.error('Error closing socket', ex);
      }
    }
    this.dataChannel = null;

    super.disconnectImpl();
  }

  send(command: OutgoingAggreGateCommand): void {
    this.commandWriter.write(command, this.dataChannel as BlockingChannel);
  }

  isConnected(): boolean {
    return super.isConnected() && this.dataChannel != null && this.dataChannel.isOpen();
  }

  public getAddress(): string | null {
    return this.dataChannel != null ? this.dataChannel.getChannelAddress() : null;
  }

  start(): void {}
}
