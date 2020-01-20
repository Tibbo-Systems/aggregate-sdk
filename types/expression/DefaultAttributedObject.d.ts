import AttributedObject from './AttributedObject';
export default class DefaultAttributedObject extends AttributedObject {
    private value;
    private timestamp;
    private quality;
    constructor(value: any, timestamp?: Date | null, quality?: number | null);
    getQuality(): number | null;
    getTimestamp(): Date | null;
    getValue(): any;
    setQuality(quality: number): void;
    setTimestamp(timestamp: Date): void;
    toString(): string;
}
