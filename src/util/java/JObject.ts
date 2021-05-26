export default class JObject {
  public equals(obj: JObject | null): boolean {
    return this === obj;
  }

  public clone(): JObject {
    const clone = Object.create(this);
    Object.assign(clone, this);
    return clone;
  }
}
