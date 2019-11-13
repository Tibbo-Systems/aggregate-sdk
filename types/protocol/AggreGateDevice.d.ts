import JObject from '../util/java/JObject';
export default abstract class AggreGateDevice extends JObject {
    static readonly DEFAULT_COMMAND_TIMEOUT: number;
    private id;
    private type;
    private name;
    private description;
    private disabled;
    private commandTimeout;
    constructor(id: string, type: string);
    getName(): string;
    setName(name: string): void;
    setDescription(description: string): void;
    getType(): string;
    getId(): string;
    getDescription(): string;
    isDisabled(): boolean;
    setDisabled(disabled: boolean): void;
    getCommandTimeout(): number;
    setCommandTimeout(commandTimeout: number): void;
    getInfo(): string;
    toString(): string;
    equals(obj: JObject | null): boolean;
}
