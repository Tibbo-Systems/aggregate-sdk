import AbstractContext from '../../src/context/AbstractContext';
import DefaultContextEventListener from '../../src/context/DefaultContextEventListener';
import Event from '../../src/data/Event';
import TestServer from '../tests/TestServer';
import VirtualDeviceConstants from '../../src/server/VirtualDeviceConstants';
import DataTableFactory from '../../src/datatable/DataTableFactory';
import AlertContextConstants from '../../src/server/AlertContextConstants';
import ContextManager from '../../src/context/ContextManager';
import Context from '../../src/context/Context';
import AlertConstants from '../../src/server/AlertConstants';
import ContextUtils from '../../src/context/ContextUtils';
import ContextUtilsConstants from '../../src/context/ContextUtilsConstants';
import User from '../../src/data/User';
import CallerController from '../../src/context/CallerController';
import VirtualDeviceManager from '../tests/VirtualDeviceManager';

const loadContext = async (contextManager: ContextManager<Context<any, any>>, contextName: string) => {
  const c = await contextManager.get(contextName);
  return c?.init();
};

const alertSubscriberImitation = async (contextManager: ContextManager<Context<any, any>>, alertsListener: DefaultContextEventListener, username: string) => {
  await loadContext(contextManager, ContextUtils.userContextPath(username));

  const contextAlerts = await contextManager.get(ContextUtils.alertsContextPath(username));
  await contextAlerts?.init();

  const childContextsArray = await contextAlerts?.getChildren();

  childContextsArray &&
    (await Promise.all(
      childContextsArray.map(async (context) => {
        const alert = await loadContext(contextManager, context.getPath());
        alert?.addEventListener(AlertContextConstants.E_ALERTNOTIFY, alertsListener, false);
      })
    ));
};

const alertMaskSubscriber = async (alertsListener: DefaultContextEventListener, contextManager: ContextManager<Context<any, any>>, controller: CallerController, username: string) => {
  const userContext = await loadContext(contextManager, ContextUtils.userContextPath(username));

  const alertsConfig = await userContext?.getVariable(AlertConstants.V_ALERTS_CONFIG, controller);

  let popupMode = AlertConstants.POPUP_MODE_OWN;
  if (alertsConfig != null) {
    popupMode = alertsConfig.rec().getInt(AlertConstants.VF_ALERTS_CONFIG_POPUP_MODE);
  }

  const contextAlerts = await contextManager.get(ContextUtils.alertsContextPath(username));
  await contextAlerts?.init();

  const childContextsArray = await contextAlerts?.getChildren();

  childContextsArray &&
    (await Promise.all(
      childContextsArray.map(async (context) => {
        await loadContext(contextManager, context.getPath());
      })
    ));

  let mask = '';
  switch (popupMode) {
    case AlertConstants.POPUP_MODE_OWN:
      mask = ContextUtils.alertContextPath(username, ContextUtilsConstants.CONTEXT_GROUP_MASK);
      break;

    case AlertConstants.POPUP_MODE_ALL:
      mask = ContextUtils.alertContextPath(ContextUtilsConstants.CONTEXT_GROUP_MASK, ContextUtilsConstants.CONTEXT_GROUP_MASK);
      break;
    default:
      new Error(`Unknown alert popup mode: ${popupMode}`);
  }

  contextManager.addMaskEventListener(mask, AlertContextConstants.E_ALERTNOTIFY, alertsListener, false);
};

describe('Events', () => {
  const server = new TestServer();

  beforeEach(async () => {
    await server.beforeEach();
  });

  afterEach(async () => {
    await server.afterEach();
  });

  it('addEventListenerChildAdded', async (done) => {
    const manager = new VirtualDeviceManager(server.getRlc(), true, 'virtual1');

    const listener = new (class extends DefaultContextEventListener {
      handle(event: Event): void {
        console.log('custom handler');
        done();
      }
    })();

    (await server.getRlc().getContextManager().get('users.admin.devices'))?.addEventListener(AbstractContext.E_CHILD_ADDED, listener, false);
    await manager.start();

    await manager.stop();
  });

  // eslint-disable-next-line jest/no-done-callback
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

  // eslint-disable-next-line jest/no-done-callback
  it('alertsEventSubscriber', async (done) => {
    const c = await server.getRlc().getContextManager().get('users.admin.alerts');
    await c?.init();
    const alert = await server.getRlc().getContextManager().get('users.admin.alerts.testAlert');
    await alert?.init();
    const listener = new (class extends DefaultContextEventListener {
      handle(event: Event): void {
        done();
      }
    })();
    alert?.addEventListener(AlertContextConstants.E_ALERTNOTIFY, listener, false);
    console.log('added listener');
  }, 300000);

  // eslint-disable-next-line jest/no-done-callback
  it('alertsSubscriber', async (done) => {
    const contextManager = server.getRlc().getContextManager();
    const listener = new (class extends DefaultContextEventListener {
      handle(event: Event): void {
        done();
      }
    })();

    await alertSubscriberImitation(contextManager, listener, User.DEFAULT_ADMIN_USERNAME);

    console.log('listener added');
  }, 300000);

  // eslint-disable-next-line jest/no-done-callback
  it('alertsMaskSubscriber', async (done) => {
    const contextManager = server.getRlc().getContextManager();
    const controller = contextManager.getCallerController();
    const listener = new (class extends DefaultContextEventListener {
      handle(event: Event): void {
        done();
      }
    })();

    await alertMaskSubscriber(listener, contextManager, controller, User.DEFAULT_ADMIN_USERNAME);

    console.log('listener added');
  }, 300000);
});
