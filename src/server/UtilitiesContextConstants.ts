import ServerContextConstants from './ServerContextConstants';

export default class UtilitiesContextConstants {
  public static readonly SUMMARY_SORT_PRIORITY_PERIODS: number = 0;

  public static readonly SUMMARY_SORT_PRIORITY_CONTEXTS: number = 1;

  public static readonly SUMMARY_SHOW_DETAILS_NEVER: number = 0;

  public static readonly SUMMARY_SHOW_DETAILS_ALWAYS: number = 1;

  public static readonly SUMMARY_SHOW_DETAILS_VALUABLE: number = 2;

  public static readonly THREAD_INFO_MAX_DEPTH: number = 100;

  public static readonly V_GENERATE_THREAD_DUMP_RESULT: string = 'threadDumpResult';

  public static readonly V_GENERATE_HEAP_DUMP_RESULT_PATH: string = 'heapDumpResultPath';

  public static readonly V_THREAD_DUMP_PREFIX: string = 'thread_dump_';

  public static readonly V_HEAP_DUMP_PREFIX: string = 'heap_dump_';

  public static readonly V_HEAP_DUMP_EXTENSION: string = 'hprof';

  public static readonly V_HEAP_DUMP_DIR: string = 'dumps';

  public static readonly V_AGG_DUMP_EXTENSION_TXT: string = 'txt';

  public static readonly V_GENERATE_THREAD_DUMP_DAEMON: string = 'daemon';

  public static readonly V_GENERATE_THREAD_DUMP_PRIORITY: string = 'prio';

  public static readonly V_GENERATE_THREAD_DUMP_THREAD_ID: string = 'tid';

  public static readonly V_GENERATE_THREAD_DUMP_THREAD_STATE: string = 'java.lang.Thread.State';

  public static readonly V_GENERATE_THREAD_DUMP_THREAD_BLOCKED_ON: string = 'blocked on';

  public static readonly V_GENERATE_THREAD_DUMP_THREAD_WAITING_ON: string = 'waiting on';

  public static readonly V_GENERATE_THREAD_DUMP_THREAD_HEX_PREFIX: string = '0x';

  public static readonly V_GENERATE_THREAD_DUMP_LOCKED_MONITOR: string = 'locked';

  public static readonly V_GET_MODEL_POOLS_CONTEXT_NAME: string = 'contextName';

  public static readonly V_GET_MODEL_POOLS_PROPERTY_ENABLED: string = 'enabled';

  public static readonly F_DEBUG: string = 'debug';

  public static readonly F_VARIABLE_ACTIONS: string = 'variableActions';

  public static readonly F_EVENT_ACTIONS: string = 'eventActions';

  public static readonly F_INIT_ACTIONS: string = 'initActions';

  public static readonly F_GET_DATA: string = 'getData';

  public static readonly F_CHART_DATA: string = 'chartData';

  public static readonly F_ACTIONS_BY_MASK: string = 'actionsByMask';

  public static readonly F_EVENTS_BY_MASK: string = 'eventsByMask';

  public static readonly F_VARIABLES_BY_MASK: string = 'variablesByMask';

  public static readonly F_FUNCTIONS_BY_MASK: string = 'functionsByMask';

  public static readonly F_ENTITIES_BY_MASK: string = 'entitiesByMask';

  public static readonly F_EVENT_FIELDS: string = 'eventFields';

  public static readonly F_VARIABLE_FIELDS: string = 'variableFields';

  public static readonly F_VARIABLE_HISTORY: string = 'variableHistory';

  public static readonly F_STATISTICS: string = 'statistics';

  public static readonly F_RAW_STATISTICS: string = 'rawStatistics';

  public static readonly F_TOPOLOGY: string = 'topology';

  public static readonly F_DELETE_STATISTICS: string = 'deleteStatistics';

  public static readonly F_FILL_STATISTICS_FROM_HISTORY: string = 'fillStatisticsFromHistory';

  public static readonly F_ACTION_EXECUTION_PARAMETERS: string = 'actionExecutionParameters';

  public static readonly F_FUNCTION_EXECUTION_PARAMETERS: string = 'functionExecutionParameters';

  public static readonly F_ACTION_EXECUTION_PARAMETERS_REFERENCE: string = 'actionExecutionParametersReference';

  public static readonly F_FUNCTION_ACTION_EXECUTION_PARAMETERS: string = 'functionActionExecutionParameters';

  public static readonly F_USERS: string = 'users';

  public static readonly F_VARIABLE_INFO: string = 'variableInfo';

  public static readonly F_EVENT_INFO: string = 'eventInfo';

  public static readonly F_EXECUTE: string = 'execute';

  public static readonly F_LIST_VARIABLES: string = 'listVariables';

