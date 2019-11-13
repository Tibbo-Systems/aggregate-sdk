import JObject from './java/JObject';
import ByteBuffer from 'bytebuffer';
import moment from 'moment';
import Comparable from './java/Comparable';
export default class Util {
    private static readonly NULL;
    private static readonly DATE_FORMAT_REGEXPS;
    static compareTo(o1: number | string | boolean | Comparable<JObject>, o2: number | string | boolean | Comparable<JObject>): number;
    static equals(o1: any, o2: any): boolean;
    static byteBufferEquals(o1: ByteBuffer | null, o2: ByteBuffer | null): boolean;
    static isComparable(value: any): boolean;
    static isNumber(value: any): boolean;
    static isString(value: any): boolean;
    static isBoolean(value: any): boolean;
    static convertToNumber(value: any, validate: boolean, allowNull: boolean): number | null;
    static descriptionToName(value: string): string;
    static convertToBoolean(value: any, validate: boolean, allowNull: boolean): boolean | null;
    static getObjectDescription(o: any): string;
    static parse(dateString: moment.MomentInput, dateFormat: moment.MomentFormatSpecification): Date;
    static parseSmart(dateString: string): Date;
    static determineDateFormat(dateString: string): string | null;
    static compare(x: number, y: number): number;
    static convertToDate(value: any, validate: boolean, allowNull: boolean): Date | null;
    static isUpperCase(value: string): boolean;
    static getRootCause(th: Error): Error;
    static nameToDescription(name: string): string;
}
