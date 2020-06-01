import JObject from '../util/java/JObject';
import Reference from './Reference';
export default class Expression extends JObject {
    static readonly REFERENCE_START = "{";
    static readonly REFERENCE_END = "}";
    private readonly text;
    private rootNode;
    constructor(text: string | Reference);
    getRootNode(): any;
    setRootNode(root: any): void;
    getText(): string;
    toString(): string;
    equals(obj: JObject | null): boolean;
    clone(): Expression;
}
