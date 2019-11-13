export default class GroupContextConstants {
  public static readonly V_REPLICATION: string = 'replication';
  public static readonly V_MEMBERS: string = 'members';
  public static readonly V_GROUP_INFO: string = 'groupInfo';
  public static readonly V_GROUP_STATUS: string = 'groupStatus';
  public static readonly V_STATIC_MEMBERS: string = 'staticMembers';
  public static readonly V_MEMBER_STATUS: string = 'memberStatus';
  public static readonly V_GROUP_STATUS_VALUE: string = 'groupStatusValue';

  public static readonly F_CALL: string = 'call';
  public static readonly F_REMOVE: string = 'remove';
  public static readonly F_ADD: string = 'add';

  public static readonly A_CREATE_NESTED_GROUP: string = 'createNestedGroup';
  public static readonly A_REPLICATE_OR_ADD: string = 'replicateOrAdd';
  public static readonly A_PRO_REMOVE_FROM_GROUP: string = 'proRemoveFromGroup';
  public static readonly A_FILTER: string = 'filter';
  public static readonly A_MULTIPLE_RESOURCE_ADDING: string = 'multipleResourceAddingAction';
  public static readonly A_DND_RESOURCE_ADDING: string = 'dndResourceAddingAction';
  public static readonly A_CONVERT_TO_STATIC: string = 'convertToStatic';

  public static readonly VF_REPLICATION_VARIABLE: string = 'variable';
  public static readonly VF_REPLICATION_DESCRIPTION: string = 'description';
  public static readonly VF_REPLICATION_REPLICATE: string = 'replicate';
  public static readonly VF_REPLICATION_USE_MASTER: string = 'useMaster';
  public static readonly VF_REPLICATION_MASTER: string = 'master';

  public static readonly VF_STATIC_MEMBERS_CONTEXT: string = 'context';

  public static readonly VF_MEMBERS_PATH: string = 'path';

  public static readonly VF_GROUP_INFO_MEMBER_TYPE: string = 'memberType';

  public static readonly VF_GROUP_STATUS_VALUE_STATUS: string = 'status';

  public static readonly FIF_REMOVE_CONTEXT: string = 'context';
  public static readonly FIF_ADD_CONTEXT: string = 'context';

  public static readonly FIF_CALL_FUNCTION: string = 'function';
  public static readonly FIF_CALL_PARAMETERS: string = 'parameters';
}
