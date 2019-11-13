import JObject from '../util/java/JObject';
export default class PersistenceOptions extends JObject {
    setDedicatedTablePreferred(b: boolean): void;
    clone(): PersistenceOptions;
}
