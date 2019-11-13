import Util from './Util';
import JObject from './java/JObject';

const cloneDeep = require('lodash.clonedeep');

export default class CloneUtils {
  /**
   * Try to create a deep clone of the provides object. This handles arrays, collections and maps. If the class in not a supported standard JDK collection type the <code>genericClone</code> will be
   * used instead.
   *
   * @param object
   *          The object to be copied.
   */
  public static deepClone<T>(object: T | null): T | null {
    if (null == object) return null;

    return cloneDeep(object);
  }

  public static genericClone<T>(object: T | null): any {
    if (null == object) return null;

    if (Util.isNumber(object) || Util.isString(object) || Util.isBoolean(object) || object instanceof Error) {
      return object;
    }

    if (object instanceof Date) {
      return new Date(object as Date);
    }

    // TODO not implemented yet
    /* if (object instanceof Color)
        {
            Color c = (Color) object;
            return new Color(c.getRed(), c.getGreen(), c.getBlue(), c.getAlpha());
        } */

    if (object instanceof Array) {
      return [...object];
    }

    if (object instanceof Map) {
      return new Map([...object]);
    }

    // TODO not implemented yet
    /* FormatConverter converter = DataTableConversion.getFormatConverter(object.getClass());
        if (converter != null)
        {
            return converter.clone(object, true);
        } */

    if (object instanceof JObject) {
      return (object as JObject).clone();
    }

    throw new Error("Doesn't clonable object");
  }
}
