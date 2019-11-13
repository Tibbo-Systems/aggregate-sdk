import Class from './Class';
export default class JObject {
    equals(obj: JObject | null): boolean;
    clone(): JObject;
    static getClass(): Class;
}
