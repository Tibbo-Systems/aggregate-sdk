import DataTableFactory from '../../src/datatable/DataTableFactory';
import VirtualDeviceConstants from '../../src/server/VirtualDeviceConstants';
import TestServer from '../tests/TestServer';
import ProxyContext from '../../src/protocol/ProxyContext';
import UtilitiesContextConstants from '../../src/server/UtilitiesContextConstants';
import StubContext from '../tests/StubContext';
import DataTable from '../../src/datatable/DataTable';
import ContextManager from '../../src/context/ContextManager';

async function executeBindings(input: DataTable, dc: string, cm: ContextManager<any>): Promise<DataTable> {
  const utilities = cm.get('utilities') as ProxyContext<any, any>;
  await utilities.loadContext();

  const fd = utilities.getFunctionDefinition('executeBindings');
  if (fd === null) throw new Error('function definition is not available');

  const dt = DataTableFactory.of(fd.getInputFormat(), true);

  dt.rec().setValue(UtilitiesContextConstants.FIF_EXECUTE_BINDINGS_DATATABLE, input);
  dt.rec().setValue(UtilitiesContextConstants.FIF_DEFAUTLT_CONTEXT, dc);

  return await utilities.callFunction(UtilitiesContextConstants.F_EXECUTE_BINDINGS, dt);
}

describe('Functions', () => {
  const server = new TestServer();

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  it('callFunction', async () => {
    const virtualDevicesContext = server.getVirtualDevice();

    const fd = virtualDevicesContext.getFunctionDefinition('calculate');
    if (fd === null) throw new Error('function definition is not available');

    const dt = DataTableFactory.of(fd.getInputFormat(), true);

    dt.rec().setValue(VirtualDeviceConstants.FIF_CALCULATE_LEFT_OPERAND, 2);
    dt.rec().setValue(VirtualDeviceConstants.FIF_CALCULATE_RIGHT_OPERAND, 2);

    const res = await virtualDevicesContext.callFunction(VirtualDeviceConstants.F_CALCULATE, dt);
    const result = res.rec().getValue(VirtualDeviceConstants.FOF_CALCULATE_RESULT);
    expect(result).toBe(4);
  });

  it('executeBindings', async () => {
    const tf = StubContext.EFT_TEST.clone();
    tf.addBinding(StubContext.EF_TEST_INT, '123');
    tf.addBinding(StubContext.EF_TEST_STR, '{' + StubContext.EF_TEST_INT + '} == 123 ? "ok" : "no"');

    const res = await executeBindings(DataTableFactory.of(tf, true), '', server.getRlc().getContextManager());

    const resDt = res.rec().getValue(UtilitiesContextConstants.FOF_EXECUTE_BINDINGS_DATATABLE);

    const expected = DataTableFactory.of(tf, 1);
    expected.rec().setValue(StubContext.EF_TEST_INT, 123);
    expected.rec().setValue(StubContext.EF_TEST_STR, 'ok');

    expect(resDt.equals(expected)).toBe(true);
  });

  it('executeBindingsWithError', async () => {
    const tf = StubContext.EFT_TEST.clone();
    tf.addBinding(StubContext.EF_TEST_STR, '{' + StubContext.EF_TEST_INT);

    const res = await executeBindings(DataTableFactory.of(tf, true), '', server.getRlc().getContextManager());

    const errors = res.rec().getDataTable(UtilitiesContextConstants.FOF_EXECUTE_BINDINGS_ERRORS);
    expect(errors.getRecordCount()).toBe(1);
  });
});
