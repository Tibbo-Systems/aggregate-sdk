export default class AlertContextConstants {
  public static readonly INSTANCE_TYPE_PENDING = 0;
  public static readonly INSTANCE_TYPE_ACTIVE = 1;

  public static readonly STATUS_ENABLED = 0;
  public static readonly STATUS_DISABLED = 1;
  public static readonly STATUS_ACTIVE = 2;
  public static readonly STATUS_ESCALATED = 3;

  public static readonly CORRECTIVE_ACTION_TYPE_RISE = 0;
  public static readonly CORRECTIVE_ACTION_TYPE_ACTIVATION = 1;
  public static readonly CORRECTIVE_ACTION_TYPE_DEACTIVATION = 2;
  public static readonly CORRECTIVE_ACTION_TYPE_ESCALATION = 3;
  public static readonly CORRECTIVE_ACTION_TYPE_DEESCALATION = 4;
  public static readonly CORRECTIVE_ACTION_TYPE_ACKNOWLEDGEMENT = 5;

  public static readonly V_ALERT_ACTIONS = 'alertActions';
  public static readonly V_ESCALATION = 'escalation';
  public static readonly V_EVENT_TRIGGERS = 'eventTriggers';
  public static readonly V_VARIABLE_TRIGGERS = 'variableTriggers';
  public static readonly V_STATUS = 'status';
  public static readonly V_EVENT_TRIGGER_STATUS = 'eventTriggerStatus';
  public static readonly V_VARIABLE_TRIGGER_STATUS = 'variableTriggerStatus';
  public static readonly V_NOTIFICATIONS = 'notifications';
  public static readonly V_INTERACTIVE_ACTIONS = 'interactiveActions';
  public static readonly V_ACTIVE_INSTANCES = 'activeInstances';
  public static readonly V_PERSISTENT_STATUS = 'persistentStatus';

  public static readonly E_ALERT = 'alert';
  public static readonly E_ALERTNOTIFY = 'alertnotify';
  public static readonly E_DEACTIVATION = 'deactivation';

  public static readonly A_PENDING_ALERTS = 'pendingAlerts';

  public static readonly VF_ALERT_ACTIONS_EXECUTION_TYPE = 'executionType';
  public static readonly VF_ALERT_ACTIONS_MASK = 'mask';
  public static readonly VF_ALERT_ACTIONS_ACTION = 'action';
  public static readonly VF_ALERT_ACTIONS_INPUT = 'input';
  public static readonly VF_ALERT_ACTIONS_CONDITION = 'condition';
  public static readonly VF_ALERT_ACTIONS_RUN_FROM_SOURCE = 'runFromSource';

  public static readonly VF_ERACTIVE_ACTIONS_EXECUTION_TYPE = 'executionType';
  public static readonly VF_ERACTIVE_ACTIONS_MASK = 'mask';
  public static readonly VF_ERACTIVE_ACTIONS_ACTION = 'action';
  public static readonly VF_ERACTIVE_ACTIONS_INPUT = 'input';
  public static readonly VF_ERACTIVE_ACTIONS_RUN_FROM_SOURCE = 'runFromSource';

  public static readonly VF_STATUS_ENABLED = 'enabled';
  public static readonly VF_STATUS_PENDING_INSTANCE_COUNT = 'pendingInstanceCount';
  public static readonly VF_STATUS_MAX_PENDING_TIME = 'maxPendingTime';
  public static readonly VF_STATUS_ESCALATED = 'escalated';
  public static readonly VF_STATUS_ESCALATION_REASON = 'escalationReason';

  public static readonly VF_ACTIVE_INSTANCES_EVENT = 'event';
  public static readonly VF_ACTIVE_INSTANCES_TYPE = 'type';
  public static readonly VF_ACTIVE_INSTANCES_TIME = 'time';
  public static readonly VF_ACTIVE_INSTANCES_LEVEL = 'level';
  public static readonly VF_ACTIVE_INSTANCES_SOURCE = 'source';
  public static readonly VF_ACTIVE_INSTANCES_KEY = 'key';
  public static readonly VF_ACTIVE_INSTANCES_CAUSE = 'cause';
  public static readonly VF_ACTIVE_INSTANCES_MESSAGE = 'message';
  public static readonly VF_ACTIVE_INSTANCES_TRIGGER = 'trigger';
  public static readonly VF_ACTIVE_INSTANCES_DATA = 'data';

  public static readonly VF_EVENT_TRIGGER_STATUS_TRIGGER = 'trigger';
  public static readonly VF_EVENT_TRIGGER_STATUS_ACTIVE = 'active';
  public static readonly VF_EVENT_TRIGGER_STATUS_DETAILS = 'details';

  public static readonly VF_EVENT_TRIGGER_STATUS_DETAILS_CONTEXT = 'context';
  public static readonly VF_EVENT_TRIGGER_STATUS_DETAILS_KEY = 'key';
  public static readonly VF_EVENT_TRIGGER_STATUS_DETAILS_ACTIVE = 'active';
  public static readonly VF_EVENT_TRIGGER_STATUS_DETAILS_EVENTS = 'events';

  public static readonly VF_VARIABLE_TRIGGER_STATUS_TRIGGER = 'trigger';
  public static readonly VF_VARIABLE_TRIGGER_STATUS_ACTIVE = 'active';
  public static readonly VF_VARIABLE_TRIGGER_STATUS_DETAILS = 'details';

  public static readonly VF_VARIABLE_TRIGGER_STATUS_DETAILS_CONTEXT = 'context';
  public static readonly VF_VARIABLE_TRIGGER_STATUS_DETAILS_KEY = 'key';
  public static readonly VF_VARIABLE_TRIGGER_STATUS_DETAILS_ACTIVE = 'active';
  public static readonly VF_VARIABLE_TRIGGER_STATUS_DETAILS_TIME = 'time';
  public static readonly VF_VARIABLE_TRIGGER_STATUS_DETAILS_FLAPPING = 'flapping';

  public static readonly VF_NOTIFICATIONS_NOTIFY_OWNER = 'notifyOwner';
  public static readonly VF_NOTIFICATIONS_ACK_REQUIRED = 'ackRequired';
  public static readonly VF_NOTIFICATIONS_LIFETIME = 'lifetime';
  public static readonly VF_NOTIFICATIONS_SOUND = 'sound';
  public static readonly VF_NOTIFICATIONS_MAIL_TO_OWNER = 'mailToOwner';
  public static readonly VF_NOTIFICATIONS_MAIL_RECIPIENTS = 'mailRecipients';
  public static readonly VF_NOTIFICATIONS_ADDITIONAL_MAIL_RECIPIENTS = 'additionalMailRecipients';
  public static readonly VF_NOTIFICATIONS_SMS_RECIPIENTS = 'smsRecipients';
  public static readonly VF_NOTIFICATIONS_SMS_RECIPIENTS_PHONE = 'phone';
  public static readonly VF_NOTIFICATIONS_MAIL_RECIPIENTS_USERNAME = 'username';

  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS = 'eventTriggers';

  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_BEAN = 'bean';
  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS = 'contexts';

  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_CONTEXT = 'context';
  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_STATUSES = 'statuses';

  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_STATUSES_KEY = 'key';
  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_STATUSES_ALERT = 'alertID';
  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_STATUSES_ACTIVE = 'active';
  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_STATUSES_EVENTS = 'events';

  public static readonly VF_PERSISTENT_STATUS_EVENT_TRIGGERS_CONTEXTS_STATUSES_EVENTS_ID = 'eventID';

  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS = 'variableTriggers';

  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_BEAN = 'bean';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS = 'contexts';

  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_CONTEXT = 'context';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES = 'statuses';

  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES_KEY = 'key';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES_ALERT = 'alertID';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES_ACTIVE = 'active';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES_TIME = 'time';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES_FLAPPING = 'flapping';
  public static readonly VF_PERSISTENT_STATUS_VARIABLE_TRIGGERS_CONTEXTS_STATUSES_FLAPPING_ALERT = 'flappingAlertID';

  public static readonly VF_PERSISTENT_STATUS_ESCALATED = 'escalated';

  public static readonly EF_ALERT_DESCRIPTION = 'description';
  public static readonly EF_ALERT_CONTEXT = 'context';
  public static readonly EF_ALERT_ENTITY = 'entity';
  public static readonly EF_ALERT_CAUSE = 'cause';
  public static readonly EF_ALERT_MESSAGE = 'message';
  public static readonly EF_ALERT_TRIGGER = 'trigger';
  public static readonly EF_ALERT_DATA = 'data';
  public static readonly EF_ALERT_DURATION = 'duration';

  public static readonly EF_DEACTIVATION_ID = 'id';
  public static readonly EF_DEACTIVATION_CONTEXT = 'context';
  public static readonly EF_DEACTIVATION_DURATION = 'duration';
  public static readonly EF_DEACTIVATOR_DATA = 'deactivatorData';

  public static readonly EF_ALERTNOTIFY_DESCRIPTION = 'description';
  public static readonly EF_ALERTNOTIFY_CONTEXT = 'context';
  public static readonly EF_ALERTNOTIFY_ENTITY = 'entity';
  public static readonly EF_ALERTNOTIFY_CAUSE = 'cause';
  public static readonly EF_ALERTNOTIFY_MESSAGE = 'message';
  public static readonly EF_ALERTNOTIFY_TRIGGER = 'trigger';
  public static readonly EF_ALERTNOTIFY_DATA = 'data';
  public static readonly EF_ALERTNOTIFY_ALERT_EVENT_ID = 'alertEventId';
}
