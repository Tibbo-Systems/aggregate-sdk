import PermissionChecker from './PermissionChecker';
import JObject from '../util/java/JObject';
export default class Permission extends JObject {
    static readonly PERMISSION_FIELDS_SEPARATOR: string;
    static getUserEntitiesSelectionValues(): Map<number, string>;
    private context;
    private level;
    private entityType;
    private entity;
    constructor(data: string | null, checker: PermissionChecker | null);
    static createWithContextAndLevel(context: string, level: string): Permission;
    static createWithParams(context: string, entityType: number, entity: string, level: string): Permission;
    encode(): string;
    clone(): Permission;
    equals(obj: any): boolean;
    toString(): string;
    getContext(): string | null;
    getLevel(): string | null;
    setContext(entity: string): void;
    setLevel(level: string): void;
    getEntityType(): number;
    setEntityType(entityType: number): void;
    getEntity(): string | null;
    setEntity(entity: string): void;
}
