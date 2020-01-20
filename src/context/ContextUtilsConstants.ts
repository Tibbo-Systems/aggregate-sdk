export default class ContextUtilsConstants {
  public static readonly CONTEXT_NAME_PATTERN: string = '^\\w*$';

  public static readonly CONTEXT_PATH_PATTERN: string = '[\\w|\\.]+';

  public static readonly CONTEXT_MASK_PATTERN: string = '[\\w|\\.|\\*]*';

  public static readonly CONTEXT_TYPE_PATTERN: string = '^[\\w|\\.]+$';

  public static readonly ENTITY_NAME_PATTERN: string = '\\w+';

  public static readonly IDENTIFIER_PATTERN: string = '\\w*';

  public static readonly CONTEXT_CLASS_SUFFIX: string = 'Context';

  public static readonly CONTEXT_NAME_SEPARATOR: string = '.';

  public static readonly CONTEXT_TYPE_SEPARATOR: string = '.';

  public static readonly CONTEXT_GROUP_MASK: string = '*';

  public static readonly ENTITY_GROUP_MASK: string = '*';

  public static readonly CONTEXT_TYPE_ANY: string = '*';

  public static readonly ENTITY_ANY: string = '';

  public static readonly ENTITY_GROUP_SEPARATOR: string = '|';

  public static readonly MASK_LIST_SEPARATOR: string = ' ';

  public static readonly GROUP_DEFAULT: string = 'default';

  public static readonly GROUP_SYSTEM: string = 'system';

  public static readonly GROUP_REMOTE: string = 'remote';

  public static readonly GROUP_CUSTOM: string = 'custom';

  public static readonly GROUP_STATUS: string = 'status';

  public static readonly GROUP_ACCESS: string = 'access';

  public static readonly ENTITY_ANY_TYPE: number = 0;

  public static readonly ENTITY_VARIABLE: number = 1;

  public static readonly ENTITY_FUNCTION: number = 2;

  public static readonly ENTITY_EVENT: number = 4;

  public static readonly ENTITY_ACTION: number = 8;

  public static readonly ENTITY_INSTANCE: number = 100;

  public static readonly ENTITY_GROUP_SHIFT: number = 200;

  public static readonly ENTITY_VARIABLE_GROUP: number = ContextUtilsConstants.ENTITY_VARIABLE + ContextUtilsConstants.ENTITY_GROUP_SHIFT; // 201

  public static readonly ENTITY_FUNCTION_GROUP: number = ContextUtilsConstants.ENTITY_FUNCTION + ContextUtilsConstants.ENTITY_GROUP_SHIFT; // 202

  public static readonly ENTITY_EVENT_GROUP: number = ContextUtilsConstants.ENTITY_EVENT + ContextUtilsConstants.ENTITY_GROUP_SHIFT; // 204

  public static readonly ENTITY_ACTION_GROUP: number = ContextUtilsConstants.ENTITY_ACTION + ContextUtilsConstants.ENTITY_GROUP_SHIFT; // 208

  public static readonly USERNAME_PATTERN: string = '%';

  public static readonly VARIABLES_GROUP_DS_SETTINGS: string = 'ds_settings';

  public static readonly ENTITY_GROUP_SUFFIX: string = '.*';
}
