import TableFormat from '../datatable/TableFormat';
import Context from '../context/Context';
import EntityRelatedActionDescriptor from './EntityRelatedActionDescriptor';
import CallerController from '../context/CallerController';
import ContextUtils from '../context/ContextUtils';
import StringUtils from '../util/StringUtils';
import ContextUtilsConstants from '../context/ContextUtilsConstants';
import Util from '../util/Util';

export default class EntityRelatedActions {
  public static readonly FIELD_CONTEXT: string = 'context';
  public static readonly FIELD_ENTITY: string = 'entity';
  public static readonly FIELD_RECORD: string = 'record';
  public static readonly FIELD_FIELD: string = 'field';

  public static EXECUTION_FORMAT: TableFormat = new TableFormat();

  static __static_initializer_0() {
    EntityRelatedActions.EXECUTION_FORMAT.addField('<' + EntityRelatedActions.FIELD_CONTEXT + '><S>');
    EntityRelatedActions.EXECUTION_FORMAT.addField('<' + EntityRelatedActions.FIELD_ENTITY + '><S>');
    EntityRelatedActions.EXECUTION_FORMAT.addField('<' + EntityRelatedActions.FIELD_RECORD + '><T><F=N>');
    EntityRelatedActions.EXECUTION_FORMAT.addField('<' + EntityRelatedActions.FIELD_FIELD + '><S><F=N>');
  }

  private static _init = false;

  public static initialize() {
    if (EntityRelatedActions._init) return;
    EntityRelatedActions.__static_initializer_0();
    EntityRelatedActions._init = true;
  }

  public static getTargetContext(
    ad: EntityRelatedActionDescriptor,
    context: Context<any, any>,
    entity: string,
    entityType: number,
    caller: CallerController
  ): Context<any, any> | null {
    const adGetMask = ad.getMask();
    if (adGetMask != null && !ContextUtils.matchesToMask(adGetMask, context.getPath())) {
      return null;
    }

    const con: Context<any, any> | null = ad.getTarget() != null ? context.get(ad.getTarget(), caller) : context;

    if (con == null) {
      return null;
    }

    return EntityRelatedActions.allowedContextOrNull(entity, entityType, ad.getEntity(), con);
  }

  protected static allowedContextOrNull(
    entity: string,
    entityType: number,
    allowedEntities: string | null,
    con: Context<any, any>
  ): Context<any, any> | null {
    if (allowedEntities == null) {
      return con;
    }

    const allowedEntitiesArray: Array<string> = StringUtils.split(
      allowedEntities,
      ContextUtilsConstants.MASK_LIST_SEPARATOR
    );
    for (let allowedEntity of allowedEntitiesArray) {
      allowedEntity = allowedEntity.trim();
      const allowedGroup: string | null = ContextUtils.getGroupName(allowedEntity);

      if (allowedGroup == null) {
        if (Util.equals(allowedEntity, entity)) {
          return con;
        }
      } else {
        const entityBaseGroup: string | null = ContextUtils.getBaseGroup(
          EntityRelatedActions.entityGroup(entity, entityType, con)
        );

        if (Util.equals(allowedGroup, entityBaseGroup)) {
          return con;
        }
      }
    }

    return null;
  }

  private static entityGroup(entity: string, entityType: number, con: Context<any, any>): string | null {
    if (con == null) return null;
    const conVD = con.getVariableDefinition(entity, null);
    const conFD = con.getFunctionDefinition(entity, null);
    const conED = con.getEventDefinition(entity, null);
    switch (entityType) {
      case ContextUtilsConstants.ENTITY_VARIABLE:
        if (conVD == null) return null;
        return conVD.getGroup();

      case ContextUtilsConstants.ENTITY_FUNCTION:
        if (conFD == null) return null;
        return conFD.getGroup();

      case ContextUtilsConstants.ENTITY_EVENT:
        if (conED == null) return null;
        return conED.getGroup();

      default:
        throw new Error('Unknown entity type: ' + entityType);
    }
  }
}

EntityRelatedActions.initialize();
