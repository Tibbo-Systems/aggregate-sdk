import BasicActionDefinition from './BasicActionDefinition';
import Permissions from '../security/Permissions';
import ActionUtilsConstants from './ActionUtilsConstants';

export default class ServerActionDefinition extends BasicActionDefinition {
  private permissions: Permissions | null = null;
  index: number | null = ActionUtilsConstants.INDEX_NORMAL;
  private headless = false;

  public constructor(name: string, descriptionOrClass?: string) {
    super(name);
  }

  public createServerActionDefinition(name: string, descriptionOrClass: string) {
    const serverActionDefinition = new ServerActionDefinition(name);

    /*   if (Util.isString(descriptionOrClass)  ) {
      serverActionDefinition.setDescription(descriptionOrClass as string);
    } else if (descriptionOrClass instanceof Class ) {
      serverActionDefinition.setActionClass(descriptionOrClass);
    } else if (Util.isString(descriptionOrClass)) {
      serverActionDefinition.setActionClass();
      serverActionDefinition.setDescription(descriptionOrClass as string);
    }*/
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
