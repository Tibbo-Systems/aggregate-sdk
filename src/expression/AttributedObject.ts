import JObject from '../util/java/JObject';

export default class AttributedObject extends JObject {
  getValue(): any {
    throw new Error();
  }

  getQuality(): number | null {
    throw new Error();
  }

  setQuality(quality: number | null): void {
    throw new Error();
  }

  getTimestamp(): Date | null {
    throw new Error();
  }

  setTimestamp(timestamp: Date | null): void {
    throw new Error();
  }
}
