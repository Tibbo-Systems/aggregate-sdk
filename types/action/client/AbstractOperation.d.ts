import Operation from './Operation';
import DataTable from '../../datatable/DataTable';
import Context from '../../context/Context';
export default abstract class AbstractOperation implements Operation {
    private readonly name;
    private description;
    private help;
    private iconId;
    private readonly group;
    private readonly context;
    private readonly invokerContext;
    constructor(name: string, description: string, iconId: string, group: string, context: Context<any, any>, invokerContext?: Context<any, any> | null);
    checkAvailability(): void;
    execute(params?: DataTable): void;
    getContext(): Context<any, any>;
    abstract getDefaultParameters(): DataTable | null;
    getDescription(): string;
    getExecutionGroup(): number;
    getGroup(): string;
    getHelp(): string;
    getIconId(): string;
    getInvokerContext(): Context<any, any>;
    getName(): string;
    interrupt(): void;
    isDefault(): boolean;
    isEnabled(): boolean;
    shouldIgnoreBaseGroup(): boolean;
}
