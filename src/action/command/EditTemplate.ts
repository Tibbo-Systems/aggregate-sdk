import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DataTable from '../../datatable/DataTable';

export default class EditTemplate extends GenericActionCommand {
  public static readonly EDIT_WIDGET: number = 0;
  public static readonly EDIT_ST: number = 1;
  public static readonly EDIT_SFC: number = 2;
  public static readonly EDIT_FBD: number = 3;
  public static readonly EDIT_LD: number = 4;
  public static readonly EDIT_WORKFLOW: number = 5;
  public static readonly CF_DEFAULT_CONTEXT: string = 'defaultContext';
  public static readonly CF_WIDGET_CONTEXT: string = 'widgetContext';
  public static readonly CF_WIDGET: string = 'widget';
  public static readonly CF_EDIT_MODE: string = 'editMode';
  public static readonly RF_WIDGET: string = 'widget';
  public static readonly RF_RESULT: string = 'result';

  public static CFT_EDIT_TEMPLATE: TableFormat = new TableFormat(1, 1);

  static __static_initializer_0() {
    EditTemplate.CFT_EDIT_TEMPLATE.addField('<' + EditTemplate.CF_DEFAULT_CONTEXT + '><S><F=N>');
    EditTemplate.CFT_EDIT_TEMPLATE.addField('<' + EditTemplate.CF_WIDGET_CONTEXT + '><S>');
    EditTemplate.CFT_EDIT_TEMPLATE.addField('<' + EditTemplate.CF_WIDGET + '><S><F=N>');
    EditTemplate.CFT_EDIT_TEMPLATE.addField('<' + EditTemplate.CF_EDIT_MODE + '><I>');
  }

  public static RFT_EDIT_WIDGET: TableFormat = new TableFormat(1, 1);

  static __static_initializer_1() {
    EditTemplate.RFT_EDIT_WIDGET.addField('<' + EditTemplate.RF_RESULT + '><S>');
    EditTemplate.RFT_EDIT_WIDGET.addField('<' + EditTemplate.RF_WIDGET + '><S><F=N>');
  }

  private defaultContext: string | null = null;
  private widgetContext: string | null = null;
  private widget: string | null = null;
  private editMode: number | null = null;

  private static _init = false;

  public static initialize() {
    if (EditTemplate._init) return;
    EditTemplate.__static_initializer_0();
    EditTemplate.__static_initializer_1();
    EditTemplate._init = true;
  }

  public constructor(
    type: string,
    titleOrFormat: string | null | TableFormat = EditTemplate.CFT_EDIT_TEMPLATE,
    responseFormat: TableFormat | null = EditTemplate.RFT_EDIT_WIDGET
  ) {
    super(type, titleOrFormat, responseFormat);
  }

  public static createEditTemplateWithDataTable(type: string, title: string, parameters: DataTable) {
    const editTemplate = new EditTemplate(type);
    editTemplate.setTitle(title);
    editTemplate.setParameters(parameters);
    return editTemplate;
  }

  public static createEditTemplate(
    type: string,
    title: string | null,
    defaultContext: string,
    widgetContext: string,
    widget: string,
    editMode: number
  ) {
    const editTemplate = new EditTemplate(type, title, null);
    editTemplate.setDefaultContext(defaultContext);
    editTemplate.setWidgetContext(widgetContext);
    editTemplate.setWidget(widget);
    editTemplate.setEditMode(editMode);
    return editTemplate;
  }

  public getDefaultContext(): string | null {
    return this.defaultContext;
  }

  public setDefaultContext(defaultContext: string) {
    this.defaultContext = defaultContext;
  }

  public getWidgetContext(): string | null {
    return this.widgetContext;
  }

  public setWidgetContext(widgetContext: string) {
    this.widgetContext = widgetContext;
  }

  public getWidget(): string | null {
    return this.widget;
  }

  public setWidget(widget: string) {
    this.widget = widget;
  }

  public getEditMode(): number | null {
    return this.editMode;
  }

  public setEditMode(editMode: number) {
    this.editMode = editMode;
  }
}

EditTemplate.initialize();
