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
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import AggreGateCommandParser from './AggreGateCommandParser';
import Context from '../context/Context';
import LoggerAdapter from '../util/logger/LoggerAdapter';

export default class RemoteServerController extends AbstractAggreGateDeviceController<RemoteServer, RemoteContextManager> {
  private dataChannel: BlockingChannel | null = null;

  constructor(device: RemoteServer, async: boolean, useContextManager = true, logger: LoggerAdapter = Log.COMMANDS_CLIENT, maxEventQueueLength: number = JConstants.INTEGER_MAX_VALUE, json = false) {
    super(device, logger, maxEventQueueLength, json);
    if (useContextManager) {
      this.setContextManager(new RemoteContextManager(this, async, maxEventQueueLength));
    }
  }

  public async connectToServer(): Promise<RemoteServerController> {
    await this.connect();
    await this.login();

    const cm = this.getContextManager();
    const rootContext = cm.getRoot() as Context<any, any>;

    await rootContext.loadContext();

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

  protected prepareDataChannel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const device = this.getDevice() as RemoteServer;
      try {
        if (this.dataChannel == null && device.getAddress() != null) {
          Log.PROTOCOL.debug('Connecting to remote server (' + this.getDevice() + ')');
          const ws = new WebSocket('ws://' + device.getAddress() + ':' + device.getPort() + '/websockets/client');
          ws.binaryType = 'arraybuffer';
          ws.onopen = () => {
            resolve();
          };
          this.dataChannel = new WebSocketBlockingChannel(ws);
        }

        if (this.dataChannel != null) {
          this.setCommandParser(new AggreGateCommandParser(this.dataChannel));
        }

        Log.PROTOCOL.debug('Connection with remote server established');
      } catch (e) {
        reject();
        throw new Error(MessageFormat.format(Cres.get().getString('devErrConnecting'), device.getDescription() + ' (' + device.getInfo() + ')') + e.message);
      }
    });
  }

  protected async loginImpl(): Promise<boolean> {
    const cm = this.getContextManager();
    if (cm != null) {
      cm.restart();
    }
    const loginInput = DataTableFactory.createWithFirstRecord(CommonServerFormats.FIFT_LOGIN, this.getDevice()?.getUsername(), this.getDevice()?.getPassword());

    await this.callRemoteFunction(Contexts.CTX_ROOT, RootContextConstants.F_LOGIN, null, loginInput, null);

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
