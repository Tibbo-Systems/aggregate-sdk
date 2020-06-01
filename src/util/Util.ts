import JObject from './java/JObject';
import ByteBuffer from 'bytebuffer';
import Cres from '../Cres';
import moment from 'moment';
import StringBuilder from './java/StringBuilder';
import Comparable from './java/Comparable';
import DataTable from '../datatable/DataTable';
import ContextUtils from '../context/ContextUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const isEqual = require('lodash.isequal');

export default class Util {
  private static readonly NULL: string = 'NULL';
  private static readonly DATE_FORMAT_REGEXPS: Map<string, string> = new Map<string, string>();

  public static compareTo(o1: any, o2: any): number {
    if (o1 == null && o2 == null) {
      return 0;
    } else if (o1 == null || o2 == null) {
      return -1;
    }
    if (Util.isNumber(o1) && Util.isNumber(o2)) {
      return Util.compare(o1, o2);
    } else if (Util.isString(o1) && Util.isString(o2)) {
      return (o1 as string).localeCompare(o2 as string);
    } else if (Util.isBoolean(o1) && Util.isBoolean(o2)) {
      return o1 === o2 ? 0 : -1;
    } else if (Util.isComparable(o1) && Util.isComparable(o2)) {
      return o1.compareTo(o2);
    }

    throw new Error('Uncomparable value error');
  }

  public static equals(o1: any, o2: any): boolean {
    if (o1 == null) {
      return o2 == null;
    } else if (o1 instanceof JObject) {
      return o1.equals(o2);
    } else {
      return isEqual(o1, o2);
    }
  }

  public static byteBufferEquals(o1: ByteBuffer | null, o2: ByteBuffer | null): boolean {
    if (o1 == o2) return true;
    if (o1 == null || o2 == null) return false;

    const length = o1.limit;

    if (o2.limit != length) return false;

    o1.mark();
    o2.mark();
    let res = true;
    for (let i = 0; i < o1.limit; i++) {
      if (o1.readByte() !== o2.readByte()) {
        res = false;
        break;
      }
    }

    o1.reset();
    o2.reset();
    return res;
  }

  public static isComparable(value: any): value is Comparable<any> {
    // eslint-disable-next-line no-prototype-builtins
    return value.hasOwnProperty('compareTo');
  }

  public static isNumber(value: any): value is number {
    return value instanceof Number || typeof value === 'number';
  }

  public static isString(value: any): value is string {
    return value instanceof String || typeof value === 'string';
  }

  public static isBoolean(value: any): value is boolean {
    return value instanceof Boolean || typeof value === 'boolean';
  }

  public static convertToNumber(value: any, validate: boolean, allowNull: boolean): number | null {
    if (value == null) {
      if (allowNull) {
        return null;
      }
      if (validate) {
        throw new Error(Cres.get().getString('utCannotConvertToNumber') + this.getObjectDescription(value));
      }
      return 0;
    }

    if (value instanceof DataTable) {
      const table: DataTable = value;

      if (table.getRecordCount() == 0 || table.getFieldCount() == 0) {
        if (validate) {
          throw new Error(Cres.get().getString('utCannotConvertToNumber') + table);
        }
        return 0;
      }

      return this.convertToNumber(table.get(), validate, allowNull);
    }

    // TODO not implemented yet
    /*
        if (value instanceof ExtendedNumber)
        {
            Number number = ((ExtendedNumber) value).getNumber();
            return convertToNumber(number, validate, allowNull);
        }
         */

    if (this.isNumber(value)) {
      return value;
    }

    if (value instanceof Date) {
      return (value as Date).getTime();
    }

    if (this.isBoolean(value)) {
      return (value as boolean) ? 1 : 0;
    }

    let parseResult = parseInt(value.toString());
    if (!isNaN(parseResult)) {
      return parseResult;
    }

    parseResult = parseFloat(value.toString());
    if (!isNaN(parseResult)) {
      return parseResult;
    }

    const aBoolean: boolean | null = this.convertToBoolean(value, false, true);
    if (aBoolean != null) {
      return aBoolean ? 1 : 0;
    }

    if (this.NULL === value.toString().toUpperCase()) {
      return allowNull ? null : 0;
    }

    if (validate) {
      throw new Error(Cres.get().getString('utCannotConvertToNumber') + this.getObjectDescription(value));
    } else {
      return allowNull ? null : 0;
    }
  }

