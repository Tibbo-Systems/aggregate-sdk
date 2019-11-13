import JObject from '../util/java/JObject';

export default class Expression extends JObject {
  private text: string;

  constructor(text: string | null) {
    super();
    if (text == null) {
      throw new Error();
    }

    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public toString() {
    return this.text;
  }
}
