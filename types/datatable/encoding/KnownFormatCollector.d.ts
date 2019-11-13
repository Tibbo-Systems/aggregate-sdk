import JObject from '../../util/java/JObject';
export default class KnownFormatCollector extends JObject {
    private readonly formatIds;
    isKnown(formatId: number): boolean;
    isMarked(formatId: number): boolean;
    makeKnown(formatId: number, mark: boolean): void;
}
