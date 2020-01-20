export default class JObject {
  public equals(obj: JObject | null): boolean {
    return this === obj;
  }

  public clone(): JObject {
    return Object.create(this);
  }
}
