import JObject from '../util/java/JObject';
import PermissionChecker from './PermissionChecker';
import Permission from './Permission';
export default class Permissions extends JObject implements Iterable<Permission> {
    static readonly PERMISSIONS_SEPARATOR: string;
    private permissions;
    constructor(data?: string, checker?: PermissionChecker | null);
    static createWithContext(context: string | null, type: string): Permissions;
    encode(): string;
    toString(): string;
    size(): number;
    get(index: number): Permission;
    add(permission: Permission): Permissions;
    addAll(permissions: Permissions): Permissions;
    equals(obj: JObject | null): boolean;
    [Symbol.iterator](): IterableIterator<Permission>;
}
