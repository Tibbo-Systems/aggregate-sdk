import ByteBuffer from 'bytebuffer';
import moment from 'moment';
import Comparable from './java/Comparable';
import JSBI from 'jsbi';
export default class Util {
    private static readonly NULL;
    private static readonly DATE_FORMAT_REGEXPS;
    static compareTo(o1: any, o2: any): number;
    static equals(o1: any, o2: any): boolean;
    static arrayEquals(o1: Array<any>, o2: Array<any>): boolean;
    static byteBufferEquals(o1: ByteBuffer | null, o2: ByteBuffer | null): boolean;
    static isComparable(value: any): value is Comparable<any>;
    static isNumber(value: any): value is number;
    static isString(value: any): value is string;
    static isBoolean(value: any): value is boolean;
    static isBigInt(value: any): value is JSBI;
    static isPrimitive(value: any): boolean;
    static convertToLong(value: any, validate: boolean, allowNull: boolean): JSBI | null;
    static convertToNumber(value: any, validate: boolean, allowNull: boolean): number | null;
    private static convertTo;
    static descriptionToName(value: string): string;
    static convertToBoolean(value: any, validate: boolean, allowNull: boolean): boolean | null;
    static getObjectDescription(o: any): string;
    static parse(dateString: moment.MomentInput, dateFormat: moment.MomentFormatSpecification): Date;
    static parseSmart(dateString: string): Date;
    static determineDateFormat(dateString: string): string | null;
    static compare(x: JSBI | number, y: JSBI | number): number;
    static convertToDate(value: any, validate: boolean, allowNull: boolean): Date | null;
    static isUpperCase(value: string): boolean;
    static getRootCause(th: Error): Error;
    static nameToDescription(name: string): string;
    static generateId(): string;
}
