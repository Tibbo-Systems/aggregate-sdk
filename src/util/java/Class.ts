export default class Class {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }
}
