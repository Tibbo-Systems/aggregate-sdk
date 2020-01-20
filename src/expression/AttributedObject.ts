import JObject from '../util/java/JObject';

export default class AttributedObject extends JObject {
  getValue(): any {
    throw new Error();
  }

  getQuality(): number | null {
    throw new Error();
  }

  setQuality(quality: number): void {
    throw new Error();
  }

  getTimestamp(): Date | null {
    throw new Error();
  }

  setTimestamp(timestamp: Date): void {
    throw new Error();
  }
}
