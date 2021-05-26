import { AggreGateBean, DataRecord, FieldFormat, FieldFormatFactory } from '../index';
import TableFormat from '../datatable/TableFormat';
import Cres from '../Cres';

export default class WebWindowLocation extends AggreGateBean {
  public static readonly F_BROWSER_TAB: string = 'browserTab';

  public static readonly BROWSER_TAB_CURRENT = 0;
  public static readonly BROWSER_TAB_NEW = 1;

  public static readonly FORMAT: TableFormat = new TableFormat();

  constructor(data?: DataRecord) {
    super(WebWindowLocation.FORMAT, data);
  }

  static __static_initializer_0() {
    const ff: FieldFormat<any> = FieldFormatFactory.create(
      '<' + WebWindowLocation.F_BROWSER_TAB + '><I><A=' + WebWindowLocation.BROWSER_TAB_CURRENT + '><D=' + Cres.get().getString('dashboardLocationBrowserTab') + '><H=' + Cres.get().getString('dashboardLocationBrowserTabHelp') + '>'
    );
    ff.addSelectionValue(WebWindowLocation.BROWSER_TAB_CURRENT, Cres.get().getString('dashboardLocationCurrentBrowserTab'));
    ff.addSelectionValue(WebWindowLocation.BROWSER_TAB_NEW, Cres.get().getString('dashboardLocationNewBrowserTab'));
    WebWindowLocation.FORMAT.addField(ff);
  }

  private static _init = false;

  public static initialize() {
    if (WebWindowLocation._init) return;

    WebWindowLocation.__static_initializer_0();
    WebWindowLocation._init = true;
  }

  private browserTab = 1;

  public getBrowserTab(): number {
    return this.browserTab;
  }

  setBrowserTab(browserTab: number): void {
    this.browserTab = browserTab;
  }
}

WebWindowLocation.initialize();
