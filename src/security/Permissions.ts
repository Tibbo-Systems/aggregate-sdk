import JObject from '../util/java/JObject';
import Util from '../util/Util';
import PermissionChecker from './PermissionChecker';
import StringUtils from '../util/StringUtils';
import StringBuilder from '../util/java/StringBuilder';
import Permission from './Permission';

export default class Permissions extends JObject implements Iterable<Permission> {
  static readonly PERMISSIONS_SEPARATOR: string = ',';

  private permissions: Array<Permission> = new Array<Permission>();

  constructor(data?: string, checker: PermissionChecker | null = null) {
    super();

    if (!data && !checker) return;

    if (!data) {
      data = '';
    }

    if (data) {
      const pd: Array<string> = StringUtils.split(data, Permissions.PERMISSIONS_SEPARATOR);

      for (const pde of pd) {
        const permSrc: string = pde.trim();

        if (permSrc.length > 0) {
          this.permissions.push(new Permission(permSrc, checker));
        }
      }
    }
  }

  public static createWithContext(context: string, type: string) {
    const perm: Permissions = new Permissions();
    perm.permissions.push(Permission.createWithContextAndLevel(context, type));
    return perm;
  }

  public encode(): string {
    const enc: StringBuilder = new StringBuilder();

    let i = 0;

    for (const perm of this.permissions) {
      if (i > 0) {
        enc.append(Permissions.PERMISSIONS_SEPARATOR);
      }

      enc.append(perm.encode());

      i++;
    }

    return enc.toString();
  }

  public toString(): string {
    return this.encode();
  }

  public size(): number {
    return this.permissions.length;
  }

  public get(index: number): Permission {
    return this.permissions[index];
  }

  public add(permission: Permission): Permissions {
    this.permissions.push(permission);

    return this;
  }

  public addAll(permissions: Permissions): Permissions {
    for (const permission of permissions) {
      this.permissions.push(permission);
    }

    return this;
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }

    const other: Permissions = obj as Permissions;

    if (this.permissions == null) {
      if (other.permissions != null) {
        return false;
      }
    } else if (this.permissions.length !== other.permissions.length) {
      return false;
    } else {
      for (const permission of this.permissions) {
        if (!other.permissions.find(otherPermission => Util.equals(permission, otherPermission))) {
          return false;
        }
      }
    }
    return true;
  }

  [Symbol.iterator]() {
    return this.permissions[Symbol.iterator]();
  }
}
