import TableFormat from '../datatable/TableFormat';
import Context from '../context/Context';
import EntityRelatedActionDescriptor from './EntityRelatedActionDescriptor';
import CallerController from '../context/CallerController';
export default class EntityRelatedActions {
    static readonly FIELD_CONTEXT: string;
    static readonly FIELD_ENTITY: string;
    static readonly FIELD_RECORD: string;
    static readonly FIELD_FIELD: string;
    static EXECUTION_FORMAT: TableFormat;
    static __static_initializer_0(): void;
    private static _init;
    static initialize(): void;
    static getTargetContext(ad: EntityRelatedActionDescriptor, context: Context<any, any>, entity: string, entityType: number, caller: CallerController): Context<any, any> | null;
    protected static allowedContextOrNull(entity: string, entityType: number, allowedEntities: string | null, con: Context<any, any>): Context<any, any> | null;
    private static entityGroup;
}