  public static readonly F_SELECTION_VALUES: string = 'selectionValues';

  public static readonly F_SUMMARY: string = 'summary';

  public static readonly F_FIRE_BACKDATED_EVENT: string = 'fireBackdatedEvent';

  public static readonly F_EDITORS: string = 'editors';

  public static readonly F_EDITOR_OPTIONS: string = 'editorOptions';

  public static readonly F_EXPRESSION: string = 'expression';

  public static readonly F_GENERATE_THREAD_DUMP: string = 'generateThreadDump';

  public static readonly F_GENERATE_HEAP_DUMP: string = 'generateHeapDump';

  public static readonly F_GET_MODEL_POOLS: string = 'getAllModelPools';

  public static readonly A_VARIABLE_HISTORY: string = 'variableHistory';

  public static readonly A_VARIABLE_INFO: string = 'variableInfo';

  public static readonly A_EVENT_INFO: string = 'eventInfo';

  public static readonly A_SHOW_DATA: string = 'showData';

  public static readonly A_SHOW_REPORT: string = 'showReport';

  public static readonly FIF_INIT_ACTIONS_CONTEXT: string = 'context';

  public static readonly FIF_INIT_ACTIONS_ACTION_NAME: string = ServerContextConstants.FIF_INIT_ACTION_ACTION_NAME;

  public static readonly FIF_INIT_ACTIONS_PARAMETERS: string =
    ServerContextConstants.FIF_INIT_ACTION_INITIAL_PARAMETERS;

  public static readonly FIF_GET_DATA_ID: string = 'id';

  public static readonly FIF_TOPOLOGY_PROVIDER: string = 'provider';

  public static readonly FIF_TOPOLOGY_CONTEXT_MODE: string = 'contextMode';

  public static readonly FIF_TOPOLOGY_NODE_MASK: string = 'nodeMask';

  public static readonly FIF_TOPOLOGY_TOPOLOGY_EXPRESSION: string = 'topologyExpression';

  public static readonly FIF_TOPOLOGY_NODE_EXPRESSION: string = 'nodeExpression';

  public static readonly FIF_TOPOLOGY_LINK_EXPRESSION: string = 'linkExpression';

  public static readonly FIF_TOPOLOGY_LINK_ID_EXPRESSION: string = 'linkIdExpression';

  public static readonly FIF_TOPOLOGY_NODE_ID_EXPRESSION: string = 'nodeIdExpression';

  public static readonly FIF_TOPOLOGY_SOURCE_EXPRESSION: string = 'sourceExpression';

  public static readonly FIF_TOPOLOGY_TARGET_EXPRESSION: string = 'targetExpression';

  public static readonly FIF_TOPOLOGY_COLOR_EXPRESSION: string = 'colorExpression';

  public static readonly FIF_TOPOLOGY_SELECTION_COLOR_EXPRESSION: string = 'selectionColorExpression';

  public static readonly FIF_TOPOLOGY_TYPE_EXPRESSION: string = 'typeExpression';

  public static readonly FIF_TOPOLOGY_INTERFACE_EXPRESSION: string = 'interfaceExpression';

  public static readonly FIF_TOPOLOGY_DIRECTED_EXPRESSION: string = 'directedExpression';

  public static readonly FIF_TOPOLOGY_WIDTH_EXPRESSION: string = 'widthExpression';

  public static readonly FIF_TOPOLOGY_LINK_DESCRIPTION_EXPRESSION: string = 'linkDescriptionExpression';

  public static readonly FIF_TOPOLOGY_LINK_COLOR_EXPRESSION: string = 'linkColorExpression';

  public static readonly FIF_TOPOLOGY_LATITUDE_EXPRESSION: string = 'latitudeExpression';

  public static readonly FIF_TOPOLOGY_LONGITUDE_EXPRESSION: string = 'longitudeExpression';

  public static readonly FIF_TOPOLOGY_LABELS: string = 'labels';

  public static readonly FIF_TOPOLOGY_IMAGE_EXPRESSION: string = 'imageExpression';

  public static readonly FIF_TOPOLOGY_TOOLTIP_EXPRESSION: string = 'tooltipExpression';

  public static readonly FIF_TOPOLOGY_AZIMUTH_EXPRESSION: string = 'azimuthExpression';

  public static readonly FIF_TOPOLOGY_RATIO_EXPRESSION: string = 'ratioExpression';

  public static readonly FIF_TOPOLOGY_PREFERRED_ACTION_NAME_EXPRESSION: string = 'preferredActionNameExpression';

  public static readonly FIF_TOPOLOGY_SHOW_NEIGHBOURING_NODES: string = 'showNeighbouringNodes';

