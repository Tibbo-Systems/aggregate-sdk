import CallerController from '../context/CallerController';
import UserSettings from './UserSettings';
import ContextManager from '../context/ContextManager';
import Context from '../context/Context';

export default interface RemoteConnector {
  getContextManager(): ContextManager<Context<any, any>>;

  getCallerController(): CallerController | undefined;

  getSettings(): UserSettings;
}
