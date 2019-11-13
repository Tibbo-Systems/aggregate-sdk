import TableFormat from '../datatable/TableFormat';
import EntityReference from './EntityReference';
import DataTable from '../datatable/DataTable';
import JObject from '../util/java/JObject';
export default class EntityList extends JObject implements Iterable<EntityReference> {
    static readonly FIELD_CONTEXT: string;
    static readonly FIELD_ENTITY: string;
    static readonly FORMAT: TableFormat;
    static __static_initializer_0(): void;
    private entities;
    private static _init;
    static initialize(): void;
    constructor(data?: DataTable);
    create(context: string, entity: string): void;
    includesRef(ref: EntityReference): boolean;
    includes(context: string | null, entity: string | null): boolean;
    toDataTable(): DataTable;
    isEmpty(): boolean;
    add(context: string, entity: string): void;
    addRef(ref: EntityReference): void;
    getEntities(): Array<EntityReference>;
    toString(): string;
    clone(): EntityList;
    [Symbol.iterator](): {
        next(): IteratorResult<EntityReference, any>;
    };
    equals(obj: any): boolean;
}
