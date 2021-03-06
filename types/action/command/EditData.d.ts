import GenericActionCommand from '../GenericActionCommand';
import TableFormat from '../../datatable/TableFormat';
import DashboardsHierarchyInfo from '../../util/DashboardsHierarchyInfo';
import DataTable from '../../datatable/DataTable';
import WindowLocation from '../../util/WindowLocation';
import DashboardProperties from '../../util/DashboardProperties';
import EditDataMerger from '../EditDataMerger';
import GenericActionResponse from '../GenericActionResponse';
export default class EditData extends GenericActionCommand {
    static readonly CF_DATA: string;
    static readonly CF_USE_DOCKABLE_FRAME: string;
    static readonly CF_READ_ONLY: string;
    static readonly CF_ENABLE_POPUP_MENU: string;
    static readonly CF_ICON_ID: string;
    static readonly CF_HELP_ID: string;
    static readonly CF_HELP: string;
    static readonly CF_DEFAULT_CONTEXT: string;
    static readonly CF_LOCATION: string;
    static readonly CF_DASHBOARD: string;
    static readonly CF_KEY: string;
    static readonly CF_EXPRESSION: string;
    static readonly CF_PERIOD: string;
    static readonly CF_STORAGE_VIEW: string;
    static readonly CF_STORAGE_QUERY: string;
    static readonly CF_STORAGE_TABLE: string;
    static readonly CF_STORAGE_COLUMNS: string;
    static readonly CF_STORAGE_FILTER: string;
    static readonly CF_STORAGE_SORTING: string;
    static readonly CF_STORAGE_SESSION_ID: string;
    static readonly CF_STORAGE_INSTANCE: string;
    static readonly CF_STORAGE_INSTANCE_ID: string;
    static readonly CF_STORAGE_BINDINGS: string;
    static readonly CF_SHOW_TOOLBAR: string;
    static readonly CF_SHOW_HEADER: string;
    static readonly CF_SHOW_LINE_NUMBERS: string;
    static readonly CF_HORIZONTAL_SCROLLING: string;
    static readonly CF_DASHBOARDS_HIERARCHY_INFO: string;
    static readonly CF_ADD_ROW_TABLE_ACTION: string;
    static readonly CF_REMOVE_ROW_TABLE_ACTION: string;
    static readonly CF_UPDATE_ROW_TABLE_ACTION: string;
    static readonly CF_ADD_ROW_TABLE_ACTION_INPUT: string;
    static readonly CF_REMOVE_ROW_TABLE_ACTION_INPUT: string;
    static readonly CF_UPDATE_ROW_TABLE_ACTION_INPUT: string;
    static readonly CF_ADD_ROW_TABLE_SHOW_RESULT: string;
    static readonly CF_REMOVE_ROW_TABLE_SHOW_RESULT: string;
    static readonly CF_UPDATE_ROW_TABLE_SHOW_RESULT: string;
    static readonly CF_EDITING_IN_NEW_WINDOW: string;
    static readonly CFT_EDIT_DATA: TableFormat;
    static __static_initializer_0(): void;
    private merger;
    private data;
    private useDockableFrame;
    private readOnly;
    private enablePopupMenu;
    private iconId;
    private helpId;
    private help;
    private defaultContext;
    private location;
    private dashboard;
    private storageBindings;
    private key;
    private expression;
    private period;
    private storageContext;
    private storageView;
    private storageQuery;
    private storageTable;
    private storageColumns;
    private storageFilter;
    private storageSorting;
    private storageSessionId;
    private storageInstanceId;
    private storageInstance;
    private relationField;
    private showToolbar;
    private showHeader;
    private showLineNumbers;
    private horizontalScrolling;
    private dhInfo;
    private addRowTableAction;
    private addRowTableActionInput;
    private addRowTableActionShowResult;
    private removeRowTableAction;
    private removeRowTableActionInput;
    private removeRowTableActionShowResult;
    private updateRowTableAction;
    private updateRowTableActionInput;
    private updateRowTableActionShowResult;
    private editingInNewWindow;
    private static _init;
    static initialize(): void;
    constructor(titleOrFormat?: string | TableFormat, data?: DataTable, readonly?: boolean);
    static createEditDataWithDataTable(title: string, parameters: DataTable): EditData;
    protected constructParameters(): DataTable;
    createDefaultResponse(): GenericActionResponse;
    getData(): DataTable | null;
    setData(data: DataTable): void;
    isUseDockableFrame(): boolean;
    setUseDockableFrame(useDockableFrame: boolean): void;
    isReadOnly(): boolean | null;
    setReadOnly(readonly: boolean): void;
    getIconId(): string | null;
    setIconId(iconId: string | null): void;
    getHelpId(): string | null;
    setHelpId(helpId: string | null): void;
    getHelp(): string | null;
    setHelp(help: string | null): void;
    getDefaultContext(): string | null;
    setDefaultContext(defaultContext: string | null): void;
    getLocation(): WindowLocation | null;
    setLocation(location: WindowLocation | null): void;
    getDashboard(): DashboardProperties | null;
    setDashboard(dashboard: DashboardProperties | null): void;
    getStorageBindings(): DataTable | null;
    setStorageBindings(storageBindings: DataTable): void;
    getExpression(): string | null;
    setExpression(expression: string | null): void;
    getPeriod(): number | null;
    setPeriod(period: number | null): void;
    getEnablePopupMenu(): boolean | null;
    setEnablePopupMenu(enablePopupMenu: boolean): void;
    getStorageContext(): string | null;
    setStorageContext(storageContext: string): void;
    getStorageView(): string | null;
    setStorageView(storageView: string): void;
    getStorageQuery(): string | null;
    setStorageQuery(storageQuery: string): void;
    getStorageTable(): string | null;
    setStorageTable(storageTable: string): void;
    getStorageColumns(): DataTable | null;
    setStorageColumns(storageColumns: DataTable): void;
    getStorageFilter(): DataTable | null;
    setStorageFilter(storageFilter: DataTable): void;
    getStorageSorting(): DataTable | null;
    setStorageSorting(storageSorting: DataTable): void;
    getMerger(): EditDataMerger | null;
    setMerger(merger: EditDataMerger): void;
    setStorageSessionId(storageSessionId: number): void;
    getStorageSessionId(): number | null;
    setStorageInstanceId(storageInstanceId: any): void;
    getInstanceID(): any;
    setStorageInstance(storageInstance: DataTable): void;
    getStorageInstance(): DataTable | null;
    setRelationField(relationField: string): void;
    getRelationField(): string | null;
    isShowToolbar(): boolean;
    setShowToolbar(showToolbar: boolean): void;
    isShowHeader(): boolean | null;
    setShowHeader(showHeader: boolean | null): void;
    isShowLineNumbers(): boolean | null;
    setShowLineNumbers(showLineNumbers: boolean | null): void;
    isHorizontalScrolling(): boolean | null;
    setHorizontalScrolling(horizontalScrolling: boolean | null): void;
    getKey(): string | null;
    setKey(key: string): void;
    getDashboardsHierarchyInfo(): DashboardsHierarchyInfo | null;
    setDashboardsHierarchyInfo(dhInfo: DashboardsHierarchyInfo): void;
    getAddRowTableAction(): string | null;
    setAddRowTableAction(addRowTableAction: string): void;
    getRowTableAction(): string | null;
    setRemoveRowTableAction(removeRowTableAction: string): void;
    getUpdateRowTableAction(): string | null;
    setUpdateRowTableAction(updateRowTableAction: string): void;
    setEditingInNewWindow(editingInNewWindow: boolean): void;
    isEditingInNewWindow(): boolean;
    getAddRowTableActionInput(): string | null;
    setAddRowTableActionInput(addRowTableActionInput: string): void;
    getRemoveRowTableActionInput(): string | null;
    setRemoveRowTableActionInput(removeRowTableActionInput: string): void;
    getUpdateRowTableActionInput(): string | null;
    setUpdateRowTableActionInput(updateRowTableActionInput: string): void;
    isAddRowTableActionShowResult(): boolean;
    setAddRowTableActionShowResult(addRowTableActionShowResult: boolean): void;
    isRemoveRowTableActionShowResult(): boolean;
    setRemoveRowTableActionShowResult(removeRowTableActionShowResult: boolean): void;
    isUpdateRowTableActionShowResult(): boolean;
    setUpdateRowTableActionShowResult(updateRowTableActionShowResult: boolean): void;
}
