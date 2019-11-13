import DataTable from '../datatable/DataTable';
import ActionManager from '../action/ActionManager';
import ActionHistoryItem from '../action/ActionHistoryItem';
export default interface CallerData {
    cleanup(): void;
    getActionManager(): ActionManager;
    addToActionHistory(item: ActionHistoryItem): void;
    addToLocalRegistry(id: number, table: DataTable): DataTable;
}
