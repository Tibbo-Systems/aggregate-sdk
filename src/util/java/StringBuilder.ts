import JObject from './JObject';

export default class StringBuilder extends JObject {
  private value: string;

  constructor(str: string = '') {
    super();
    this.value = str;
  }

  public append(str: string | null): StringBuilder {
    if (str === null) {
      return this;
    }
    this.value = this.value.concat(str);
    return this;
  }

  public toString(): string {
    return this.value;
  }

  public length(): number {
    return this.value.length;
  }
}
