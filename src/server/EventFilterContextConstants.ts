export default class EventFilterContextConstants {
  public static readonly V_RULES: string = 'rules';
  public static readonly V_PRIMARY_FIELDS: string = 'shownFields';
  public static readonly V_ADDITIONAL_FIELDS: string = 'additionalFields';
  public static readonly V_CUSTOM_HIGHLIGHTING: string = 'customHighlighting';
  public static readonly V_HISTORY_SETTINGS: string = 'historySettings';

  public static readonly F_GET_PARAMETERS: string = 'getParameters';
  public static readonly F_ACTIVATE: string = 'activate';
  public static readonly F_ADDITIONAL_REFERENCES: string = 'additionalReferences';

  public static readonly A_CONFIGURE_FROM_LOG: string = 'configureFromLog';
  public static readonly A_PARAMETERIZE: string = 'parameterize';

  public static readonly VF_ADDITIONAL_FIELDS_NAME: string = 'name';
  public static readonly VF_ADDITIONAL_FIELDS_DESCRIPTION: string = 'description';
  public static readonly VF_ADDITIONAL_FIELDS_EDESCS: string = 'edescs';
  public static readonly VF_ADDITIONAL_FIELDS_SHOWN: string = 'shown';
  public static readonly VF_CUSTOM_HIGHLIGHTING_MASK: string = 'mask';
  public static readonly VF_CUSTOM_HIGHLIGHTING_EVENT: string = 'event';
  public static readonly VF_CUSTOM_HIGHLIGHTING_EXPRESSION: string = 'expression';
  public static readonly VF_CUSTOM_HIGHLIGHTING_LEVEL: string = 'level';
  public static readonly VF_CUSTOM_HIGHLIGHTING_COLOR: string = 'color';

  public static readonly FIF_GET_PARAMETERS_REALTIME: string = 'realtime';
  public static readonly FIF_GET_PARAMETERS_EDITABLE_BINDINGS: string = 'editableBindings';

  public static readonly FIF_ACTIVATE_REALTIME: string = 'realtime';
  public static readonly FIF_ACTIVATE_LISTENER: string = 'listener';
  public static readonly FIF_ACTIVATE_PARAMETERS: string = 'parameters';
  public static readonly FIF_ACTIVATE_DEFAULT_CONTEXT: string = 'defaultContext';

  public static readonly STATUS_NORMAL: number = 0;
  public static readonly STATUS_DEFAULT: number = 1;
}
