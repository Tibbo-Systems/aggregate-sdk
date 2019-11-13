import AggreGateCommand from './AggreGateCommand';
export default class OutgoingAggreGateCommand extends AggreGateCommand {
    private static readonly COMMAND_SEPARATOR;
    protected id: string | null;
    protected async: boolean;
    protected paramCount: number;
    header(): string | null;
    footer(): string | null;
    getId(): string | null;
    isAsync(): boolean;
    setAsync(async: boolean): void;
    addParam(param: string): OutgoingAggreGateCommand;
    constructReply(id: string, code: string, message?: string, details?: string): void;
    constructEvent(context: string, name: string, level: number, encodedDataTable: string, eventId: number, creationtime: Date, listener: number): void;
}
