import JObject from '../util/java/JObject';

export default class PersistenceOptions extends JObject {
  setDedicatedTablePreferred(b: boolean) {}

  clone(): PersistenceOptions {
    return super.clone() as PersistenceOptions;
  }
}
