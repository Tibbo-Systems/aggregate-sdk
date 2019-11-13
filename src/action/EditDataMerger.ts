import DataTable from '../datatable/DataTable';

export default interface EditDataMerger {
  merge(preset: DataTable, original: DataTable | null): DataTable;
}
