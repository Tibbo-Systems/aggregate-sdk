import AbstractFunction from '../AbstractFunction';
import Functions from '../Functions';
import Cres from '../../../Cres';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
import Util from '../../../util/Util';
import JConstants from '../../../util/java/JConstants';
import moment from 'moment';
export default class FormatFunction extends AbstractFunction {
  private FLAG_PLUS = '+';
  private FLAG_MINUS = '-';
  constructor() {
    super(Functions.GROUP_STRING_PROCESSING, 'String pattern, Object parameter1, ...', 'String', Cres.get().getString('fDescFormat'));
  }
  execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any {
    this.checkParameters(2, true, parameters);

    const pattern = parameters[0].toString();
    const data = parameters.slice(1, parameters.length);
    const format = require('sprintf-kit')({
      d: this.modifierD,
      s: this.modifierS,
      S: this.modifierS,
      b: this.modifierB,
      B: this.modifierB,
      h: this.modifierH,
      H: this.modifierH,
      m: this.formatMonth,
      c: this.modifierC,
      C: this.modifierC,
      o: this.modifierO,
      x: this.modifierX,
      X: this.modifierX,
      e: this.modifierE,
      E: this.modifierE,
      f: this.modifierF,
      g: this.modifierG,
      G: this.modifierG,
      a: this.modifierA,
      A: this.modifierA,
      I: this.formatHours,
      k: this.formatHours,
      l: this.formatHours,
      M: this.formatMinutes,
      L: this.formatMilliseconds,
      N: this.formatNanoseconds,
      p: this.ampm,
      z: this.formatTimezone,
      Z: this.formatTimezone,
      Q: this.formatMilliseconds,
      Y: this.formatYears,
      y: this.formatYears,
      j: this.formatDays,
      R: this.formatDate,
      T: this.formatDate,
      r: this.formatDate,
      D: this.formatDate,
      F: this.formatDate,
    });
    return format(pattern, ...data);
  }

