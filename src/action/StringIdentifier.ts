import JObject from '../util/java/JObject';

export default class StringIdentifier extends JObject {
  private id: string;

  constructor(id?: string) {
    super();
    if (id == null) {
      throw new Error('npe in StringIdentifier');
    }
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public equals(o: Object | null): boolean {
    if (!(o instanceof StringIdentifier)) {
      return false;
    }

    const sid = o as StringIdentifier;
    return this.id == null ? sid.id == null : this.id === sid.id;
  }

  toString() {
    return this.id == null ? super.toString() : this.id;
  }
}
