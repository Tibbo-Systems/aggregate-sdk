import DataTableFactory from '../../src/datatable/DataTableFactory';
import VirtualDeviceConstants from '../../src/server/VirtualDeviceConstants';
import AbstractContext from '../../src/context/AbstractContext';
import DefaultContextEventListener from '../../src/context/DefaultContextEventListener';
import Event from '../../src/data/Event';
import TestServer from '../tests/TestServer';

describe('ManageVariables', () => {
    let server = new TestServer();

    beforeEach(async done => {
        await server.beforeEach();
        done();
    });

    afterEach(async done => {
        await server.afterEach();
        done();
    });

    it('testGetVariable', async done => {
        let virtualDevicesContext = server.getVirtualDevice();
        let strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_NORMAL, null, null);
        expect(strValue.rec().getValue(VirtualDeviceConstants.V_STRING)).toBe('test');
        done();
    });

    it('testSetVar', async done => {
        let virtualDevicesContext = server.getVirtualDevice();

        let strValue = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_STRING, null, null);
        const dtString = DataTableFactory.createWithFirstRecord(strValue.getFormat(), '12345');
        await virtualDevicesContext.setVariable(VirtualDeviceConstants.V_STRING, dtString, null, null);
        let data = await virtualDevicesContext.getVariable(VirtualDeviceConstants.V_STRING, null, null);
        const stringValue = data.rec().getValue(VirtualDeviceConstants.VF_STRING_STRING);
        expect(stringValue).toBe('12345');
        done();
    });

    it('callFunction', async done => {
        let virtualDevicesContext = server.getVirtualDevice();

        let fd = virtualDevicesContext.getFunctionDefinition('calculate');
        if (fd === null) throw new Error('function definition is not available');

        let dt = DataTableFactory.of(fd.getInputFormat(), true);

        dt.rec().setValue(VirtualDeviceConstants.FIF_CALCULATE_LEFT_OPERAND, 2);
        dt.rec().setValue(VirtualDeviceConstants.FIF_CALCULATE_RIGHT_OPERAND, 2);

        let res = await virtualDevicesContext.callFunction(VirtualDeviceConstants.F_CALCULATE, dt);
        let result = res.rec().getValue(VirtualDeviceConstants.FOF_CALCULATE_RESULT);
        expect(result).toBe(4);
        done();
    });

    it('addEventListener', async done => {
        let virtualDevicesContext = server.getVirtualDevice();

        let listener = new (class extends DefaultContextEventListener {
            handle(event: Event): void {
                virtualDevicesContext.removeEventListener(AbstractContext.E_UPDATED, listener);
                done();
            }
        })();

        virtualDevicesContext.addEventListener(AbstractContext.E_UPDATED, listener);
    });
});
