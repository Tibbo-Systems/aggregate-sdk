import PermissionChecker from './PermissionChecker';
import ContextUtilsConstants from '../context/ContextUtilsConstants';
import Cres from '../Cres';
import JObject from '../util/java/JObject';
import StringUtils from '../util/StringUtils';

export default class Permission extends JObject {
  public static readonly PERMISSION_FIELDS_SEPARATOR: string = ':';

  public static getUserEntitiesSelectionValues(): Map<number, string> {
    const map: Map<number, string> = new Map<number, string>();

    map.set(ContextUtilsConstants.ENTITY_ANY_TYPE, Cres.get().getString('all'));
    map.set(ContextUtilsConstants.ENTITY_VARIABLE, Cres.get().getString('variable'));
    map.set(ContextUtilsConstants.ENTITY_FUNCTION, Cres.get().getString('function'));
    map.set(ContextUtilsConstants.ENTITY_ACTION, Cres.get().getString('action'));
    map.set(ContextUtilsConstants.ENTITY_EVENT, Cres.get().getString('event'));
    map.set(ContextUtilsConstants.ENTITY_VARIABLE_GROUP, Cres.get().getString('variableGroup'));
    map.set(ContextUtilsConstants.ENTITY_FUNCTION_GROUP, Cres.get().getString('functionGroup'));
    map.set(ContextUtilsConstants.ENTITY_ACTION_GROUP, Cres.get().getString('actionGroup'));
    map.set(ContextUtilsConstants.ENTITY_EVENT_GROUP, Cres.get().getString('eventGroup'));

    return map;
  }

  private context: string | null = null;
  private level: string | null = null;

  private entityType: number = ContextUtilsConstants.ENTITY_ANY_TYPE;
  private entity: string = ContextUtilsConstants.ENTITY_ANY;

  constructor(data: string | null, checker: PermissionChecker | null) {
    super();

    if (data == null) {
      return;
    }

    const spd: Array<string> = StringUtils.split(data, Permission.PERMISSION_FIELDS_SEPARATOR);

    switch (spd.length) {
      case 1:
        this.setLevel(spd[0]);
        break;

      case 2:
        this.setContext(spd[0]);
        this.setLevel(spd[1]);
        break;

      case 3:
        this.setContext(spd[0]);
        this.setEntityType(parseInt(spd[1]));
        this.setLevel(spd[2]);
        break;

      case 4:
        this.setContext(spd[0]);
        this.setEntityType(parseInt(spd[1]));
        this.setEntity(spd[2]);
        this.setLevel(spd[3]);
        break;

      default:
        throw new Error("Invalid permission: '" + data + "'");
    }

    if (checker != null) {
      if (!checker.isValid(this.getLevel())) {
        throw new Error("Invalid permission type: '" + this.level + "'");
      }
    }
  }

  public static createWithContextAndLevel(context: string | null, level: string): Permission {
    const permission = new Permission(null, null);
    if (context !== null) permission.setContext(context);
    permission.setLevel(level);
    return permission;
  }

  public static createWithParams(context: string, entityType: number, entity: string, level: string): Permission {
    const permission = new Permission(null, null);
    permission.setContext(context);
    permission.setEntityType(entityType);
    permission.setEntity(entity);
    permission.setLevel(level);
    return permission;
  }

  encode(): string {
    let result: string | null;

    result = this.level;

    if (this.entityType > ContextUtilsConstants.ENTITY_ANY_TYPE) {
      if (this.entity != null && !(this.entity === ContextUtilsConstants.ENTITY_ANY)) {
        result = this.entity + Permission.PERMISSION_FIELDS_SEPARATOR + result;
      }
    }

    if (this.context != null) {
      result = this.context + Permission.PERMISSION_FIELDS_SEPARATOR + result;
    }

    return result as string;
  }

  clone(): Permission {
    try {
      return super.clone() as Permission;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  equals(obj: any): boolean {
    if (this == obj) return true;
    if (obj == null) return false;

    const other: Permission = obj as Permission;
    if (this.context == null) {
      if (other.context != null) return false;
    } else if (!(this.context === other.context)) return false;
    if (this.entity == null) {
      if (other.entity != null) return false;
    } else if (!(this.entity === other.entity)) return false;
    if (this.entityType !== other.entityType) return false;
    if (this.level == null) {
      if (other.level != null) return false;
    } else if (!(this.level === other.level)) return false;
    return true;
  }

  public toString(): string {
    return this.encode();
  }

  public getContext(): string | null {
    return this.context;
  }

  public getLevel(): string | null {
    return this.level;
  }

  public setContext(entity: string) {
    this.context = entity;
  }

  public setLevel(level: string) {
    this.level = level;
  }

  public getEntityType(): number {
    return this.entityType;
  }

  public setEntityType(entityType: number) {
    this.entityType = entityType;
  }

  public getEntity(): string | null {
    return this.entity;
  }

  public setEntity(entity: string) {
    this.entity = entity;
  }
}
