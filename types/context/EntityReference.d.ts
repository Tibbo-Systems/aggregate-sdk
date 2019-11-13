import Comparable from '../util/java/Comparable';
import JObject from '../util/java/JObject';
export default class EntityReference extends JObject implements Comparable<EntityReference> {
    private context;
    private entity;
    constructor(context: string, entity: string);
    getContext(): string | null;
    getEntity(): string | null;
    setContext(context: string): void;
    setEntity(entity: string): void;
    setProperty(property: string): void;
    equals(obj: any): boolean;
    compareTo(ref: EntityReference): number;
    toString(): string;
    clone(): EntityReference;
}
