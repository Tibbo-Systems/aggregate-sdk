import ProxyContext from '../../src/protocol/ProxyContext';
import RootContextConstants from '../../src/server/RootContextConstants';
import Log from '../../src/Log';
import AbstractContext from '../../src/context/AbstractContext';
import DefaultContextEventListener from '../../src/context/DefaultContextEventListener';
import Event from '../../src/data/Event';
import TestServer from '../tests/TestServer';
import VirtualDeviceConstants from "../../src/server/VirtualDeviceConstants";

describe('Performance', () => {
  let server = new TestServer();

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

    let interval = 10000;
    let msInSeconds = interval / 1000;
    let countIteration = 2;

    setInterval(() => {
      console.log(count / msInSeconds);
      expect(count / msInSeconds).toBeGreaterThanOrEqual(2000);
      count = 0;
      iteration++;
    }, interval);

    let virtualDevicesContext = server.getVirtualDevice();

    while (true) {
      let strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_NORMAL, null, null);
      expect(strValue.rec().getValue(VirtualDeviceConstants.V_STRING)).toBe('test');
      count++;
      if (iteration == countIteration) break;
    }
    done();
  }, 21000);

  it('addEventListener', async done => {
    let virtualDevicesContext = server.getVirtualDevice();

    let count = 0;

    let listener = new (class extends DefaultContextEventListener {
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
