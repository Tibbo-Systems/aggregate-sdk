import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import ActionUtils from '../ActionUtils';

export default class ShowGuide extends GenericActionCommand {
  public static readonly CF_INVOKER_CONTEXT: string = 'invokerContext';
  public static readonly CF_MACRO_NAME: string = 'macroName';

  public static readonly CFT_SHOW_GUIDE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    ShowGuide.CFT_SHOW_GUIDE.addField('<' + ShowGuide.CF_INVOKER_CONTEXT + '><S><F=N>');
    ShowGuide.CFT_SHOW_GUIDE.addField('<' + ShowGuide.CF_MACRO_NAME + '><S><F=N>');
  }

  private invokerContext: string | null = null;
  private macroName: string | null = null;

  private static _init = false;

  public static initialize() {
    if (ShowGuide._init) return;
    ShowGuide.__static_initializer_0();
    ShowGuide._init = true;
  }

  public constructor(
    title: string | TableFormat = ShowGuide.CFT_SHOW_GUIDE,
    invokerContext?: string,
    macroName?: string
  ) {
    super(ActionUtils.CMD_SHOW_GUIDE, title, null);
    if (invokerContext && macroName) {
      this.invokerContext = invokerContext;
      this.macroName = macroName;
    }
  }

  public static createShowGuideWithDataTable(title: string, parameters: DataTable) {
    const showGuide = new ShowGuide(title);
    showGuide.setParameters(parameters);
    return showGuide;
  }

  protected constructParameters(): DataTable {
    return SimpleDataTable.createSimpleDataTable(ShowGuide.CFT_SHOW_GUIDE, this.invokerContext, this.macroName);
  }

  public getInvokerContext(): string | null {
    return this.invokerContext;
  }

  public setInvokerContext(invokerContext: string): void {
    this.invokerContext = invokerContext;
  }

  public getMacroName(): string | null {
    return this.macroName;
  }

  public setMacroName(macroName: string): void {
    this.macroName = macroName;
  }
}

ShowGuide.initialize();
