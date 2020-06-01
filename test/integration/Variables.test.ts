import DataTableFactory from '../../src/datatable/DataTableFactory';
import VirtualDeviceConstants from '../../src/server/VirtualDeviceConstants';
import TestServer from '../tests/TestServer';

describe('Variables', () => {
  const server = new TestServer();

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  it('testGetVariable', async () => {
    const virtualDevicesContext = server.getVirtualDevice();
    const strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_NORMAL);
    expect(strValue.rec().getValue(VirtualDeviceConstants.V_STRING)).toBe('test');
  });

  it('testSetVar', async () => {
    const virtualDevicesContext = server.getVirtualDevice();
    const strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_STRING);
    const dtString = DataTableFactory.createWithFirstRecord(strValue.getFormat(), '12345');
    await virtualDevicesContext.setVariable(VirtualDeviceConstants.V_STRING, dtString);
    const data = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_STRING);
    const stringValue = data.rec().getValue(VirtualDeviceConstants.VF_STRING_STRING);
    expect(stringValue).toBe('12345');
  });
});
