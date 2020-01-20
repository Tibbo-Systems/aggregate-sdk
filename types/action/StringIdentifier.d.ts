import JObject from '../util/java/JObject';
export default class StringIdentifier extends JObject {
    private id;
    constructor(id?: string);
    getId(): string;
    equals(o: JObject | null): boolean;
    toString(): string;
}
