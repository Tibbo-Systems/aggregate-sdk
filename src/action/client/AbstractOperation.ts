import Operation from './Operation';
import DataTable from '../../datatable/DataTable';
import Context from '../../context/Context';

export default abstract class AbstractOperation implements Operation {
  private readonly name: string;
  private description: string;
  private help = '';
  private iconId: string;
  private readonly group: string;

  private readonly context: Context<any, any>;
  private readonly invokerContext: Context<any, any>;

  constructor(name: string, description: string, iconId: string, group: string, context: Context<any, any>, invokerContext: Context<any, any> | null = null) {
    this.name = name;
    this.description = description;
    this.iconId = iconId;
    this.group = group;
    this.context = context;
    this.invokerContext = invokerContext == null ? context : invokerContext;
  }

  checkAvailability(): void {}

  execute(params?: DataTable): void {}

  getContext(): Context<any, any> {
    return this.context;
  }

  abstract getDefaultParameters(): DataTable | null;

  getDescription(): string {
    return this.description;
  }

  getExecutionGroup(): number {
    return 0;
  }

  getGroup(): string {
    return '';
  }

  getHelp(): string {
    return this.help;
  }

  getIconId(): string {
    return '';
  }

  getInvokerContext(): Context<any, any> {
    return this.invokerContext;
  }

  getName(): string {
    return this.getName();
  }

  interrupt(): void {}

  isDefault(): boolean {
    return false;
  }

  isEnabled(): boolean {
    return true;
  }

  shouldIgnoreBaseGroup(): boolean {
    return false;
  }
}
