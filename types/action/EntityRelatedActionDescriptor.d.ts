import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import DataRecord from '../datatable/DataRecord';
export default class EntityRelatedActionDescriptor extends AggreGateBean {
    static initEntityRelatedActionDescriptor: boolean;
    static readonly FIELD_MASK: string;
    static readonly FIELD_ENTITY: string;
    static readonly FIELD_TARGET: string;
    static readonly FIELD_ACTION: string;
    static readonly FIELD_DESCRIPTION: string;
    static readonly FIELD_ICON: string;
    static readonly FORMAT: TableFormat;
    private static initializeEntityRelatedActionDescriptor0;
    static initializeEntityRelatedActionDescriptor(): void;
    /**
     * Mask of contexts for those action is available. If NULL, action is available for all contexts.
     */
    private mask;
    /**
     * Entity, group of entities (ending with .*) for those action is available of NULL for any entity.
     */
    private entity;
    /**
     * Path of context to call action from. If NULL, action will be called from current context. May include username pattern ('%'), that will be substituted by the login of current user.
     */
    private target;
    /**
     * Name of the action to call.
     */
    private action;
    /**
     * Description of the action.
     */
    private description;
    /**
     * Icon ID of the action.
     */
    private icon;
    constructor(mask?: string | null, entity?: string | null, target?: string | null, action?: string | null, description?: string | null, iconId?: string | null, data?: DataRecord);
    static fromDataRecord(data: DataRecord): EntityRelatedActionDescriptor;
    getMask(): string | null;
    setMask(mask: string | null): void;
    getEntity(): string | null;
    getTarget(): string | null;
    setTarget(target: string | null): void;
    getAction(): string | null;
    setAction(action: string | null): void;
    getDescription(): string | null;
    getIcon(): string | null;
    setEntity(group: string | null): void;
    setDescription(description: string | null): void;
    setIcon(icon: string | null): void;
}
