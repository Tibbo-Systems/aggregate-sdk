import TimeHelper from '../util/TimeHelper';
import JObject from '../util/java/JObject';

export default abstract class AggreGateDevice extends JObject {
  public static readonly DEFAULT_COMMAND_TIMEOUT: number = TimeHelper.HOUR_IN_MS;

  private id: string;
  private type: string;

  private name: string;
  private description: string;
  private disabled = false;

  private commandTimeout: number = AggreGateDevice.DEFAULT_COMMAND_TIMEOUT;

  constructor(id: string, type: string) {
    super();
    this.id = id;
    this.type = type;
    this.name = id;
    this.description = type;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getType(): string {
    return this.type;
  }

  public getId(): string {
    return this.id;
  }

  public getDescription(): string {
    return this.description;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public getCommandTimeout(): number {
    return this.commandTimeout;
  }

  public setCommandTimeout(commandTimeout: number): void {
    this.commandTimeout = commandTimeout;
  }

  public getInfo(): string {
    return this.type;
  }

  public toString(): string {
    const res: string = this.getDescription() != null && this.getDescription().length > 0 ? this.getDescription() : this.getType();
    return res + ' (' + this.getInfo() + ')';
  }

  equals(obj: JObject | null): boolean {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof AggreGateDevice)) {
      return false;
    }
    const other = obj as AggreGateDevice;
    if (this.description == null) {
      if (other.description != null) {
        return false;
      }
    } else if (this.description !== other.description) {
      return false;
    }
    if (this.disabled != other.disabled) {
      return false;
    }
    if (name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (name !== other.name) {
      return false;
    }
    return true;
  }
}
