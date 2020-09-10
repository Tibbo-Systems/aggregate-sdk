export default class PermissionType {
  private _pattern: number;
  private _name: string;
  private _description: string;

  constructor(pattern: number, name: string, description: string) {
    this._pattern = pattern;
    this._name = name;
    this._description = description;
  }

  get pattern(): number {
    return this._pattern;
  }

  set pattern(value: number) {
    this._pattern = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
}
