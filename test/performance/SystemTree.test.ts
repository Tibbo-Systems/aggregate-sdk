import TestServer from '../tests/TestServer';
import ContextManager from '../../src/context/ContextManager';
import ProxyContext from '../../src/protocol/ProxyContext';
import Log from '../../src/Log';

async function load(parent: ProxyContext<any, ContextManager<any>>): Promise<void> {
  await parent.loadContext();
  Log.CONTEXT.info(parent.getPath() + ' loaded');
  for (const child of parent.getChildren()) {
    await load(child as ProxyContext<any, any>);
  }
}

describe('System tree', () => {
  const server = new TestServer(false);

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  // eslint-disable-next-line jest/no-test-callback
  it('load tree', async (done) => {
    const root = server.getRlc().getContextManager().getRoot() as ProxyContext<any, any>;
    await root.loadContext();
    for (const child of root.getChildren()) {
      await load(child as ProxyContext<any, any>);
    }
    done();
  }, 10000);
});
