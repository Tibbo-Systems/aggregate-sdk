import JObject from '../util/java/JObject';
export default class Expression extends JObject {
    private text;
    constructor(text: string | null);
    getText(): string;
    toString(): string;
}
