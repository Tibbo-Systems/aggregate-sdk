export default interface AttributedObject {
    getValue(): any;
    getQuality(): number | null;
    setQuality(quality: number): void;
    getTimestamp(): Date | null;
    setTimestamp(timestamp: Date): void;
}
