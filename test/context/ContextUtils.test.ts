import ContextUtils from '../../src/context/ContextUtils';
import WebContextPluginConstants from '../../src/server/WebContextPluginConstants';

describe('TestContextUtils', () => {
  it('testMatchesToMask', () => {
    expect(ContextUtils.matchesToMask('users.admin.deviceservers.c1', 'users.admin.deviceservers.c1')).toBeTruthy();
    expect(ContextUtils.matchesToMask('users.*.deviceservers.c1', 'users.admin.deviceservers.c1')).toBeTruthy();
    expect(ContextUtils.matchesToMask('users.*.deviceservers.*', 'users.admin.deviceservers.c1')).toBeTruthy();
    expect(ContextUtils.matchesToMask('users.admin.deviceservers.c1', 'users.admin.deviceservers.c1.devices.1')).toBeFalsy();
    expect(ContextUtils.matchesToMask('users.*.deviceservers.*', 'usersxxx.admin.deviceservers.c1')).toBeFalsy();
    expect(ContextUtils.matchesToMask('users.*.deviceservers.c1', 'users.admin.deviceservers.c1.devices', true, false)).toBeTruthy();
    expect(ContextUtils.matchesToMask('users.*.deviceservers.c1', 'users.admin.deviceservers.c1.devices', false, false)).toBeFalsy();
  });
  it('testDefaultDeviceContextName', () => {
    const username = 'someUserName';
    expect('users.' + username + '.devices').toEqual(ContextUtils.devicesContextPath(username));
  });
  it('testPluginGlobalConfigContextPath', () => {
    expect('plugins.com_tibbo_linkserver_plugin_context_web').toEqual(ContextUtils.pluginGlobalConfigContextPath(WebContextPluginConstants.ID));
  });
});
