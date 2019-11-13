import EntityDefinition from './EntityDefinition';
import JObject from '../util/java/JObject';
export default abstract class AbstractEntityDefinition extends JObject implements EntityDefinition {
    private name;
    private description;
    private help;
    private group;
    protected index: number | null;
    private iconId;
    private owner;
    getDescription(): string | null;
    getEntityType(): number | null;
    getGroup(): string;
    getHelp(): string | null;
    getIconId(): string | null;
    getIndex(): number | null;
    getName(): string;
    getOwner(): any;
    toDetailedString(): string | null;
    setName(name: string): void;
    setDescription(description: string): void;
    setHelp(help: string): void;
    setGroup(group: string): void;
    setIndex(index: number): void;
    setIconId(iconId: string): void;
    setOwner(owner: JObject): void;
}