  public static readonly FIF_DEFAUTLT_CONTEXT: string = 'defaultContext';

  public static readonly FIF_VARIABLES_BY_MASK_MASK: string = 'mask';

  public static readonly FIF_VARIABLES_BY_MASK_GROUP: string = 'group';

  public static readonly FIF_EXECUTE_COMMAND: string = 'command';

  public static readonly FIF_EXECUTE_DIRECTORY: string = 'directory';

  public static readonly FIF_EXECUTE_CHARSET: string = 'charset';

  public static readonly FIF_EVENTS_BY_MASK_MASK: string = 'mask';

  public static readonly FIF_EVENTS_BY_MASK_ALLOW_ALL: string = 'allowAll';

  public static readonly FIF_ACTIONS_BY_MASK_MASK: string = 'mask';

  public static readonly FIF_ACTIONS_BY_MASK_INCLUDE_NON_HEADLESS: string = 'includeNonHeadless';

  public static readonly FIF_FUNCTIONS_BY_MASK_MASK: string = 'mask';

  public static readonly FIF_ENTITIES_BY_MASK_MASK: string = 'mask';

  public static readonly FIF_ENTITIES_BY_MASK_TYPE: string = 'type';

  public static readonly FIF_ACTION_EXECUTION_PARAMETERS_MASK: string = 'mask';

  public static readonly FIF_ACTION_EXECUTION_PARAMETERS_ACTION: string = 'action';

  public static readonly FIF_ACTION_EXECUTION_PARAMETERS_ORIGINAL: string = 'original';

  public static readonly FIF_ACTION_EXECUTION_PARAMETERS_INTERACTIVE: string = 'interactive';

  public static readonly FIF_FUNCTION_EXECUTION_PARAMETERS_MASK: string = 'mask';

  public static readonly FIF_FUNCTION_EXECUTION_PARAMETERS_FUNCTION: string = 'function';

  public static readonly FIF_FUNCTION_EXECUTION_PARAMETERS_ORIGINAL: string = 'original';

  public static readonly FIF_EVENT_FIELDS_MASK: string = 'mask';

  public static readonly FIF_EVENT_FIELDS_EVENT: string = 'event';

  public static readonly FIF_VARIABLE_FIELDS_MASK: string = 'mask';

  public static readonly FIF_VARIABLE_FIELDS_VARIABLE: string = 'variable';

  public static readonly FIF_VARIABLE_HISTORY_CONTEXT: string = 'context';

  public static readonly FIF_VARIABLE_HISTORY_VARIABLE: string = 'variable';

  public static readonly FIF_VARIABLE_HISTORY_FROM_DATE: string = 'fromDate';

  public static readonly FIF_VARIABLE_HISTORY_TO_DATE: string = 'toDate';

  public static readonly FIF_VARIABLE_HISTORY_DATA_AS_TABLE: string = 'dataAsTable';

  public static readonly FIF_VARIABLE_HISTORY_LIMIT: string = 'limit';

  public static readonly FIF_VARIABLE_HISTORY_SORT_ASCENDING: string = 'sortAscending';

  public static readonly FIF_VARIABLE_INFO_CONTEXT: string = 'context';

  public static readonly FIF_VARIABLE_INFO_VARIABLE: string = 'variable';

  public static readonly FIF_RAW_STATISTICS_CONTEXT: string = 'context';

  public static readonly FIF_RAW_STATISTICS_NAME: string = 'name';

  public static readonly FIF_EVENT_INFO_CONTEXT: string = 'context';

  public static readonly FIF_EVENT_INFO_EVENT: string = 'event';

  public static readonly FIF_LIST_VARIABLES_GROUP: string = 'group';

  public static readonly FIF_LIST_VARIABLES_MASK: string = 'mask';

  public static readonly FOF_LIST_VARIABLES_CONTEXT: string = 'context';

  public static readonly FOF_LIST_VARIABLES_VARIABLE: string = 'variable';

  public static readonly FOF_LIST_VARIABLES_VALUE: string = 'value';

  public static readonly FIF_SELECTION_VALUES_TABLE_EXPRESSION: string = 'tableExpression';

  public static readonly FIF_SELECTION_VALUES_VALUE_EXPRESSION: string = 'valueExpression';

  public static readonly FIF_SELECTION_VALUES_DESCRIPTION_EXPRESSSION: string = 'descriptionExpresssion';

  public static readonly FIF_STATISTICS_MASK: string = 'mask';

  public static readonly FIF_STATISTICS_CHANNEL: string = 'channel';

  public static readonly FIF_STATISTICS_KEY: string = 'key';

  public static readonly FIF_STATISTICS_PERIOD: string = 'period';

  public static readonly FIF_STATISTICS_FULL: string = 'full';

