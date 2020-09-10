export default class PermissionType {
    private _pattern;
    private _name;
    private _description;
    constructor(pattern: number, name: string, description: string);
    get pattern(): number;
    set pattern(value: number);
    get name(): string;
    set name(value: string);
    get description(): string;
    set description(value: string);
}