  public static descriptionToName(value: string): string {
    const sb: StringBuilder = new StringBuilder();
    for (let i = 0; i < value.length; i++) {
      const c: string = value.charAt(i);
      if (ContextUtils.isValidContextNameChar(c)) {
        sb.append(c);
      } else {
        sb.append('_');
      }
    }
    return sb.toString();
  }

  public static convertToBoolean(value: any, validate: boolean, allowNull: boolean): boolean | null {
    if (value == null) {
      if (allowNull) {
        return null;
      }
      if (validate) {
        throw new Error(Cres.get().getString('utCannotConvertToBoolean') + this.getObjectDescription(value));
      }
      return false;
    }

    if (value instanceof DataTable) {
      const table: DataTable = value;

      if (table.getRecordCount() == 0 || table.getFieldCount() == 0) {
        if (validate) {
          throw new Error(Cres.get().getString('utCannotConvertToBoolean') + table);
        }
        return false;
      }

      return this.convertToBoolean(table.get(), validate, allowNull);
    }

    if (this.isBoolean(value)) {
      return value;
    }

    if (this.isNumber(value)) {
      return value != 0;
    }

    if (this.isString(value)) {
      const s: string = value;
      if (s.toLowerCase() === 'true' || s.toLowerCase() === '1') {
        return true;
      }
      if (s.toLowerCase() === 'false' || s.toLowerCase() === '0') {
        return false;
      }
    }

    if (validate) {
      throw new Error(Cres.get().getString('utCannotConvertToBoolean') + this.getObjectDescription(value));
    } else {
      return allowNull ? null : false;
    }
  }

  public static getObjectDescription(o: any): string {
    if (o === null) {
      return 'null';
    }

    return o.toString();
  }

  public static parse(dateString: moment.MomentInput, dateFormat: moment.MomentFormatSpecification) {
    const date = moment(dateString, dateFormat);
    const utc = date.utc();
    return utc.toDate();
  }

  public static parseSmart(dateString: string): Date {
    const dateFormat: string | null = this.determineDateFormat(dateString);
    if (dateFormat == null) {
      throw new Error(Cres.get().getString('utUnknownDateFormat') + dateFormat);
    }
    return this.parse(dateString, dateFormat);
  }

  public static determineDateFormat(dateString: string): string | null {
    const dates = Array.from(this.DATE_FORMAT_REGEXPS.entries());
    if (dates) {
      const findResult = dates.find((entry) => {
        dateString.toLowerCase().match(entry[0]);
      });
      return findResult ? findResult[1] : null;
    } else {
      return null;
    }
  }

  public static compare(x: number, y: number): number {
    return x < y ? -1 : x === y ? 0 : 1;
  }

  public static convertToDate(value: any, validate: boolean, allowNull: boolean): Date | null {
    if (value == null) {
      if (allowNull) {
        return null;
      }
      if (validate) {
        throw new Error(Cres.get().getString('utCannotConvertToDate') + this.getObjectDescription(value));
      }
      return new Date();
    }

    if (value instanceof DataTable) {
      const table: DataTable = value;

      if (table.getRecordCount() == 0 || table.getFieldCount() == 0) {
        if (validate) {
          throw new Error(Cres.get().getString('utCannotConvertToDate') + table);
        }
        return new Date();
      }

      return this.convertToDate(table.get(), validate, allowNull);
    }

    if (this.isNumber(value)) {
      return new Date(value);
    }

    if (value instanceof Date) {
      return value;
    }

    try {
      return this.parseSmart(value.toString());
    } catch (ex) {
      if (validate) {
        throw new Error(Cres.get().getString('utCannotConvertToDate') + this.getObjectDescription(value));
      } else {
        return allowNull ? null : new Date();
      }
    }
  }

  public static isUpperCase(value: string): boolean {
    return value === value.toUpperCase();
  }

  //TODO Implement Cause

  public static getRootCause(th: Error) {
    const cur: Error = th;
    return cur;
  }

  public static nameToDescription(name: string): string {
    const sb: StringBuilder = new StringBuilder();

    let prevWasUpper = false,
      nextToUpper = false;

    for (let i = 0; i < name.length; i++) {
      let c: string = name.charAt(i);

      if (this.isUpperCase(c)) {
        if (!prevWasUpper && i != 0) {
          sb.append(' ');
        }
        prevWasUpper = true;
      } else {
        prevWasUpper = false;
      }

      if (i == 0 || nextToUpper) {
        c = c.toUpperCase();
        nextToUpper = false;
      }

      if (c == '_') {
        sb.append(' ');
        nextToUpper = true;
      } else {
        sb.append(c);
      }
    }

    return sb.toString();
  }
}
