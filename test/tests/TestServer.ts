import RemoteServerController from '../../src/protocol/RemoteServerController';
import RemoteServer from '../../src/protocol/RemoteServer';
import ProxyContext from '../../src/protocol/ProxyContext';
import VirtualDeviceManager from './VirtualDeviceManager';

enum SERVER_MODE {
  ONE_INSTANCE_PER_TEST = 0,
  ONE_INSTANCE_ALL_TESTS = 1,
}

export default class TestServer {
  private rlc: RemoteServerController;

  private virtualDeviceManager: VirtualDeviceManager;

  private readonly mode: SERVER_MODE;
  private readonly createVirtualDevice: boolean;

  constructor(createVirtualDevice = true, mode: SERVER_MODE = SERVER_MODE.ONE_INSTANCE_PER_TEST) {
    this.rlc = this.createInstance();
    this.virtualDeviceManager = new VirtualDeviceManager(this.rlc, createVirtualDevice);
    this.mode = mode;
    this.createVirtualDevice = createVirtualDevice;
  }

  createInstance(): RemoteServerController {
    const rls = new RemoteServer('localhost', 8080, 'admin', 'admin');

    return new RemoteServerController(rls, true);
  }

  getRlc(): RemoteServerController {
    return this.rlc;
  }

  public async beforeEach(): Promise<void> {
    if (this.mode === SERVER_MODE.ONE_INSTANCE_PER_TEST) {
      this.rlc = this.createInstance();
      this.virtualDeviceManager = new VirtualDeviceManager(this.rlc, this.createVirtualDevice);
      await this.rlc.connectToServer();
      await this.virtualDeviceManager.start();
    }
  }

  public getVirtualDevice(): ProxyContext<any, any> {
    return this.virtualDeviceManager.getVirtualDevice();
  }

  public async beforeAll(): Promise<void> {
    if (this.mode === SERVER_MODE.ONE_INSTANCE_ALL_TESTS) await this.rlc.connectToServer();
  }

  public async afterEach(): Promise<void> {
    await this.virtualDeviceManager.stop();
    if (this.mode === SERVER_MODE.ONE_INSTANCE_PER_TEST) await this.rlc.disconnect();
  }

  public async afterAll(): Promise<void> {
    if (this.mode === SERVER_MODE.ONE_INSTANCE_ALL_TESTS) await this.rlc.disconnect();
  }
}
