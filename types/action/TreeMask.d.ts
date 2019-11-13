export default class TreeMask {
    static readonly SEPARATOR = ".";
    private readonly mask;
    constructor(mask: string);
    includes(resourceMask: TreeMask): boolean;
    toString(): string;
}
