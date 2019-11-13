import JObject from './JObject';
export default class StringBuilder extends JObject {
    private value;
    constructor(str?: string);
    append(str: string | null): StringBuilder;
    toString(): string;
    length(): number;
}
