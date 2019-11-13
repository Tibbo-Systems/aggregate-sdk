import DataTable from '../datatable/DataTable';
export default interface CompatibilityConverter {
    convert(oldValue: DataTable, newValue: DataTable): DataTable;
}
