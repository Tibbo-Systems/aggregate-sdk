import ActionUtils from './ActionUtils';
import BasicActionDefinition from './BasicActionDefinition';
import Class from '../util/java/Class';
import Permissions from '../security/Permissions';
import Util from '../util/Util';

export default class ServerActionDefinition extends BasicActionDefinition {
  private permissions: Permissions | null = null;
  index: number | null = ActionUtils.INDEX_NORMAL;
  private headless: boolean = false;

  public constructor(name: string, descriptionOrClass?: string | Class, actionClass?: Class) {
    super(name);
  }

  public createServerActionDefinition(name: string, descriptionOrClass: string | Class, actionClass?: Class) {
    const serverActionDefinition = new ServerActionDefinition(name);

    if (Util.isString(descriptionOrClass) && !actionClass) {
      serverActionDefinition.setDescription(descriptionOrClass as string);
    } else if (descriptionOrClass instanceof Class && !actionClass) {
      serverActionDefinition.setActionClass(descriptionOrClass);
    } else if (Util.isString(descriptionOrClass) && actionClass) {
      serverActionDefinition.setActionClass(actionClass);
      serverActionDefinition.setDescription(descriptionOrClass as string);
    }
    return serverActionDefinition;
  }

  public compareTo(o: any): number {
    if (o instanceof ServerActionDefinition) {
      if (this.index && o.index) return o.index - this.index;
    }

    return 0;
  }

  public toString(): string {
    const descr = this.getDescription();
    return descr != null ? descr : this.getName();
  }

  public getPermissions(): Permissions | null {
    return this.permissions;
  }
  public setPermissions(permissions: Permissions): void {
    this.permissions = permissions;
  }

  public getIndex(): number | null {
    return this.index;
  }

  public isHeadless(): boolean {
    return this.headless;
  }

  public setIndex(index: number): void {
    this.index = index;
  }

  public setHeadless(headless: boolean): void {
    this.headless = headless;
  }
}
