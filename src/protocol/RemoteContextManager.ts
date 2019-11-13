import DefaultContextManager from '../context/DefaultContextManager';
import ProxyContext from './ProxyContext';
import AbstractAggreGateDeviceController from './AbstractAggreGateDeviceController';
import Cres from '../Cres';
import MessageFormat from '../util/java/MessageFormat';
import ProtocolVersion from './ProtocolVersion';
import DefaultContextEventListener from '../context/DefaultContextEventListener';
import AggreGateDevice from './AggreGateDevice';
import ContextManager from '../context/ContextManager';

export default class RemoteContextManager extends DefaultContextManager<ProxyContext<any, any>> {
  private initialized = false;
  private initializing = false;

  private readonly deviceController: AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>>;

  public constructor(
    controller: AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>>,
    async: boolean,
    eventQueueLength: number
  ) {
    super(async, eventQueueLength, null);
    this.deviceController = controller;
  }

  public initialize(): void {
    if (this.initialized || this.initializing) {
      return;
    }

    this.initializing = true;

    try {
      //TODO check promise
      this.deviceController.connect();
    } finally {
      this.initializing = false;
    }

    this.initialized = true;
  }

  stop(): void {
    this.initialized = false;
    super.stop();
  }

  getController(): AbstractAggreGateDeviceController<AggreGateDevice, ContextManager<any>> {
    return this.deviceController;
  }

  private sendAddListener(context: string, event: string, listener: DefaultContextEventListener): void {
    let protocolVersion = this.getController().getProtocolVersion();
    if (protocolVersion == null || protocolVersion < ProtocolVersion.V3) {
      return;
    }

    try {
      const expr = listener.getFilter();
      let filterText: string | null = expr != null ? expr.getText() : null;
      const fingerprint: string | null = listener.getFingerprint();
      this.getController().sendCommandAndCheckReplyCode(
        this.getController()
          .getCommandBuilder()
          .addEventListenerOperation(context, event, listener.getListenerCode(), filterText, fingerprint)
      );
    } catch (ex) {
      const msg = MessageFormat.format(Cres.get().getString('conErrAddingListener'), event, context);
      throw new Error(msg + ': ' + ex.message);
    }
  }

  private sendRemoveListener(context: string, event: string, listener: DefaultContextEventListener): void {
    let protocolVersion = this.getController().getProtocolVersion();
    if (protocolVersion == null || protocolVersion < ProtocolVersion.V3) {
      return;
    }

    try {
      const expr = listener.getFilter();
      let filter = expr != null ? expr.getText() : null;
      let fingerprint = listener.getFingerprint();
      this.getController().sendCommandAndCheckReplyCode(
        this.getController()
          .getCommandBuilder()
          .removeEventListenerOperation(context, event, listener.getListenerCode(), filter, fingerprint)
      );
    } catch (ex) {
      const msg = MessageFormat.format(Cres.get().getString('conErrRemovingListener'), event, context);
      throw new Error(msg + ': ' + ex.message);
    }
  }

  protected addListenerToContext(
    con: ProxyContext<any, any>,
    event: string,
    listener: DefaultContextEventListener,
    mask: boolean,
    weak: boolean
  ): void {
    con.addEventListenerToProxy(event, listener, false, !mask); // Don't sent remote command if adding as mask listener
  }

  protected removeListenerFromContext(
    con: ProxyContext<any, any>,
    event: string,
    listener: DefaultContextEventListener,
    mask: boolean
  ): void {
    con.removeEventListenerToProxy(event, listener, !mask); // Don't sent remote command if adding as mask listener
  }

  addMaskEventListener(
    mask: string,
    event: string,
    listener: DefaultContextEventListener,
    weak: boolean = false
  ): void {
    super.addMaskEventListener(mask, event, listener);
    this.sendAddListener(mask, event, listener);
  }

  removeMaskEventListener(mask: string, event: string, listener: DefaultContextEventListener): void {
    super.removeMaskEventListener(mask, event, listener);

    this.sendRemoveListener(mask, event, listener);
  }

  contextRemoved(con: ProxyContext<any, any>): void {
    // We don't store listeners from removed contexts because server do that itself
  }
}
