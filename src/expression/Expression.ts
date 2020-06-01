import JObject from '../util/java/JObject';
import Reference from './Reference';

export default class Expression extends JObject {
  public static readonly REFERENCE_START = '{';

  public static readonly REFERENCE_END = '}';
  private readonly text: string;
  private rootNode: any;

  constructor(text: string | Reference) {
    super();

    if (text instanceof Reference) this.text = Expression.REFERENCE_START + text.getImage() + Expression.REFERENCE_END;
    else this.text = text;
  }

  getRootNode(): any {
    return this.rootNode;
  }

  setRootNode(root: any): void {
    this.rootNode = root;
  }

  public getText(): string {
    return this.text;
  }

  public toString() {
    return this.text;
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof Expression)) {
      return false;
    }
    return this.text === obj.text;
  }

  clone(): Expression {
    const cl = new Expression(this.text);
    cl.rootNode = this.rootNode;
    return cl;
  }
}
