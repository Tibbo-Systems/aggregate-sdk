import AggreGateBean from '../datatable/AggreGateBean';
import TableFormat from '../datatable/TableFormat';
import FieldFormat from '../datatable/FieldFormat';
import FieldFormatFactory from '../datatable/FieldFormatFactory';
import Cres from '../Cres';
import ValidatorHelper from '../datatable/validator/ValidatorHelper';
import FieldConstants from '../datatable/field/FieldConstants';
import DataRecord from '../datatable/DataRecord';
import GenericActionCommand from '../action/GenericActionCommand';

export default class DashboardProperties extends AggreGateBean {
  public static readonly FIELD_NAME: string = 'name';
  public static readonly FIELD_DESCRIPTION: string = 'description';
  public static readonly FIELD_LAYOUT: string = 'layout';
  public static readonly FIELD_COLUMNS: string = 'columns';
  public static readonly FIELD_CLOSABLE: string = 'closable';
  public static readonly FIELD_CLEANUP: string = 'cleanup';
  public static readonly FIELD_STORAGE_CONTEXT: string = 'storageContext';
  public static readonly FIELD_STORAGE_CLASS: string = 'storageClass';
  public static readonly FIELD_STORAGE_SESSION_ID: string = 'storageSessionId';
  public static readonly FIELD_DEFAULT_EVENT: string = 'defaultEvent';
  public static readonly FIELD_STORAGE_INSTANCE_ID: string = 'storageInstanceId';
  public static readonly FIELD_DASHBOARD_CONTEXT: string = 'dashboardContext';
  public static readonly FIELD_ELEMENT_ID: string = 'elementId';
  public static readonly FIELD_PARENT_ELEMENT_ID: string = 'parentElementId';
  public static readonly FIELD_CLOSE_DASHBOARD_ON_REOPEN: string = 'closeDashboardOnReopen';

  public static readonly LAYOUT_DOCKABLE: number = 0;
  public static readonly LAYOUT_SCROLLABLE: number = 1;
  public static readonly LAYOUT_GRID: number = 2;

  private static init = false;

