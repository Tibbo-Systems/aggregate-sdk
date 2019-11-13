import AttributedObject from "./AttributedObject";
export default class DefaultAttributedObject implements AttributedObject {
    private value;
    private timestamp;
    private quality;
    constructor(value: any, timestamp?: Date | null, quality?: number | null);
    getQuality(): number | null;
    getTimestamp(): Date | null;
    getValue(): any;
    setQuality(quality: number): void;
    setTimestamp(timestamp: Date): void;
    toString(): String;
}
