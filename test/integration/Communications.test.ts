import RemoteServer from '../../src/protocol/RemoteServer';
import RemoteServerController from '../../src/protocol/RemoteServerController';
import WebsocketHandler from '../../src/protocol/WebsocketHandler';
import Mock = jest.Mock;

describe('Communications', () => {
  let rls: RemoteServer;
  let rlc: RemoteServerController;

  let tryReconnect: Mock;
  let connectionRefused: Mock;

  beforeEach(() => {
    rls = new RemoteServer('localhost', 8080, 'admin', 'admin');
    rlc = new RemoteServerController(rls, true);
    tryReconnect = jest.fn();
    connectionRefused = jest.fn();
  });

  it('testReconnectionAttempts', async () => {
    rls.setReconnectionAttempts(3);
    rlc.setWebsocketHandler(new StubWebsocketHandler());

    await expect(rlc.connect()).rejects.toThrow();

    expect(tryReconnect).toHaveBeenCalledTimes(3);
    expect(connectionRefused).toHaveBeenCalledTimes(1);
  });

  it('testReconnectionWithDefaultReconnectionAttempts', async () => {
    rlc.setWebsocketHandler(new StubWebsocketHandler());

    await expect(rlc.connect()).rejects.toThrow();

    expect(tryReconnect).toHaveBeenCalledTimes(0);
    expect(connectionRefused).toHaveBeenCalledTimes(1);
  });

  it('testReconnections', async () => {
    rlc.setWebsocketHandler(new StubWebsocketHandler());
    rls.setReconnectionAttempts(300);

    await rlc.connectToServer();

    for (let i = 0; i < 100000; i++) {
      await rlc.getContextManager()?.getRoot()?.init();
      await rlc.getContextManager()?.getRoot()?.getVariable('version');
      //console.log(res?.getRecordCount())
    }

    expect(tryReconnect).toHaveBeenCalledTimes(0);
    expect(connectionRefused).toHaveBeenCalledTimes(1);
  });

  class StubWebsocketHandler extends WebsocketHandler {
    constructor() {
      super();
    }

    afterConnectionEstablished(ev: Event) {
      super.afterConnectionEstablished(ev);
    }

    tryReconnect(attempt: number, reconnectionAttempts: number) {
      super.tryReconnect(attempt, reconnectionAttempts);
      tryReconnect();
    }

    connectionRefused(deviceDescription: string, deviceInfo: string) {
      super.connectionRefused(deviceDescription, deviceInfo);
      connectionRefused();
    }

    handleTransportError(ev: Event) {
      super.handleTransportError(ev);
    }

    afterConnectionClosed(ev: CloseEvent) {
      super.afterConnectionClosed(ev);
      console.log('close' + ev);
    }
  }
});