  public static FORMAT: TableFormat = new TableFormat(1, 1);
  static _static_initializer_0() {
    if (DashboardProperties.init) return;
    DashboardProperties.init = true;
    let ff: FieldFormat<any> = FieldFormatFactory.create('<' + DashboardProperties.FIELD_NAME + '><S><F=N><D=' + Cres.get().getString('name') + '>');
    DashboardProperties.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + DashboardProperties.FIELD_DESCRIPTION + '><S><F=N><D=' + Cres.get().getString('description') + '>');
    ff.addValidator(ValidatorHelper.DESCRIPTION_LENGTH_VALIDATOR);
    ff.addValidator(ValidatorHelper.DESCRIPTION_SYNTAX_VALIDATOR);
    DashboardProperties.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + DashboardProperties.FIELD_LAYOUT + '><I><A=' + DashboardProperties.LAYOUT_DOCKABLE + '><D=' + Cres.get().getString('layout') + '>');
    ff.addSelectionValue(DashboardProperties.LAYOUT_DOCKABLE, Cres.get().getString('dbLayoutDockable'));
    ff.addSelectionValue(DashboardProperties.LAYOUT_SCROLLABLE, Cres.get().getString('dbLayoutScrollable'));
    ff.addSelectionValue(DashboardProperties.LAYOUT_GRID, Cres.get().getString('dbLayoutGrid'));
    DashboardProperties.FORMAT.addField(ff);

    ff = FieldFormatFactory.create('<' + DashboardProperties.FIELD_COLUMNS + '><I><A=3><D=' + Cres.get().getString('columns') + '>');
    DashboardProperties.FORMAT.addField(ff);

    DashboardProperties.FORMAT.addField(FieldFormatFactory.create('<' + DashboardProperties.FIELD_CLOSABLE + '><B><A=1><D=' + Cres.get().getString('clDashboardClosable') + '>'));

    DashboardProperties.FORMAT.addField(FieldFormatFactory.create('<' + DashboardProperties.FIELD_CLOSE_DASHBOARD_ON_REOPEN + '><B><A=0><D=' + Cres.get().getString('clCloseDashboardOnReopen') + '>'));

    DashboardProperties.FORMAT.addField(FieldFormatFactory.create('<' + DashboardProperties.FIELD_CLEANUP + '><B><F=H>'));

    DashboardProperties.FORMAT.addField(FieldFormatFactory.createWith(DashboardProperties.FIELD_STORAGE_CONTEXT, FieldConstants.STRING_FIELD, Cres.get().getString('storageContext')).setNullable(true));
    DashboardProperties.FORMAT.addField(
      FieldFormatFactory.createType(DashboardProperties.FIELD_STORAGE_CLASS, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(true)
    );
    DashboardProperties.FORMAT.addField(
      FieldFormatFactory.createType(DashboardProperties.FIELD_STORAGE_SESSION_ID, FieldConstants.LONG_FIELD)
        .setNullable(true)
        .setHidden(true)
    );

    DashboardProperties.FORMAT.addField(
      FieldFormatFactory.createType(DashboardProperties.FIELD_DEFAULT_EVENT, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(true)
    );

    DashboardProperties.FORMAT.addField(
      FieldFormatFactory.createType(DashboardProperties.FIELD_DASHBOARD_CONTEXT, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(false)
    );

    DashboardProperties.FORMAT.addField(
      FieldFormatFactory.createType(DashboardProperties.FIELD_ELEMENT_ID, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(false)
    );

    DashboardProperties.FORMAT.addField(
      FieldFormatFactory.createType(DashboardProperties.FIELD_PARENT_ELEMENT_ID, FieldConstants.STRING_FIELD)
        .setNullable(true)
        .setHidden(false)
    );

    DashboardProperties.FORMAT.setNamingExpression(
      '{' + DashboardProperties.FIELD_DESCRIPTION + '} != null ? {' + DashboardProperties.FIELD_DESCRIPTION + '} : ({' + DashboardProperties.FIELD_NAME + '} != null ? {' + DashboardProperties.FIELD_NAME + "} : '')"
    );
  }

  private name: string | null = null;
  private description: string | null = null;
  private layout: number | null = null;
  private columns: number | null = null;
  private closable = false;
  private cleanup = false;
  private storageContext: string | null = null;
  private storageClass: string | null = null;
  private storageSessionId: number | null = null;
  private defaultEvent: string | null = null;
  private dashboardContext: string | null = null;
  private elementId: string | null = null;
  private parentElementId: string | null = null;
  private closeDashboardOnReopen = false;

  public isCloseDashboardOnReopen(): boolean | null {
    return this.closeDashboardOnReopen;
  }

  public setCloseDashboardOnReopen(closeDashboardOnReopen: boolean): void {
    this.closeDashboardOnReopen = closeDashboardOnReopen;
  }

  public constructor(data?: DataRecord) {
    super(DashboardProperties.FORMAT, data);
  }

  public createWith(name: string, description: string, layout?: number) {
    new DashboardProperties();
    this.name = name;
    this.description = description;
    layout && (this.layout = layout);
  }

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string | null {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getLayout(): number | null {
    return this.layout;
  }

  public setLayout(layout: number): void {
    this.layout = layout;
  }

  public getColumns(): number | null {
    return this.columns;
  }

  public setColumns(columns: number): void {
    this.columns = columns;
  }

  public setClosable(closable: boolean): void {
    this.closable = closable;
  }

  public isCleanup(): boolean | null {
    return this.cleanup;
  }

  public setCleanup(cleanup: boolean): void {
    this.cleanup = cleanup;
  }

  public isClosable(): boolean | null {
    return this.closable;
  }

  public toString(): string | null {
    return 'Dashboard [name=' + this.name + ', description=' + this.description + ', id=' + this.elementId + ', parentId=' + this.parentElementId + ', layout=' + this.layout + ']';
  }

  public getStorageContext(): string | null {
    return this.storageContext;
  }

  public setStorageContext(storageContext: string): void {
    this.storageContext = storageContext;
  }

  public getStorageClass(): string | null {
    return this.storageClass;
  }

  public setStorageClass(className: string): void {
    this.storageClass = className;
  }

  public getStorageSessionId(): number | null {
    return this.storageSessionId;
  }

  public setStorageSessionId(storageSessionId: number): void {
    this.storageSessionId = storageSessionId;
  }

  public getFieldStorageSessionId(): string | null {
    return DashboardProperties.FIELD_STORAGE_SESSION_ID;
  }

  public getDefaultEvent(): string | null {
    return this.defaultEvent;
  }

  public setDefaultEvent(defaultEvent: string): void {
    this.defaultEvent = defaultEvent;
  }

  public getDashboardContext(): string | null {
    return this.dashboardContext;
  }

  public setDashboardContext(dashboardContextString: string): void {
    this.dashboardContext = dashboardContextString;
  }

  public getElementId(): string | null {
    return this.elementId;
  }

  public setElementId(elementIdString: string): void {
    this.elementId = elementIdString;
  }

  public getParentElementId(): string | null {
    return this.parentElementId;
  }

  public setParentElementId(parentElementId: string): void {
    this.parentElementId = parentElementId;
  }

  public copy(): DashboardProperties {
    return new DashboardProperties(this.toDataRecord());
  }

  public copyWithNameAndDescription(nameString: string, descriptionString: string): DashboardProperties {
    const dp: DashboardProperties = this.copy();
    dp.setName(nameString);
    dp.setDescription(descriptionString);
    return dp;
  }
}

DashboardProperties._static_initializer_0();
