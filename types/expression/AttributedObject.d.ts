import JObject from '../util/java/JObject';
export default class AttributedObject extends JObject {
    getValue(): any;
    getQuality(): number | null;
    setQuality(quality: number | null): void;
    getTimestamp(): Date | null;
    setTimestamp(timestamp: Date | null): void;
}