  private modifierD = (value: number | Date, settings: any): string => {
    if (this.isDateFormatting(value, settings.length) && value instanceof Date) return this.formatDays(value, settings);
    try {
      if (Util.isNumber(value) && Number.isInteger(value)) {
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          return this.addSpaces(value.toString(10), settings.width);
        }
        return value.toString(10);
      } else throw new Error(`${value} is not a Integer`);
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierS = (value: any, settings: any): string => {
    if (this.isDateFormatting(value, settings.length)) return this.formatSeconds(value, settings);
    try {
      if (this.isDateFormatting(value, settings.length)) return this.formatSeconds(value, settings);
      let str = settings.type === settings.type.toUpperCase() ? String(value).toUpperCase() : String(value);
      if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
        str = this.addSpaces(str, settings.width);
      }
      return str;
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierB = (value: any, settings: any): string => {
    if (this.isDateFormatting(value, settings.length)) return this.formatMonth(value, settings);
    try {
      let bool: string;
      if (Util.isBoolean(value)) {
        bool = value.toString();
      } else if (value === null) {
        bool = 'false';
      } else bool = 'true';

      if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
        bool = this.addSpaces(bool, settings.width);
      }
      return settings.type === settings.type.toUpperCase() ? bool.toUpperCase() : bool;
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierH = (value: any, settings: any): string => {
    if (this.isDateFormatting(value, settings.length)) {
      if (settings.type === 'h') return this.formatMonth(value, settings);
      return this.formatHours(value, settings);
    }
    try {
      let hashcode: number;
      if (value === null) return String(value);
      if (Util.isBoolean(value)) {
        hashcode = value ? JConstants.TRUE_HASHCODE : JConstants.FALSE_HASHCODE;
      } else if (Util.isNumber(value) && Number.isInteger(value)) {
        hashcode = value;
      } else if (Util.isNumber(value)) {
        const buf = new ArrayBuffer(8);
        new Float64Array(buf)[0] = value;
        hashcode = new Uint32Array(buf)[0] ^ new Uint32Array(buf)[1];
      } else {
        hashcode = 0;
        const string = String(value);

        for (let i = 0; i < string.length; i++) {
          hashcode = (hashcode << 5) - hashcode + string.charCodeAt(i);
          hashcode = hashcode & hashcode;
        }
      }
      const result = settings.type === settings.type.toUpperCase() ? hashcode.toString(16).toUpperCase() : hashcode.toString(16);

      if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
        return this.addSpaces(result, settings.width);
      }
      return result;
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierC = (value: string | Date, settings: any): string => {
    if (this.isDateFormatting(value, settings.length) && value instanceof Date) {
      if (settings.type === 'c') return this.formatDate(value, settings);
      return this.formatYears(value, settings);
    }
    try {
      if (Util.isString(value)) {
        const charCode = value.charCodeAt(0);
        let char = String.fromCharCode(charCode);
        if (char !== value) throw new Error(`${char} != ${value}`);

        char = settings.type === settings.type.toUpperCase() ? char.toUpperCase() : char;
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          char = this.addSpaces(char, settings.width);
        }
        return char;
      }
    } catch (e) {
      throw new Error(e);
    }
    throw new Error(`incorrect pattern ${settings.content} or value ${value}`);
  };

  private modifierO = (value: number, settings: any): string => {
    try {
      if (Util.isNumber(value) && Number.isInteger(value)) {
        let result = value.toString(8);
        if (settings.flags) {
          result = this.formatByFlags(result, settings);
        }
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          return this.addSpaces(result, settings.width);
        }
        return result;
      } else throw new Error(`${value} is not a Integer`);
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierX = (value: number, settings: any): string => {
    try {
      if (Util.isNumber(value) && Number.isInteger(value)) {
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          return this.addSpaces(value.toString(16), settings.width);
        }
        return value.toString(16);
      } else throw new Error(`${value} is not a Integer`);
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierE = (value: number | Date, settings: any): string => {
    if (this.isDateFormatting(value, settings.length) && value instanceof Date) {
      return this.formatDays(value, settings);
    }
    if (Util.isNumber(value) && !Number.isInteger(value)) {
      let exponential = settings.precision ? value.toExponential(settings.precision) : value.toExponential();
      if (settings.flags) {
        exponential = this.formatByFlags(exponential, settings);
      }
      if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
        exponential = this.addSpaces(exponential, settings.width);
      }
      return settings.type === settings.type.toUpperCase() ? exponential.toUpperCase() : exponential;
    } else throw new Error(`${value} is not a Float`);
  };

  private modifierF = (value: number, settings: any): string => {
    try {
      if (Util.isNumber(value) && !Number.isInteger(value)) {
        let result = settings.precision ? value.toFixed(settings.precision) : value.toString(10);
        if (settings.flags) {
          result = this.formatByFlags(result, settings);
        }
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          return this.addSpaces(result, settings.width);
        }
        return result;
      } else throw new Error(`${value} is not a Float`);
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierG = (value: number, settings: any): string => {
    try {
      if (Util.isNumber(value) && !Number.isInteger(value)) {
        let result = settings.precision ? value.toPrecision(settings.precision) : value.toString(10);
        if (settings.flags) {
          result = this.formatByFlags(result, settings);
        }
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          return this.addSpaces(result, settings.width);
        }
        return settings.type === settings.type.toUpperCase() ? result.toUpperCase() : result;
      } else throw new Error(`${value} is not a Float`);
    } catch (e) {
      throw new Error(e);
    }
  };

  private modifierA = (value: number | Date, settings: any): string => {
    if (this.isDateFormatting(value, settings.length) && value instanceof Date) {
      return this.formatDays(value, settings);
    }
    try {
      if (Util.isNumber(value) && !Number.isInteger(value)) {
        if (settings.width && !this.getFlags(settings.flags).includes(this.FLAG_MINUS)) {
          return this.addSpaces(value.toString(16), settings.width);
        }
        return value.toString(16);
      } else throw new Error(`${value} is not a Float`);
    } catch (e) {
      throw new Error(e);
    }
  };

  private formatHours = (value: Date, settings: any): string => {
    if (settings.type === 'H') return moment(value).format('HH');
    if (settings.type === 'I') return moment(value).format('hh');
    if (settings.type === 'k') {
      const time = moment(value).format('HH');
      return time.charAt(0) === '0' ? time.charAt(1) : time;
    }
    if (settings.type === 'l') {
      const time = moment(value).format('hh');
      return time.charAt(0) === '0' ? time.charAt(1) : time;
    }
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatMinutes = (value: Date, settings: any): string => {
    if (settings.type === 'M') return moment(value).minutes().toString();
    throw new Error(`unknown type ${settings.type}`);
  };
  private formatSeconds = (value: Date, settings: any): string => {
    if (settings.type === 'S') return moment(value).seconds().toString();
    if (settings.type === 's') return Math.trunc(value.getTime() / 1000).toString();
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatMilliseconds = (value: Date, settings: any): string => {
    if (settings.type === 'L') return moment(value).milliseconds().toString();
    if (settings.type === 'Q') return value.getTime().toString();
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatNanoseconds = (value: Date, settings: any): string => {
    if (settings.type === 'N') return moment(value).format('SSSSSSSSS');
    throw new Error(`unknown type ${settings.type}`);
  };

  private ampm = (value: Date, settings: any): string => {
    if (settings.type === 'p') {
      return moment(value).format('a');
    }
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatTimezone = (value: Date, settings: any): string => {
    if (settings.type === 'z') {
      return moment(value).format('Z');
    }
    if (settings.type === 'Z') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatMonth = (value: Date, settings: any): string => {
    if (settings.type === 'B') {
      return moment(value).format('MMMM');
    }
    if (settings.type === 'b' || settings.type === 'h') {
      return moment(value).format('MMM');
    }
    if (settings.type === 'm') return moment(value).format('MM');
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatDays = (value: Date, settings: any): string => {
    if (settings.type === 'j') {
      const dayOfYear = moment(value).dayOfYear().toString();
      if (dayOfYear.length === 1) return `00${dayOfYear}`;
      if (dayOfYear.length === 2) return `0${dayOfYear}`;
      return dayOfYear;
    }
    if (settings.type === 'A') {
      return moment(value).format('dddd');
    }
    if (settings.type === 'a') {
      return moment(value).format('ddd');
    }
    if (settings.type === 'd') {
      return moment(value).format('DD');
    }
    if (settings.type === 'e') {
      return moment(value).format('D');
    }
    throw new Error(`unknown type ${settings.type}`);
  };

  private formatYears = (value: Date, settings: any): string => {
    if (settings.type === 'C') {
      return Math.trunc(value.getFullYear() / 100).toString();
    }
    if (settings.type === 'y') {
      return moment(value).format('YY');
    }
    if (settings.type === 'Y') {
      return moment(value).format('YYYY');
    }
    throw new Error(`unknown type ${settings.type}`);
  };
  private formatDate = (value: Date, settings: any): string => {
    if (settings.type === 'R') {
      return moment(value).format('HH:mm');
    }
    if (settings.type === 'T') {
      return moment(value).format('HH:mm:ss');
    }
    if (settings.type === 'r') {
      return moment(value).format('hh:mm:ss A');
    }
    if (settings.type === 'D') {
      return moment(value).format('MM/DD/YY');
    }
    if (settings.type === 'F') {
      return moment(value).format('YYYY-MM-DD');
    }
    if (settings.type === 'c') {
      return moment(value).format('dd MMM DD HH:mm:ss Z YYYY');
    }
    throw new Error(`unknown type ${settings.type}`);
  };
  private addSpaces = (value: string, width: number): string => {
    const length = width - value.length;
    if (length > 0) {
      return ' '.repeat(length) + value;
    }
    return value;
  };

  private formatByFlags = (value: any, settings: any): any => {
    const flags = this.getFlags(settings.flags);
    if (Number(value) && flags.includes(this.FLAG_PLUS)) {
      if (value > 0) return `+${value}`;
    }
    return value;
  };

  private getFlags = (flags?: string): Array<string> => {
    return flags ? flags.split('') : new Array<string>();
  };

  private isDateFormatting(value: any, conversion: any): boolean {
    return value instanceof Date && conversion === 't';
  }
}
