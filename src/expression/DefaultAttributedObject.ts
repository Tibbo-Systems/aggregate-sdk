import AttributedObject from './AttributedObject';

export default class DefaultAttributedObject extends AttributedObject {
  private value: any;
  private timestamp: Date | null = null;
  private quality: number | null = null;

  constructor(value: any, timestamp: Date | null = null, quality: number | null = null) {
    super();
    this.value = value;
    this.timestamp = timestamp;
    this.quality = quality;
  }

  getQuality(): number | null {
    return this.quality;
  }

  getTimestamp(): Date | null {
    return this.timestamp;
  }

  getValue(): any {
    return this.value;
  }

  setQuality(quality: number): void {
    this.quality = quality;
  }

  setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }

  public toString(): string {
    return 'DefaultAttributedObject [value=' + this.value + ']';
  }
}
