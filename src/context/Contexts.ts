import JObject from '../util/java/JObject';
import ContextUtilsConstants from './ContextUtilsConstants';

export default class Contexts extends JObject {
  public static readonly CURRENT = ContextUtilsConstants.CONTEXT_NAME_SEPARATOR;
  public static readonly CTX_ADMINISTRATION: string = 'administration';

  public static readonly CTX_ALERTS: string = 'alerts';

  public static readonly CTX_AUTORUN: string = 'autorun';

  public static readonly CTX_CONFIG: string = 'config';

  public static readonly CTX_COMMON_DATA: string = 'common';

  public static readonly CTX_DASHBOARDS: string = 'dashboards';

  public static readonly CTX_DEBUG: string = 'debug';

  public static readonly CTX_DEFAULT: string = '.';

  public static readonly CTX_DEVGROUPS: string = 'devgroups';

  public static readonly CTX_DEVICES: string = 'devices';

  public static readonly CTX_DEVICESERVERS: string = 'deviceservers';

  public static readonly CTX_DSGROUPS: string = 'dsgroups';

  public static readonly CTX_EVENTS: string = 'events';

  public static readonly CTX_EVENT_FILTERS: string = 'filters';

  public static readonly CTX_EVENT_CORRELATORS: string = 'eventCorrelators';

  public static readonly CTX_EXTERNAL_DEVICE_SERVERS: string = 'external_device_servers';

  public static readonly CTX_FAVOURITES: string = 'favourites';

  public static readonly CTX_GROUPS: string = 'groups';

  public static readonly CTX_GEOFENCES: string = 'geofences';

  public static readonly CTX_JOBS: string = 'jobs';

  public static readonly CTX_PLUGINS_CONFIG: string = 'plugins';

  public static readonly CTX_PLUGINS_USER_CONFIG: string = 'plugins';

  public static readonly CTX_PLUGIN_CONFIG: string = 'plugin_config';

  public static readonly CTX_COMPLIANCE_POLICIES: string = 'compliancePolicies';

  public static readonly CTX_QUERIES: string = 'queries';

  public static readonly CTX_REPORTS: string = 'reports';

  public static readonly CTX_ROOT: string = '';

  public static readonly CTX_SCHEDULER: string = 'scheduler';

  public static readonly CTX_SCRIPTS: string = 'scripts';

  public static readonly CTX_TRACKERS: string = 'trackers';

  public static readonly CTX_USERGROUPS: string = 'usergroups';

  public static readonly CTX_USERS_GROUPS: string = 'users_groups';

  public static readonly CTX_USERS: string = 'users';

  public static readonly CTX_UTILITIES: string = 'utilities';

  public static readonly CTX_WIDGETS: string = 'widgets';

  public static readonly CTX_PROCESS_CONTROL: string = 'processControl';

  public static readonly CTX_MACHINE_LEARNING: string = 'machineLearning';

  public static readonly CTX_MODELS: string = 'models';

  public static readonly CTX_APPLICATIONS: string = 'applications';

  public static readonly CTX_CLASSES: string = 'classes';

  public static readonly CTX_WORKFLOWS: string = 'workflows';

  public static readonly CTX_MOUNT: string = 'mount';

  public static readonly CTX_DISCOVERY: string = 'discovery';

  public static readonly CTX_NETMANAGEMENT: string = 'netmanagement';

  public static readonly TYPE_ALERTS: string = 'alerts';

  public static readonly TYPE_ALERT: string = 'alert';

  public static readonly TYPE_AUTORUNS: string = 'autorunActions';

  public static readonly TYPE_AUTORUN: string = 'autorunAction';

  public static readonly TYPE_COMMON_DATA: string = 'commonData';

  public static readonly TYPE_COMMON_TABLE: string = 'commonTable';

  public static readonly TYPE_DASHBOARDS: string = 'dashboards';

  public static readonly TYPE_DASHBOARD: string = 'dashboard';

  public static readonly TYPE_DEVICES: string = 'devices';

  public static readonly TYPE_DEVICE: string = 'device';

  public static readonly TYPE_EVENT_FILTERS: string = 'eventFilters';

  public static readonly TYPE_EVENT_FILTER: string = 'eventFilter';

  public static readonly TYPE_FAVOURITES: string = 'favourites';

  public static readonly TYPE_FAVOURITE: string = 'favourite';

  public static readonly TYPE_GROUPS: string = 'groups';

  public static readonly TYPE_GROUP: string = 'group';

  public static readonly TYPE_JOBS: string = 'jobs';

  public static readonly TYPE_JOB: string = 'job';

  public static readonly TYPE_POLICIES: string = 'policies';

  public static readonly TYPE_POLICY: string = 'policy';

  public static readonly TYPE_QUERIES: string = 'queries';

  public static readonly TYPE_QUERY: string = 'query';

  public static readonly TYPE_REPORTS: string = 'reports';

  public static readonly TYPE_REPORT: string = 'report';

  public static readonly TYPE_SCRIPTS: string = 'scripts';

  public static readonly TYPE_SCRIPT: string = 'script';

  public static readonly TYPE_TRACKERS: string = 'trackers';

  public static readonly TYPE_TRACKER: string = 'tracker';

  public static readonly TYPE_USERS: string = 'users';

  public static readonly TYPE_USER: string = 'user';

  public static readonly TYPE_WIDGETS: string = 'widgets';

  public static readonly TYPE_WIDGET: string = 'widget';

  public static readonly TYPE_MODELS: string = 'models';

  public static readonly TYPE_MODEL: string = 'model';

  public static readonly TYPE_GEOFENCE: string = 'geofence';

  public static readonly TYPE_PROCESS_CONTROL: string = 'processControl';
}
