import Class from './Class';

export default class Reflection {
  public static getClass(value: any): Class {
    if (typeof value === 'number' || value instanceof Number) {
      return new Class('number');
    }
    if (typeof value === 'string' || value instanceof String) {
      return new Class('string');
    }
    if (typeof value === 'boolean' || value instanceof Boolean) {
      return new Class('boolean');
    }
    if (value instanceof Date) {
      return new Class('date');
    }
    /*if (value instanceof Data)
            return new Class("data");*/
    return new Class('JObject');
  }
}
