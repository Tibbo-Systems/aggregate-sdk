import EntityDefinition from './EntityDefinition';
import JObject from '../util/java/JObject';
import Log from '../Log';
import ValidatorHelper from '../datatable/validator/ValidatorHelper';

export default abstract class AbstractEntityDefinition extends JObject implements EntityDefinition {
  //TODO can be null
  private name = '';
  private description: string | null = null;
  private help: string | null = null;
  //TODO can be null
  private group = '';
  protected index: number | null = null;
  private iconId: string | null = null;
  private owner: any | null = null;

  getDescription(): string | null {
    return this.description;
  }

  getEntityType(): number | null {
    return null;
  }

  getGroup(): string {
    return this.group;
  }

  getHelp(): string | null {
    return this.help;
  }

  getIconId(): string | null {
    return this.iconId;
  }

  getIndex(): number | null {
    return this.index;
  }

  getName(): string {
    return this.name;
  }

  getOwner(): any {
    return this.owner;
  }

  toDetailedString(): string | null {
    return this.description != null ? this.description + ' (' + this.name + ')' : this.name;
  }

  public setName(name: string): void {
    if (Log.CONTEXT.isDebugEnabled()) {
      try {
        ValidatorHelper.NAME_SYNTAX_VALIDATOR.validate(null, null, null, name);
      } catch (e) {
        Log.CONTEXT.debug(" name '" + name + "' breaks naming policy. The entity can be broken after ecnoding->decoding sequence.", e);
      }
    }
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setHelp(help: string): void {
    this.help = help;
  }

  public setGroup(group: string): void {
    this.group = group;
  }

  public setIndex(index: number): void {
    this.index = index;
  }

  public setIconId(iconId: string): void {
    this.iconId = iconId;
  }

  public setOwner(owner: JObject): void {
    this.owner = owner;
  }
}
