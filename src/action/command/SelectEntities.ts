import GenericActionCommand from '../GenericActionCommand';
import FieldFormatFactory from '../../datatable/FieldFormatFactory';
import TableFormat from '../../datatable/TableFormat';
import FieldFormat from '../../datatable/FieldFormat';
import SimpleDataTable from '../../datatable/SimpleDataTable';
import DataTable from '../../datatable/DataTable';
import ActionUtils from '../ActionUtils';

export default class SelectEntities extends GenericActionCommand {
  public static readonly CF_TYPES: string = 'types';
  public static readonly CF_ROOT: string = 'root';
  public static readonly CF_DEFAULT: string = 'default';
  public static readonly CF_EXPANDED: string = 'expanded';
  public static readonly CF_SHOW_CHILDREN: string = 'showChildren';
  public static readonly CF_ALLOW_MASKS: string = 'allowMasks';
  public static readonly CF_SHOW_VARS: string = 'showVars';
  public static readonly CF_SHOW_FUNCS: string = 'showFuncs';
  public static readonly CF_SHOW_EVENTS: string = 'showEvents';
  public static readonly CF_SHOW_FIELDS: string = 'showFields';
  public static readonly CF_SINGLE_SELECTION: string = 'singleSelection';

  public static readonly CF_TYPES_TYPE: string = 'type';

  public static readonly RF_REFERENCE: string = 'reference';

  private static readonly CFT_SELECT_ENTITIES_TYPES: TableFormat = FieldFormatFactory.create(
    '<' + SelectEntities.CF_TYPES_TYPE + '><S>'
  ).wrap();

  public static readonly CFT_SELECT_ENTITIES: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    const ff: FieldFormat<Object> = FieldFormatFactory.create('<' + SelectEntities.CF_TYPES + '><T><F=N>');
    ff.setDefault(new SimpleDataTable(SelectEntities.CFT_SELECT_ENTITIES_TYPES)).setDefaultOverride(true);
    SelectEntities.CFT_SELECT_ENTITIES.addField(ff);
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_ROOT + '><S>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_DEFAULT + '><S><F=N>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_EXPANDED + '><S><F=N>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_SHOW_CHILDREN + '><B>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_ALLOW_MASKS + '><B>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_SHOW_VARS + '><B>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_SHOW_FUNCS + '><B>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_SHOW_EVENTS + '><B>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_SHOW_FIELDS + '><B>');
    SelectEntities.CFT_SELECT_ENTITIES.addField('<' + SelectEntities.CF_SINGLE_SELECTION + '><B>');
  }

  public static readonly RFT_SELECT_ENTITIES: TableFormat = FieldFormatFactory.create(
    '<' + SelectEntities.RF_REFERENCE + '><S>'
  ).wrap();

  private contextTypes: Array<string> | null = null;
  private rootContext: string | null = null;
  private defaultContext: string | null = null;
  private expandedContext: string | null = null;
  private showChildren: boolean = false;
  private allowMasks: boolean = false;
  private showVars: boolean = false;
  private showFuncs: boolean = false;
  private showEvents: boolean = false;
  private showFields: boolean = false;
  private singleSelection: boolean = false;

  private static _init = false;

  public static initialize() {
    if (SelectEntities._init) return;
    SelectEntities.__static_initializer_0();
    SelectEntities._init = true;
  }

  public constructor(
    type: string = ActionUtils.CMD_SELECT_ENTITIES,
    titleOrFormat: string | TableFormat = SelectEntities.CFT_SELECT_ENTITIES,
    responseFormat: TableFormat | null = SelectEntities.RFT_SELECT_ENTITIES
  ) {
    super(type, titleOrFormat, responseFormat);
  }

  public static createSelectEntitiesWithDataTable(type: string, title: string, parameters: DataTable) {
    const selectEntities = new SelectEntities(type, title, null);
    selectEntities.setParameters(parameters);
    return selectEntities;
  }

  public static createSelectEntities(
    title: string,
    contextTypes: Array<string> | null,
    rootContext: string,
    defaultContext: string | null,
    expandedContext: string | null,
    showChildren: boolean,
    allowMasks: boolean,
    showVars: boolean,
    showFuncs: boolean,
    showEvents: boolean,
    showFields: boolean,
    singleSelection: boolean
  ) {
    const selectEntities = new SelectEntities(ActionUtils.CMD_SELECT_ENTITIES, title, null);
    selectEntities.setContextTypes(contextTypes);
    selectEntities.setRootContext(rootContext);
    selectEntities.setDefaultContext(defaultContext);
    selectEntities.setExpandedContext(expandedContext);
    selectEntities.setShowChildren(showChildren);
    selectEntities.setAllowMasks(allowMasks);
    selectEntities.setShowVars(showVars);
    selectEntities.setShowFuncs(showFuncs);
    selectEntities.setShowEvents(showEvents);
    selectEntities.setShowFields(showFields);
    selectEntities.setSingleSelection(singleSelection);
    return selectEntities;
  }

  protected constructParameters(): DataTable {
    let types: DataTable | null = null;

    if (this.contextTypes != null) {
      types = new SimpleDataTable(SelectEntities.CFT_SELECT_ENTITIES_TYPES);

      for (let type of this.contextTypes) {
        types.addRecord().addString(type);
      }
    }

    return SimpleDataTable.createSimpleDataTable(
      SelectEntities.CFT_SELECT_ENTITIES,
      types,
      this.rootContext,
      this.defaultContext,
      this.expandedContext,
      this.showChildren,
      this.allowMasks,
      this.showVars,
      this.showFuncs,
      this.showEvents,
      this.showFields,
      this.singleSelection
    );
  }

  public getContextTypes(): Array<string> | null {
    return this.contextTypes;
  }

  public setContextTypes(contextTypes: Array<string> | null): void {
    this.contextTypes = contextTypes;
  }

  public getRootContext(): string | null {
    return this.rootContext;
  }

  public setRootContext(rootContext: string): void {
    this.rootContext = rootContext;
  }

  public getDefaultContext(): string | null {
    return this.defaultContext;
  }

  public setDefaultContext(defaultContext: string | null): void {
    this.defaultContext = defaultContext;
  }

  public getExpandedContext(): string | null {
    return this.expandedContext;
  }

  public setExpandedContext(expandedContext: string | null): void {
    this.expandedContext = expandedContext;
  }

  public isShowChildren(): boolean {
    return this.showChildren;
  }

  public setShowChildren(showChildren: boolean): void {
    this.showChildren = showChildren;
  }

  public isAllowMasks(): boolean {
    return this.allowMasks;
  }

  public setAllowMasks(allowMasks: boolean): void {
    this.allowMasks = allowMasks;
  }

  public isShowVars(): boolean {
    return this.showVars;
  }

  public setShowVars(showVars: boolean): void {
    this.showVars = showVars;
  }

  public isShowFuncs(): boolean {
    return this.showFuncs;
  }

  public setShowFuncs(showFuncs: boolean): void {
    this.showFuncs = showFuncs;
  }

  public isShowEvents(): boolean {
    return this.showEvents;
  }

  public setShowEvents(showEvents: boolean): void {
    this.showEvents = showEvents;
  }

  public isShowFields(): boolean {
    return this.showFields;
  }

  public setShowFields(showFields: boolean): void {
    this.showFields = showFields;
  }

  public isSingleSelection(): boolean {
    return this.singleSelection;
  }

  public setSingleSelection(singleSelection: boolean): void {
    this.singleSelection = singleSelection;
  }
}

SelectEntities.initialize();
