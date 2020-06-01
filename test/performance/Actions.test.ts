import TestServer from '../tests/TestServer';
import ContextUtils from '../../src/context/ContextUtils';
import GenericActionCommand from '../../src/action/GenericActionCommand';
import Context from '../../src/context/Context';
import GenericActionResponse from '../../src/action/GenericActionResponse';
import Log from '../../src/Log';
import EditData from '../../src/action/command/EditData';
import InvokeActionOperation from '../../src/action/client/InvokeActionOperation';
import ExecutionHelper from '../../src/action/client/ExecutionHelper';
import ActionCommandExecutor from '../../src/action/client/ActionCommandExecutor';
import Operation from '../../src/action/client/Operation';
import ActionUtilsConstants from '../../src/action/ActionUtilsConstants';
import DataTableFactory from '../../src/datatable/DataTableFactory';

const mockEditData = jest.fn();
const mockOpenGridDashboard = jest.fn();
const mockEditGridDashboard = jest.fn();

class EditDataStub extends ActionCommandExecutor {
  execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse> {
    return new Promise((resolve) => {
      Log.CONTEXT_ACTIONS.info(cmd.toString());
      if (cmd.getType() === ActionUtilsConstants.CMD_EDIT_DATA) {
        // The data to be edited by a human
        const data = cmd.getParameters().rec().getDataTable(EditData.CF_DATA);

        // This is a "Specify IP ranges" command
        if (cmd.getRequestId()?.getId() === 'editRangesCommand') {
          // Adding an IP subnet to discover
          const rec = data.addRecord();

          // Filling "Start Address" and leaving other field at their defaults (Mask-type range, the mask is 255.255.255.0)
          rec.setValue('startAddress', '192.168.1.1');
        }
        // Returning original or modified data
        mockEditData();
        resolve(new GenericActionResponse(data));
      }
      throw new Error('Unexpected action command: ' + cmd);
    });
  }
}

class GridOpenDashboardStub extends ActionCommandExecutor {
  execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse> {
    return new Promise((resolve) => {
      mockOpenGridDashboard();
      resolve(new GenericActionResponse());
    });
  }
}
class GridEditDashboardStub extends ActionCommandExecutor {
  execute(originator: Operation, cmd: GenericActionCommand): Promise<GenericActionResponse> {
    return new Promise((resolve) => {
      mockEditGridDashboard();
      resolve(new GenericActionResponse());
    });
  }
}

describe('Actions', () => {
  const server = new TestServer(false);

  async function createDashboard(): Promise<Context<any, any>> {
    const dashboardsContext = server.getRlc().getContextManager().get('users.admin.dashboards') as Context<any, any>;
    await dashboardsContext.loadContext();

    if (dashboardsContext.getChild('test') == null) {
      const tf = dashboardsContext.getFunctionDefinition('create')?.getInputFormat();
      const input = DataTableFactory.of(tf, true);
      input.rec().setValue('name', 'test');
      await dashboardsContext.callFunction('create', input);
    }

    const dashboardContext = server.getRlc().getContextManager().get('users.admin.dashboards.test') as Context<any, any>;

    return dashboardContext.loadContext();
  }

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  it('Network Discovery', async () => {
    ExecutionHelper.registerExecutor(ActionUtilsConstants.CMD_EDIT_DATA, EditDataStub);
    const devicesContext = server.getRlc().getContextManager().get(ContextUtils.devicesContextPath('admin')) as Context<any, any>;
    const operation = new InvokeActionOperation('discovery', '', '', '', devicesContext, devicesContext);
    await operation.execute();
    expect(mockEditData).toHaveBeenCalledTimes(6);
  }, 60000);

  it('Open Grid Dashboard', async () => {
    ExecutionHelper.registerExecutor(ActionUtilsConstants.CMD_OPEN_GRID_DASHBOARD, GridOpenDashboardStub);
    const dashboard = await createDashboard();
    const operation = new InvokeActionOperation('open', '', '', '', dashboard, dashboard);
    await operation.execute();
    expect(mockOpenGridDashboard).toHaveBeenCalledTimes(1);
  });

  it('Edit Grid Dashboard', async () => {
    const dashboard = await createDashboard();
    ExecutionHelper.registerExecutor(ActionUtilsConstants.CMD_EDIT_GRID_DASHBOARD, GridEditDashboardStub);
    const operation = new InvokeActionOperation('edit', '', '', '', dashboard, dashboard);
    await operation.execute();
    expect(mockEditGridDashboard).toHaveBeenCalledTimes(1);
  });
});