  public static readonly FIF_STATISTICS_AVERAGE: string = 'average';

  public static readonly FIF_STATISTICS_MINIMUM: string = 'minimum';

  public static readonly FIF_STATISTICS_MAXIMUM: string = 'maximum';

  public static readonly FIF_STATISTICS_SUM: string = 'sum';

  public static readonly FIF_STATISTICS_FIRST: string = 'first';

  public static readonly FIF_STATISTICS_LAST: string = 'last';

  public static readonly FOF_STATISTICS_CONTEXT: string = 'context';

  public static readonly FOF_STATISTICS_START: string = 'start';

  public static readonly FOF_STATISTICS_END: string = 'end';

  public static readonly FOF_STATISTICS_KEY: string = 'key';

  public static readonly FOF_STATISTICS_AVERAGE: string = 'average';

  public static readonly FOF_STATISTICS_MINIMUM: string = 'minimum';

  public static readonly FOF_STATISTICS_MAXIMUM: string = 'maximum';

  public static readonly FOF_STATISTICS_SUM: string = 'sum';

  public static readonly FOF_STATISTICS_FIRST: string = 'first';

  public static readonly FOF_STATISTICS_LAST: string = 'last';

  public static readonly FOF_INIT_ACTIONS_ACTION_ID: string = 'actionId';

  public static readonly FOF_GET_DATA_DATA: string = 'data';

  public static readonly FIF_SUMMARY_SERIES_NAME: string = 'seriesName';

  public static readonly FIF_SUMMARY_SERIES_DESCRIPTION: string = 'seriesDescription';

  public static readonly FIF_SUMMARY_START_DATE: string = 'startDate';

  public static readonly FIF_SUMMARY_END_DATE: string = 'endDate';

  public static readonly FIF_SUMMARY_MASKS: string = 'masks';

  public static readonly FIF_SUMMARY_ENTITY: string = 'entity';

  public static readonly FIF_SUMMARY_ENTITY_TYPE: string = 'entityType';

  public static readonly FIF_SUMMARY_EXPRESSION: string = 'expression';

  public static readonly FIF_SUMMARY_DATE_EXPRESSION: string = 'dateExpression';

  public static readonly FIF_SUMMARY_GROUPING: string = 'grouping';

  public static readonly FIF_SUMMARY_AGGREGATION: string = 'aggregation';

  public static readonly FIF_SUMMARY_CHANGE_TYPE: string = 'changeType';

  public static readonly FIF_SUMMARY_OUT_OF_RANGE_VALUES_HANDLING: string = 'outOfRangeValuesHandling';

  public static readonly FIF_SUMMARY_MIN_VALUE: string = 'minValue';

  public static readonly FIF_SUMMARY_MAX_VALUE: string = 'maxValue';

  public static readonly FIF_SUMMARY_SHOW_DETAILS: string = 'showDetails';

  public static readonly FIF_SUMMARY_SHOW_TOTALS: string = 'showTotals';

  public static readonly FIF_SUMMARY_SORT_PRIORITY: string = 'sortPriority';

  public static readonly FIF_SUMMARY_TIME_ZONE: string = 'timeZone';

  public static readonly FOF_SUMMARY_PERIOD_NAME: string = 'periodName';

  public static readonly FOF_SUMMARY_PERIOD_START: string = 'periodStart';

  public static readonly FOF_SUMMARY_PERIOD_MIDDLE: string = 'periodMiddle';

  public static readonly FOF_SUMMARY_PERIOD_END: string = 'periodEnd';

  public static readonly FOF_SUMMARY_CONTEXT: string = 'context';

  public static readonly FIF_FIRE_BACKDATED_EVENT_CONTEXT: string = 'context';

  public static readonly FIF_FIRE_BACKDATED_EVENT_EVENT: string = 'event';

  public static readonly FIF_FIRE_BACKDATED_EVENT_LEVEL: string = 'level';

  public static readonly FIF_FIRE_BACKDATED_EVENT_CREATION_TIME: string = 'creationTime';

  public static readonly FIF_FIRE_BACKDATED_EVENT_DATA: string = 'data';

  public static readonly FIF_EDITORS_TYPE: string = 'type';

  public static readonly FIF_EDITOR_OPTIONS_TYPE: string = 'type';

  public static readonly FIF_EDITOR_OPTIONS_EDITOR: string = 'editor';

  public static readonly FIF_EDITOR_OPTIONS_OPTIONS: string = 'options';

  public static readonly FOF_TOPOLOGY_LINKS: string = 'links';

  public static readonly FOF_TOPOLOGY_NODES: string = 'nodes';

  public static readonly UNKNOWN: string = 'unknown';
}
