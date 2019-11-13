import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import DataRecord from '../datatable/DataRecord';

export default class EntityRelatedActionDescriptor extends AggreGateBean {
  public static initEntityRelatedActionDescriptor: boolean = false;

  public static readonly FIELD_MASK: string = 'mask';
  public static readonly FIELD_ENTITY: string = 'entity';
  public static readonly FIELD_TARGET: string = 'target';
  public static readonly FIELD_ACTION: string = 'action';
  public static readonly FIELD_DESCRIPTION: string = 'description';
  public static readonly FIELD_ICON: string = 'icon';

  public static readonly FORMAT: TableFormat = new TableFormat();

  private static initializeEntityRelatedActionDescriptor0() {
    EntityRelatedActionDescriptor.FORMAT.addField('<' + EntityRelatedActionDescriptor.FIELD_MASK + '><S><F=N>');
    EntityRelatedActionDescriptor.FORMAT.addField('<' + EntityRelatedActionDescriptor.FIELD_ENTITY + '><S><F=N>');
    EntityRelatedActionDescriptor.FORMAT.addField('<' + EntityRelatedActionDescriptor.FIELD_TARGET + '><S><F=N>');
    EntityRelatedActionDescriptor.FORMAT.addField('<' + EntityRelatedActionDescriptor.FIELD_ACTION + '><S>');
    EntityRelatedActionDescriptor.FORMAT.addField('<' + EntityRelatedActionDescriptor.FIELD_DESCRIPTION + '><S>');
    EntityRelatedActionDescriptor.FORMAT.addField('<' + EntityRelatedActionDescriptor.FIELD_ICON + '><S><F=N>');
  }

  public static initializeEntityRelatedActionDescriptor() {
    if (EntityRelatedActionDescriptor.initEntityRelatedActionDescriptor) return;

    EntityRelatedActionDescriptor.initializeEntityRelatedActionDescriptor0();
    EntityRelatedActionDescriptor.initEntityRelatedActionDescriptor = true;
  }

  /**
   * Mask of contexts for those action is available. If NULL, action is available for all contexts.
   */
  private mask: string | null = null;

  /**
   * Entity, group of entities (ending with .*) for those action is available of NULL for any entity.
   */
  private entity: string | null = null;

  /**
   * Path of context to call action from. If NULL, action will be called from current context. May include username pattern ('%'), that will be substituted by the login of current user.
   */
  private target: string | null = null;

  /**
   * Name of the action to call.
   */
  private action: string | null = null;

  /**
   * Description of the action.
   */
  private description: string | null = null;

  /**
   * Icon ID of the action.
   */
  private icon: string | null = null;

  constructor(
    mask: string | null = null,
    entity: string | null = null,
    target: string | null = null,
    action: string | null = null,
    description: string | null = null,
    iconId: string | null = null,
    data?: DataRecord
  ) {
    super(EntityRelatedActionDescriptor.FORMAT, data);
    this.mask = mask;
    this.entity = entity;
    this.target = target;
    this.action = action;
    this.description = description;
    this.icon = iconId;
  }

  public static fromDataRecord(data: DataRecord) {
    return new EntityRelatedActionDescriptor(null, null, null, null, null, null, data);
  }

  public getMask(): string | null {
    return this.mask;
  }

  public setMask(mask: string | null) {
    this.mask = mask;
  }

  public getEntity(): string | null {
    return this.entity;
  }

  public getTarget() {
    return this.target;
  }

  public setTarget(target: string | null) {
    this.target = target;
  }

  public getAction(): string | null {
    return this.action;
  }

  public setAction(action: string | null) {
    this.action = action;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public getIcon(): string | null {
    return this.icon;
  }

  public setEntity(group: string | null) {
    this.entity = group;
  }

  public setDescription(description: string | null) {
    this.description = description;
  }

  public setIcon(icon: string | null) {
    this.icon = icon;
  }
}

EntityRelatedActionDescriptor.initializeEntityRelatedActionDescriptor();
