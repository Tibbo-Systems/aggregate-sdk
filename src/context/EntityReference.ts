import Comparable from '../util/java/Comparable';
import Util from '../util/Util';
import JObject from '../util/java/JObject';

export default class EntityReference extends JObject implements Comparable<EntityReference> {
  private context: string | null = null;
  private entity: string | null = null;

  public constructor(context: string, entity: string) {
    super();
    this.context = context;
    this.entity = entity;
  }

  public getContext(): string | null {
    return this.context;
  }

  public getEntity(): string | null {
    return this.entity;
  }

  public setContext(context: string): void {
    this.context = context;
  }

  public setEntity(entity: string): void {
    this.entity = entity;
  }

  // For compatibility with LS properties table mapping
  public setProperty(property: string): void {
    this.entity = property;
  }

  public equals(obj: any): boolean {
    if (this == obj) return true;
    if (obj == null) return false;

    const other: EntityReference = obj;
    if (this.context == null) {
      if (other.context != null) return false;
    } else if (!Util.equals(this.context, other.context)) return false;
    if (this.entity == null) {
      if (other.entity != null) return false;
    } else if (!Util.equals(this.entity, other.entity)) return false;
    return true;
  }

  public compareTo(ref: EntityReference): number {
    return Util.compareTo(EntityReference.toString(), ref.toString());
  }

  public toString(): string {
    return this.context + ':' + this.entity;
  }

  public clone(): EntityReference {
    try {
      return super.clone() as EntityReference;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
}
