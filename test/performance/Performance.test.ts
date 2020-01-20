import ProxyContext from '../../src/protocol/ProxyContext';
import RootContextConstants from '../../src/server/RootContextConstants';
import Log from '../../src/Log';
import AbstractContext from '../../src/context/AbstractContext';
import DefaultContextEventListener from '../../src/context/DefaultContextEventListener';
import Event from '../../src/data/Event';
import TestServer from '../tests/TestServer';
import VirtualDeviceConstants from "../../src/server/VirtualDeviceConstants";

describe('Performance', () => {
  const server = new TestServer();

  beforeEach(async done => {
    await server.beforeEach();
    done();
  });

  afterEach(async done => {
    await server.afterEach();
    done();
  });

  it('testGetVersion', async done => {
    let count = 0;
    let iteration = 0;

    const interval = 10000;
    const msInSeconds = interval / 1000;
    const countIteration = 2;

    setInterval(() => {
      console.log(count / msInSeconds);
      expect(count / msInSeconds).toBeGreaterThanOrEqual(2000);
      count = 0;
      iteration++;
    }, interval);

    const virtualDevicesContext = server.getVirtualDevice();

    while (true) {
      const strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_NORMAL, null, null);
      expect(strValue.rec().getValue(VirtualDeviceConstants.V_STRING)).toBe('test');
      count++;
      if (iteration == countIteration) break;
    }
    done();
  }, 21000);

  it('addEventListener', async done => {
    const virtualDevicesContext = server.getVirtualDevice();

    let count = 0;

    const listener = new (class extends DefaultContextEventListener {
      handle(event: Event): void {
        count++;
      }
    })();

    setInterval(() => {
      Log.CORE.info(count);
      count = 0;
    }, 1000);

    virtualDevicesContext.addEventListener(AbstractContext.E_UPDATED, listener);

    setInterval(() => {
      virtualDevicesContext.removeEventListener(AbstractContext.E_UPDATED, listener);
      Log.CORE.info('remove');
      done();
    }, 5000);
  }, 10000);
});
