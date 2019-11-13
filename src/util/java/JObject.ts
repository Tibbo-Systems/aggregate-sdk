import Class from './Class';

export default class JObject {
  public equals(obj: JObject | null): boolean {
    return this === obj;
  }

  public clone(): JObject {
    return Object.create(this);
  }

  public static getClass(): Class {
    return new Class('JObject');
  }
}
