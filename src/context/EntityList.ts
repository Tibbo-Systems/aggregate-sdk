import TableFormat from '../datatable/TableFormat';
import EntityReference from './EntityReference';
import DataTable from '../datatable/DataTable';
import SimpleDataTable from '../datatable/SimpleDataTable';
import Util from '../util/Util';
import JObject from '../util/java/JObject';
import DataRecord from '../datatable/DataRecord';

export default class EntityList extends JObject implements Iterable<EntityReference> {
  public static readonly FIELD_CONTEXT: string = 'context';
  public static readonly FIELD_ENTITY: string = 'entity';

  public static readonly FORMAT: TableFormat = new TableFormat();

  static __static_initializer_0() {
    EntityList.FORMAT.addField('<' + EntityList.FIELD_CONTEXT + '><S>');
    EntityList.FORMAT.addField('<' + EntityList.FIELD_ENTITY + '><S>');
  }

  private entities: Array<EntityReference> = new Array();

  private static _init = false;

  public static initialize() {
    if (EntityList._init) return;
    EntityList.__static_initializer_0();
    EntityList._init = true;
  }

  public constructor(data?: DataTable) {
    super();
    if (data) {
      for (let rec of data) {
        this.entities.push(
          new EntityReference(rec.getString(EntityList.FIELD_CONTEXT), rec.getString(EntityList.FIELD_ENTITY))
        );
      }
    }
  }

  public create(context: string, entity: string) {
    this.add(context, entity);
  }

  public includesRef(ref: EntityReference): boolean {
    return this.includes(ref.getContext(), ref.getEntity());
  }

  public includes(context: string | null, entity: string | null): boolean {
    for (let ref of this.entities) {
      if (Util.equals(ref.getContext(), context) && Util.equals(ref.getEntity(), entity)) {
        return true;
      }
    }

    return false;
  }

  public toDataTable(): DataTable {
    const tab: DataTable = new SimpleDataTable(EntityList.FORMAT);

    for (let ref of this.entities) {
      tab
        .addRecord()
        .addString(ref.getContext())
        .addString(ref.getEntity());
    }

    return tab;
  }

  public isEmpty(): boolean {
    return this.entities.length === 0;
  }

  public add(context: string, entity: string): void {
    if (!this.includes(context, entity)) {
      this.addRef(new EntityReference(context, entity));
    }
  }

  public addRef(ref: EntityReference): void {
    if (!this.includesRef(ref)) {
      this.entities.push(ref);
    }
  }

  public getEntities(): Array<EntityReference> {
    return this.entities;
  }

  public toString(): string {
    return this.entities.toString();
  }

  public clone(): EntityList {
    try {
      const clone: EntityList = super.clone() as EntityList;
      clone.entities = new Array();
      for (let er of this.entities) {
        clone.entities.push(er.clone());
      }
      return clone;
    } catch (ex) {
      throw new Error(ex.getMessage());
    }
  }

  [Symbol.iterator]() {
    let count = 0;
    const entities = this.getEntities();

    return {
      next(): IteratorResult<EntityReference> {
        if (count < entities.length) {
          return {
            done: false,
            value: entities[count++],
          };
        } else {
          return {
            done: true,
            value: null,
          };
        }
      },
    };
  }

  public equals(obj: any): boolean {
    if (this == obj) {
      return true;
    }

    if (obj == null) {
      return false;
    }
    const other: EntityList = obj;
    if (this.entities == null) {
      if (other.entities != null) return false;
    } else if (!Util.equals(this.entities, other.entities)) return false;
    return true;
  }
}

EntityList.initialize();
