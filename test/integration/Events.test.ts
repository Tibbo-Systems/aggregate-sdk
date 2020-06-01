import AbstractContext from '../../src/context/AbstractContext';
import DefaultContextEventListener from '../../src/context/DefaultContextEventListener';
import Event from '../../src/data/Event';
import TestServer from '../tests/TestServer';
import VirtualDeviceConstants from '../../src/server/VirtualDeviceConstants';
import DataTableFactory from '../../src/datatable/DataTableFactory';

describe('Events', () => {
  const server = new TestServer();

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  // eslint-disable-next-line jest/no-test-callback
  it('addEventListener', async (done) => {
    const virtualDevicesContext = server.getVirtualDevice();

    const listener = new (class extends DefaultContextEventListener {
      handle(event: Event): void {
        virtualDevicesContext.removeEventListener(AbstractContext.E_UPDATED, listener);
        done();
      }
    })();
    virtualDevicesContext.addEventListener(AbstractContext.E_UPDATED, listener);
    const strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_STRING);
    const dtString = DataTableFactory.createWithFirstRecord(strValue.getFormat(), '12345');
    await virtualDevicesContext.setVariable(VirtualDeviceConstants.V_STRING, dtString);
  });
});
