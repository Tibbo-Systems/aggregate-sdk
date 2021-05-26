export default class RootContextConstants {
  public static readonly V_VERSION: string = 'version';

  public static readonly V_ENVIRONMENT: string = 'environment';

  public static readonly V_SYSINFO: string = 'sysinfo';

  public static readonly V_DEVICE_STATISTICS: string = 'deviceStatistics';

  public static readonly V_PLUGINS: string = 'plugins';

  public static readonly V_MODULES: string = 'modules';

  public static readonly V_LICENSE: string = 'license';

  public static readonly V_STATUS: string = 'status';

  public static readonly V_DATABASE: string = 'database';

  public static readonly V_DATABASE_CONNECTION: string = 'databaseConnection';

  public static readonly V_DATABASE_CLUSTER: string = 'databaseCluster';

  public static readonly V_TABLES: string = 'tables';

  public static readonly V_CONNECTIONS: string = 'connections';

  public static readonly V_THREADS: string = 'threads';

  public static readonly V_THREAD_STATISTICS: string = 'threadStatistics';

  public static readonly V_POOLS: string = 'pools';

  public static readonly V_CLUSTER: string = 'cluster';

  public static readonly V_EVENT_RULE_STATISTICS: string = 'eventRuleStatistics';

  public static readonly V_EVENT_QUEUE_STATISTICS: string = 'eventQueueStatistics';

  public static readonly V_EVENT_STATISTICS: string = 'eventStatistics';

  public static readonly V_VARIABLE_STATISTICS: string = 'variableStatistics';

  public static readonly V_SESSION_VARIABLE: string = 'sessionVariable';

  public static readonly V_SESSION_VALUE: string = 'sessionValue';

  public static readonly V_SESSION_OLD_VALUE: string = 'sessionOldValue';

  public static readonly V_SESSION_NEW_VALUE: string = 'sessionNewValue';

  public static readonly V_SESSION_DEFAULT_VALUE: string = 'value';

  public static readonly V_SESSION_USER_NAME: string = 'username';

  public static readonly V_SESSION_LOGIN: string = 'login';

  public static readonly V_SESSION_TYPE: string = 'type';

  public static readonly V_EVENT_DELIVERY_FAILURE_MESSAGE: string = 'message';

  public static readonly V_LICENSES: string = 'licenses';

  public static readonly V_LICENSE_STATUS: string = 'status';

  public static readonly V_LICENSE_ACTIVATION_KEY: string = 'activationKey';

  public static readonly V_LICENSE_FILE: string = 'licenseFile';

  public static readonly V_LICENSE_DETAILS: string = 'licenseDetails';

  public static readonly V_THREAD_POOLS_POOL_NAME: string = 'poolName';

  public static readonly V_THREAD_POOLS_ACTIVE_COUNT: string = 'activeCount';

  public static readonly V_THREAD_POOLS_COMPLETED_COUNT: string = 'completedCount';

  public static readonly V_THREAD_POOLS_TOTAL_COUNT: string = 'totalCount';

  public static readonly V_THREAD_POOLS_CORE_SIZE: string = 'coreSize';

  public static readonly V_THREAD_POOLS_LARGEST_SIZE: string = 'largestSize';

  public static readonly V_THREAD_POOLS_MAXIMUM_SIZE: string = 'maximumSize';

  public static readonly V_THREAD_POOLS_QUEUE_LENGTH: string = 'queueLength';

  public static readonly V_STATUS_DISK_UTILIZATION_NAME: string = 'diskUtilizationName';

  public static readonly V_STATUS_DISK_UTILIZATION_SPACE: string = 'diskUtilizationSpace';

  public static readonly F_REGISTER: string = 'register';

  public static readonly F_LOGIN: string = 'login';

  public static readonly F_LOGOUT: string = 'logout';

  public static readonly F_STOP: string = 'stop';

  public static readonly F_RESTART: string = 'restart';

  public static readonly F_UPGRADE: string = 'upgrade';

  public static readonly F_CHANGE_PASSWORD: string = 'changePassword';

  public static readonly F_EXECUTE_QUERY: string = 'executeQuery';

  public static readonly F_EXECUTE_NATIVE_QUERY: string = 'executeNativeQuery';

  public static readonly F_ADSORB_QUERY_RESULTS: string = 'adsorbQueryResults';

  public static readonly F_GET_FORMAT: string = 'getFormat';

  public static readonly F_SESSION_GET: string = 'sessionGet';

  public static readonly F_SESSION_SET: string = 'sessionSet';

  public static readonly F_TERMINATE_CLIENT_CONNECTION: string = 'terminateClientConnection';

  public static readonly F_GET_LICENSE: string = 'getLicense';

  public static readonly E_FEEDBACK: string = 'feedback';

  public static readonly E_CONTEXT_ADDED: string = 'contextAdded';

  public static readonly E_CONTEXT_REMOVED: string = 'contextRemoved';

  public static readonly E_CONTEXT_INFO_CHANGED: string = 'contextInfoChanged';

  public static readonly E_CONTEXT_CREATED: string = 'contextCreated';

  public static readonly E_CONTEXT_DESTROYED: string = 'contextDestroyed';

  public static readonly E_CONTEXT_RELOCATED: string = 'contextRelocated';

  public static readonly E_CONTEXT_ENTITY_ADDED: string = 'contextEntityAdded';

  public static readonly E_CONTEXT_ENTITY_REMOVED: string = 'contextEntityRemoved';

  public static readonly E_SERVER_STARTED: string = 'serverStarted';

  public static readonly E_SESSION_VARIABLE_UPDATED: string = 'sessionVariableUpdated';

  public static readonly E_EVENT_DELIVERY_FAILURE: string = 'eventDeliveryFailure';

  public static readonly E_LICENSE_REQUEST: string = 'licenseRequest';

  public static readonly E_LICENSE_REQUEST_STATUS: string = 'licenseRequestStatus';

  public static readonly A_CREATE_RESOURCES: string = 'createResources';

  public static readonly A_DELETE_RESOURCES: string = 'deleteResources';

  public static readonly A_STOP_SERVER: string = 'stop';

  public static readonly A_RESTART_SERVER: string = 'restart';

  public static readonly A_CHANGE_PASSWORD: string = 'changePassword';

  public static readonly A_DELETE_EVENTS: string = 'deleteEvents';

  public static readonly A_EVENT_HISTORY: string = 'eventHistory';

  public static readonly A_VARIABLE_HISTORY: string = 'variableHistory';

  public static readonly A_VIEW_STATISTICS: string = 'viewStatistics';

  public static readonly A_VIEW_RAW_STATISTICS: string = 'viewRawStatistics';

  public static readonly A_VIEW_SERVER_INFO: string = 'viewServerInfo';

  public static readonly A_VIEW_DATABASE_STATISTICS: string = 'viewDatabaseStatistics';

  public static readonly A_CONFIGURE_SERVER: string = 'configureServer';

  public static readonly A_EXECUTE: string = 'execute';

  public static readonly A_PURGE_STATISTICS: string = 'purgeStatistics';

  public static readonly A_FILL_STATISTICS_FROM_HISTORY: string = 'fillStatisticsFromHistory';

  public static readonly A_BROWSE: string = 'browse';

  public static readonly A_COMPARE: string = 'compare';

  public static readonly A_GENERATE_THREAD_DUMP: string = 'generateThreadDump';

  public static readonly A_GENERATE_HEAP_DUMP: string = 'generateHeapDump';

  public static readonly A_CONNECT_TO_STORE: string = 'connectToStore';

  public static readonly A_DELETE_MODULES: string = 'deleteModules';

  public static readonly A_TERMINATE_CLIENT_CONNECTION: string = 'terminateClientConnection';

  public static readonly VF_VERSION_VERSION: string = 'version';

  public static readonly VF_VERSION_TIME: string = 'time';

  public static readonly VF_STATUS_NAME: string = 'name';

  public static readonly VF_STATUS_VERSION: string = 'version';

  public static readonly VF_STATUS_INSTALLATION_DATE: string = 'installationDate';

  public static readonly VF_STATUS_START_TIME: string = 'startTime';

  public static readonly VF_STATUS_STARTUP_DURATION: string = 'startupDuration';

  public static readonly VF_STATUS_UPTIME: string = 'uptime';

  public static readonly VF_STATUS_FREE_MEMORY: string = 'freeMemory';

  public static readonly VF_STATUS_MAX_MEMORY: string = 'maxMemory';

  public static readonly VF_STATUS_TOTAL_MEMORY: string = 'totalMemory';

  public static readonly VF_STATUS_CPU_LOAD: string = 'cpuLoad';

  public static readonly VF_STATUS_CPU_LOAD_SYSTEM: string = 'cpuLoadSystem';

  public static readonly VF_STATUS_DISK_UTILIZATION: string = 'diskUtilization';

  public static readonly VF_STATUS_EVENT_QUEUE_LENGTH: string = 'eventQueueLength';

  public static readonly VF_STATUS_EVENTS_SCHEDULED: string = 'eventsScheduled';

  public static readonly VF_STATUS_EVENTS_PROCESSED: string = 'eventsProcessed';

  public static readonly VF_PLUGINS_ID: string = 'id';

  public static readonly VF_PLUGINS_TYPE: string = 'type';

  public static readonly VF_PLUGINS_NAME: string = 'name';

  public static readonly VF_CONNECTIONS_USER: string = 'user';

  public static readonly VF_CONNECTIONS_LOGIN: string = 'login';

  public static readonly VF_CONNECTIONS_TYPE: string = 'type';

  public static readonly VF_CONNECTIONS_DATE: string = 'date';

  public static readonly VF_CONNECTIONS_ADDRESS: string = 'address';

  public static readonly VF_CONNECTIONS_EVENTS_QUEUED: string = 'eventsQueued';

  public static readonly VF_CONNECTIONS_EVENTS_DISCARDED: string = 'eventsDiscarded';

  public static readonly VF_CONNECTIONS_CONTEXT_LOCKS: string = 'contextLocks';

  public static readonly VF_THREADS_ID: string = 'id';

  public static readonly VF_THREADS_NAME: string = 'name';

  public static readonly VF_THREADS_GROUP: string = 'group';

  public static readonly VF_THREADS_PRIORITY: string = 'priority';

  public static readonly VF_THREADS_STATE: string = 'state';

  public static readonly VF_THREADS_DAEMON: string = 'daemon';

  public static readonly VF_THREADS_INTERRUPTED: string = 'interrupted';

  public static readonly VF_THREADS_STACK: string = 'stack';

  public static readonly VF_THREAD_STATISTICS_LIVE: string = 'live';

  public static readonly VF_THREAD_STATISTICS_MAXIMUM_LIVE: string = 'maximumLive';

  public static readonly VF_THREAD_STATISTICS_TOTAL_STARTED: string = 'totalStarted';

  public static readonly VF_CLUSTER_ID: string = 'id';

  public static readonly VF_CLUSTER_ROLE: string = 'role';

  public static readonly VF_CLUSTER_TIME: string = 'time';

  public static readonly VF_DATABASE_MAX_QUERY_TIME: string = 'maxQueryTime';

  public static readonly VF_DATABASE_DELETED: string = 'deleted';

  public static readonly VF_DATABASE_INSERTED: string = 'inserted';

  public static readonly VF_DATABASE_UPDATED: string = 'updated';

  public static readonly VF_DATABASE_LOADED: string = 'loaded';

  public static readonly VF_DATABASE_TRANSACTIONS: string = 'transactions';

  public static readonly VF_DATABASE_QUERIES: string = 'queries';

  public static readonly VF_DATABASE_CONNECTION_UNCLOSED_CONNECTIONS: string = 'unclosedConnections';

  public static readonly VF_DATABASE_CONNECTION_BUSY_CONNECTIONS: string = 'busyConnections';

  public static readonly VF_DATABASE_CONNECTION_IDLE_CONNECTIONS: string = 'idleConnections';

  public static readonly VF_DATABASE_CONNECTION_CONNECTIONS: string = 'connections';

  public static readonly VF_DATABASE_CLUSTER_NODE: string = 'node';

  public static readonly VF_DATABASE_CLUSTER_ALIVE: string = 'alive';

  public static readonly VF_DATABASE_CLUSTER_ACTIVE: string = 'active';

  public static readonly VF_DATABASE_CLUSTER_SYNCHRONIZATION_DURATION: string = 'synchronizationDuration';

  public static readonly VF_CONTEXT: string = 'context';

  public static readonly VF_VARIABLE_COUNT: string = 'variableCount';

  public static readonly VF_FUNCTION_COUNT: string = 'functionCount';

  public static readonly VF_EVENT_COUNT: string = 'eventCount';

  public static readonly VF_ACTION_COUNT: string = 'actionCount';

  public static readonly VF_VARIABLES_READ: string = 'variablesRead';

  public static readonly VF_VARIABLES_WRITTEN: string = 'variablesWritten';

  public static readonly VF_FUNCTION_CALLED: string = 'functionsCalled';

  public static readonly VF_EVENTS_FIRED: string = 'eventsFired';

  public static readonly VF_EVENT_HANDLE_OFFERS: string = 'eventHandleOffers';

  public static readonly VF_EVENT_HANDLE_EXECUTIONS: string = 'eventHandleExecutions';

  public static readonly VF_EVENT_LISTENER_COUNT: string = 'eventListenerCount';

  public static readonly VF_EVENT_QUEUES_LENGTH: string = 'eventQueuesLength';

  public static readonly VF_CURRENT_VALUES: string = 'currentValues';

  public static readonly FIF_REGISTER_NAME: string = 'name';

  public static readonly FIF_REGISTER_PASSWORD: string = 'password';

  public static readonly FIF_REGISTER_PASSWORD_RE: string = 'passwordRe';

  public static readonly FIF_REGISTER_PERMISSIONS: string = 'permissions';

  public static readonly FIF_REGISTER_ADMIN_PERMISSIONS: string = 'adminPermissions';

  public static readonly FIF_REGISTER_GLOBAL_PERMISSIONS: string = 'globalPermissions';

  public static readonly FIF_LOGIN_USERNAME: string = 'username';

  public static readonly FIF_LOGIN_LOGIN: string = 'login';

  public static readonly FIF_LOGIN_PASSWORD: string = 'password';

  public static readonly FIF_LOGIN_CODE: string = 'code';

  public static readonly FIF_LOGIN_STATE: string = 'state';

  public static readonly FIF_LOGIN_PROVIDER: string = 'provider';

  public static readonly FIF_RESTART_ISTANTLY: string = 'instantly';

  public static readonly FIF_RESTART_DELAY: string = 'delay';

  public static readonly FIF_RESTART_REASON: string = 'reason';

  public static readonly FIF_STOP_INSTANTLY: string = 'instantly';

  public static readonly FIF_STOP_DELAY: string = 'delay';

  public static readonly FIF_STOP_REASON: string = 'reason';

  public static readonly FIF_EXECUTE_NATIVE_QUERY_UPDATE: string = 'update';

  public static readonly FIF_EXECUTE_NATIVE_QUERY_QUERY: string = 'query';

  public static readonly FIF_EXECUTE_QUERY_QUERY: string = 'query';

  public static readonly FIF_CHANGE_PASSWORD_OLD_PASSWORD: string = 'oldPassword';

  public static readonly FIF_CHANGE_PASSWORD_NEW_PASSWORD: string = 'newPassword';

  public static readonly FIF_CHANGE_PASSWORD_REPEAT_PASSWORD: string = 'repeatPassword';

  public static readonly FIF_GET_FORMAT_ID: string = 'id';

  public static readonly FOF_GET_FORMAT_DATA: string = 'data';

  public static readonly EF_CONTEXT_ADDED_CONTEXT: string = 'context';

  public static readonly EF_CONTEXT_REMOVED_CONTEXT: string = 'context';

  public static readonly EF_CONTEXT_CREATED_CONTEXT: string = 'context';

  public static readonly EF_CONTEXT_DESTROYED_CONTEXT: string = 'context';

  public static readonly EF_CONTEXT_INFO_CHANGED_CONTEXT: string = 'context';

  public static readonly EF_FEEDBACK_MESSAGE: string = 'message';

  public static readonly EF_CONTEXT_RELOCATED_OLD_PATH: string = 'oldPath';

  public static readonly EF_CONTEXT_RELOCATED_NEW_PATH: string = 'newPath';

  public static readonly EF_CONTEXT_ENTITY_ADDED_CONTEXT: string = 'context';

  public static readonly EF_CONTEXT_ENTITY_ADDED_ENTITY: string = 'entity';

  public static readonly EF_CONTEXT_ENTITY_ADDED_ENTITY_TYPE: string = 'entityType';

  public static readonly EF_CONTEXT_ENTITY_REMOVED_CONTEXT: string = 'context';

  public static readonly EF_CONTEXT_ENTITY_REMOVED_ENTITY: string = 'entity';

  public static readonly EF_CONTEXT_ENTITY_REMOVED_ENTITY_TYPE: string = 'entityType';

  public static readonly EF_STARTUP_DURATION: string = 'startupDuration';
}
